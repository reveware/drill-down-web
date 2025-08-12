import { apiClient } from '../client';
import {
  UserAffinityScore,
  AffinityTimeline,
  AffinityTimelineRequest,
  AffinityType,
} from '@/types/affinity';
import { mockFetchAffinityMatch, mockFetchAffinityTimeline } from '@/mocks/affinity';

const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export const AffinityApi = {
  getAffinityMatch: async (userId: string): Promise<UserAffinityScore> => {
    if (useMocks) {
      return mockFetchAffinityMatch(userId);
    }
    return (await apiClient.get<UserAffinityScore>(`/users/${userId}/affinities/match`)).data;
  },

  getAffinityTimeline: async (
    userId: string,
    params?: AffinityTimelineRequest
  ): Promise<AffinityTimeline> => {
    if (useMocks) {
      return mockFetchAffinityTimeline(userId, params);
    }

    const queryParams = new URLSearchParams();
    queryParams.append('type', params?.type || AffinityType.MOOD);
    if (params?.start_date) queryParams.append('start_date', params.start_date);
    if (params?.end_date) queryParams.append('end_date', params.end_date);
    if (params?.interval) queryParams.append('interval', params.interval);

    const queryString = queryParams.toString();
    const url = `/users/${userId}/affinities/timeline${queryString ? `?${queryString}` : ''}`;

    return (await apiClient.get<AffinityTimeline>(url)).data;
  },
};
