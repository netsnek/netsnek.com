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
 */
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
      xs: { fontSize: 'sm', lineHeight: 1.2 }
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

export const buttonRecipe = defineRecipe({
  variants: {
    variant: {
      solid: {
        borderRadius: 'xl',
        px: 5,
        bgColor: 'components.button.solid.bgColor',
        _hover: {
          bgColor: 'components.button.solid.hover.bgColor',
          opacity: 1
        },
        _focus: {
          bgColor: 'components.button.solid.hover.bgColor',
          opacity: 1
        },
        // The pressed state was never set, so Chakra's default applied and the
        // button darkened on click. It now goes one step lighter than hover.
        _active: { bgColor: 'brand.300', opacity: 1 }
      },
      outline: {
        borderRadius: 'xl',
        px: 5,
        textTransform: 'capitalize',
        borderColor: 'components.button.outline.borderColor',
        _hover: {
          borderColor: 'components.button.outline.hover.borderColor',
          opacity: 1
        },
        _focus: {
          bgColor: 'components.button.outline.hover.borderColor',
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

function ghostButton() {
  const hover = {
    bgColor: 'components.button.ghost.hover.bgColor',
    opacity: 1
  };

  return {
    borderRadius: 'xl',
    px: 5,
    textTransform: 'capitalize',
    bgColor: 'transparent',
    opacity: 0.7,
    _hover: hover,
    _focus: hover
  };
}

export const linkRecipe = defineRecipe({
  variants: {
    variant: {
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

/** v2's item/button/panel are v3's item/itemTrigger/itemContent. */
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
        itemTrigger: { textAlign: 'left', fontSize: 'sm' },
        itemContent: { paddingTop: 0, paddingRight: 0, fontSize: 'sm' }
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
