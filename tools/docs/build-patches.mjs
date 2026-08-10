#!/usr/bin/env node
/**
 * Builds jaen-data/patches/docs-restructure.json from tools/docs/content.
 *
 * Every emitted page — the canonical German tree and every locale variant —
 * carries a complete jaenPageMetadata: title, description, preview image and
 * a blogPost date/category, so the docs index and the blog-style homepage
 * hooks have something to render and to sort by. See the "Presentation
 * metadata" section below for the field names and where they come from.
 *
 * The patch restructures the /docs tree:
 *  - deletes every old quantum page that lived directly under /docs
 *  - replaces the /docs landing content with a German section overview
 *  - re-roots the harvested PhotonQ pages under /docs/photonq and pivots
 *    their canonical language to German (tools/docs/i18n-photonq/de); the
 *    English originals move to the /en/ variants
 *  - lets an authored tools/docs/content/photonq/index.md, when present,
 *    replace the harvested /docs/photonq landing content on the canonical
 *    tree (mdast parsed from markdown, like the other authored pages); the
 *    harvested child pages and the locale variants stay untouched
 *  - adds the authored German section pages (emailwerk, qtamp, linux,
 *    security, linuxtage, interns, ledart, baeckerherz)
 *  - emits a full, CMS-editable locale variant tree per non-default locale
 *    (en, sl, it, ja): every variant is a real JaenPage with its own id,
 *    linked under /<locale>/docs/ under the locale root /<locale>/, so the
 *    localized page-creation fan-out in gatsby-source-jaen folds it in
 *    (create-pages/jaen-pages.ts, variantPaths lookup) and the jaen CMS
 *    lists it as a separately editable page under its locale root.
 *
 * Locale wiring conventions (from gatsby-source-jaen):
 *  - Stateful clones (src/pages fan-out) use path-keyed ids:
 *    `JaenPage /en/`, `JaenPage /en/docs/` (on-create-page/jaen-page.ts).
 *    The patch entries for these ids carry NO template — a template would
 *    make create-pages spawn a second page on top of the stateful clone.
 *  - Templated variants carry their own deterministic UUID id and are found
 *    by origin path (parentPage/slug chain), so every ancestor node in the
 *    chain must exist in the patch data.
 *
 * Translation inputs:
 *  - tools/docs/i18n/<locale>/<relpath>.md for the authored sections.
 *  - tools/docs/i18n-photonq/<locale>/__docs*.json for the PhotonQ harvest.
 *  A missing or structurally broken translation never fails the build: the
 *  authored variant is skipped (the localized route then falls back to the
 *  canonical page), a PhotonQ variant falls back to the English original so
 *  the variant tree stays complete. Both cases warn loudly.
 *
 * The output is deterministic: page ids are UUIDv5 of the page path and no
 * entry carries createdAt/modifiedAt timestamps (gatsby-source-jaen fills
 * those in at sourcing time). Re-running the script reproduces the file
 * byte for byte.
 */

import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'
import {unified} from 'unified'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(HERE, '..', '..')
const CONTENT_DIR = path.join(HERE, 'content')
const I18N_DIR = path.join(HERE, 'i18n')
const I18N_PHOTONQ_DIR = path.join(HERE, 'i18n-photonq')
const MESSAGES_FILE = path.join(REPO_ROOT, 'src', 'locales', 'messages.ts')
const OUT_FILE = path.join(REPO_ROOT, 'jaen-data', 'patches', 'docs-restructure.json')

// Non-default locales, in emission order. German is the site default and
// owns the canonical (unprefixed) tree.
const VARIANT_LOCALES = ['en', 'sl', 'it', 'ja']

// ---------------------------------------------------------------------------
// Deterministic ids: UUIDv5 (SHA-1) in the standard URL namespace over the
// canonical page URL. Same path, same id, on every run.
// ---------------------------------------------------------------------------

const UUID_NAMESPACE_URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8'

