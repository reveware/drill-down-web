import { useInfiniteQuery } from '@tanstack/react-query';
import { Like } from '@/types/like';
import { PaginatedResponse } from '@/types/pagination';
import { LikeApi } from '@/api/endpoints/like.api';

export const usePostLikes = (postId: string) => {
  const query = useInfiniteQuery<PaginatedResponse<Like>>({
    queryKey: ['postLikes', postId],
    queryFn: async ({ pageParam }) => await LikeApi.getPostLikes(postId, pageParam as number),
    initialPageParam: 1,
    enabled: !!postId,
    getNextPageParam: (lastPage) => (lastPage.is_last_page ? undefined : lastPage.page + 1),
  });

  const likes = query.data?.pages.flatMap((p) => p.data) ?? [];

  return {
    likes,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
  };
};
