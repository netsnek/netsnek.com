export type { SearchIndex } from './types';

import { useMemo } from 'react';
import { usePageLocale } from '../../contexts/locale';
import { TSearchResults } from '../../utils/search/types';
import { docsRootForLocale } from '../../utils/search/locale';
import useDocsSearch from './use-docs-search';
import TbBooks from '../../components/icons/tabler/TbBooks';

const useSearch = (
  query?: string
): {
  searchResult: TSearchResults;
  isLoading: boolean;
} => {
  const docsSearch = useDocsSearch(query || '');
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