const uuidv5 = (name, namespace) => {
  const ns = Buffer.from(namespace.replace(/-/g, ''), 'hex')
  const hash = crypto
    .createHash('sha1')
    .update(Buffer.concat([ns, Buffer.from(name, 'utf8')]))
    .digest()
  const bytes = Buffer.from(hash.subarray(0, 16))
  bytes[6] = (bytes[6] & 0x0f) | 0x50 // version 5
  bytes[8] = (bytes[8] & 0x3f) | 0x80 // RFC 4122 variant
  const hex = bytes.toString('hex')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

const pageId = pagePath => `JaenPage ${uuidv5(`https://netsnek.com${pagePath}/`, UUID_NAMESPACE_URL)}`

// Localized path of a canonical page path (`/docs/foo` -> `/en/docs/foo`).
const localePathOf = (locale, pagePath) => `/${locale}${pagePath}`

// Path-keyed ids of the stateful fan-out clones the variants hook into.
const localeRootId = locale => `JaenPage /${locale}/`
const localeDocsId = locale => `JaenPage /${locale}/docs/`

// ---------------------------------------------------------------------------
// Markdown -> mdast, with the same syntax extensions the jaen MdxField
// pipeline uses for plain content (GFM tables + math).
// ---------------------------------------------------------------------------

const processor = unified().use(remarkParse).use(remarkGfm).use(remarkMath)

const parseMarkdown = markdown => JSON.parse(JSON.stringify(processor.parse(markdown)))

const parseAuthoredFile = filePath => {
  const source = fs.readFileSync(filePath, 'utf8')
  const match = source.match(/^---\n([\s\S]*?)\n---\n/)

  if (!match) {
    throw new Error(`Missing frontmatter in ${filePath}`)
  }

  const frontmatter = {}
  for (const line of match[1].split('\n')) {
    const sep = line.indexOf(':')
    if (sep === -1) continue
    frontmatter[line.slice(0, sep).trim()] = line.slice(sep + 1).trim()
  }

  for (const key of ['title', 'description', 'path']) {
    if (!frontmatter[key]) {
      throw new Error(`Missing frontmatter key "${key}" in ${filePath}`)
    }
  }

  const body = source.slice(match[0].length)

  return {
    ...frontmatter,
    body,
    mdast: parseMarkdown(body)
  }
}

// ---------------------------------------------------------------------------
// Structural safety check for the PhotonQ translations: a translated mdast
// must visit the same node types in the same order as the English source and
// keep every code/inlineCode/math value byte-identical. A translation that
// fails is never shipped — the variant falls back to the English original.
// ---------------------------------------------------------------------------

const LITERAL_TYPES = new Set(['code', 'inlineCode', 'math', 'inlineMath'])

const structuralSignature = root => {
  const out = []

  const walk = node => {
    if (!node || typeof node !== 'object') return
    if (node.type) {
      out.push(node.type)
      if (LITERAL_TYPES.has(node.type)) {
        out.push(`literal:${node.value}`)
      }
    }
    for (const child of node.children || []) {
      walk(child)
    }
  }

  walk(root)
  return out.join('\n')
}

const translationMatchesSource = (sourceFields, translatedFields) => {
  const sourceMdx = sourceFields?.['IMA:MdxField'] || {}
  const translatedMdx = translatedFields?.['IMA:MdxField'] || {}

  const sourceNames = Object.keys(sourceMdx).sort()
  const translatedNames = Object.keys(translatedMdx).sort()

  if (sourceNames.join('\u0000') !== translatedNames.join('\u0000')) {
    return false
  }

  return sourceNames.every(
    name =>
      structuralSignature(sourceMdx[name]?.value) ===
      structuralSignature(translatedMdx[name]?.value)
  )
}

// ---------------------------------------------------------------------------
// Localized metadata for the locale scaffolds, read from the site catalog:
// the homepage title/description for the locale root pages (`JaenPage /en/`
// ...), which ship as the live <title> of the localized homepages, and the
// docs title/description for `JaenPage /en/docs/` — the localized defaults
// src/components/Head.tsx would otherwise substitute at render time. Storing
// them means no locale docs root is left without its own description.
// ---------------------------------------------------------------------------

const readLocaleCatalogMetadata = () => {
  const source = fs.readFileSync(MESSAGES_FILE, 'utf8')

  const catalogSuffix = {en: 'En', sl: 'Sl', it: 'It', ja: 'Ja'}

  const chunkOf = suffix => {
    const start = source.indexOf(`export const messages${suffix}`)
    if (start === -1) {
      throw new Error(`Catalog messages${suffix} not found in ${MESSAGES_FILE}`)
    }
    const end = source.indexOf('export const messages', start + 1)
    return source.slice(start, end === -1 ? source.length : end)
  }

  const stringValue = (chunk, suffix, key) => {
    const match = chunk.match(
      new RegExp(`${key}:\\s*(['"])((?:\\\\.|(?!\\1).)*)\\1`)
    )
    if (!match) {
      throw new Error(`Key ${key} not found in catalog messages${suffix}`)
    }
    return match[2].replace(/\\(.)/g, '$1')
  }

  const metadata = {}
  for (const locale of VARIANT_LOCALES) {
    const chunk = chunkOf(catalogSuffix[locale])
    metadata[locale] = {
      home: {
        title: stringValue(chunk, catalogSuffix[locale], 'PageTitleHome'),
        description: stringValue(chunk, catalogSuffix[locale], 'PageDescriptionHome')
      },
      docs: {
        title: stringValue(chunk, catalogSuffix[locale], 'PageTitleDocs'),
        description: stringValue(chunk, catalogSuffix[locale], 'PageDescriptionDocs')
      }
    }
  }

  return metadata
}

// ---------------------------------------------------------------------------
// Old quantum pages currently under /docs (ids taken from the built
// page-data of the live patch chain). Every one of them gets a
// {id, deleted: true} entry so deepRemoveDeleted drops the page.
// ---------------------------------------------------------------------------

const OLD_PAGE_IDS = [
  'JaenPage 23ceeff3-dd19-43b7-9c65-1c774c391b9d', // /docs/measurement-based-quantum-computing
  'JaenPage 9da84380-ec28-475d-b6e0-c702e47b45e8', // /docs/measurement-based-quantum-computing/graph-states
  'JaenPage 5e970e78-b02e-4186-83df-823ff1f1d4d6', // /docs/measurement-based-quantum-computing/one-way-computation
  'JaenPage 4c3ed1c0-2d91-4b6a-80de-2cdaa8b53bc2', // /docs/negative-frank
  'JaenPage 969775d8-b434-4e14-85ab-d27b385cb90c', // /docs/openqasm
  'JaenPage 891e4d03-31ad-43cd-924a-3e8e394e7739', // /docs/openqasm/classical-registers
  'JaenPage cd5bb55f-32a9-421c-944c-5b5e4752a6b8', // /docs/openqasm/comments
  'JaenPage 35e95590-abe4-4ba4-9959-cda6ac147341', // /docs/openqasm/gates
  'JaenPage b7299548-a5e2-4671-9f7e-a358e8006d8c', // /docs/openqasm/gates/cnot-gate
  'JaenPage 608112c2-9a21-49de-94eb-d5e8e75dc21e', // /docs/openqasm/gates/u-gate
  'JaenPage 039f268a-d23b-49a9-9994-805167ecc16a', // /docs/openqasm/include
  'JaenPage 3a9af4c7-848e-483e-bb26-e97797dafae8', // /docs/openqasm/introduction
  'JaenPage 8b677645-1ba8-4a50-b0ea-3f0c08ede4d5', // /docs/openqasm/measure
  'JaenPage da798d62-8cbc-4722-947c-2949fcb4c3f2', // /docs/openqasm/registers
  'JaenPage d11b62ce-d996-4bea-a62c-e1f93f7795e4', // /docs/openqasm/reset
  'JaenPage 0a260189-1646-4612-8630-3c2d48fb9c46', // /docs/openqasm/syntax
  'JaenPage 77ba8d65-15f0-4d10-9219-5cb582fa2db7', // /docs/openqasm/version-string
  'JaenPage 15c1e248-83da-4642-adb5-dff5414fe330', // /docs/quantum-computing-and-quantum-information
  'JaenPage ed108da4-28b0-4faa-9ada-5e662ebdb9fc', // /docs/quantum-computing-and-quantum-information/mulit-qubit-gates
  'JaenPage 7169a9e7-e423-4f5f-bc09-6d973e0e5c98', // /docs/quantum-computing-and-quantum-information/quantum-gates
  'JaenPage 32d58ad8-e0f9-4f32-8118-add23474b8bf', // /docs/quantum-computing-and-quantum-information/qubit-measurements
  'JaenPage 8a08ee85-0826-40d4-96f5-d07e5b09b0f5', // /docs/quantum-computing-and-quantum-information/simple-quantum-algorithms
  'JaenPage 81ce1a4d-43e6-4b80-ac8c-dc826725af9b', // /docs/quantum-computing-and-quantum-information/the-quantum-bit
  'JaenPage 2d808d41-27fe-436e-be2d-9901a7596eb6' // /docs/quantum-computing-with-linear-optics
]

// Refs that must leave the childPages array of the /docs page. Replaying the
// remote chain shows several ids appear TWICE there (a tombstoned entry plus a
// live re-added one, the CMS reorder pattern), and the array-id merge pairs
// each source tombstone with only one target entry. Two tombstones per id
// therefore clear both variants; surplus tombstones are appended and then
// dropped by deepRemoveDeleted, so over-tombstoning is harmless.
const OLD_DOCS_CHILD_IDS = [
  'JaenPage 969775d8-b434-4e14-85ab-d27b385cb90c', // openqasm
  'JaenPage 15c1e248-83da-4642-adb5-dff5414fe330', // quantum-computing-and-quantum-information
  'JaenPage 23ceeff3-dd19-43b7-9c65-1c774c391b9d', // measurement-based-quantum-computing
  'JaenPage 2d808d41-27fe-436e-be2d-9901a7596eb6', // quantum-computing-with-linear-optics
  'JaenPage 4c3ed1c0-2d91-4b6a-80de-2cdaa8b53bc2', // negative-frank
  'JaenPage 3f3cf65a-a983-47fb-b2e7-044196706dac', // how-to-photonq, deleted upstream, ref dangles
  'JaenPage a526a34f-0b05-4af1-907c-3037de6b732d', // deleted upstream, ref dangles
  'JaenPage 59bd6f17-a194-4851-a2ef-c04baa931904', // deleted upstream, ref dangles
  'JaenPage 87acfc10-1c9c-4ecf-b931-16d6438ed8c7', // old-documentation, deleted upstream, ref dangles
  'JaenPage d38e5bba-952a-42c2-9225-550466e3082e', // deleted upstream, ref dangles
  'JaenPage 15e0e2c8-ca85-4cd0-aad9-e4d4d722c8ca' // deleted upstream, ref dangles
]

const DOCS_ID = 'JaenPage /docs/'
const DOC_TEMPLATE = 'JaenTemplate DocPage'

// Order of the new sections under /docs.
const SECTION_ORDER = [
  '/docs/photonq',
  '/docs/jaen',
  '/docs/emailwerk',
  '/docs/qtamp',
  '/docs/linux',
  '/docs/security',
  '/docs/linuxtage',
  '/docs/interns',
  '/docs/ledart',
  '/docs/baeckerherz'
]

const parentPathOf = pagePath => pagePath.split('/').slice(0, -1).join('/') || '/docs'
const slugOf = pagePath => pagePath.split('/').pop()

const mdxDocumentationField = mdast => ({
  'IMA:MdxField': {
    documentation: {
      value: mdast,
      props: {}
    }
  }
})

// ---------------------------------------------------------------------------
// Presentation metadata: preview image + blogPost date/category.
//
// The field names are jaen's own — gatsby-source-jaen declares them on the
// JaenPageMetadata type (create-schema-customization/jaen-page.ts):
//
//     type JaenPageMetadata {
//       title: String!
//       description: String
//       image: String
//       blogPost: JaenPageMetadataBlogPost
//     }
//     type JaenPageMetadataBlogPost {
//       date: String
//       author: String
//       category: String
//     }
//
// and the page fragments query exactly those (fragments/jaen-page.ts), which
// is what the blog-style hooks consume: `jaenPageMetadata.image` as the
// featured media, `jaenPageMetadata.blogPost.date` as the sort key and
// `jaenPageMetadata.blogPost.category` as the label. `image` is a plain
// string, so it holds the absolute URL of the preview file under
// static/images/docs (the site is served from netsnek.com and og:image needs
// an absolute URL, jaen/src/Head/Head.tsx renders it verbatim).
// ---------------------------------------------------------------------------

const SITE_URL = 'https://netsnek.com'
const IMAGE_DIR = path.join(REPO_ROOT, 'static', 'images', 'docs')
const IMAGE_ROUTE = '/images/docs'
// Preferred first: with several encodings of one image the first hit wins, so
// the pick never depends on the readdir order.
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']
// static/images/docs/docs.* is the preview of the /docs landing and the
// fallback for every section that has no image of its own.
const ROOT_IMAGE_KEY = 'docs'

// Deterministic publication dates: no clock is ever read. The /docs landing
// sits on the anchor, the sections count down from it in SECTION_ORDER, and
// the pages inside a section count down from their section root — so sorting
// newest first reproduces SECTION_ORDER, with each section index ahead of its
// own children.
const DATE_ANCHOR = Date.UTC(2026, 0, 5)
const SECTION_DATE_STRIDE = 100 // days reserved per section
const DAY_MS = 24 * 60 * 60 * 1000

const dateOfRank = (sectionRank, pageRank) => {
  if (pageRank >= SECTION_DATE_STRIDE) {
    throw new Error(
      `Section page rank ${pageRank} exceeds the ${SECTION_DATE_STRIDE} day stride; raise SECTION_DATE_STRIDE`
    )
  }

  // Rank -1 is the /docs landing itself, which keeps the anchor.
  const offset = sectionRank < 0 ? 0 : 1 + sectionRank * SECTION_DATE_STRIDE + pageRank

  return new Date(DATE_ANCHOR - offset * DAY_MS).toISOString().slice(0, 10)
}

// Every preview file under static/images/docs, keyed by its path below /docs
// ("qtamp", "qtamp/install", ...) plus the root key "docs".
const buildImageIndex = () => {
  const index = new Map()

  const walk = (dir, prefix) => {
    const entries = fs.readdirSync(dir, {withFileTypes: true})
    entries.sort((a, b) => a.name.localeCompare(b.name))

    for (const entry of entries) {
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), `${prefix}${entry.name}/`)
        continue
      }

      const ext = path.extname(entry.name).toLowerCase()
      if (!IMAGE_EXTENSIONS.includes(ext)) continue

      const key = `${prefix}${entry.name.slice(0, -ext.length)}`
      const current = index.get(key)
      if (current && IMAGE_EXTENSIONS.indexOf(current.ext) <= IMAGE_EXTENSIONS.indexOf(ext)) {
        continue
      }

      index.set(key, {ext, url: `${SITE_URL}${IMAGE_ROUTE}/${prefix}${entry.name}`})
    }
  }

  if (fs.existsSync(IMAGE_DIR)) {
    walk(IMAGE_DIR, '')
  }

  if (!index.has(ROOT_IMAGE_KEY)) {
    throw new Error(`Missing the root preview image ${IMAGE_DIR}/${ROOT_IMAGE_KEY}.jpg`)
  }

  return index
}

