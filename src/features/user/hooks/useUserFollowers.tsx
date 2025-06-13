import { useInfiniteQuery } from '@tanstack/react-query';
import { userApi } from '@/api/endpoints/user.api';
import { UserOverview } from '@/types/user';

const PAGE_SIZE = 25;

export const useUserFollowers = (userId: number) => {
  return useInfiniteQuery<UserOverview[]>({
    queryKey: ['user', userId, 'followers'],
    queryFn: ({ pageParam = 0 }) =>
      userApi.getUserFollowers(userId, pageParam as number, PAGE_SIZE),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.length : undefined,
  });
};
