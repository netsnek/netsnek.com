#!/usr/bin/env node
/**
 * Replays the full jaen patch chain (jaen-data/patches.txt) with the exact
 * merge semantics of gatsby-source-jaen (deepmerge + deepmergeArrayIdMerge +
 * the IMA:MdxField custom merge + deepRemoveDeleted) and asserts the state
 * the docs patch must produce:
 *
 *  - /docs childPages are exactly the ten section roots, in order
 *  - every canonical docs page has its locale variants (for locales whose
 *    translation inputs exist), each with its OWN page id
 *  - every variant's origin path (parentPage/slug chain, the lookup
 *    create-pages/jaen-pages.ts uses to fold variants into the localized
 *    fan-out) resolves to /<locale><canonical path>/
 *  - parent chains resolve up to the root, no dangling child refs
 *  - the canonical photonq tree is German, /en/ carries the English
 *    originals
 *  - the locale roots carry the real localized site titles
 *  - every live docs page carries a complete jaenPageMetadata: title,
 *    description, preview image and a blogPost date/category, and no locale
 *    variant carries the German description of its canonical page
 *
 * Remote patches are cached under node_modules/.cache/docs-verify (the
 * snapshots are immutable).
 */

import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

import deepmerge from 'deepmerge'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(HERE, '..', '..')
const JAEN_DATA_DIR = path.join(REPO_ROOT, 'jaen-data')
const CACHE_DIR = path.join(REPO_ROOT, 'node_modules', '.cache', 'docs-verify')
const PATCH_FILE = path.join(JAEN_DATA_DIR, 'patches', 'docs-restructure.json')
const CONTENT_DIR = path.join(HERE, 'content')
const I18N_DIR = path.join(HERE, 'i18n')
const I18N_PHOTONQ_DIR = path.join(HERE, 'i18n-photonq')

const VARIANT_LOCALES = ['en', 'sl', 'it', 'ja']

// ---------------------------------------------------------------------------
// gatsby-source-jaen merge logic, ported verbatim.
// ---------------------------------------------------------------------------

// packages/gatsby-source-jaen/src/utils/deepmerge.ts
const deepmergeArrayIdMerge = (target, source, options) => {
  if (target == null) {
    return source ? source.slice() : []
  }

  if (source == null) {
    return target.slice()
  }

  if (
    target.every(v => typeof v !== 'object') &&
    source.every(v => typeof v !== 'object')
  ) {
    return source.slice()
  }

  const groups = ['id', 'fieldName']

  for (const group of groups) {
    if (target.every(v => v?.[group]) && source.every(v => v?.[group])) {
      const mergeArrays = (arr1 = [], arr2 = [], key = 'id') => {
        const elements = []

        const arr2Copy = arr2.slice()

        for (const element of arr1) {
          const el = arr2Copy.find(v => v && v[key] === element[key])

          if (el) {
            elements.push(
              deepmerge(element, el, {
                ...(options || {}),
                arrayMerge: deepmergeArrayIdMerge
              })
            )
            arr2Copy.splice(arr2Copy.indexOf(el), 1)
          } else {
            elements.push(element)
          }
        }

        elements.push(...arr2Copy)

        return elements
      }

      return mergeArrays(target || [], source || [], group)
    }
  }

  const destination = target.slice()

  source.forEach((item, index) => {
    if (typeof destination[index] === 'undefined') {
      destination[index] = options.cloneUnlessOtherwiseSpecified(item, options)
    } else if (options.isMergeableObject(item)) {
      destination[index] = deepmerge(target[index], item, {
        ...(options || {}),
        arrayMerge: deepmergeArrayIdMerge
      })
    } else if (!target.includes(item)) {
      destination.push(item)
    }
  })

  return destination
}

// packages/gatsby-source-jaen/src/source-nodes/jaen-data.ts
const applyPatch = (jaenData, patchData) =>
  deepmerge(jaenData, patchData, {
    arrayMerge: deepmergeArrayIdMerge,
    customMerge: key => {
      if (key === 'IMA:MdxField') {
        return (target, source) => {
          return {...target, ...source}
        }
      }
    }
  })

const deepRemoveDeleted = obj => {
  if (typeof obj === 'object' && obj !== null) {
    if (obj.deleted === true) {
      return undefined
    }

    for (const key in obj) {
      obj[key] = deepRemoveDeleted(obj[key])
      if (obj[key] === undefined) {
        delete obj[key]
      }
    }
  }

  if (Array.isArray(obj)) {
    obj = obj.filter(item => item !== null)
  }

  return obj
}

