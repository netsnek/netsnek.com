import { useMemo } from 'react';
import { useJaenPageIndex } from 'jaen';

import { useLocalizeHref, usePageLocale } from '../contexts/locale';
import { defaultLocale } from '../locales/messages';

/**
 * A top-level section of the documentation, flattened for card rendering.
 */
export interface DocsSection {
  /** Jaen page id of the section. */
  id: string;
  /** Slug of the section page, e.g. `qtamp`. */
  slug: string;
  /** Path in the current locale, e.g. `/en/docs/qtamp`. */
  href: string;
  /** Title of the section in the current locale. */
  title: string;
  /** Description of the section in the current locale (may be empty). */
  description: string;
  /** Preview image from `jaenPageMetadata.image`, when the CMS carries one. */
  image?: string;
}

/**
 * Jaen page id of the docs index of one locale. A localized CMS tree lives
 * under its locale prefix (`JaenPage /en/docs/`) and carries its own titles
 * and descriptions; the default locale keeps the unprefixed id.
 */
const docsIndexId = (locale: string, prefix: string): string =>
  !prefix || locale === defaultLocale
    ? 'JaenPage /docs/'
    : `JaenPage /${prefix}/docs/`;

export interface UseDocsSectionsOptions {
  /** Maximum number of sections to return (all of them when unset). */
  limit?: number;
}

/**
 * The top-level sections of `/docs` for the CURRENT locale.
 *
 * The locale's own docs tree is the source: on `/en/` the children of
 * `JaenPage /en/docs/` are listed with the English titles and descriptions.
 * A locale without a translated tree falls back to the canonical one so the
 * section never renders empty just because a translation is missing — the
 * links stay in the current locale either way, because every href is built
 * through `useLocalizeHref`.
 *
 * Leaf pages are deliberately not walked: only the sections themselves are
 * surfaced, mirroring what `/docs` shows as its index.
 */
export const useDocsSections = (
  options?: UseDocsSectionsOptions
): DocsSection[] => {
  const { locale, prefix } = usePageLocale();
  const localizeHref = useLocalizeHref();

  const localized = useJaenPageIndex({
    jaenPageId: docsIndexId(locale, prefix),
    sortByPageOrder: true
  });

  const canonical = useJaenPageIndex({
    jaenPageId: docsIndexId(defaultLocale, ''),
    sortByPageOrder: true
  });

  const childPages = localized.childPages.length
    ? localized.childPages
    : canonical.childPages;

  const limit = options?.limit;

  return useMemo(() => {
    const sections = childPages
      .map((child): DocsSection => {
        const metadata = child.jaenPageMetadata ?? {};
        const slug = child.slug ?? '';

        return {
          id: child.id,
          slug,
          href: localizeHref(`/docs/${slug}`),
          title: metadata.title ?? slug,
          description: metadata.description ?? '',
          image: metadata.image ?? undefined
        };
      })
      // A page without a slug has no reachable path, a page without a title
      // has nothing to put on a card.
      .filter(section => section.slug && section.title);

    return limit ? sections.slice(0, limit) : sections;
  }, [childPages, locale, prefix, limit]);
};

export default useDocsSections;
