import { useInfiniteQuery } from '@tanstack/react-query';
import { userApi } from '@/lib/api/endpoints/user.api';
import { Like } from '@/types/like';

const PAGE_SIZE = 5;

export const useUserLikes = (userId: number) => {
  return useInfiniteQuery<Like[]>({
    queryKey: ['user', userId, 'likes'],
    queryFn: ({ pageParam = 0 }) => userApi.getUserLikes(userId, pageParam as number, PAGE_SIZE),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.length : undefined,
  });
};
