import { PageConfig } from 'jaen';
import { GatsbyNode } from 'gatsby';
import path from 'path';
import fs from 'fs';
import { buildSearchIndex } from './src/utils/search/build-search-index';

/**
 * The patch history still delivers JaenPage entries for pages removed from
 * the site (photonq strip, e.g. /experiments/[slug]/). Without a stateful
 * page the source plugin's id-assurance pass never heals their missing
 * `sections`, and a single malformed node fails every query selecting
 * JaenPage.sections. Defaulting the resolver keeps the non-null contract.
 */
export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  ({ actions, schema }) => {
    actions.createTypes(
      schema.buildObjectType({
        name: 'JaenPage',
        fields: {
          sections: {
            type: '[JaenSection!]!',
            resolve: (source: { sections?: unknown }) =>
              Array.isArray(source.sections) ? source.sections : []
          }
        }
      })
    );
  };

/**
 * WORKAROUND for a jaen-side SSR bug: the CMS pages of the i18n branch use
 * function labels (`({intl}) => intl.formatMessage(...)`) in their
 * pageConfig. readPageConfig serializes them into the page context as
 * `{type: 'function', value: '<source>'}`, and jaen's Head renders
 * `pageContext.pageConfig.label` directly (packages/jaen/src/Head/
 * Head.tsx:31) — an object child crashes static HTML generation for every
 * /cms/* page. Until jaen skips non-string labels in Head, rewrite the
 * serialized function labels to their defaultMessage string.
 */
