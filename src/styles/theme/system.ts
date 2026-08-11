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
  buttonRecipe,
  headingRecipe,
  linkRecipe,
  menuSlotRecipe,
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
const toTokenScale = (value: unknown): unknown =>
  typeof value === 'string'
    ? { value }
    : Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([k, v]) => [
          k,
          toTokenScale(v)
        ])
      );

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
      colors: toTokenScale(themeColors) as Record<string, unknown>,
      fonts: toTokenScale(themeFonts) as Record<string, unknown>,
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
      colors: toV3SemanticTokens(themeSemanticTokens.colors) as Record<
        string,
        unknown
      >
    },
    recipes: {
      button: buttonRecipe,
      heading: headingRecipe,
      link: linkRecipe,
      skeleton: skeletonRecipe
    },
    slotRecipes: {
      accordion: accordionSlotRecipe,
      alert: alertSlotRecipe,
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
      body: { bg: 'shared.body.bgColor', color: 'shared.text.default' }
    }
  })
);

/** The v3 spelling of v2's bare <ThemeProvider>: tokens, no globals. */
export const chromeSystem = createSystem(base, siteConfig);
