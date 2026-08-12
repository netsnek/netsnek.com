/**
 * The site's component recipes, ported from `components/` and pruned to what
 * a call site can actually select.
 *
 * The pruning was measured, not guessed: every `variant="..."` string in the
 * 100-odd tsx files was counted, and the dynamic case was checked by hand
 * because a literal grep misses it. That mattered once — `Callouts.tsx:16`
 * renders `<Alert variant={type}>` where type defaults to 'default', so all
 * four Alert variants are live despite only `info` appearing as a literal.
 *
 * Dropped entirely, each with zero consumers: the Text, Avatar, Checkbox and
 * Switch recipes (no `<Switch>` exists in the site at all), Input's, Textarea's
 * and InputGroup's `ghost` (the seven `variant="ghost"` uses are all Buttons,
 * where ghost is a v3 built-in), Menu's `search-result`, Link's `hover-opacity`
 * and `right-bottom-nav`, Heading's and Text's `cursive` and `light`, and ten
 * of the fourteen Button variants: invisible, ghost-hover-opacity,
 * ghost-hover-outline, outline-hover-filled, pq-outline, pq-solid, pq-ghost,
 * filledGreen, filledYellow and filledRed.
 *
 * Token paths are untouched. v3 resolves tokens by path, so every
 * `components.button.solid.bgColor` string here means the same thing it did.
 */
import { defineRecipe, defineSlotRecipe } from '@chakra-ui/react';

/**
 * One of two recipes the site did not have and now needs. The other is
 * `containerRecipe` below. Both restore a v2 built-in default that the site
 * never overrode and therefore never wrote down.
 *
 * v2 mapped `<Heading size="md">` to fontSize xl (1.25rem). v3 maps it to
 * textStyle md, which is 1rem. Four headings pass size="md" — ProductContent,
 * TableOfContent and two in the qasm playground — and without this they would
 * all quietly shrink by a fifth. The scale below is v2's own, read off
 * `theme.components.Heading.sizes`.
 *
 * The six `h1` to `h6` sizes spread in at the end are not v2's scale. They are
 * the docs headings' own, moved here out of the component. The block comment on
 * `docsHeadingSizes` says why they had to move.
 */

/**
 * The six sizes the docs headings select, and the reason they are sizes at all.
 *
 * v2's docs Heading picked its size with a `fontSize` STYLE PROP, one flat
 * pixel value per level. That worked because v2 merged the styleConfig and the
 * style props into one object before serialising it, with `assignAfter`, so a
 * scalar prop deleted and replaced the styleConfig's whole responsive
 * `fontSize` array. The emitted rule carried a single `font-size: 30px` and no
 * media query, which is visible in the untouched build at
 * netsnek.com/public/docs/interns/index.html on `.css-25lbsd`.
 *
 * v3 does not merge in that order and cannot be made to. `cva()` runs the
 * recipe through `css()` FIRST, which turns `fontSize: ['3xl', null, '4xl']`
 * into a flat `fontSize` plus an `@media screen and (min-width: 48rem)` key,
 * and only then does use-resolved-props merge the style props on top. A style
 * prop is prop-first (`{fontSize: {...}}`) while the serialised recipe is
 * condition-first (`{'@media …': {fontSize: …}}`), so the two never collide:
 * the prop overwrites the unconditional entry and the recipe's media rule wins
 * again from 768px up.
 *
 * Naming the breakpoint in the prop does not help either, and this was measured
 * rather than assumed. `fontSize={{base: '30px', md: '30px'}}` resolves through
 * the real system to
 *
 *   font-size: 30px; @media … {font-size: var(--chakra-font-sizes-4xl)}
 *
 * byte-identical to the scalar, because `css()` walks the merged object in key
 * order: `fontSize` sits where the recipe first declared it, ahead of the
 * recipe's own `@media` key, so the prop writes 30px into the media bucket and
 * the recipe overwrites it a moment later.
 *
 * A recipe variant has no such problem. Variants are merged as raw style
 * objects BEFORE the single `css()` call, so a flat `fontSize` here simply
 * replaces the responsive one from `defaultVariants.size` and no media entry
 * for font-size is ever emitted. That also restores the v2 property that call
 * sites relied on: a `fontSize` prop passed by a caller can override this
 * again, because there is no longer a media rule to lose to.
 *
 * `lineHeight` stays responsive, because v2's did: the docs Heading never
 * overrode it, so it kept size xl's `[1.33, null, 1.2]` and rendered 1.33 below
 * 768px and 1.2 above. The pair is spelled out per level instead of being
 * inherited from `defaultVariants.size`, so the block does not depend on which
 * other variant happens to be selected alongside it.
 */
