import { userApi } from '@/api';
import { useQuery } from '@tanstack/react-query';

export const useUserTags = (userId: string) => {
  return useQuery({
    queryKey: ['user-tags', userId],
    queryFn: async () => {
      return await userApi.getUserTags(userId);
    },
  });
};