const DEFAULT_MESSAGE_PATTERN = /defaultMessage:\s*["'`]([^"'`]*)["'`]/;

const isSerializedFunction = (value: unknown): value is { value: string } =>
  typeof value === 'object' &&
  value !== null &&
  (value as { type?: string }).type === 'function' &&
  typeof (value as { value?: string }).value === 'string';

/** Serialized function label -> its defaultMessage string (or null). */
const sanitizeLabel = (label: unknown): unknown => {
  if (isSerializedFunction(label)) {
    return DEFAULT_MESSAGE_PATTERN.exec(label.value)?.[1] ?? null;
  }

  return label;
};

const sanitizePageConfig = (pageConfig: any): { changed: boolean; next: any } => {
  let changed = false;

  const next = { ...pageConfig };

  if (isSerializedFunction(next.label)) {
    next.label = sanitizeLabel(next.label);
    changed = true;
  }

  if (next.menu && isSerializedFunction(next.menu.label)) {
    next.menu = { ...next.menu, label: sanitizeLabel(next.menu.label) };
    changed = true;
  }

  if (Array.isArray(next.breadcrumbs)) {
    const breadcrumbs = next.breadcrumbs.map((crumb: any) =>
      crumb && isSerializedFunction(crumb.label)
        ? { ...crumb, label: sanitizeLabel(crumb.label) }
        : crumb
    );

    if (breadcrumbs.some((crumb: any, i: number) => crumb !== next.breadcrumbs[i])) {
      next.breadcrumbs = breadcrumbs;
      changed = true;
    }
  }

  return { changed, next };
};

export const onCreatePage: GatsbyNode['onCreatePage'] = ({ page, actions }) => {
  const pageConfig = (page.context as any)?.pageConfig;

  if (!pageConfig) return;

  const { changed, next } = sanitizePageConfig(pageConfig);

  if (!changed) return;

  actions.deletePage(page);
  actions.createPage({
    ...page,
    context: {
      ...page.context,
      pageConfig: next
    }
  });
};

/**
 * The jaen packages are consumed via yarn `link:` from the local monorepo.
 * Their own node_modules would otherwise pull in a second copy of react,
 * emotion and chakra — alias the singletons to the site's copies.
 */
export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        react: path.resolve(__dirname, 'node_modules/react'),
        'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
        '@emotion/react': path.resolve(
          __dirname,
          'node_modules/@emotion/react'
        ),
        '@chakra-ui/react': path.resolve(
          __dirname,
          'node_modules/@chakra-ui/react'
        ),
        // The jaen packages come in as `link:` deps, so they resolve THEIR
        // dependencies from the monorepo tree instead of this one. For the
        // gqty client that means a second, nested copy whose ESM build pulls
        // gqty's CommonJS files into an ESM context — webpack then parses
        // `gqty/Utils/hash.js` as a module and the bundle dies on
        // "exports is not defined" before the app ever renders. Pinning the
        // whole gqty stack to this repo's own copies (identical versions,
        // the ones the published package used) keeps a single instance.
        gqty: path.resolve(__dirname, 'node_modules/gqty'),
        '@gqty/react': path.resolve(__dirname, 'node_modules/@gqty/react'),
        'use-sync-external-store': path.resolve(
          __dirname,
          'node_modules/use-sync-external-store'
        ),
        graphql: path.resolve(__dirname, 'node_modules/graphql')
      }
    }
  });
};

export const onPostBuild: GatsbyNode['onPostBuild'] = async ({
  graphql,
  reporter
}) => {
  const result = await graphql<{
    allJaenPage: {
      nodes: Array<{
        id: string;
        slug: string;
        parentPage: {
          id: string;
        } | null;
        template: string | null;
        jaenPageMetadata: {
          title: string;
        };
        jaenFields: Record<string, any> | null;
        pageConfig: PageConfig | null;
        buildPath: string;
        sections: Array<{
          items: Array<{
            jaenFields: Record<string, any>;
            sections: Array<{
              items: Array<{
                jaenFields: Record<string, any>;
              }>;
            }>;
          }>;
        }>;
      }>;
    };
  }>(`
    query {
      allJaenPage {
        nodes {
          id
          slug
          parentPage {
            id
          }
          template
          jaenPageMetadata {
            title
          }
          jaenFields
          pageConfig
          buildPath
          sections {
            items {
              jaenFields
              sections {
                items {
                  jaenFields
                }
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors || !result.data) {
    reporter.panicOnBuild(
      `Error while running GraphQL query. ${result.errors}`
    );

    return;
  }

  const { allJaenPage } = result.data;

  await preparePagesAndBuildSearch(allJaenPage);
};

/**
 * Locales of the site; keep in sync with the i18n block in
 * gatsby-config.ts and src/locales/messages.ts. The default locale is
 * unprefixed, every other locale lives under its path prefix.
 */
const SITE_LOCALES = ['de', 'en', 'sl', 'it', 'ja'];
const SITE_DEFAULT_LOCALE = 'de';

/** Locale of a build path, derived from its first path segment. */
const localeOfBuildPath = (buildPath: string | null | undefined): string => {
  const first = (buildPath ?? '').split('/').filter(Boolean)[0]?.toLowerCase();

  if (first && first !== SITE_DEFAULT_LOCALE && SITE_LOCALES.includes(first)) {
    return first;
  }

  return SITE_DEFAULT_LOCALE;
};

async function preparePagesAndBuildSearch(allJaenPage: {
  nodes: Array<{
    id: string;
    slug: string;
    parentPage: {
      id: string;
    } | null;
    template: string | null;
    jaenPageMetadata: {
      title: string;
    };
    jaenFields: Record<string, any> | null;
    pageConfig: PageConfig | null;
    buildPath: string;
    sections: Array<{
      items: Array<{
        jaenFields: Record<string, any>;
        sections: Array<{
          items: Array<{
            jaenFields: Record<string, any>;
          }>;
        }>;
      }>;
    }>;
  }>;
}) {
  const nodesForSearchIndex = allJaenPage.nodes.map(node => {
    const originPath = node.buildPath;

    let type = node.template;

    if (type && path.extname(type)) {
      type = path.basename(type, path.extname(type));
    }

    return {
      id: node.id,
      path: originPath,
      jaenPageMetadata: node.jaenPageMetadata,
      jaenFields: node.jaenFields,
      type
    };
  });

  // Segment the index by page locale so search results stay in-language:
  // search-index.json is {de: SearchIndex, en: SearchIndex, ...}.
  const localizedSearchIndex: Record<string, unknown> = {};

  for (const locale of SITE_LOCALES) {
    const localeNodes = nodesForSearchIndex.filter(
      node => localeOfBuildPath(node.path) === locale
    );

    localizedSearchIndex[locale] = await buildSearchIndex(localeNodes as any);
  }

  await fs.promises.writeFile(
    path.join('public', 'search-index.json'),
    JSON.stringify(localizedSearchIndex)
  );
}
