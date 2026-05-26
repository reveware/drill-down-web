import { apiClient } from '../client';

import { UserDetail, UserOverview } from '@/types/user';
import { PaginatedResponse } from '@/types/pagination';
import {
  mockCurrentUser,
  mockFetchTags,
  mockFetchUser,
  mockSearchUsers,
  mockUpdateUser,
} from '@/mocks/user';
import { TagCount } from '@/types/tag';
import { UpdateUserDto } from '@/types/user';
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
  getCurrentUser: async (): Promise<UserDetail> => {
    if (USE_MOCKS) {
      return mockCurrentUser();
    }
    return (await apiClient.get<UserDetail>('/users/me')).data;
  },

  getUser: async (userId: string): Promise<UserDetail> => {
    if (USE_MOCKS) {
      return mockFetchUser(userId);
    }
    return (await apiClient.get<UserDetail>(`/users/${userId}`)).data;
  },

  updateUser: async (userId: string, payload: UpdateUserDto): Promise<UserDetail> => {
    const { avatar, date_of_birth, ...rest } = payload;
    const fields = {
      ...rest,
      ...(date_of_birth ? { date_of_birth: new Date(date_of_birth).toISOString() } : {}),
    };
    if (USE_MOCKS) {
      return mockUpdateUser(userId, fields);
    }
    if (avatar) {
      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
      formData.append('avatar', avatar);
      return (
        await apiClient.put<UserDetail>(`/users/${userId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      ).data;
    }
    return (await apiClient.put<UserDetail>(`/users/${userId}`, fields)).data;
  },

  getUserTags: async (userId: string): Promise<TagCount[]> => {
    if (USE_MOCKS) {
      return mockFetchTags(userId);
    }
    return (await apiClient.get<TagCount[]>(`/users/${userId}/tags/post-count`)).data;
  },

  searchUsers: async (params: SearchUsersParams): Promise<PaginatedResponse<UserOverview>> => {
    if (USE_MOCKS) {
      return mockSearchUsers(params);
    }
    return (await apiClient.get<PaginatedResponse<UserOverview>>('/users', { params })).data;
  },
};
