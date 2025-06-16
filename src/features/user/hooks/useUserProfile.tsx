import { useQuery } from '@tanstack/react-query';
import { UserDetail } from '@/types/user';
import { UserApi } from '@/api/endpoints/user.api';

export const useUserProfile = (userId: string) => {
  return useQuery<UserDetail, Error>({
    queryKey: ['user', userId],
    queryFn: () => UserApi.getUser(userId),
    enabled: !!userId,
  });
};
