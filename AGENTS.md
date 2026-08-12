# Working on netsnek.com

Notes for agents and humans working in this repository. Written from work
actually carried out, not from theory. Everything below was verified against a
real `yarn build` on the `feat/chakra-v3` branch.

## Images belong in the CMS media library, never behind a `defaultValue`

`Field.Image` has two render branches
(`../jaen/packages/jaen/src/fields/ImageField/ImageField.tsx`):

- The field **has** a jaen media id, so the component renders a `GatsbyImage`.
  That gives a `<picture>` with AVIF and WebP sources, a four step `srcset`, a
  base64 blur placeholder, `loading="lazy"`, `decoding="async"` and an
  aspect ratio spacer `<div style="padding-top:...%">` that reserves the box
  before the picture arrives.
- The field is **empty**, so the component falls back to a bare Chakra
  `<Image src={defaultValue}>`. No `srcset`, no `sizes`, no dimensions, no
  lazy loading, no modern format. The browser downloads the full original file
  and the box has no reserved height until it does.

A file under `static/` is copied verbatim by Gatsby and can never be processed,
so the fallback branch always ships the original bytes. Measured on the three
images moved in this change, the original files were 141 kB, 297 kB and 259 kB.
After moving them into the media library the 1366w AVIF variants are 27 kB,
67 kB and 16 kB. Same pictures, between 77 and 94 percent less payload, plus a
reserved box instead of a late reflow.

So: a `defaultValue` is a placeholder for a field an editor has not filled yet.
It is not a delivery mechanism. Anything that ships to users belongs in the
media library.

## How content is published for this site

There is no database. All CMS content is a **list of patches** in
`jaen-data/patches.txt`, one per line, applied top to bottom.

- A line starting with `http://` or `https://` is a remote patch, fetched and
  cached at build time. Those are the migration files a human editor produces
  by pressing Publish in the CMS.
- Any other line is a path **relative to `jaen-data/`** pointing at a local
  patch file in the repository. `patches/docs-restructure.json` and
  `patches/homepage-images.json` are the two local ones today.

Every patch has the shape `{message?, createdAt?, data}` where `data` holds
`pages`, `site` and `widgets`. They are combined with `deepmerge`, and arrays of
objects are merged **by `id`**. That is the important part: a patch entry for a
page only has to carry the page `id` and the fields it changes. Everything else
survives from the earlier patches. Order matters, so a patch that modifies a
page must sit **after** the patch that created it.

The reader is
`../jaen/packages/gatsby-source-jaen/src/source-nodes/jaen-data.ts`. It rejects
a local path resolving outside `jaen-data/` and calls `panicOnBuild` on invalid
JSON or a missing `data` object.

### What the CMS Publish button does, and why an agent should not press it

`publishDraft` in `../jaen/packages/jaen/src/contexts/cms-management.tsx`
uploads the draft as a migration JSON to the storage gateway and then calls the
only mutation the jaen pylon exposes:

```
mutation { publish(migrationURL: String!, config: PublishConfigInput!) }
```

Endpoint `https://services.netsnek.com/jaen/graphql`, configured as `pylonUrl`
in `gatsby-config.ts`. That mutation writes to the GitHub repository
`netsnek/netsnek.com`, which is a commit and therefore a deploy. An agent asked
not to commit or deploy must not call it. Write a local patch file instead. The
resulting data is identical, and the change stays reviewable in the diff.

The media upload itself is a different endpoint and needs **no** authentication
at all, see below. A Zitadel token is only needed for `publish`.

## Procedure: move a static image onto a jaen `Field.Image`

This is exactly what was done for the homepage service and associate images.

### 1. Find the field

Grep for the static path in `src/`. You are looking for a `Field.Image` (or the
`JaenImage` wrapper in `src/components/JaenImage.tsx`) whose `defaultValue`
points at the file. Note the `name` prop, that is the field key.

Then find every page the component renders on. `src/pages/index.tsx` renders
`Services` and `Associates`, so those fields live on the home page and nowhere
else.

### 2. Work out the jaen page ids

Localized pages each get **their own** `jaenPageId`, derived from the localized
path (`../jaen/packages/gatsby-source-jaen/src/on-create-page/jaen-page.ts`).
The five home pages are `JaenPage /`, `JaenPage /en/`, `JaenPage /it/`,
`JaenPage /ja/` and `JaenPage /sl/`. A field set on `JaenPage /` alone leaves
the other four locales on the static fallback.

The quickest way to read the current state of a page is the previous build:

```
python3 -c "import json;d=json.load(open('public/page-data/en/page-data.json'));\
jp=d['result']['data']['jaenPage'];print(jp['id'], jp['jaenFields'])"
```

### 3. Upload the file to the storage gateway

Media lives on the open storage gateway, `STORAGE_URL` in
`../jaen/packages/jaen/src/utils/open-storage-gateway.ts`. Plain multipart POST,
no auth:

```
curl -s -X POST https://osg.snek.at/storage -F "file=@static/images/services/beratung.jpg"
```

The response carries `file_id`, `file_unique_id`, `file_name`, `mime_type` and a
`thumb` object. The media url is `https://osg.snek.at/storage/<file_id>` and the
preview url is `https://osg.snek.at/storage/<thumb.file_id>`.