// A page uses the most specific preview file on its own path and inherits its
// section's otherwise; the root image closes the gap for sections without one.
const imageOfPath = (index, pagePath) => {
  const rel = pagePath === '/docs' ? [] : pagePath.slice('/docs/'.length).split('/')

  for (let depth = rel.length; depth > 0; depth -= 1) {
    const key = rel.slice(0, depth).join('/')
    const hit = index.get(key)
    if (hit) return {url: hit.url, key, exact: depth === rel.length}
  }

  return {url: index.get(ROOT_IMAGE_KEY).url, key: ROOT_IMAGE_KEY, exact: rel.length === 0}
}

const sectionOfPath = pagePath =>
  pagePath === '/docs' ? undefined : `/docs/${pagePath.split('/')[2]}`

// The canonical page paths of every section, from the same inputs the page
// builders read: the PhotonQ inventory and the authored frontmatter.
const collectSectionPagePaths = () => {
  const bySection = new Map(SECTION_ORDER.map(sectionPath => [sectionPath, []]))

  const add = pagePath => {
    const section = sectionOfPath(pagePath)
    const pages = bySection.get(section)
    if (!pages) {
      throw new Error(`Page ${pagePath} belongs to no section in SECTION_ORDER`)
    }
    pages.push(pagePath)
  }

  const inventory = JSON.parse(
    fs.readFileSync(path.join(CONTENT_DIR, 'photonq', 'inventory.json'), 'utf8')
  )
  for (const entry of inventory) {
    add(entry.newPath)
  }

  for (const dirent of fs.readdirSync(CONTENT_DIR, {withFileTypes: true})) {
    if (!dirent.isDirectory() || dirent.name === 'photonq') continue
    for (const file of fs.readdirSync(path.join(CONTENT_DIR, dirent.name))) {
      if (!file.endsWith('.md')) continue
      add(parseAuthoredFile(path.join(CONTENT_DIR, dirent.name, file)).path)
    }
  }

  for (const pages of bySection.values()) {
    pages.sort((a, b) => a.localeCompare(b))
  }

  return bySection
}

