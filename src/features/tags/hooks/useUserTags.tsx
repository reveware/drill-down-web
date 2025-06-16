import { UserApi } from '@/api/endpoints/user.api';
import { useQuery } from '@tanstack/react-query';

export const useUserTags = (userId: string) => {
  return useQuery({
    queryKey: ['user-tags', userId],
    queryFn: async () => {
      return await UserApi.getUserTags(userId);
    },
  });
};
