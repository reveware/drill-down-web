import { useQuery } from '@tanstack/react-query';
import { TagApi } from '@/api/endpoints/tag.api';

export const useTagSearch = (search: string) => {
  const query = useQuery({
    queryKey: ['tag-search', search],
    queryFn: () => TagApi.searchTags(search, 1, 8),
    enabled: search.length > 0,
  });

  const tags = query.data?.data ?? [];

  return {
    tags,
    isLoading: query.isLoading,
  };
};
