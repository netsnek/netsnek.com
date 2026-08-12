/**
 * netsnek.com's Chakra v3 system, in two flavours.
 *
 * `system` is what the site's own routes mount, through the branch in
 * gatsby-plugin-jaen's Layout. It carries the site's global styles.
 *
 * `chromeSystem` is the same tokens with no globals, and it exists for
 * SearchMenu, which is mounted through the Toolbar shadow INSIDE jaen's frame
 * and therefore also renders on CMS routes. v2 gave it a bare <ThemeProvider>,
 * which re-provided variables and nothing else. In v3 a provider is also the
 * global-style emitter, so handing SearchMenu the full `system` would push the
 * site's html and body rules onto every CMS route, which v2 never did.
 *
 * Why the prefix stays `chakra`: roughly forty strings in the site hard-code
 * `var(--chakra-colors-brand-500)` and friends, including every locale
 * catalogue in src/locales/messages.ts, accent-dots.tsx, HeroEditorTabs.tsx and
 * ProductCard.tsx. jaen takes the `jaen` prefix instead, where only eight such
 * strings exist. Two systems with disjoint prefixes cannot collide whatever
 * selector they land on, which is what replaces v2's cssVarsRoot scoping.
 */
import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

import themeColors from './colors';
import themeFonts from './fonts';
import {
  accordionSlotRecipe,
  alertSlotRecipe,
  breadcrumbSlotRecipe,
  buttonRecipe,
  containerRecipe,
  headingRecipe,
  kbdRecipe,
  linkRecipe,
  listSlotRecipe,
  menuSlotRecipe,
  separatorRecipe,
  skeletonRecipe,
  tooltipSlotRecipe
} from './recipes';
import themeSemanticTokens from './semanticTokens/semanticTokens';
import { toV3SemanticTokens } from './semanticTokens/to-v3';

/**
 * The base colour scales the semantic layer references. These must be
 * registered before anything else, because an unresolvable `{colors.x.y}` is
 * not an error in v3: it emits `--var: colors\.x\.y`, a well-formed declaration
 * full of garbage. Miss `flat.se.green` or `gray.550` and about fifteen tokens
 * die without a word.
 */
type TokenTree = { value: string } | { [key: string]: TokenTree };

const toTokenScale = (value: unknown): TokenTree =>
  typeof value === 'string'
    ? { value }
    : Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([k, v]) => [
          k,
          toTokenScale(v)
        ])
      );

/**
 * The eight slots `colorPalette` resolves against, filled for `brand`.
 *
 * `html { colorPalette: 'brand' }` below is this migration's replacement for
 * v2's `withDefaultColorScheme({colorScheme: 'brand'})`, and on its own it is
 * inert: it maps the numeric ramp and nothing else, while every v3 recipe reads
 * the eight NAMED slots. 43 recipes and slot recipes make 264 such references,
 * and each one of them was emitting `var(--chakra-colors-color-palette-solid)`
 * against a variable no rule defined. A missing custom property is invalid at
 * computed-value time, not an error, so tsc and gatsby build stay green while
 * solid buttons lose their white label, Tabs variant="line" loses its
 * indicator, Avatar loses its fill and every focus ring loses its colour.
 *
 * The light half of each slot is what v2's brand-schemed component produced,
 * read off @chakra-ui/theme in the untouched checkout rather than chosen:
 *
 *   solid     Button variantSolid  bg        mode(`${c}.500`, `${c}.200`)
 *   contrast  Button variantSolid  color     mode('white', 'gray.800')
 *   fg        Button variantGhost  color     mode(`${c}.600`, `${c}.200`)
 *   subtle    Button variantGhost  _hover.bg mode(`${c}.50`,  transparentize…)
 *   muted     Button variantGhost  _active.bg mode(`${c}.100`, transparentize…)
 *
 * Two caveats, stated rather than glossed. The dark halves of `subtle` and
 * `muted` are NOT v2's: v2 used `transparentize(`${c}.200`, 0.12/0.24)`, an
 * alpha blend with no token spelling, and the 800/900 steps here are the
 * nearest opaque equivalent. `emphasized` and `border` have no v2 origin at all.
 * All three follow jaen's foundations/semantic-tokens.ts.
 *
 * Following jaen is not only for consistency: gatsby-plugin-jaen's system.ts
 * reads `semanticTokens.colors.brand` off THIS system through the theme shadow
 * and merges it into the CMS's own, where it overwrites jaen's eight slots.
 * Any value that diverges here silently re-colours the CMS chrome. Verified
 * after the change: the merged jaen system emits the same eight pairs it did
 * before, and keeps jaen's own solidHover/solidActive on top.
 *
 * The `_dark` half stops at 900 because the site's brand ramp does, so `subtle`
 * cannot use the 950 that v3's own palettes reach for.
 *
 * KNOWN RESIDUE: `focusRing`. v2 painted a 3px `shadows.outline` box-shadow in
 * Chakra's blue on EVERY colour scheme; v3 paints a 2px offset outline in
 * colorPalette.focusRing. No token value restores v2's ring, because the ring
 * is a different mechanism — closing that gap means overriding
 * `focusVisibleRing` in the recipes, which is a bigger change than this slice.
 * Brand is used here for the same reason jaen uses it, and the outline is now
 * orange where v2's was blue.
 */
