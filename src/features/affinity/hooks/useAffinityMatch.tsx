import { useQuery } from '@tanstack/react-query';
import { UserAffinityScore } from '@/types/affinity';
import { AffinityApi } from '@/api/endpoints/affinity.api';
import { getApiErrorMessage } from '@/api/errors';
import { toast } from '@/lib/toast';

export const useAffinityMatch = (userId: string) => {
  return useQuery<UserAffinityScore, Error>({
    queryKey: ['user', userId, 'affinity-match'],
    queryFn: async () => {
      console.log('fetching affinity match');
      try {
        const data = await AffinityApi.getAffinityMatch(userId);
        console.log('data', data);
        return data;
      } catch (error) {
        console.log('error', error);
        toast.error(getApiErrorMessage(error));
        throw error;
      }
    },
    enabled: !!userId,
  });
};
