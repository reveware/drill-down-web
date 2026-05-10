import { useInfiniteQuery } from '@tanstack/react-query';
import { PersonaApi, SearchPersonasParams } from '@/api/endpoints/persona.api';
import { PersonaOverview } from '@/types/persona';
import { PaginatedResponse } from '@/types/pagination';
import { useDebounce } from '@/hooks/useDebounce';

interface UsePersonaSearchOptions {
  query?: string;
  isActive?: boolean;
  enabled?: boolean;
}

const DEBOUNCE_MS = 300;

export const usePersonaSearch = ({
  query,
  isActive = true,
  enabled = true,
}: UsePersonaSearchOptions = {}) => {
  const debouncedQuery = useDebounce(query?.trim() ?? '', DEBOUNCE_MS);

  const params: SearchPersonasParams = {
    ...(debouncedQuery ? { query: debouncedQuery } : {}),
    is_active: isActive,
  };

  const result = useInfiniteQuery<PaginatedResponse<PersonaOverview>>({
    queryKey: ['personas', 'search', params],
    queryFn: ({ pageParam = 1 }) => PersonaApi.search({ ...params, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.is_last_page ? undefined : lastPage.page + 1),
    enabled,
  });

  const personas = result.data?.pages.flatMap((p) => p.data) ?? [];

  return {
    personas,
    isLoading: result.isLoading,
    isFetchingNextPage: result.isFetchingNextPage,
    hasNextPage: result.hasNextPage ?? false,
    fetchNextPage: result.fetchNextPage,
  };
};
