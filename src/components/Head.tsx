import type { HeadProps } from 'gatsby';
import { Head as JaenHead } from 'jaen';
import * as React from 'react';

import {
  defaultLocale,
  getMessages,
  locales,
  type MessageKey
} from '../locales/messages';

type JaenHeadProps = React.ComponentProps<typeof JaenHead>;

/**
 * Props gatsby hands the Head export, widened by the `locale` that
 * gatsby-source-jaen's localized page generation writes into the context.
 */
type SiteHeadProps = Omit<JaenHeadProps, 'children'> & {
  pageContext: JaenHeadProps['pageContext'] & { locale?: string };
};

/** Catalog keys of the title and description a route defaults to. */
interface RouteMetadata {
  title: MessageKey;
  description: MessageKey;
}

/**
 * Routes with their own metadata, keyed by path without locale prefix.
 * Pages outside this map (docs articles, product pages) keep the title
 * jaen resolves for them and only gain the localized site description.
 */
const routeMetadata: Record<string, RouteMetadata> = {
  '/': { title: 'PageTitleHome', description: 'PageDescriptionHome' },
  '/docs': { title: 'PageTitleDocs', description: 'PageDescriptionDocs' },
  '/products': {
    title: 'PageTitleProducts',
    description: 'PageDescriptionProducts'
  },
  '/imprint': { title: 'PageTitleImprint', description: 'PageDescriptionImprint' },
  '/privacy-policy': {
    title: 'PageTitlePrivacyPolicy',
    description: 'PageDescriptionPrivacyPolicy'
  },
  '/terms-of-service': {
    title: 'PageTitleTermsOfService',
    description: 'PageDescriptionTermsOfService'
  },
  '/404': { title: 'PageTitleNotFound', description: 'PageDescriptionNotFound' }
};

const localePrefixes = new Set<string>(locales);

/**
 * The route of a page with its locale prefix and trailing slash removed,
 * so `/ja/imprint/` and `/imprint` both resolve to `/imprint`.
 */
const routeOf = (pathname: string): string => {
  const segments = (pathname || '/').split('/').filter(Boolean);

  if (segments.length > 0 && localePrefixes.has(segments[0]!.toLowerCase())) {
    segments.shift();
  }

  const route = `/${segments.join('/')}`;

  return route === '/404.html' ? '/404' : route;
};

/**
 * The site's Head: jaen's Head with localized metadata defaults.
 *
 * jaen resolves the title as `jaenPageMetadata.title || pageConfig.label ||
 * siteMetadata.title` and the description as `jaenPageMetadata.description
 * || siteMetadata.description`. Both fallbacks are locale-blind — the label
 * is the English page name from the source file, the site metadata a single
 * German sentence stored in the CMS — so every locale of an unedited page
 * ended up with an English title and a German description.
 *
 * Feeding the localized defaults in as `jaenPageMetadata` puts them one
 * rung above those fallbacks and one rung below the CMS: a title or
 * description edited for this locale still wins, both at build time (the
 * page's own metadata, spread over the defaults here) and live (the redux
 * metadata jaen's Head merges on top).
 *
 * The catalog is read directly rather than through `useIntl`, because
 * gatsby's Head API renders outside the site's IntlProvider — the only
 * provider around it is jaen's own CMS one.
 *
 * The component has to stay named `Head`: gatsby-plugin-jaen recognizes the
 * head element by that name and only then wraps it in the site metadata
 * provider jaen's Head requires.
 */
export const Head: React.FC<SiteHeadProps> = props => {
  const locale = props.pageContext?.locale ?? defaultLocale;
  const messages = getMessages(locale);
  const route = routeMetadata[routeOf(props.location?.pathname ?? '/')];

  const stored = props.data?.jaenPage?.jaenPageMetadata;

  const jaenPage = {
    ...props.data?.jaenPage,
    jaenPageMetadata: {
      ...stored,
      title: stored?.title || (route && messages[route.title]),
      description:
        stored?.description ||
        (route ? messages[route.description] : messages.SiteDescription)
    }
  } as JaenHeadProps['data']['jaenPage'];

  return (
    <JaenHead {...props} data={{ ...props.data, jaenPage }}>
      {null}
    </JaenHead>
  );
};
