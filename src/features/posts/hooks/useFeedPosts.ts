import { useInfiniteQuery } from '@tanstack/react-query';
import { PostOverview } from '@/types/post';
import { PostApi } from '@/api/endpoints/post.api';
import { PaginatedResponse } from '@/types/pagination';

export const useFeedPosts = () => {
  const query = useInfiniteQuery<PaginatedResponse<PostOverview>>({
    queryKey: ['posts'],
    queryFn: async ({ pageParam }) => await PostApi.getFeedPosts(pageParam as number),
    initialPageParam: 1,
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