const docsHeadingSizes = Object.fromEntries(
  Object.entries({ h1: 36, h2: 30, h3: 24, h4: 20, h5: 18, h6: 16 }).map(
    ([level, px]) => [
      level,
      // A fresh array per level. `mergeWith` assigns array references straight
      // through and then mutates them in place on the next merge, so a shared
      // literal would be a live wire between the six entries.
      { fontSize: `${px}px`, lineHeight: [1.33, null, 1.2] }
    ]
  )
);

/**
 * The four sizes the site's own (non-docs) headings select.
 *
 * Same story as `docsHeadingSizes` above, same remedy, different call sites.
 * Each of these was a `fontSize` STYLE PROP in v2 that worked there and stops
 * working in v3, because `defaultVariants.size` is `xl` and `cva()` turns its
 * `fontSize: ['3xl', null, '4xl']` into an `@media screen and (min-width:
 * 48rem)` key BEFORE the style props merge. A prop only ever overwrites the
 * unconditional entry, so from 768px up the recipe wins it straight back. The
 * damage was measured against the untouched v2 build at three widths and is
 * recorded per size below.
 *
 * `section`  The five big section headlines: Services, both in ServiceDetails,
 *            Blog and Open. v2 rendered 36px/36 up to 992px and 48px/48 above.
 *            v3 kept the sizes (the prop's own `lg` media rule outranks the
 *            recipe's `md` one) but lost the line-height at both md and lg,
 *            leaving 43.2 and 57.6 where v2 had 36 and 48. Flat `lineHeight: 1`
 *            emits no media entry at all, which is what puts it back.
 *
 * `product`  ProductContent's product name. v2: 30px/30 up to 992px, 36px/36
 *            above. v3 read 36px/43.2 from 768px up, because 4xl is what the
 *            recipe's md entry supplies and 1.2 came with it.
 *
 * `card`     The six project cards on the home page, and TestimonialHeading,
 *            which nothing renders today but carries the identical call site.
 *            v2: 20px throughout, leading 1.33 below 768px and 1.2 above — the
 *            default size's own pair, because v2's prop replaced only the
 *            fontSize. v3 rendered 36px/43.2 from 768px up. The worst of them.
 *
 * `menu-group`  SearchResultSectionTitle, the group label inside the search
 *            overlay. v2: 12px throughout with the same 1.33/1.2 pair. v3
 *            rendered 36px/43.2 from 768px up, a twelve-pixel label at
 *            thirty-six. Reachable with the `/` key on any page.
 *
 * The two responsive pairs are responsive on purpose. A flat size is only
 * correct where v2's value was flat, and `section` and `product` genuinely
 * changed at the site's pinned lg (992px) in v2, so the recipe carries the pair
 * rather than the call site fighting for it. Inside a variant that is safe:
 * variants are merged as raw style objects before the single `css()` call, so
 * the whole `fontSize` here replaces the default size's, media entries and all,
 * instead of colliding with them.
 */