const brandColorPalette = {
  solid: { value: { base: '{colors.brand.500}', _dark: '{colors.brand.200}' } },
  contrast: { value: { base: '{colors.white}', _dark: '{colors.gray.800}' } },
  fg: { value: { base: '{colors.brand.600}', _dark: '{colors.brand.200}' } },
  muted: { value: { base: '{colors.brand.100}', _dark: '{colors.brand.800}' } },
  subtle: { value: { base: '{colors.brand.50}', _dark: '{colors.brand.900}' } },
  emphasized: {
    value: { base: '{colors.brand.600}', _dark: '{colors.brand.300}' }
  },
  border: { value: { base: '{colors.brand.500}', _dark: '{colors.brand.400}' } },
  focusRing: {
    value: { base: '{colors.brand.500}', _dark: '{colors.brand.200}' }
  }
};

/**
 * v2's font stack, pinned.
 *
 * `fonts.ts` is empty in both trees, which in v2 meant "use @chakra-ui/theme's
 * default" — the `-apple-system` system stack. v3's default is the same stack
 * with `Inter` prepended, a face the site never loads and never asked for, and
 * v3 additionally hands `fonts.body` to `html` through the preflight, so the
 * change is not confined to elements that name the token. These three values
 * are @chakra-ui/theme's, verbatim. The site's own `fonts.ts` still wins if it
 * ever stops being empty.
 */
const v2Fonts = {
  heading: {
    value:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
  },
  body: {
    value:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
  },
  mono: {
    value:
      'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace'
  }
};

export const siteConfig = defineConfig({
  cssVarsPrefix: 'chakra',
  // dist/jaen.css still ships Tailwind's unlayered preflight, and an unlayered
  // normal declaration beats every cascade layer regardless of specificity.
  // Comes back out once the Tailwind bundle is gone.
  disableLayers: true,
  theme: {
    // v3 moved lg from 62em (992px) to 1024px. Pinned, or every responsive
    // array in the site shifts at a width nobody chose.
    breakpoints: {
      sm: '480px',
      md: '768px',
      lg: '992px',
      xl: '1280px',
      '2xl': '1536px'
    },
    tokens: {
      // The two helpers produce the shape v3 wants but cannot prove it to
      // TypeScript: Recursive<TokenSchema> is a conditional type over the
      // literal keys of the input, and both trees are built at runtime from
      // plain objects. The runtime shape is asserted by tests/08-theme.
      colors: toTokenScale(themeColors) as never,
      fonts: { ...v2Fonts, ...toTokenScale(themeFonts) } as never,
      /**
       * v2's `borders` scale, pinned.
       *
       * v3 renamed it to xs/sm/md/lg/xl and dropped the pixel keys, so
       * `border="1px"` no longer resolves. The literal `1px` is emitted
       * instead, which resets border-style to its initial `none` and paints
       * nothing — and v3's preflight `border-style: solid` on `*` loses to the
       * shorthand. Fifteen call sites in this repo depend on it, six of them
       * the dividing lines of the top nav grid in AltTopNav.
       */
      borders: {
        '1px': { value: '1px solid' },
        '2px': { value: '2px solid' },
        '4px': { value: '4px solid' },
        '8px': { value: '8px solid' }
      },
      sizes: {
        /**
         * v3 dropped the `container.*` namespace. ServiceDetails.tsx:38 sets
         * maxW="container.xl", and an unresolvable size is not an error in v3:
         * maxW would receive the literal string and the section would go
         * full-bleed. v2's four values.
         */
        container: {
          sm: { value: '640px' },
          md: { value: '768px' },
          lg: { value: '1024px' },
          xl: { value: '1280px' }
        }
      }
    },
    semanticTokens: {
      colors: {
        ...(toV3SemanticTokens(themeSemanticTokens.colors) as object),
        // `brand` is not one of the twelve roots the site's own tree declares
        // (components, blueGradient, modals, pages, views, features, shared,
        // topNav, leftNav, main, rightNav, footer), so this adds rather than
        // overwrites. Verified with Object.keys on siteConfig.
        brand: brandColorPalette
      } as never
    },
    recipes: {
      button: buttonRecipe,
      container: containerRecipe,
      heading: headingRecipe,
      kbd: kbdRecipe,
      link: linkRecipe,
      separator: separatorRecipe,
      skeleton: skeletonRecipe
    },
    slotRecipes: {
      accordion: accordionSlotRecipe,
      alert: alertSlotRecipe,
      breadcrumb: breadcrumbSlotRecipe,
      list: listSlotRecipe,
      menu: menuSlotRecipe,
      tooltip: tooltipSlotRecipe
    }
  }
});

