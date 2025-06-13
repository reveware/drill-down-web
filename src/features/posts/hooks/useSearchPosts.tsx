import { postApi } from '@/api';
import { PostOverview, PostSearchParams } from '@/types/post';
import { useInfiniteQuery } from '@tanstack/react-query';

const PAGE_SIZE = 5;

export const useSearchPosts = (search: PostSearchParams) => {
  return useInfiniteQuery<PostOverview[]>({
    queryKey: ['search', search],
    queryFn: ({ pageParam = 0 }) => postApi.searchPosts(search, pageParam as number, PAGE_SIZE),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.length : undefined,
  });
};