const siteHeadingSizes = {
  section: { fontSize: { base: '4xl', lg: '5xl' }, lineHeight: 1 },
  product: { fontSize: { base: '3xl', lg: '4xl' }, lineHeight: 1 },
  card: { fontSize: 'xl', lineHeight: [1.33, null, 1.2] },
  'menu-group': { fontSize: '12px', lineHeight: [1.33, null, 1.2] }
};

export const headingRecipe = defineRecipe({
  base: { fontFamily: 'heading', fontWeight: 'bold' },
  variants: {
    size: {
      '4xl': { fontSize: ['6xl', null, '7xl'], lineHeight: 1 },
      '3xl': { fontSize: ['5xl', null, '6xl'], lineHeight: 1 },
      '2xl': { fontSize: ['4xl', null, '5xl'], lineHeight: [1.2, null, 1] },
      xl: { fontSize: ['3xl', null, '4xl'], lineHeight: [1.33, null, 1.2] },
      lg: { fontSize: ['2xl', null, '3xl'], lineHeight: [1.33, null, 1.2] },
      md: { fontSize: 'xl', lineHeight: 1.2 },
      sm: { fontSize: 'md', lineHeight: 1.2 },
      xs: { fontSize: 'sm', lineHeight: 1.2 },
      ...docsHeadingSizes,
      ...siteHeadingSizes
    }
  }
});

/**
 * The other recipe the site never had, and the one that moved every page.
 *
 * v2's stock Container was `{w: '100%', mx: 'auto', maxW: 'prose', px: '4'}`:
 * a flat 16px gutter at every width. v3's is
 * `px: {base: '4', md: '6', lg: '8'}`, so the gutter grows to 24px at md and
 * to 32px at the site's pinned lg (992px). The site registered no Container
 * styleConfig in v2, which is why nothing in the diff mentions `px`: the
 * default moved underneath thirteen untouched call sites.
 *
 * Measured on /docs/interns at 1280px. DocsLayout nests two Containers, the
 * maxW="8xl" frame and the maxW="3xl" article, so the article pays the 16px
 * twice: it starts at 32 + 256 (aside) + 32 = 320 where v2 had
 * 16 + 256 + 16 = 288, and its content box is 640 wide where v2 had 704. That
 * is the narrower column and the 2 to 8 percent extra page height. Both
 * footers and the top nav moved inward by the single 16px.
 *
 * The second half of the damage is worse and is not about the value at all.
 * `cva()` serialises a recipe's base BEFORE the style props are merged in, so
 * the responsive entries arrive as `@media` keys that a prop can no longer
 * reach: a prop only ever overwrites the unconditional entry. With v3's
 * responsive default in place, Contact's `px={0}` still rendered 24px at md
 * and 32px at lg, and Services' `px={{base: 5, lg: 0}}` rendered 32px at lg
 * instead of none. Restoring the scalar removes the `@media` keys, and prop
 * overrides behave the way they did in v2 again.
 *
 * maxW and `position: relative` stay at v3's values. Every <Container> in the
 * site passes an explicit maxW, Hero's included, which takes maxW="6xl" from
 * the Grid it is the asChild of, so the base is never read.
 */
export const containerRecipe = defineRecipe({
  base: { px: '4' }
});

