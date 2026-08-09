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
        )
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
