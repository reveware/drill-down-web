import { apiClient } from '../client';

import { UserDetail, UserOverview } from '@/types/user';
import { Like } from '@/types/like';
import { mockFetchFollowers, mockFetchTags, mockFetchUser } from '@/mocks/user';
import { mockFetchLikes } from '@/mocks/like';
import { TagCount } from '@/types/tag';
import { PaginatedResponse } from '@/types/pagination';

const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export const UserApi = {
  getUser: async (userId: string): Promise<UserDetail> => {
    if (useMocks) {
      return mockFetchUser(userId);
    }
    return (await apiClient.get<UserDetail>(`/users/${userId}`)).data;
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

  getUserLikes: async (
    userId: string,
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<Like>> => {
    if (useMocks) {
      return mockFetchLikes(userId, page, pageSize);
    }
    return (
      await apiClient.get<PaginatedResponse<Like>>(`/users/${userId}/likes`, {
        params: { page, page_size: pageSize },
      })
    ).data;
  },

  getUserTags: async (userId: string): Promise<TagCount[]> => {
    if (useMocks) {
      return mockFetchTags(userId);
    }
    return (await apiClient.get<TagCount[]>(`/users/${userId}/tags/post-count`)).data;
  },
};