/**
 * The site's four variants, plus the parts of v2's Button base and size scale
 * that v3 moved.
 *
 * `fontWeight`  v2's base was `semibold`, v3's is `medium`. Every button label
 *               in the site got one step lighter.
 * `borderWidth` v2's base had none. v3 adds `1px` of transparent border to
 *               every button, which is 2px of width and 2px of height that v2
 *               never paid. The site's `outline` variant takes the 1px back
 *               below, because v2's outline button did draw one.
 * `lineHeight`  v2's base was `1.2` and nothing overrode it. v3 keeps `1.2` in
 *               the base but then puts `textStyle` in every size, and a
 *               textStyle carries its own line-height as a length, so the base
 *               loses. 20px where v2 computed 16.8px.
 * `fontSize`    the same textStyle carries a size. v3's `md` is 14px where
 *               v2's `md` was 16px, so every button that does not name a size
 *               shrank. The scale below is v2's own, from
 *               @chakra-ui/theme components/button.js.
 * `gap`         v2 declared none on the button and spaced icons with the
 *               `chakra-button__icon` span's own `margin-inline-end: 0.5rem`.
 *               The codemod turned every `leftIcon`/`rightIcon` into a plain
 *               child, so that span is gone and the margin with it. `0` left
 *               the cart button on /products/ reading "IN DEN WARENKORB" with
 *               the trolley glued to the T. 8px is what v2 actually rendered,
 *               measured on that button, so 8px is what goes here.
 *
 * `h`, `minW` and `px` are v2's too: v3 moved xs from 6 to 8, sm from 8 to 9
 * and lg from 12 to 11, and shifted their paddings with them.
 */
export const buttonRecipe = defineRecipe({
  base: { fontWeight: 'semibold', borderWidth: 0 },
  variants: {
    /**
     * `textStyle: ''` is load-bearing, not leftover.
     *
     * A textStyle is expanded late, and the expansion beats a `lineHeight`
     * declared beside it in the same object. Its `fontSize` does not win that
     * fight, which is the confusing part: setting only fontSize and lineHeight
     * gives v2's size with v3's leading. Blanking the textStyle first is what
     * lets both values through. Verified against system.cva for every size.
     */
    size: {
      lg: { textStyle: '', h: '12', minW: '12', fontSize: 'lg', px: '6', gap: 2, lineHeight: 1.2 },
      md: { textStyle: '', h: '10', minW: '10', fontSize: 'md', px: '4', gap: 2, lineHeight: 1.2 },
      sm: { textStyle: '', h: '8', minW: '8', fontSize: 'sm', px: '3', gap: 2, lineHeight: 1.2 },
      xs: { textStyle: '', h: '6', minW: '6', fontSize: 'xs', px: '2', gap: 2, lineHeight: 1.2 }
    },
    variant: {
      /**
       * Every background below is spelled `bg`, not `bgColor`, and that is the
       * whole reason this variant behaves.
       *
       * v2 wrote `bgColor` here and emitted declarations in source order:
       * the variant's `background-color` first, a call site's `bg` prop after
       * it, and the later shorthand won. v3's engine does not preserve that
       * order. It sorts the final declarations by property, shorthands before
       * longhands, so that a longhand can refine a shorthand — which means a
       * recipe's `background-color` is emitted AFTER a call site's
       * `background` and quietly beats it. A `bg` prop can therefore never
       * override a `bgColor` recipe in v3, whatever the call site says.
       *
       * That is what turned the opened top nav orange: AltTopNav's second bar
       * sets `bg="white"` on the contact button, the language switcher and the
       * close button, all three landed on `background`, and this variant's
       * `background-color: brand.500` was sorted in behind them. Only the
       * search control came out white, because it happens to spell its
       * override `bgColor` and so collided with this key instead of losing to
       * it.
       *
       * v3's own button recipe uses `bg` for exactly this reason. Matching it
       * also collapses the two rival declarations into one: `bg` here lands on
       * the same key as the default recipe's `bg: colorPalette.solid` and
       * replaces it, instead of the pair sitting in the rule together.
       */
      solid: {
        borderRadius: 'xl',
        px: 5,
        bg: 'components.button.solid.bgColor',
        _hover: {
          bg: 'components.button.solid.hover.bgColor',
          opacity: 1
        },
        _focus: {
          bg: 'components.button.solid.hover.bgColor',
          opacity: 1
        },
        // The pressed state was never set, so Chakra's default applied and the
        // button darkened on click. It now goes one step lighter than hover.
        _active: { bg: 'brand.300', opacity: 1 }
      },
      outline: {
        borderRadius: 'xl',
        px: 5,
        textTransform: 'capitalize',
        // v2's outline button drew a 1px border. The base above sets 0 for
        // every other variant, so this variant asks for it back.
        borderWidth: '1px',
        borderColor: 'components.button.outline.borderColor',
        _hover: {
          borderColor: 'components.button.outline.hover.borderColor',
          opacity: 1
        },
        _focus: {
          bg: 'components.button.outline.hover.borderColor',
          opacity: 1
        }
      },
      // ghost and ghost-hover were byte-identical in v2. Both names are in use,
      // so both stay, but only one of them is written out.
      ghost: ghostButton(),
      'ghost-hover': ghostButton()
    }
  }
});