// Section display names for the blogPost category, parsed off the bullet list
// of a docs landing (`- [qtamp](/docs/qtamp): ...`).
const parseSectionLabels = markdown => {
  const labels = new Map()

  for (const line of markdown.split('\n')) {
    const match = line.match(/^\s*[-*]\s*\[([^\]]+)\]\((\/docs\/[^)\s]+)\)/)
    if (match) {
      labels.set(match[2].replace(/\/$/, ''), match[1].trim())
    }
  }

  return labels
}

// Category per locale and section: the locale's own docs landing wins, then
// the locale's translated section index title, then the German name. PhotonQ
// is a brand name and stays PhotonQ in every language.
const buildCategoryIndex = (germanLanding, docsLandings) => {
  const germanLabels = parseSectionLabels(germanLanding.body)

  const sectionIndexTitle = (dir, section) => {
    if (section === '/docs/photonq') return 'PhotonQ'
    const file = path.join(dir, section.slice('/docs/'.length), 'index.md')
    return fs.existsSync(file) ? parseAuthoredFile(file).title : undefined
  }

  const byLocale = new Map()

  byLocale.set(
    'de',
    new Map(
      SECTION_ORDER.map(section => [
        section,
        germanLabels.get(section) || sectionIndexTitle(CONTENT_DIR, section) || slugOf(section)
      ])
    )
  )

  for (const locale of VARIANT_LOCALES) {
    const landing = docsLandings.get(locale)
    const labels = landing ? parseSectionLabels(landing.body) : new Map()

    byLocale.set(
      locale,
      new Map(
        SECTION_ORDER.map(section => [
          section,
          labels.get(section) ||
            sectionIndexTitle(path.join(I18N_DIR, locale), section) ||
            byLocale.get('de').get(section)
        ])
      )
    )
  }

  return byLocale
}

// image + date of every canonical docs page, keyed by canonical path. A
// locale variant shares both with its canonical page: same page, same
// preview, same publication date.
const buildPresentationIndex = images => {
  const byPath = new Map()
  const fallbackSections = []

  const landingImage = imageOfPath(images, '/docs')
  byPath.set('/docs', {
    image: landingImage.url,
    imageIsExact: true,
    date: dateOfRank(-1, 0),
    section: undefined
  })

  const bySection = collectSectionPagePaths()

  SECTION_ORDER.forEach((section, sectionRank) => {
    const pagePaths = bySection.get(section)

    if (imageOfPath(images, section).key === ROOT_IMAGE_KEY) {
      fallbackSections.push(slugOf(section))
    }

    pagePaths.forEach((pagePath, pageRank) => {
      const image = imageOfPath(images, pagePath)
      byPath.set(pagePath, {
        image: image.url,
        imageIsExact: image.exact,
        date: dateOfRank(sectionRank, pageRank),
        section
      })
    })
  })

  return {byPath, fallbackSections}
}

