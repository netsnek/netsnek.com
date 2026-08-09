export type { SearchIndex } from './types';

import { useMemo } from 'react';
import { TSearchResults } from '../../utils/search/types';
import useDocsSearch from './use-docs-search';
import TbBooks from '../../components/icons/tabler/TbBooks';

const useSearch = (
  query?: string
): {
  searchResult: TSearchResults;
  isLoading: boolean;
} => {
  const docsSearch = useDocsSearch(query || '');

  const searchResult = useMemo(() => {
    return {
      blog: {
        title: 'Blog',
        sections: docsSearch.searchResults.filter(
          section =>
            !!section.to?.startsWith('/docs/') ||
            !!section.results[0]?.to?.startsWith('/docs/')
        ),
        icon: <TbBooks />
      }
    };
  }, [docsSearch]);

  const isLoading = docsSearch.isLoading;

  return {
    searchResult,
    isLoading
  };
};

export default useSearch;
