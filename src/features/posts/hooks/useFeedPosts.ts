import { useInfiniteQuery } from '@tanstack/react-query';
import { PostOverview } from '@/types/post';
import { postApi } from '@/api/endpoints/post.api';
import { PaginatedResponse } from '@/types/pagination';

const PAGE_SIZE = 5;

export const useFeedPosts = () => {
  const query = useInfiniteQuery<PaginatedResponse<PostOverview>>({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = 0 }) =>
      await postApi.getFeedPosts(pageParam as number, PAGE_SIZE),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.is_last_page ? undefined : lastPage.page + 1;
    },
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