// packages/gatsby-source-jaen/src/utils/get-last-part-of-id.ts
const getLastPartOfId = input => {
  input = input.replace('JaenPage ', '')
  input = input.replace(/^\/+|\/+$/g, '')

  const parts = input.split('/').filter(part => part !== '')

  if (parts.length === 0) {
    return 'root'
  }

  return parts[parts.length - 1]
}

// packages/gatsby-source-jaen/src/utils/path.ts, over patch-shaped pages
// (parentPage is {id}); the slug fallback mirrors source-nodes/jaen-pages.ts.
const generatePageOriginPath = (nodesById, node, pathSoFar) => {
  const slug = node.slug || getLastPartOfId(node.id)
  pathSoFar = pathSoFar ?? (node.id === 'JaenPage /' ? '/' : `/${slug}`)

  const parentId = node.parentPage?.id
  const parent = parentId ? nodesById.get(parentId) : undefined

  if (parent) {
    let next = pathSoFar
    const parentSlug = parent.slug || getLastPartOfId(parent.id)

    if (parentSlug && parentSlug !== 'root') {
      next = `/${parentSlug}${pathSoFar}`
    }

    return generatePageOriginPath(nodesById, parent, next)
  }

  return pathSoFar.endsWith('/') ? pathSoFar : `${pathSoFar}/`
}

// ---------------------------------------------------------------------------
// Patch chain replay.
// ---------------------------------------------------------------------------

const fetchPatch = async link => {
  if (link.startsWith('http://') || link.startsWith('https://')) {
    fs.mkdirSync(CACHE_DIR, {recursive: true})
    const cacheFile = path.join(
      CACHE_DIR,
      crypto.createHash('sha256').update(link).digest('hex') + '.json'
    )

    if (fs.existsSync(cacheFile)) {
      return JSON.parse(fs.readFileSync(cacheFile, 'utf8'))
    }

    const response = await fetch(link)
    if (!response.ok) {
      throw new Error(`Fetching ${link} failed: ${response.status}`)
    }
    const body = await response.text()
    const parsed = JSON.parse(body)
    fs.writeFileSync(cacheFile, body)
    return parsed
  }

  return JSON.parse(fs.readFileSync(path.resolve(JAEN_DATA_DIR, link), 'utf8'))
}

const replayChain = async () => {
  const lines = fs
    .readFileSync(path.join(JAEN_DATA_DIR, 'patches.txt'), 'utf8')
    .split('\n')
    .filter(line => line !== '')

  let jaenData = {}

  for (const link of lines) {
    const patch = await fetchPatch(link)
    jaenData = applyPatch(jaenData, patch.data)
  }

  return deepRemoveDeleted(jaenData)
}

// ---------------------------------------------------------------------------
// Assertions.
// ---------------------------------------------------------------------------

let failures = 0

const check = (condition, message) => {
  if (condition) return
  failures += 1
  console.error(`FAIL ${message}`)
}

