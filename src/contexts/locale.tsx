import React, { createContext, useContext } from 'react';

/**
 * A sibling translation of the current page, as emitted by
 * gatsby-source-jaen's localized page generation into the page context.
 */
export interface PageTranslation {
  locale: string;
  prefix: string;
  path: string;
}

export interface PageLocaleContextValue {
  /** Locale of the current page (`de` when the page carries none). */
  locale: string;
  /** Path prefix of the current locale (empty for the default locale). */
  prefix: string;
  /** Sibling translations of the current page. */
  translations: PageTranslation[];
}

export const PageLocaleContext = createContext<PageLocaleContextValue>({
  locale: 'de',
  prefix: '',
  translations: []
});

/**
 * Locale info of the current page, provided by the site's wrapPageElement
 * from the Gatsby page context.
 */
export const usePageLocale = (): PageLocaleContextValue =>
  useContext(PageLocaleContext);
