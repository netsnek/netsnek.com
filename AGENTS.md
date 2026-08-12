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

## Page metadata images are optimised too, since 2026-08-12

The pitfall below used to end with "fixing those needs a code change". That
change has been made, in jaen. `jaenPageMetadata` now carries the picture in
two shapes at once and one component renders whichever it finds.

### The shape

```json
"jaenPageMetadata": {
  "image": "https://netsnek.com/images/docs/photonq.jpg",
  "imageId": "d822d6ed-cbf1-5182-a041-089aad4c366a"
}
```

- `image` is the address, and stays a `String` forever. Every page published
  before this change carries only this, the ~80 patches in `patches.txt`
  cannot be rewritten, and it is what `jaen`'s `Head` puts into `og:image`,
  `twitter:image`, `<meta name="image">` and the schema.org JSON. Do not
  replace it, do not turn it into an object.
- `imageId` is a media library id. The build resolves it to
  `jaenPageMetadata.imageFile.childImageSharp.gatsbyImageData` through the
  `jaenMetadataImage` field extension in
  `../jaen/packages/gatsby-source-jaen/src/create-schema-customization/jaen-page.ts`.
- A page with **no** `imageId` whose `image` happens to be a media library url
  is resolved by url instead. That is not politeness, it is recovery: picking
  an image in Page Settings used to store nothing but the url. Measured here,
  20 built pages got the optimised path from that alone, with no data change.

### Rendering it

Never branch on the shape yourself. `jaen` exports two things:

- `<PageMetadataImage metadata={...} alt={...} sizes={...} />` renders a
  `GatsbyImage` when the picture came from the media library and the same
  plain `<Image>` as before when it did not.
- `resolvePageMetadataImage(metadata)` is the pure selector behind it,
  returning `{gatsbyImageData?, src?}`. Use it when you need a plain url, or
  merely to ask "is there a picture at all" — `src/hooks/use-docs-pages.tsx`
  uses it for exactly that, so a section without any image still falls back to
  the lettered plate.

`src/components/sections/Blog.tsx` is the worked example.

**Pass `sizes`.** The shared fragment asks for `layout: CONSTRAINED, width:
800`, which declares `(min-width: 800px) 800px, 100vw`. The homepage cards are
about 320 px wide, so `Blog.tsx` passes
`sizes="(min-width: 1024px) 320px, (min-width: 480px) 50vw, 100vw"` and the
browser picks the 400w candidate instead of the 800w one. Measured on
photonq.jpg: 400w AVIF is 20 831 B against 47 806 B for 800w.

### Adding a metadata image to a page

Steps 3 and 4 of the `Field.Image` procedure above are unchanged: upload to
`https://osg.snek.at/storage`, then write the media node under
`JaenPage /cms/media/`. Two things differ:

- **One media node per file is enough.** A metadata image is resolved globally
  by media id, so it does not need the one-node-per-localized-page treatment
  `Field.Image` needs (that one only ever reads `jaenPage.mediaNodes` of the
  page it renders on). Five files backed all thirty localized docs sections
  here. `jaenPageId` can be left out entirely; the media library still lists
  the node, only its per-page filter does not find it. Leaving it out also
  keeps the node out of every `mediaNodes` array in `page-data`.
- **Set `imageId` and leave `image` alone.** The old address stays the social
  preview url. Overwriting it would change what Facebook and X fetch for no
  reason at all.

`jaen-data/patches/docs-card-images.json` is the worked example: five media
nodes and thirty two-line page entries.

### What it cost

`public/page-data/index/page-data.json` grew from 4 109 325 to 4 752 427 bytes,
+643 102 raw and +65 148 gzipped, because `imageFile` sits in the shared
`JaenPageDataStructure` fragment and the homepage query pulls
`allJaenPage { nodes { ...JaenPageData children { ...JaenPageData } } }`, i.e.
every page's full data several times over. Against that, the six cards (five
distinct files) stopped downloading 571 230 bytes of original JPEG and now
fetch 44 332 bytes of AVIF on a 1x screen or 103 537 on a 2x one, i.e. 92 or
82 percent less, of already-compressed bytes. Net clearly positive, but the
JSON figure is the reason not to widen that fragment further without
measuring. The duplication is netsnek.com's query, not jaen's fragment.

## Pitfalls hit while doing this

**Not every static image sits behind a `Field.Image`.** The docs preview images
on the homepage card grid (`/images/docs/photonq.jpg` and friends) come from
`jaenPageMetadata.image`, a plain string on the page metadata, which
`src/components/sections/Blog.tsx` used to render as
`<Image src={section.image}>`. That is not a jaen field, it has no media id,
and putting the file in the media library did nothing for it — until the
metadata grew `imageId`, see the section above. Check what the markup actually
is before assuming the CMS can fix it.

**A backtick inside a GraphQL comment ends the template literal.** The
fragments live in a `graphql\`...\`` tag, so a comment mentioning a prop in
backticks turns into `ERROR #85911 GRAPHQL.EXTRACTION: There was a problem
parsing <file>`, which says nothing about backticks and points at the whole
file. Every fragment in it silently disappears and every query that used one
fails with "The fragment X does not exist".

**Changing a linked jaen plugin deletes the whole gatsby cache.** The first
build after touching `../jaen/packages/gatsby-source-jaen` prints "as a
precaution, we're deleting your site's cache" and wipes `.cache` *and*
`public`. Back up anything in `public/` you wanted to compare against before
building, and expect that build to re-download every media file.

**A media File node can outlive its download.** On the cold build that
followed, six media files were present as `File` nodes but missing from
`.cache/caches/gatsby-source-filesystem/`, and sharp brought the entire build
down with `ENOENT`. The `jaenMetadataImage` resolver now checks
`fs.existsSync` and returns null instead, so a missing media file degrades to
the unoptimised address rather than failing the build. The same cold build also
hit a one-off `Failed to write ... into public/static/...` from
gatsby-plugin-sharp; a plain re-run fixed both.

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
