import { useQuery } from '@tanstack/react-query';
import { UserOverview } from '@/types/user';
import { userApi } from '@/lib/api/endpoints/user.api';

export const useUserProfile = (userId: number) => {
  return useQuery<UserOverview, Error>({
    queryKey: ['user', userId],
    queryFn: () => userApi.getUser(userId),
    enabled: !!userId,
  });
};
