import { apiClient } from '../client';

import { UserDetail } from '@/types/user';
import { mockFetchTags, mockFetchUser } from '@/mocks/user';
import { TagCount } from '@/types/tag';
import { USE_MOCKS } from '../constants';

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
};