const main = async () => {
  const merged = await replayChain()
  const pages = merged.pages || []
  const pagesById = new Map(pages.map(page => [page.id, page]))

  const ourPatch = JSON.parse(fs.readFileSync(PATCH_FILE, 'utf8'))
  const ourPages = ourPatch.data.pages.filter(page => !page.deleted)
  const ourIds = new Set(ourPages.map(page => page.id))

  console.log(`Replayed chain: ${pages.length} merged pages, ${ourPages.length} live entries in docs patch`)

  // Origin path of every merged page — the exact lookup table create-pages
  // builds for the localized fold-in.
  const originPaths = new Map()
  const idsByOriginPath = new Map()
  for (const page of pages) {
    const origin = generatePageOriginPath(pagesById, page)
    originPaths.set(page.id, origin)
    idsByOriginPath.set(origin, page.id)
  }

  // ---- our entries all survived the merge ---------------------------------
  for (const page of ourPages) {
    check(pagesById.has(page.id), `patch entry ${page.id} missing after replay`)
  }

  // ---- /docs children are exactly the ten sections, in order -------------
  const sectionPaths = [
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
  const docs = pagesById.get('JaenPage /docs/')
  check(Boolean(docs), '/docs page missing')
  const docsChildIds = (docs?.childPages || []).map(child => child.id)
  const sectionIds = sectionPaths.map(sectionPath => idsByOriginPath.get(`${sectionPath}/`))
  check(
    JSON.stringify(docsChildIds) === JSON.stringify(sectionIds),
    `/docs childPages mismatch: ${JSON.stringify(docsChildIds)}`
  )

  // ---- parent chains + no dangling refs in our subtree --------------------
  for (const page of ourPages) {
    const mergedPage = pagesById.get(page.id)
    if (!mergedPage) continue

    // Walk to the root. A path-keyed id (`JaenPage /...`) that is missing
    // from the patch data is still fine — the stateful fan-out assures the
    // node at runtime (on-create-page/jaen-page.ts) — but a missing UUID
    // page would dangle forever.
    let current = mergedPage
    const seen = new Set()
    while (current) {
      check(!seen.has(current.id), `parent cycle at ${current.id}`)
      if (seen.has(current.id)) break
      seen.add(current.id)

      const parentId = current.parentPage?.id
      if (!parentId || current.id === 'JaenPage /') break

      const parent = pagesById.get(parentId)
      if (!parent) {
        check(
          parentId.startsWith('JaenPage /'),
          `parent ${parentId} of ${current.id} (${originPaths.get(current.id)}) does not resolve`
        )
        break
      }
      current = parent
    }

    for (const childId of (mergedPage.childPages || []).map(child => child.id)) {
      check(pagesById.has(childId), `dangling childPages ref ${childId} on ${originPaths.get(page.id)}`)
    }
    for (const childId of mergedPage.childPagesOrder || []) {
      check(pagesById.has(childId), `dangling childPagesOrder ref ${childId} on ${originPaths.get(page.id)}`)
    }
  }

  // ---- locale roots -------------------------------------------------------
  for (const locale of VARIANT_LOCALES) {
    const root = pagesById.get(`JaenPage /${locale}/`)
    check(Boolean(root), `locale root JaenPage /${locale}/ missing`)
    if (!root) continue

    const childIds = (root.childPages || []).map(child => child.id)
    check(
      childIds.includes(`JaenPage /${locale}/docs/`),
      `/${locale}/ childPages misses /${locale}/docs/`
    )
    check(!root.template, `locale root /${locale}/ must not carry a template`)
    check(
      typeof root.jaenPageMetadata?.title === 'string' &&
        root.jaenPageMetadata.title.includes('Netsnek'),
      `/${locale}/ title is not the localized site title: ${JSON.stringify(root.jaenPageMetadata?.title)}`
    )

    const docsRoot = pagesById.get(`JaenPage /${locale}/docs/`)
    check(Boolean(docsRoot), `JaenPage /${locale}/docs/ missing`)
    check(!docsRoot?.template, `/${locale}/docs/ must not carry a template`)
  }

  // ---- every canonical docs page has its variants -------------------------
  // Canonical docs pages = the templated entries of our patch whose origin
  // path has no locale prefix. Expected variant locales are derived from the
  // translation inputs on disk (photonq variants always exist — a missing
  // translation falls back to the English original).
  const localePrefix = new RegExp(`^/(${VARIANT_LOCALES.join('|')})/`)

  const relFileOfAuthored = new Map()
  for (const dirent of fs.readdirSync(CONTENT_DIR, {withFileTypes: true})) {
    if (!dirent.isDirectory() || dirent.name === 'photonq') continue
    for (const file of fs.readdirSync(path.join(CONTENT_DIR, dirent.name))) {
      if (!file.endsWith('.md')) continue
      const source = fs.readFileSync(path.join(CONTENT_DIR, dirent.name, file), 'utf8')
      const pagePath = source.match(/^path:\s*(.+)$/m)?.[1].trim()
      if (pagePath) relFileOfAuthored.set(`${pagePath}/`, `${dirent.name}/${file}`)
    }
  }

  const expectedLocalesOf = originPath => {
    if (originPath.startsWith('/docs/photonq')) return VARIANT_LOCALES

    const relFile = relFileOfAuthored.get(originPath)
    if (!relFile) return [] // /docs landing itself

    return VARIANT_LOCALES.filter(locale => {
      // Same rule as the builder: the variant needs its own translation and
      // every ancestor variant up to the section root.
      let rel = relFile
      let pagePath = originPath.replace(/\/$/, '')
      while (pagePath !== '/docs') {
        if (!fs.existsSync(path.join(I18N_DIR, locale, rel))) return false
        pagePath = pagePath.split('/').slice(0, -1).join('/')
        rel = relFileOfAuthored.get(`${pagePath}/`)
        if (pagePath === '/docs') break
        if (!rel) return false
      }
      return true
    })
  }

  const variantCounts = Object.fromEntries(VARIANT_LOCALES.map(locale => [locale, 0]))
  let canonicalCount = 0

  for (const page of ourPages) {
    if (!page.template) continue
    const originPath = originPaths.get(page.id)
    if (!originPath || localePrefix.test(originPath)) continue

    canonicalCount += 1

    for (const locale of expectedLocalesOf(originPath)) {
      const variantPath = `/${locale}${originPath}`
      const variantId = idsByOriginPath.get(variantPath)

      check(Boolean(variantId), `variant ${variantPath} missing (canonical ${originPath})`)
      if (!variantId) continue

      variantCounts[locale] += 1
      check(variantId !== page.id, `variant ${variantPath} shares the canonical page id`)

      const variant = pagesById.get(variantId)
      check(
        variant?.template === page.template,
        `variant ${variantPath} template ${variant?.template} != ${page.template}`
      )
    }
  }

  // ---- photonq language pivot ---------------------------------------------
  const deOpenqasm = JSON.parse(
    fs.readFileSync(path.join(I18N_PHOTONQ_DIR, 'de', '__docs__openqasm.json'), 'utf8')
  )
  const rawOpenqasm = JSON.parse(
    fs.readFileSync(path.join(CONTENT_DIR, 'photonq', 'raw', 'docs__openqasm.json'), 'utf8')
  )

  const canonicalOpenqasm = pagesById.get(idsByOriginPath.get('/docs/photonq/openqasm/'))
  check(Boolean(canonicalOpenqasm), '/docs/photonq/openqasm missing')
  check(
    canonicalOpenqasm?.jaenPageMetadata?.title === deOpenqasm.title,
    `canonical photonq title is not German: ${JSON.stringify(canonicalOpenqasm?.jaenPageMetadata?.title)}`
  )
  check(
    canonicalOpenqasm?.jaenPageMetadata?.title === 'OpenQASM kennenlernen',
    'canonical photonq spot-check phrase "OpenQASM kennenlernen" missing'
  )
  check(
    JSON.stringify(canonicalOpenqasm?.jaenFields) === JSON.stringify(deOpenqasm.jaenFields),
    'canonical /docs/photonq/openqasm jaenFields differ from the German translation'
  )

  const enOpenqasm = pagesById.get(idsByOriginPath.get('/en/docs/photonq/openqasm/'))
  check(Boolean(enOpenqasm), '/en/docs/photonq/openqasm missing')
  check(
    enOpenqasm?.jaenPageMetadata?.title === rawOpenqasm.jaenPageMetadata.title,
    `/en/docs/photonq/openqasm title is not the English original: ${JSON.stringify(enOpenqasm?.jaenPageMetadata?.title)}`
  )
  check(
    JSON.stringify(enOpenqasm?.jaenFields) === JSON.stringify(rawOpenqasm.jaenFields),
    '/en/docs/photonq/openqasm jaenFields differ from the English original'
  )

  // ---- metadata: title, description, preview image, blogPost --------------
  // Every live docs entry must be renderable and sortable: jaen stores the
  // preview under jaenPageMetadata.image and the sort key/label under
  // jaenPageMetadata.blogPost.date/.category (JaenPageMetadata in
  // gatsby-source-jaen/src/create-schema-customization/jaen-page.ts).
  //
  // The German descriptions are read from their source files, so a variant
  // that silently inherited the German text is caught no matter how the
  // builder assembled it.
  const germanDescriptions = new Map()

  const readFrontmatter = file => {
    const source = fs.readFileSync(file, 'utf8')
    const match = source.match(/^---\n([\s\S]*?)\n---\n/)
    if (!match) return {}
    const frontmatter = {}
    for (const line of match[1].split('\n')) {
      const sep = line.indexOf(':')
      if (sep === -1) continue
      frontmatter[line.slice(0, sep).trim()] = line.slice(sep + 1).trim()
    }
    return frontmatter
  }

  const landingFrontmatter = readFrontmatter(path.join(CONTENT_DIR, 'docs-index.md'))
  if (landingFrontmatter.description) {
    germanDescriptions.set('/docs/', landingFrontmatter.description)
  }

  for (const dirent of fs.readdirSync(CONTENT_DIR, {withFileTypes: true})) {
    if (!dirent.isDirectory()) continue
    for (const file of fs.readdirSync(path.join(CONTENT_DIR, dirent.name))) {
      if (!file.endsWith('.md')) continue
      const frontmatter = readFrontmatter(path.join(CONTENT_DIR, dirent.name, file))
      if (frontmatter.path && frontmatter.description) {
        germanDescriptions.set(`${frontmatter.path}/`, frontmatter.description)
      }
    }
  }

  const photonqInventory = JSON.parse(
    fs.readFileSync(path.join(CONTENT_DIR, 'photonq', 'inventory.json'), 'utf8')
  )
  for (const entry of photonqInventory) {
    // The authored German landing (content/photonq/index.md) outranks the
    // harvested German translation, so it is never overwritten here.
    if (germanDescriptions.has(`${entry.newPath}/`)) continue
    const file = path.join(
      I18N_PHOTONQ_DIR,
      'de',
      `${entry.oldPath.replace(/\//g, '__')}.json`
    )
    if (!fs.existsSync(file)) continue
    const translation = JSON.parse(fs.readFileSync(file, 'utf8'))
    if (translation.description) {
      germanDescriptions.set(`${entry.newPath}/`, translation.description)
    }
  }

  // The locale roots are the localized homepage scaffolds, not docs pages:
  // they carry the localized site title/description and no docs preview.
  const homepageScaffolds = new Set(VARIANT_LOCALES.map(locale => `JaenPage /${locale}/`))

  let withoutDescription = 0
  let withoutImage = 0
  let germanLeaks = 0
  let metadataChecked = 0

  for (const page of ourPages) {
    if (homepageScaffolds.has(page.id)) continue

    const mergedPage = pagesById.get(page.id)
    if (!mergedPage) continue

    const originPath = originPaths.get(page.id) || page.id
    const metadata = mergedPage.jaenPageMetadata || {}

    metadataChecked += 1

    const localeMatch = originPath.match(localePrefix)
    // Origin path with the locale prefix stripped: the canonical page a
    // variant translates ('/en/docs/qtamp/' -> '/docs/qtamp/').
    const canonicalPath = localeMatch
      ? originPath.slice(localeMatch[0].length - 1)
      : originPath

    check(Boolean(metadata.title), `${originPath} has no jaenPageMetadata.title`)
    if (!metadata.description) withoutDescription += 1
    if (!metadata.image) withoutImage += 1
    check(Boolean(metadata.description), `${originPath} has no jaenPageMetadata.description`)
    check(Boolean(metadata.image), `${originPath} has no jaenPageMetadata.image`)
    check(
      Boolean(metadata.blogPost?.date),
      `${originPath} has no jaenPageMetadata.blogPost.date`
    )
    // The docs landing belongs to no section, so it carries no category.
    check(
      canonicalPath === '/docs/' || Boolean(metadata.blogPost?.category),
      `${originPath} has no jaenPageMetadata.blogPost.category`
    )

    if (!localeMatch) continue

    const germanDescription = germanDescriptions.get(canonicalPath)

    if (germanDescription && metadata.description === germanDescription) {
      germanLeaks += 1
      check(false, `${originPath} carries the German description of ${canonicalPath}`)
    }
  }

  // ---- summary ------------------------------------------------------------
  console.log(`Canonical templated docs pages: ${canonicalCount}`)
  console.log(
    `Metadata: ${metadataChecked} live pages checked, ${withoutDescription} without description, ${withoutImage} without image, ${germanLeaks} variants with a German description`
  )
  for (const locale of VARIANT_LOCALES) {
    const total = ourPages.filter(page => {
      const originPath = originPaths.get(page.id)
      return originPath?.startsWith(`/${locale}/`)
    }).length
    console.log(`  ${locale}: ${total} variant entries (${variantCounts[locale]} matched to a canonical page)`)
  }

  if (failures > 0) {
    console.error(`${failures} check(s) FAILED`)
    process.exit(1)
  }

  console.log('All checks passed.')
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