// The metadata block of one page, in the field order of the jaen fragment.
// `harvested` carries the PhotonQ page's own stored metadata: its image is
// kept unless a preview file was placed for this exact page, its author is
// the only author the docs tree knows.
const pageMetadata = ({presentation, categories, locale, pagePath, title, description, harvested}) => {
  const info = presentation.byPath.get(pagePath)

  if (!info) {
    throw new Error(`No presentation metadata for ${pagePath}`)
  }

  const harvestedImage = harvested?.image || undefined
  const author = harvested?.blogPost?.author || undefined
  const category = info.section
    ? categories.get(locale)?.get(info.section)
    : undefined

  return {
    title,
    description,
    image: info.imageIsExact ? info.image : harvestedImage || info.image,
    blogPost: {
      date: info.date,
      ...(author ? {author} : {}),
      ...(category ? {category} : {})
    }
  }
}

// ---------------------------------------------------------------------------
// PhotonQ harvest: re-root every page per inventory.json and emit one page
// per locale. The canonical (unprefixed) tree pivots to the German
// translations — German is the site's default locale — while the English
// originals move to the /en/ variants; sl/it/ja come from their JSONs. A
// variant whose translation is missing or fails the structural check falls
// back to the English original so the variant tree never has holes (a
// missing node would break the origin-path resolution of its children).
// ---------------------------------------------------------------------------

const photonqTranslationFile = (locale, oldPath) =>
  path.join(I18N_PHOTONQ_DIR, locale, `${oldPath.replace(/\//g, '__')}.json`)

const loadPhotonqTranslation = (locale, oldPath, raw) => {
  const file = photonqTranslationFile(locale, oldPath)

  if (!fs.existsSync(file)) {
    console.warn(`[photonq ${locale}] missing translation for ${oldPath}, falling back to the English original`)
    return undefined
  }

  const parsed = JSON.parse(fs.readFileSync(file, 'utf8'))

  if (parsed.oldPath !== oldPath || parsed.locale !== locale) {
    console.warn(`[photonq ${locale}] SKIPPING ${oldPath}: translation file identifies as ${parsed.locale} ${parsed.oldPath}`)
    return undefined
  }

  if (!parsed.title || !parsed.description) {
    console.warn(`[photonq ${locale}] SKIPPING ${oldPath}: translation carries no title/description`)
    return undefined
  }

  if (!translationMatchesSource(raw.jaenFields, parsed.jaenFields)) {
    console.warn(`[photonq ${locale}] SKIPPING ${oldPath}: STRUCTURAL CHECK FAILED (node order or code/math literals differ from the English source)`)
    return undefined
  }

  return parsed
}

const buildPhotonqPages = (presentation, categories) => {
  const photonqDir = path.join(CONTENT_DIR, 'photonq')
  const inventory = JSON.parse(fs.readFileSync(path.join(photonqDir, 'inventory.json'), 'utf8'))

  // Authored landing override: an index.md next to the harvest replaces the
  // harvested landing content of /docs/photonq on the canonical (German)
  // tree, parsed exactly like the other authored pages. The harvested child
  // pages and the locale variants are not affected.
  const landingFile = path.join(photonqDir, 'index.md')
  let landingOverride
  if (fs.existsSync(landingFile)) {
    landingOverride = parseAuthoredFile(landingFile)
    if (landingOverride.path !== '/docs/photonq') {
      throw new Error(
        `photonq/index.md must declare path /docs/photonq, found ${landingOverride.path}`
      )
    }
  }
  const rootOldPath = inventory.find(entry => entry.newPath === '/docs/photonq')?.oldPath

  const rawByOldPath = new Map()
  const newIdByOldId = new Map()

  for (const entry of inventory) {
    const rawName = `${entry.oldPath.replace(/^\//, '').replace(/\//g, '__')}.json`
    const raw = JSON.parse(fs.readFileSync(path.join(photonqDir, 'raw', rawName), 'utf8'))
    rawByOldPath.set(entry.oldPath, raw)
    newIdByOldId.set(raw.id, entry.newPath)
  }

  // The harvested childPagesOrder can reference pages that were deleted
  // upstream (stale order entries), so unknown ids are dropped, not fatal.
  // `toId` maps the surviving new path into the target tree (canonical or
  // one locale's variant tree).
  const mapIds = (oldIds, toId) =>
    oldIds
      .map(oldId => {
        const newPath = newIdByOldId.get(oldId)
        if (!newPath) {
          console.warn(`Dropping stale PhotonQ ref ${oldId}`)
          return undefined
        }
        return toId(newPath)
      })
      .filter(Boolean)

  // title/description of a page in one language, plus the shared
  // presentation metadata (preview image, blogPost date/category). The
  // harvested metadata still supplies the page's own stored image and its
  // author. The section root keeps the PhotonQ brand name as its title in
  // every language.
  const metadataOf = (raw, newPath, isRoot, translation, locale) =>
    pageMetadata({
      presentation,
      categories,
      locale,
      pagePath: newPath,
      title: isRoot ? 'PhotonQ' : translation?.title || raw.jaenPageMetadata?.title,
      description: translation?.description || raw.jaenPageMetadata?.description,
      harvested: raw.jaenPageMetadata
    })

  const fallbacks = Object.fromEntries(VARIANT_LOCALES.map(locale => [locale, 0]))

  const buildTree = (locale, toId, toParentId, translationOf) =>
    inventory.map(entry => {
      const raw = rawByOldPath.get(entry.oldPath)
      const isRoot = entry.newPath === '/docs/photonq'
      const translation = translationOf(entry.oldPath, raw)

      return {
        id: toId(entry.newPath),
        slug: slugOf(entry.newPath),
        template: raw.template || DOC_TEMPLATE,
        parentPage: {
          id: isRoot ? toParentId(null) : toId(parentPathOf(entry.newPath))
        },
        childPages: mapIds((raw.childPages || []).map(child => child.id), toId).map(id => ({id})),
        childPagesOrder: mapIds(raw.childPagesOrder || [], toId),
        excludedFromIndex: false,
        jaenPageMetadata: metadataOf(raw, entry.newPath, isRoot, translation, locale),
        jaenFields: translation ? translation.jaenFields : raw.jaenFields
      }
    })

  // Canonical tree: German content (language pivot). The authored landing
  // override, when present, wins over the harvested/translated landing.
  const canonical = buildTree(
    'de',
    newPath => pageId(newPath),
    () => DOCS_ID,
    (oldPath, raw) => {
      if (landingOverride && oldPath === rootOldPath) {
        return {
          title: landingOverride.title,
          description: landingOverride.description,
          jaenFields: mdxDocumentationField(landingOverride.mdast)
        }
      }
      return loadPhotonqTranslation('de', oldPath, raw)
    }
  )

  // Variant trees: English originals on /en/, translations elsewhere.
  const variantsByLocale = new Map(
    VARIANT_LOCALES.map(locale => [
      locale,
      buildTree(
        locale,
        newPath => pageId(localePathOf(locale, newPath)),
        () => localeDocsId(locale),
        (oldPath, raw) => {
          if (locale === 'en') return undefined // raw IS the English page
          const translation = loadPhotonqTranslation(locale, oldPath, raw)
          if (!translation) fallbacks[locale] += 1
          return translation
        }
      )
    ])
  )

  return {canonical, variantsByLocale, fallbacks}
}

