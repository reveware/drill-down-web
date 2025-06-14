import { useQuery } from '@tanstack/react-query';
import { UserDetail } from '@/types/user';
import { userApi } from '@/api/endpoints/user.api';

export const useUserProfile = (userId: string) => {
  return useQuery<UserDetail, Error>({
    queryKey: ['user', userId],
    queryFn: () => userApi.getUser(userId),
    enabled: !!userId,
  });
};