/**
 * jaen's provider owns the reset and the shared `*` rules, and it is mounted on
 * every route. Stripping them from the base config here keeps the site's
 * provider emitting only what the site itself declares.
 */
const {
  globalCss: _jaenOwnsGlobals,
  preflight: _jaenOwnsPreflight,
  ...base
} = defaultConfig;

/** Mounted on site routes. Carries the site's globals. */
export const system = createSystem(
  base,
  siteConfig,
  defineConfig({
    preflight: false,
    globalCss: {
      /**
       * The replacement for `withDefaultColorScheme({colorScheme: 'brand'})`,
       * which v3 dropped with no equivalent.
       *
       * This is the largest silent-failure risk in the whole migration. It is
       * why the entire site source contains exactly ONE colorScheme prop
       * (MdxEditor.tsx:124): every other Button, Input, Checkbox and Switch is
       * brand-orange by default. Without this line they all revert to v3's
       * grey, and both tsc and gatsby build stay green while they do it.
       */
      html: { colorPalette: 'brand' },
      /**
       * v2's body rule, restored.
       *
       * On v2 site routes this came from `<GlobalStyle/>` inside the site's own
       * emotion ThemeProvider (gatsby-plugin-jaen Layout.tsx:26), rendering
       * @chakra-ui/theme's default `styles.global.body`. It is visible in the
       * untouched build at netsnek.com/public/index.html:
       *
       *   body{font-family:var(--chakra-fonts-body);
       *        color:var(--chakra-colors-chakra-body-text);
       *        background:var(--chakra-colors-chakra-body-bg); …}
       *
       * `fontFamily` is the one that matters most. Without it the site inherits
       * the `html { font-family: var(--global-font-body …) }` that jaen's
       * preflight sets, which is jaen's "Open Sans Variable" — a different
       * typeface for every word on every site route.
       *
       * `chakra-body-bg` is `{white, _dark: gray.800}`, which is exactly what
       * `shared.body.bgColor` already is. `chakra-body-text` is
       * `{gray.800, _dark: whiteAlpha.900}`, which `shared.text.default` is NOT
       * — its dark half is gray.400. That token stays as it is, because seven
       * components read it and read it in v2 too; the body takes v2's pair
       * directly instead.
       *
       * lineHeight is not restored: v2 set `lineHeights.base` (1.5) here, and
       * v3's preflight already puts 1.5 on `html` with `* { font: inherit }`
       * underneath it.
       */
      body: {
        fontFamily: 'body',
        bg: 'shared.body.bgColor',
        color: { base: 'gray.800', _dark: 'whiteAlpha.900' },
        transitionProperty: 'background-color',
        // v2's `durations.normal`. v3's scale renamed it away (fastest, faster,
        // fast, moderate, slow, slower, slowest), so the value is spelled out.
        transitionDuration: '200ms'
      }
    }
  })
);

/** The v3 spelling of v2's bare <ThemeProvider>: tokens, no globals. */
export const chromeSystem = createSystem(base, siteConfig);