// ---------------------------------------------------------------------------
// Authored German pages and their translated variants. Translations live in
// tools/docs/i18n/<locale>/<relpath>.md, mirroring tools/docs/content. A
// variant is only emitted when its own translation exists and its parent
// variant was emitted (a child under a missing parent could not resolve its
// localized origin path); everything else is skipped with a warning, so
// partial translation states build cleanly.
// ---------------------------------------------------------------------------

const buildAuthoredPages = (presentation, categories) => {
  const files = []

  for (const dirent of fs.readdirSync(CONTENT_DIR, {withFileTypes: true})) {
    if (!dirent.isDirectory() || dirent.name === 'photonq') continue
    for (const file of fs.readdirSync(path.join(CONTENT_DIR, dirent.name))) {
      if (file.endsWith('.md')) {
        files.push(path.join(dirent.name, file))
      }
    }
  }

  const authored = files.map(relFile => ({
    relFile,
    ...parseAuthoredFile(path.join(CONTENT_DIR, relFile))
  }))
  authored.sort((a, b) => a.path.localeCompare(b.path))

  const childrenByParent = new Map()
  for (const page of authored) {
    const parentPath = parentPathOf(page.path)
    if (parentPath !== '/docs') {
      const siblings = childrenByParent.get(parentPath) || []
      siblings.push(page.path)
      childrenByParent.set(parentPath, siblings)
    }
  }

  const canonical = authored.map(page => {
    const parentPath = parentPathOf(page.path)
    const childPaths = childrenByParent.get(page.path) || []

    return {
      id: pageId(page.path),
      slug: slugOf(page.path),
      template: DOC_TEMPLATE,
      parentPage: {
        id: parentPath === '/docs' ? DOCS_ID : pageId(parentPath)
      },
      childPages: childPaths.map(childPath => ({id: pageId(childPath)})),
      childPagesOrder: childPaths.map(pageId),
      excludedFromIndex: false,
      jaenPageMetadata: pageMetadata({
        presentation,
        categories,
        locale: 'de',
        pagePath: page.path,
        title: page.title,
        description: page.description
      }),
      jaenFields: mdxDocumentationField(page.mdast)
    }
  })

  const skipped = Object.fromEntries(VARIANT_LOCALES.map(locale => [locale, 0]))

  const variantsByLocale = new Map()
  const sectionPathsByLocale = new Map()

  for (const locale of VARIANT_LOCALES) {
    // Pass 1: which variants exist for this locale? `authored` is sorted by
    // path, so a parent is always decided before its children.
    const translationByPath = new Map()

    for (const page of authored) {
      const file = path.join(I18N_DIR, locale, page.relFile)

      if (!fs.existsSync(file)) {
        console.warn(`[docs ${locale}] missing translation ${path.relative(REPO_ROOT, file)}, skipping variant of ${page.path}`)
        skipped[locale] += 1
        continue
      }

      const translation = parseAuthoredFile(file)

      if (translation.path !== page.path) {
        console.warn(`[docs ${locale}] SKIPPING ${page.path}: translation declares path ${translation.path}`)
        skipped[locale] += 1
        continue
      }

      const parentPath = parentPathOf(page.path)
      if (parentPath !== '/docs' && !translationByPath.has(parentPath)) {
        console.warn(`[docs ${locale}] SKIPPING ${page.path}: parent variant ${parentPath} was not emitted`)
        skipped[locale] += 1
        continue
      }

      translationByPath.set(page.path, translation)
    }

    // Pass 2: emit the variants, children wired in canonical order.
    const variants = []

    for (const page of authored) {
      const translation = translationByPath.get(page.path)
      if (!translation) continue

      const parentPath = parentPathOf(page.path)
      const childPaths = (childrenByParent.get(page.path) || []).filter(childPath =>
        translationByPath.has(childPath)
      )

      variants.push({
        id: pageId(localePathOf(locale, page.path)),
        slug: slugOf(page.path),
        template: DOC_TEMPLATE,
        parentPage: {
          id:
            parentPath === '/docs'
              ? localeDocsId(locale)
              : pageId(localePathOf(locale, parentPath))
        },
        childPages: childPaths.map(childPath => ({id: pageId(localePathOf(locale, childPath))})),
        childPagesOrder: childPaths.map(childPath => pageId(localePathOf(locale, childPath))),
        excludedFromIndex: false,
        // The description is the locale's OWN, straight from the translated
        // frontmatter — a variant never inherits the German one.
        jaenPageMetadata: pageMetadata({
          presentation,
          categories,
          locale,
          pagePath: page.path,
          title: translation.title,
          description: translation.description
        }),
        jaenFields: mdxDocumentationField(translation.mdast)
      })
    }

    variantsByLocale.set(locale, variants)
    sectionPathsByLocale.set(
      locale,
      new Set(
        [...translationByPath.keys()].filter(pagePath => parentPathOf(pagePath) === '/docs')
      )
    )
  }

  return {canonical, variantsByLocale, sectionPathsByLocale, skipped}
}