// `bg` rather than `bgColor` for the reason spelled out on the solid variant
// above: a longhand here cannot be overridden by a `bg` prop at the call site.
function ghostButton() {
  const hover = {
    bg: 'components.button.ghost.hover.bgColor',
    opacity: 1
  };

  return {
    borderRadius: 'xl',
    px: 5,
    textTransform: 'capitalize',
    bg: 'transparent',
    opacity: 0.7,
    _hover: hover,
    _focus: hover
  };
}

/**
 * v2's Link base, restored where v3's diverges. Everything below `base` and the
 * two built-in variants is the site's own and unchanged.
 *
 * `color`. v2's Link base was `color: 'inherit'` (@chakra-ui/theme
 * components/link.js:34) and the site never overrode it, so every link on every
 * page took the body colour. v3 dropped the base declaration and moved colour
 * into the variants: both `plain`, which is the recipe's defaultVariant and
 * therefore what an unadorned <Link> selects, and `underline` set
 * `color: colorPalette.fg`. On its own that was still invisible, because
 * `--chakra-colors-color-palette-fg` resolved to nothing and an invalid
 * custom property leaves an inherited property inherited. Registering
 * `html { colorPalette: 'brand' }` in system.ts gave the variable a value, and
 * every default-variant link in the site turned brand.600 (#cc6002) in one
 * step. The docs left nav is where it shows most, because every entry there is
 * a <Link>, but the change was never local to the nav.
 *
 * The two site variants below do NOT need the same treatment. Chakra's variants
 * are exclusive within a group, so `<Link variant="footer">` never picks up
 * `plain`, and neither variant declares a colour of its own. Those links
 * inherited in v2 and still inherit.
 *
 * `display`, `gap` and `alignItems`. v2's Link base declared none of the three,
 * so an <a> stayed inline and laid its children out in the normal flow. v3's
 * base is `display: inline-flex` with `gap: 1.5` and `alignItems: center`.
 *
 * The display alone reflows the left nav's expandable entries: v2's inline <a>
 * let the AccordionButton inside it resolve `width: 100%` against the accordion
 * item and fill all 256px, so the chevron sat at the right edge, while v3's
 * inline-flex <a> shrinks to the label and drags the chevron in behind the
 * text.
 *
 * `gap` and `alignItems` have to be reset in their own right, not left to be
 * made inert by `display: inline`, because a call site that sets its own
 * display brings them back to life. The docs prev/next pair is exactly that: it
 * renders `<Link display="flex">` around an icon and a label, spaces them with
 * the icon's own 8px margin the way v2 did, and then paid v3's 6px gap a second
 * time on top.
 */
export const linkRecipe = defineRecipe({
  base: { display: 'inline', gap: 0, alignItems: 'normal' },
  variants: {
    variant: {
      plain: { color: 'inherit' },
      underline: { color: 'inherit' },
      'hover-theme': {
        _hover: { color: 'components.link._hover.color' },
        transition: 'color 0.1s ease-in-out'
      },
      footer: {
        fontWeight: 500,
        opacity: 0.6,
        _hover: { opacity: 1 },
        transition: 'opacity 0.2s ease-in-out'
      }
    }
  }
});

export const skeletonRecipe = defineRecipe({
  base: { borderRadius: 'md' }
});

