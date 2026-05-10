import { apiClient } from '../client';

import { UserDetail, UserOverview } from '@/types/user';
import { PaginatedResponse } from '@/types/pagination';
import { mockFetchTags, mockFetchUser } from '@/mocks/user';
import { TagCount } from '@/types/tag';
import { USE_MOCKS } from '../constants';

export interface SearchUsersParams {
  query?: string;
  is_following?: boolean;
  is_follower?: boolean;
  is_mutual?: boolean;
  page?: number;
  page_size?: number;
}

export const UserApi = {
  getUser: async (userId: string): Promise<UserDetail> => {
    if (USE_MOCKS) {
      return mockFetchUser(userId);
    }
    return (await apiClient.get<UserDetail>(`/users/${userId}`)).data;
  },

  getUserTags: async (userId: string): Promise<TagCount[]> => {
    if (USE_MOCKS) {
      return mockFetchTags(userId);
    }
    return (await apiClient.get<TagCount[]>(`/users/${userId}/tags/post-count`)).data;
  },

  searchUsers: async (params: SearchUsersParams): Promise<PaginatedResponse<UserOverview>> => {
    return (await apiClient.get<PaginatedResponse<UserOverview>>('/users', { params })).data;
  },
};
