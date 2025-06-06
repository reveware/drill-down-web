import { userApi } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export const useUserTags = (userId: number) => {
  return useQuery({
    queryKey: ['user-tags', userId],
    queryFn: async () => {
      return await userApi.getUserTags(userId);
    },
  });
};
