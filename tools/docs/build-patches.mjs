#!/usr/bin/env node
/**
 * Builds jaen-data/patches/docs-restructure.json from tools/docs/content.
 *
 * The patch restructures the /docs tree:
 *  - deletes every old quantum page that lived directly under /docs
 *  - replaces the /docs landing content with a German section overview
 *  - re-roots the harvested PhotonQ pages under /docs/photonq (English,
 *    mdast untouched)
 *  - adds the authored German section pages (emailwerk, qtamp, linux,
 *    security, linuxtage, interns, ledart, baeckerherz)
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
const OUT_FILE = path.join(REPO_ROOT, 'jaen-data', 'patches', 'docs-restructure.json')

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

  return {
    ...frontmatter,
    mdast: parseMarkdown(source.slice(match[0].length))
  }
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

// ---------------------------------------------------------------------------
// PhotonQ harvest: re-root every page per inventory.json, keep mdast and
// metadata untouched, remap the internal parent/child linkage onto the new
// deterministic ids.
// ---------------------------------------------------------------------------

const buildPhotonqPages = () => {
  const photonqDir = path.join(CONTENT_DIR, 'photonq')
  const inventory = JSON.parse(fs.readFileSync(path.join(photonqDir, 'inventory.json'), 'utf8'))

  const rawByOldPath = new Map()
  const newIdByOldId = new Map()
  const entryByNewPath = new Map()

  for (const entry of inventory) {
    const rawName = `${entry.oldPath.replace(/^\//, '').replace(/\//g, '__')}.json`
    const raw = JSON.parse(fs.readFileSync(path.join(photonqDir, 'raw', rawName), 'utf8'))
    rawByOldPath.set(entry.oldPath, raw)
    newIdByOldId.set(raw.id, pageId(entry.newPath))
    entryByNewPath.set(entry.newPath, entry)
  }

  // The harvested childPagesOrder can reference pages that were deleted
  // upstream (stale order entries), so unknown ids are dropped, not fatal.
  const mapIds = oldIds =>
    oldIds
      .map(oldId => {
        const mapped = newIdByOldId.get(oldId)
        if (!mapped) {
          console.warn(`Dropping stale PhotonQ ref ${oldId}`)
        }
        return mapped
      })
      .filter(Boolean)

  return inventory.map(entry => {
    const raw = rawByOldPath.get(entry.oldPath)
    const isRoot = entry.newPath === '/docs/photonq'
    const parentPath = parentPathOf(entry.newPath)

    const jaenPageMetadata = isRoot
      ? {...raw.jaenPageMetadata, title: 'PhotonQ'}
      : raw.jaenPageMetadata

    return {
      id: pageId(entry.newPath),
      slug: slugOf(entry.newPath),
      template: raw.template || DOC_TEMPLATE,
      parentPage: {
        id: isRoot ? DOCS_ID : pageId(parentPath)
      },
      childPages: mapIds((raw.childPages || []).map(child => child.id)).map(id => ({id})),
      childPagesOrder: mapIds(raw.childPagesOrder || []),
      excludedFromIndex: false,
      jaenPageMetadata,
      jaenFields: raw.jaenFields
    }
  })
}

// ---------------------------------------------------------------------------
// Authored German pages.
// ---------------------------------------------------------------------------

const buildAuthoredPages = () => {
  const files = []

  for (const dirent of fs.readdirSync(CONTENT_DIR, {withFileTypes: true})) {
    if (!dirent.isDirectory() || dirent.name === 'photonq') continue
    for (const file of fs.readdirSync(path.join(CONTENT_DIR, dirent.name))) {
      if (file.endsWith('.md')) {
        files.push(path.join(CONTENT_DIR, dirent.name, file))
      }
    }
  }

  const authored = files.map(parseAuthoredFile)
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

  return authored.map(page => {
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
      jaenPageMetadata: {
        title: page.title,
        description: page.description
      },
      jaenFields: {
        'IMA:MdxField': {
          documentation: {
            value: page.mdast,
            props: {}
          }
        }
      }
    }
  })
}

// ---------------------------------------------------------------------------
// Assemble the patch.
// ---------------------------------------------------------------------------

const main = () => {
  const landing = parseAuthoredFile(path.join(CONTENT_DIR, 'docs-index.md'))

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
    jaenPageMetadata: {
      title: landing.title,
      description: landing.description
    },
    jaenFields: {
      'IMA:MdxField': {
        documentation: {
          value: landing.mdast,
          props: {}
        }
      }
    }
  }

  const deletions = OLD_PAGE_IDS.map(id => ({id, deleted: true}))

  const pages = [docsEntry, ...deletions, ...buildPhotonqPages(), ...buildAuthoredPages()]

  const seen = new Set()
  for (const page of pages) {
    if (seen.has(page.id)) {
      throw new Error(`Duplicate page id in patch: ${page.id}`)
    }
    seen.add(page.id)
  }

  const patch = {
    message: 'Restructure docs: netsnek sections, photonq subtree, drop old quantum pages',
    data: {
      pages
    }
  }

  fs.mkdirSync(path.dirname(OUT_FILE), {recursive: true})
  fs.writeFileSync(OUT_FILE, JSON.stringify(patch, null, 2) + '\n')

  console.log(`Wrote ${OUT_FILE} (${pages.length} page entries)`)
}

main()
