import { useInfiniteQuery } from '@tanstack/react-query';
import { LikeApi } from '@/api/endpoints/like.api';
import { Like } from '@/types/like';
import { PaginatedResponse } from '@/types/pagination';

const PAGE_SIZE = 5;

export const useUserLikes = (userId: string) => {
  const query = useInfiniteQuery<PaginatedResponse<Like>>({
    queryKey: ['user', userId, 'likes'],
    queryFn: ({ pageParam = 0 }) => LikeApi.getUserLikes(userId, pageParam as number, PAGE_SIZE),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.is_last_page ? undefined : lastPage.page + 1),
  });

  const likes = query.data?.pages.flatMap((page) => page.data) ?? [];

  return {
    likes,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
  };
};