/**
 * v2's UnorderedList and OrderedList, as a recipe.
 *
 * Those two components are gone in v3 and the site's MDX renderer now reaches
 * for `<List.Root as="ul">` instead. That is the right replacement for the
 * markup, but it is not the same component: v2's UnorderedList was
 * `<List as="ul" styleType="initial" marginStart="1em">` and OrderedList was
 * the same with `decimal`, so the indent was part of the component, not part of
 * the call site. Every bulleted list in the docs lost 16px of indent when the
 * component did, most visibly on /docs, where the whole list column shifts left
 * and the text rewraps.
 *
 * `display` is the second half. A plain <ul> is a block box and v2 left it
 * alone; v3's root is `display: flex` with `flexDirection: column`. It happens
 * to look similar because the list items are full width, but it is not the same
 * box, and the flex container's `gap: var(--list-gap)` is only harmless here
 * because no variant in this system defines that variable.
 *
 * A flat `marginInlineStart` rather than one scoped to `&:is(ul, ol)`, so that
 * a call site can still override it with a prop. DocsIndex does exactly that
 * with `marginInlineStart="2em"`, in both trees, and a scoped selector would
 * outrank it.
 */
export const listSlotRecipe = defineSlotRecipe({
  slots: ['root', 'item', 'indicator'],
  base: {
    root: { display: 'block', marginInlineStart: '1em' }
  }
});

/**
 * v2's Kbd base, in the four places v3's differs. Measured on the `/` badge in
 * the search button, which is the only Kbd the site renders.
 *
 * v2 sized the glyph relative to its context with `fontSize: '0.8em'` and
 * `px: '0.4em'`, and left `lineHeight: 'normal'`. v3 sets none of the three, so
 * the badge inherited the button's full 14px, took the button's 20px line box,
 * and shrank its padding to a flat 4px. `wordSpacing` is v3's own addition.
 *
 * The background, border, radius and weight already match and are left alone.
 */
export const kbdRecipe = defineRecipe({
  base: {
    fontSize: '0.8em',
    lineHeight: 'normal',
    px: '0.4em',
    wordSpacing: 'normal'
  },
  // v3 gave Kbd a size axis that v2 did not have, and every entry in it sets a
  // textStyle and a fixed height. Both have to go for the base above to be
  // reachable: the textStyle for the same reason as in buttonRecipe, the
  // height because v2's badge was as tall as its own content.
  variants: {
    size: Object.fromEntries(
      ['sm', 'md', 'lg'].map(size => [size, { textStyle: '', height: 'auto' }])
    )
  }
});

/**
 * v2's Divider is v3's Separator, and it lost the one declaration the site
 * relied on.
 *
 * v2's baseStyle was `{opacity: 0.6, borderColor: 'inherit'}`
 * (@chakra-ui/theme components/divider.js:27). v3's is
 * `{display: 'block', borderColor: 'border'}`. The colour resolves to the same
 * grey in both, so only the opacity actually moved, and it moved on every
 * divider in the site that does not name its own: the vertical rule beside the
 * docs article went from 0.6 to fully opaque. Call sites that set `opacity`
 * themselves, such as the 0.2 rule at the foot of the docs page, were never
 * affected and are not affected by this either.
 */
export const separatorRecipe = defineRecipe({
  base: { opacity: 0.6 }
});

/**
 * v2's Breadcrumb declared almost nothing: one base slot, `link`, carrying
 * `color: 'inherit'` (@chakra-ui/theme components/breadcrumb.js:31). Everything
 * the crumbs looked like came from the page around them.
 *
 * v3's recipe is opinionated where v2's was empty, and three of its opinions
 * are visible on the docs page:
 *
 *   list.color      `fg.muted`, so the separator chevrons went from the body's
 *                   gray.800 to gray.600. The crumb links themselves never
 *                   changed, because MainBreadcrumb passes an explicit colour
 *                   for both the active and the inactive state.
 *   size.md.list    `textStyle: sm`, and a v3 textStyle is a pair, so it brings
 *                   `lineHeight: 1.25rem`. 20px where v2 inherited the unitless
 *                   1.5 and computed 21px at 14px.
 *   size.md.list    `gap: 1.5` (6px). v2 had no gap and spaced the crumbs with
 *                   `mx` on the separator instead, from Breadcrumb's `spacing`
 *                   prop, which defaults to 0.5rem. 8px on each side, which is
 *                   `gap: 2` here and puts every crumb back on its v2 column.
 *
 * `separator.opacity` is v3's too. v2's separator had none.
 */
