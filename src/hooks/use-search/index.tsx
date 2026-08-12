export type { SearchIndex } from './types';

import { useMemo } from 'react';
import { usePageLocale } from '../../contexts/locale';
import { TSearchResults } from '../../utils/search/types';
import { docsRootForLocale } from '../../utils/search/locale';
import useDocsSearch from './use-docs-search';
import TbBooks from '../../components/icons/tabler/TbBooks';

/**
 * @param query The current search query.
 * @param enabled Whether the search index may be loaded. Left off until the
 *   user actually opens search, which keeps /search-index.json off the
 *   critical path of every page load.
 */
const useSearch = (
  query?: string,
  enabled = true
): {
  searchResult: TSearchResults;
  isLoading: boolean;
} => {
  const docsSearch = useDocsSearch(query || '', enabled);
  const { locale } = usePageLocale();

  const searchResult = useMemo(() => {
    const docsRoot = docsRootForLocale(
      locale.split(/[-_]/)[0]?.toLowerCase() || 'de'
    );

    return {
      blog: {
        title: 'Blog',
        sections: docsSearch.searchResults.filter(
          section =>
            !!section.to?.startsWith(docsRoot) ||
            !!section.results[0]?.to?.startsWith(docsRoot)
        ),
        icon: <TbBooks />
      }
    };
  }, [docsSearch, locale]);

  const isLoading = docsSearch.isLoading;

  return {
    searchResult,
    isLoading
  };
};

export default useSearch;