// ---------------------------------------------------------------------------
// Locale scaffolds: the two path-keyed nodes each variant tree hangs off.
// Both ids belong to stateful fan-out clones (`JaenPage /en/`,
// `JaenPage /en/docs/`), so the entries carry no template — the runtime
// node-assurance in on-create-page/jaen-page.ts spreads the sourced node
// into the clone's JaenPage node, which keeps this metadata and tree data
// while the page itself stays the stateful clone.
// ---------------------------------------------------------------------------

const buildLocaleScaffolds = (
  locale,
  sectionIds,
  catalogMetadata,
  docsLanding,
  presentation,
  categories
) => {
  const localeRoot = {
    id: localeRootId(locale),
    slug: locale,
    parentPage: {id: 'JaenPage /'},
    // No childPagesOrder here: a plain childPages append merges into
    // whatever the CMS already stored for the locale root, while a
    // childPagesOrder array (primitives) would replace the stored order.
    childPages: [{id: localeDocsId(locale)}],
    // The real localized site title/description — this ships as the live
    // <title> of the localized homepage. No preview image: this is the
    // homepage scaffold, not a docs page, and the docs previews would be
    // wrong for it.
    jaenPageMetadata: catalogMetadata.home
  }

  const docsRoot = {
    id: localeDocsId(locale),
    slug: 'docs',
    parentPage: {id: localeRootId(locale)},
    childPages: sectionIds.map(id => ({id})),
    childPagesOrder: sectionIds,
    // Until the docs landing is translated, title and description are the
    // locale's own catalog defaults (PageTitleDocs/PageDescriptionDocs, the
    // very strings src/components/Head.tsx would substitute) — never the
    // German landing text.
    jaenPageMetadata: pageMetadata({
      presentation,
      categories,
      locale,
      pagePath: '/docs',
      title: docsLanding ? docsLanding.title : catalogMetadata.docs.title,
      description: docsLanding
        ? docsLanding.description
        : catalogMetadata.docs.description
    }),
    ...(docsLanding ? {jaenFields: mdxDocumentationField(docsLanding.mdast)} : {})
  }

  return [localeRoot, docsRoot]
}

const loadDocsLanding = locale => {
  const file = path.join(I18N_DIR, locale, 'docs-index.md')

  if (!fs.existsSync(file)) {
    console.warn(`[docs ${locale}] missing translation ${path.relative(REPO_ROOT, file)}, /${locale}/docs/ keeps placeholder metadata`)
    return undefined
  }

  const landing = parseAuthoredFile(file)

  if (landing.path !== '/docs') {
    console.warn(`[docs ${locale}] SKIPPING docs landing: translation declares path ${landing.path}`)
    return undefined
  }

  return landing
}

// ---------------------------------------------------------------------------
// Metadata verification: no page may ship without title, description or
// preview image, and no locale variant may ship a German description. The
// German strings are read straight from their source files, so the check
// does not depend on how the entries were assembled.
// ---------------------------------------------------------------------------

const readGermanDescriptions = () => {
  const byPath = new Map()

  byPath.set('/docs', parseAuthoredFile(path.join(CONTENT_DIR, 'docs-index.md')).description)

  for (const dirent of fs.readdirSync(CONTENT_DIR, {withFileTypes: true})) {
    if (!dirent.isDirectory()) continue
    for (const file of fs.readdirSync(path.join(CONTENT_DIR, dirent.name))) {
      if (!file.endsWith('.md')) continue
      const page = parseAuthoredFile(path.join(CONTENT_DIR, dirent.name, file))
      byPath.set(page.path, page.description)
    }
  }

  const inventory = JSON.parse(
    fs.readFileSync(path.join(CONTENT_DIR, 'photonq', 'inventory.json'), 'utf8')
  )
  for (const entry of inventory) {
    const file = photonqTranslationFile('de', entry.oldPath)
    if (!fs.existsSync(file)) continue
    const translation = JSON.parse(fs.readFileSync(file, 'utf8'))
    // The authored German landing override (content/photonq/index.md) wins
    // over the harvested German translation, so it must not be overwritten.
    if (!byPath.has(entry.newPath) && translation.description) {
      byPath.set(entry.newPath, translation.description)
    }
  }

  return byPath
}

