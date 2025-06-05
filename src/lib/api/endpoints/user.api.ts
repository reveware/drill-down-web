import { apiClient } from '../client';
import { ApiResponse } from '@/types/response';
import { UserDetail, UserOverview } from '@/types/user';
import { Like } from '@/types/like';
import { mockFetchFollowers, mockFetchUser } from '@/mocks/user';
import { mockFetchLikes } from '@/mocks/like';

const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export const userApi = {
  getUser: async (userId: number): Promise<UserDetail> => {
    if (useMocks) {
      return mockFetchUser(userId);
    }
    return (await apiClient.get<ApiResponse<UserDetail>>(`/users/${userId}`)).data.data;
  },

  getUserFollowers: async (
    userId: number,
    page: number,
    pageSize: number
  ): Promise<UserOverview[]> => {
    if (useMocks) {
      return mockFetchFollowers(userId, page, pageSize);
    }
    return (
      await apiClient.get<ApiResponse<UserOverview[]>>(`/users/${userId}/followers`, {
        params: { page, pageSize },
      })
    ).data.data;
  },

  getUserLikes: async (userId: number, page: number, pageSize: number): Promise<Like[]> => {
    if (useMocks) {
      return mockFetchLikes(userId, page, pageSize);
    }
    return (
      await apiClient.get<ApiResponse<Like[]>>(`/users/${userId}/likes`, {
        params: { page, pageSize },
      })
    ).data.data;
  },
};
