import { defaultLocale, locales } from '../../locales/messages';

/**
 * Locale of a page path, derived from its first segment. The default
 * locale is unprefixed, every other locale lives under its prefix.
 */
export const localeOfPath = (path: string | undefined): string => {
  const first = (path ?? '').split('/').filter(Boolean)[0]?.toLowerCase();

  if (
    first &&
    first !== defaultLocale &&
    (locales as readonly string[]).includes(first)
  ) {
    return first;
  }

  return defaultLocale;
};

/** Docs tree root of a locale (`/docs/`, `/en/docs/`, ...). */
export const docsRootForLocale = (locale: string): string =>
  locale === defaultLocale ? '/docs/' : `/${locale}/docs/`;