export const breadcrumbSlotRecipe = defineSlotRecipe({
  slots: [
    'link',
    'currentLink',
    'item',
    'list',
    'root',
    'ellipsis',
    'separator'
  ],
  base: {
    list: { color: 'inherit' },
    separator: { color: 'inherit', opacity: 1 }
  },
  // `gap` and `lineHeight` have to sit in the size variant, not in `base`:
  // v3 declares both inside `size`, and a variant is applied after the base it
  // would otherwise be overriding. All three sizes get the same pair because
  // v2 had no size axis here at all.
  variants: {
    size: Object.fromEntries(
      ['sm', 'md', 'lg'].map(size => [
        size,
        { list: { gap: 2, lineHeight: 1.5 } }
      ])
    )
  }
});

export const tooltipSlotRecipe = defineSlotRecipe({
  slots: ['content'],
  base: {
    content: {
      borderRadius: 'md',
      bgColor: 'components.tooltip.bgColor',
      color: 'shared.text.default'
    }
  }
});

/**
 * v2's `container` slot is v3's `root`. All four variants are reachable through
 * `<Alert variant={type}>` in Callouts.tsx, which is the whole point of the
 * component: docs pages render callouts by type.
 */
export const alertSlotRecipe = defineSlotRecipe({
  slots: ['root', 'title', 'description', 'indicator', 'content'],
  variants: {
    variant: Object.fromEntries(
      ['default', 'info', 'warning', 'error'].map(kind => [
        kind,
        {
          root: {
            border: '1px solid',
            bgColor: `components.callout.${kind}.container.bgColor`,
            borderColor: `components.callout.${kind}.container.borderColor`,
            color: `components.callout.${kind}.container.color`
          }
        }
      ])
    )
  }
});

/**
 * v2's item/button/panel are v3's item/itemTrigger/itemContent.
 *
 * The four `textAlign`/`fontSize` declarations are the site's own, ported
 * unchanged. Everything else here restores a v2 base that v3 either dropped or
 * replaced, and none of it was written down in v2 for the usual reason: the
 * site never overrode it, so there was nothing to port.
 *
 * v2's accordion `button` base was `{fontSize: 'md', px: 4, py: 2}` and its
 * `panel` base was `{pt: 2, px: 4, pb: 5}` (@chakra-ui/theme
 * components/accordion.js:36-56). v3 keeps `py` but moves it into the `size`
 * variant, drops `px` from every variant except `subtle` and `enclosed`, moves
 * the panel's padding off the panel and onto the `itemBody` inside it, and adds
 * `fontWeight: medium` and `gap: 3` to the trigger that v2 never had.
 *
 * `lineHeight` is the one that moved the nav. v3's default `size` is `md`,
 * whose itemTrigger is `{textStyle: 'md', py: ...}`, and `textStyle: md` is a
 * pair: `fontSize: md` AND `lineHeight: 1.5rem`. The leftNav variant is applied
 * after `size` and its `fontSize: 'sm'` wins the first half, so the trigger
 * ends up as 14px text in a 24px line box. v2's trigger declared no
 * line-height at all and inherited the unitless 1.5 off the body, which at 14px
 * is 21px. Three pixels per expandable entry, seven of them on /docs/interns,
 * is the 579px nav that measured 600. A unitless value here restores the
 * recomputation, so a future fontSize change keeps its own leading.
 *
 * `itemIndicator` needs two things v2 got for free.
 *
 * Its colour: v3 paints the chevron `fg.subtle` where v2's AccordionIcon
 * inherited. Its size and glyph are not set here, because PageDirectory hands
 * the indicator v2's own chevron as a child with an explicit boxSize, which is
 * the only way to get v2's path rather than v3's.
 *
 * `display: flex` is what makes the arrow land on v2's pixel. v2 put the
 * `rotate(-90deg)` straight on a 17.5px square <svg>, so the rotation was about
 * the glyph's own centre. v3 wraps the icon in a block-level indicator whose
 * height is the 21px line box, and PageDirectory turns THAT, so a 17.5x21
 * rectangle spins and lands the glyph three quarters of a pixel off. A flex
 * box shrink-wraps the icon, the wrapper is square again, and the two
 * rotations agree.
 *
 * `paddingBottom` is deliberately not restored on itemBody. v2's panel base had
 * `pb: 5`, but PageDirectory forces the slot to 0 on every item, in both trees,
 * so the base is unreachable.
 */
