import { PostApi } from '@/api/endpoints/post.api';
import { PaginatedResponse } from '@/types/pagination';
import { PostOverview, PostSearchParams } from '@/types/post';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useSearchPosts = (search: PostSearchParams) => {
  const query = useInfiniteQuery<PaginatedResponse<PostOverview>>({
    queryKey: ['search', search],
    queryFn: ({ pageParam }) => PostApi.searchPosts(search, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.is_last_page ? undefined : lastPage.page + 1),
  });

  const posts = query.data?.pages.flatMap((page) => page.data) ?? [];

  return {
    posts,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
  };
};
