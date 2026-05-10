import { apiClient } from '../client';

import { UserDetail } from '@/types/user';
import { mockFetchTags, mockFetchUser } from '@/mocks/user';
import { TagCount } from '@/types/tag';

const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export const UserApi = {
  getUser: async (userId: string): Promise<UserDetail> => {
    if (useMocks) {
      return mockFetchUser(userId);
    }
    return (await apiClient.get<UserDetail>(`/users/${userId}`)).data;
  },

  getUserTags: async (userId: string): Promise<TagCount[]> => {
    if (useMocks) {
      return mockFetchTags(userId);
    }
    return (await apiClient.get<TagCount[]>(`/users/${userId}/tags/post-count`)).data;
  },
};
