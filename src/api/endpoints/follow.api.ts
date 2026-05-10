import { UserOverview } from '@/types/user';
import { FollowRequest } from '@/types/follow';
import { apiClient } from '../client';
import { mockFetchPendingFollowRequests, mockFetchFollowers } from '@/mocks/follow';
import { PaginatedResponse } from '@/types/pagination';
import { PAGE_NUMBER, PAGE_SIZE } from '../defaults';

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
    page: number = PAGE_NUMBER,
    pageSize: number = PAGE_SIZE
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

  getPendingFollowRequests: async (
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<FollowRequest>> => {
    if (useMocks) {
      return mockFetchPendingFollowRequests(page, pageSize);
    }
    return (
      await apiClient.get<PaginatedResponse<FollowRequest>>('/follow-requests/pending', {
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