const verifyMetadata = (pages, presentation) => {
  const germanDescriptions = readGermanDescriptions()

  // id -> the canonical page path and the locale the entry speaks.
  const origins = new Map([[DOCS_ID, {pagePath: '/docs', locale: 'de'}]])

  for (const pagePath of presentation.byPath.keys()) {
    if (pagePath === '/docs') continue
    origins.set(pageId(pagePath), {pagePath, locale: 'de'})
  }

  for (const locale of VARIANT_LOCALES) {
    origins.set(localeDocsId(locale), {pagePath: '/docs', locale})
    for (const pagePath of presentation.byPath.keys()) {
      if (pagePath === '/docs') continue
      origins.set(pageId(localePathOf(locale, pagePath)), {pagePath, locale})
    }
  }

  // The locale roots are homepage scaffolds, not docs pages: they carry the
  // localized site title/description and no docs preview.
  const homepageScaffolds = new Set(VARIANT_LOCALES.map(localeRootId))

  const withoutTitle = []
  const withoutDescription = []
  const withoutImage = []
  const withoutDate = []
  const withoutCategory = []
  const germanLeaks = []

  let checked = 0

  for (const page of pages) {
    if (page.deleted || homepageScaffolds.has(page.id)) continue

    const origin = origins.get(page.id)
    if (!origin) {
      throw new Error(`Cannot place patch entry ${page.id} in the docs tree`)
    }

    const label = `${origin.locale === 'de' ? '' : `/${origin.locale}`}${origin.pagePath}`
    const metadata = page.jaenPageMetadata || {}

    checked += 1

    if (!metadata.title) withoutTitle.push(label)
    if (!metadata.description) withoutDescription.push(label)
    if (!metadata.image) withoutImage.push(label)
    if (!metadata.blogPost?.date) withoutDate.push(label)
    if (!metadata.blogPost?.category && origin.pagePath !== '/docs') {
      withoutCategory.push(label)
    }

    if (
      origin.locale !== 'de' &&
      metadata.description &&
      metadata.description === germanDescriptions.get(origin.pagePath)
    ) {
      germanLeaks.push(label)
    }
  }

  const fail = (list, what) => {
    if (list.length === 0) return
    for (const label of list.slice(0, 10)) {
      console.error(`  ${what}: ${label}`)
    }
    throw new Error(`${list.length} page(s) ${what}`)
  }

  fail(withoutTitle, 'without a title')
  fail(withoutDescription, 'without a description')
  fail(withoutImage, 'without a preview image')
  fail(withoutDate, 'without a blogPost date')
  fail(withoutCategory, 'without a blogPost category')
  fail(germanLeaks, 'carrying the German description in a locale variant')

  return {
    checked,
    withoutDescription: withoutDescription.length,
    withoutImage: withoutImage.length,
    germanLeaks: germanLeaks.length
  }
}

// ---------------------------------------------------------------------------
// Assemble the patch.
// ---------------------------------------------------------------------------

const main = () => {
  const landing = parseAuthoredFile(path.join(CONTENT_DIR, 'docs-index.md'))
  const catalogMetadata = readLocaleCatalogMetadata()

  const images = buildImageIndex()
  const presentation = buildPresentationIndex(images)
  const docsLandings = new Map(
    VARIANT_LOCALES.map(locale => [locale, loadDocsLanding(locale)])
  )
  const categories = buildCategoryIndex(landing, docsLandings)

  const docsEntry = {
    id: DOCS_ID,
    slug: 'docs',
    // Old child refs are tombstoned (twice each, see OLD_DOCS_CHILD_IDS) so
    // the array-id merge removes them, then the new section roots are
    // appended.
    childPages: [
      ...OLD_DOCS_CHILD_IDS.flatMap(id => [
        {id, deleted: true},
        {id, deleted: true}
      ]),
      ...SECTION_ORDER.map(sectionPath => ({id: pageId(sectionPath)}))
    ],
    childPagesOrder: SECTION_ORDER.map(pageId),
    jaenPageMetadata: pageMetadata({
      presentation,
      categories,
      locale: 'de',
      pagePath: '/docs',
      title: landing.title,
      description: landing.description
    }),
    jaenFields: mdxDocumentationField(landing.mdast)
  }

  const deletions = OLD_PAGE_IDS.map(id => ({id, deleted: true}))

  const photonq = buildPhotonqPages(presentation, categories)
  const authored = buildAuthoredPages(presentation, categories)

  const localePages = []
  const variantCounts = {}

  for (const locale of VARIANT_LOCALES) {
    const photonqVariants = photonq.variantsByLocale.get(locale)
    const authoredVariants = authored.variantsByLocale.get(locale)
    const authoredSections = authored.sectionPathsByLocale.get(locale)

    // Children of /<locale>/docs/ in canonical section order. The PhotonQ
    // variant tree is always complete (missing content falls back to the
    // originals); an authored section appears once its index is translated.
    const sectionIds = SECTION_ORDER.filter(
      sectionPath => sectionPath === '/docs/photonq' || authoredSections.has(sectionPath)
    ).map(sectionPath => pageId(localePathOf(locale, sectionPath)))

    const docsLanding = docsLandings.get(locale)

    localePages.push(
      ...buildLocaleScaffolds(
        locale,
        sectionIds,
        catalogMetadata[locale],
        docsLanding,
        presentation,
        categories
      ),
      ...photonqVariants,
      ...authoredVariants
    )

    variantCounts[locale] = {
      pages: 2 + photonqVariants.length + authoredVariants.length,
      photonqFallbacks: photonq.fallbacks[locale],
      authoredSkipped: authored.skipped[locale]
    }
  }

  const pages = [
    docsEntry,
    ...deletions,
    ...photonq.canonical,
    ...authored.canonical,
    ...localePages
  ]

  const seen = new Set()
  for (const page of pages) {
    if (seen.has(page.id)) {
      throw new Error(`Duplicate page id in patch: ${page.id}`)
    }
    seen.add(page.id)
  }

  const metadataSummary = verifyMetadata(pages, presentation)

  const patch = {
    message: 'Restructure docs: netsnek sections, photonq subtree (German canonical), full locale variants, drop old quantum pages',
    data: {
      pages
    }
  }

  fs.mkdirSync(path.dirname(OUT_FILE), {recursive: true})
  fs.writeFileSync(OUT_FILE, JSON.stringify(patch, null, 2) + '\n')

  console.log(`Wrote ${OUT_FILE} (${pages.length} page entries)`)
  console.log(`  canonical: ${1 + photonq.canonical.length + authored.canonical.length} pages (de), ${deletions.length} tombstones`)
  for (const locale of VARIANT_LOCALES) {
    const counts = variantCounts[locale]
    console.log(`  ${locale}: ${counts.pages} pages (2 scaffolds), photonq fallbacks: ${counts.photonqFallbacks}, authored skipped: ${counts.authoredSkipped}`)
  }
  console.log(
    `  metadata: ${metadataSummary.checked} docs pages checked, ` +
      `${metadataSummary.withoutDescription} without description, ` +
      `${metadataSummary.withoutImage} without image, ` +
      `${metadataSummary.germanLeaks} locale variants with a German description`
  )
  console.log(
    `  preview images: ${presentation.fallbackSections.length === 0 ? 'every section has its own' : `sections on the ${ROOT_IMAGE_KEY} default: ${presentation.fallbackSections.join(', ')}`}`
  )
}

main()
