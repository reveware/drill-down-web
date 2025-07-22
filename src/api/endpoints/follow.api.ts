import { UserOverview } from '@/types/user';
import { apiClient } from '../client';
import { mockFetchFollowers } from '@/mocks/user';
import { PaginatedResponse } from '@/types/pagination';

const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export const FollowApi = {
  followUser: async (userId: string) => {
    return (await apiClient.post(`/users/${userId}/follow`)).data;
  },
  unfollowUser: async (userId: string) => {
    return (await apiClient.delete(`/users/${userId}/follow`)).data;
  },

  getUserFollowers: async (
    userId: string,
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<UserOverview>> => {
    if (useMocks) {
      return mockFetchFollowers(userId, page, pageSize);
    }
    return (
      await apiClient.get<PaginatedResponse<UserOverview>>(`/users/${userId}/followers`, {
        params: { page, page_size: pageSize },
      })
    ).data;
  },

  approveFollowRequest: async (followRequestId: string) => {
    return (await apiClient.put(`/follow-requests/${followRequestId}/approve`)).data;
  },

  rejectFollowRequest: async (followRequestId: string) => {
    return (await apiClient.delete(`/follow-requests/${followRequestId}/reject`)).data;
  },
};