export const accordionSlotRecipe = defineSlotRecipe({
  slots: [
    'root',
    'item',
    'itemTrigger',
    'itemContent',
    'itemBody',
    'itemIndicator'
  ],
  variants: {
    variant: {
      leftNav: {
        root: { fontSize: 'sm' },
        item: { borderWidth: 0 },
        itemTrigger: {
          textAlign: 'left',
          fontSize: 'sm',
          lineHeight: 1.5,
          fontWeight: 'normal',
          px: 4,
          gap: 0
        },
        itemContent: {
          paddingTop: 0,
          paddingRight: 0,
          fontSize: 'sm',
          /**
           * v2's `reduceMotion`, and the 4px it was quietly worth.
           *
           * PageDirectory passed `reduceMotion` to v2's Accordion on purpose,
           * with a comment: a panel toggled while the nav is hidden measures an
           * open height of 0 and gets stuck expanded but invisible. v3 has no
           * such prop and drives the collapse from the recipe instead, so the
           * guard is reinstated here by taking the animation away.
           *
           * `overflow` is the half that shows up in a screenshot. v3 pairs the
           * animation with `overflow: hidden`, which makes itemContent a block
           * formatting context, and a BFC traps the margins of the items inside
           * it. Every nested entry carries `my={1}`, so the first one's 4px and
           * the last one's 4px stopped collapsing out of the panel the way they
           * did through v2's `overflow: visible` one, and each expanded section
           * pushed the rest of the nav 4px down. With no animation left to
           * clip, visible is both correct and free.
           */
          overflow: 'visible',
          _open: { animationName: 'none' },
          _closed: { animationName: 'none' }
        },
        itemBody: { paddingTop: 0, paddingRight: 0, paddingLeft: 4 },
        itemIndicator: { color: 'inherit', display: 'flex' }
      }
    }
  }
});

/**
 * `theme-hover` has no literal call site but is the default variant, so it
 * reaches every menu in the site. `search-result` was the other half of this
 * recipe and has none: the search menu never selected it.
 */
export const menuSlotRecipe = defineSlotRecipe({
  slots: ['content', 'item', 'itemGroupLabel'],
  variants: {
    variant: {
      'theme-hover': {
        item: {
          _hover: {
            bgColor: 'leftNav.bottomNav.menu.item.active.bgColor',
            color: 'leftNav.bottomNav.menu.item.active.textColor'
          },
          _focus: {
            bgColor: 'leftNav.bottomNav.menu.item.active.bgColor',
            color: 'leftNav.bottomNav.menu.item.active.textColor'
          },
          transition:
            'background-color 0.1s ease-in-out, color 0.1s ease-in-out'
        }
      }
    }
  },
  defaultVariants: { variant: 'theme-hover' }
});