Download the url again and compare checksums before using it. The gateway is
Telegram backed, and a file that came back re-encoded would silently degrade the
image. All three uploads in this change round-tripped byte identical.

### 4. Write the media nodes

Media nodes live on the page `JaenPage /cms/media/` under
`jaenFields["IMA:MEDIA_NODES"].media_nodes.value`, keyed by media id. One entry
looks like this:

```json
{
  "id": "<uuid v4, same as the key>",
  "fileUniqueId": "<file_unique_id from the upload>",
  "createdAt": "2026-08-12T19:48:14.871Z",
  "modifiedAt": "2026-08-12T19:48:14.871Z",
  "description": "beratung.jpg",
  "url": "https://osg.snek.at/storage/<file_id>",
  "preview": {"url": "https://osg.snek.at/storage/<thumb.file_id>"},
  "width": 1600,
  "height": 1015,
  "revisions": [],
  "jaenPageId": "JaenPage /"
}
```

`width` and `height` are the real pixel dimensions of the uploaded file. The CMS
reads them from `naturalWidth` after upload, so a wrong value would distort the
live editing preview even though the static build takes its dimensions from
sharp. `description` is what the editor sees as the label in the media library,
so keep the original filename.

**`jaenPageId` is a single value and it scopes the node.** The `mediaNodes`
field extension on `JaenPage`
(`../jaen/packages/gatsby-source-jaen/src/create-schema-customization/jaen-page.ts`)
resolves `MediaNode` filtered by `jaenPageId == page.id`, and the static render
path `usePageImage` only looks at `jaenPage.mediaNodes` of the page it is on.
An image used on five localized pages therefore needs **five media nodes** with
five distinct uuids, all pointing at the same storage url. Gatsby deduplicates
the download and the sharp work by url, so this costs nothing at build time.
The three images in this change became fifteen media nodes and nine sharp jobs.

### 5. Set the fields

On each page, under `jaenFields["IMA:ImageField"]`:

```json
{"ServicesCardConsultingImage": {"value": "<media id for THIS page>", "props": {}}}
```

The value is the media id, nothing else. A media id that does not exist renders
nothing at all, so never write one you have not created in the same patch.

### 6. Wire the patch in and rebuild

Append the relative path to `jaen-data/patches.txt` as the last line, then
`yarn build`. Check the exit code explicitly, the tail of a Gatsby log looks
cheerful even when it failed.

### 7. Verify in the generated HTML

Not in the log, in `public/`. For each field:

```
python3 - <<'EOF'
import re
s=open('public/index.html').read()
i=s.find('id="ServicesCardConsultingImage"')
print(s[i:i+800])
EOF
```

You want to see `data-gatsby-image-wrapper`, a `<picture>` with
`type="image/avif"`, a `data-srcset` with several widths and
`loading="lazy"`. Then confirm the old path is gone from every HTML file:

```
find public -name '*.html' -exec grep -l -- "/images/services/beratung.jpg" {} + | wc -l
```

That must be zero. The path still appears in the JS bundles, which is correct,
that is the `defaultValue` literal compiled into the component.

## Pitfalls hit while doing this

**Not every static image sits behind a `Field.Image`.** The docs preview images
on the homepage card grid (`/images/docs/photonq.jpg` and friends) come from
`jaenPageMetadata.image`, a plain string on the page metadata, rendered by
`src/components/sections/Blog.tsx` as `<Image src={section.image}>`. That is not
a jaen field, it has no media id, and putting the file in the media library does
nothing for it. Fixing those needs a code change in `Blog.tsx`, not a CMS
change. Check what the markup actually is before assuming the CMS can fix it.

**Localized pages are separate CMS pages.** `JaenPage /en/` had no jaen fields
at all before this change, the whole English homepage came from `react-intl`
defaults. Setting a field on `JaenPage /` fixes exactly one of five homepages.

**`sizes` defaults to `100vw`.** The page query fragment
(`../jaen/packages/gatsby-source-jaen/src/fragments/jaen-page.ts`) requests
`gatsbyImageData(layout: FULL_WIDTH)`, which emits `sizes="100vw"` and
breakpoints 750, 1080, 1366 and 1920 capped at the source width. A picture that
occupies half the grid still declares itself full width, so the browser fetches
a candidate wider than the box. The format change alone saves most of the bytes,
but the remaining waste is real. `Field.Image` takes a `sizes` prop, so passing
something like `sizes="(min-width: 62em) 50vw, 100vw"` on the two service cards
would close the rest of the gap. That is a component change and was left out of
the CMS change on purpose.

**`alt` is not the media description.** `ImageComponent` writes
`alt={image.description}` and then spreads `imageProps` over it, so the `alt`
prop on the field wins. The localized alt texts survive, verified as
`alt="Beratung"` on `/` and `alt="Consulting"` on `/en/`.

**Do not trust the pylon for reads.** It exposes exactly one query, `version`,
which returns `NOT_IMPLEMENTED_YET`, and one mutation, `publish`. Neither
introspection nor `version` requires a token. There is no way to read the
current CMS state from it. Read the state from the last build's `page-data`
instead.

**The static files stay.** They are still the `defaultValue` fallback, so
deleting them would break the render if an editor ever clears the field.
