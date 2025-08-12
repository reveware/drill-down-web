import { useQuery } from '@tanstack/react-query';
import { AffinityTimeline, AffinityTimelineRequest } from '@/types/affinity';
import { AffinityApi } from '@/api/endpoints/affinity.api';

export const useAffinityTimeline = (userId: string, params?: AffinityTimelineRequest) => {
  return useQuery<AffinityTimeline, Error>({
    queryKey: ['user', userId, 'affinity-timeline', params],
    queryFn: () => AffinityApi.getAffinityTimeline(userId, params),
    enabled: !!userId,
  });
};
