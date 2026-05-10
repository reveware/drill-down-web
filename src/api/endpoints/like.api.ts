import { Like } from '@/types/like';
import { apiClient } from '../client';
import { mockFetchLikes } from '@/mocks/like';
import { PaginatedResponse } from '@/types/pagination';
import { PAGE_NUMBER, PAGE_SIZE, USE_MOCKS } from '../constants';

export const LikeApi = {
  likePost: async (postId: string) => {
    return (await apiClient.post(`/posts/${postId}/likes`)).data;
  },
  unlikePost: async (postId: string) => {
    return (await apiClient.delete(`/posts/${postId}/likes`)).data;
  },

  getUserLikes: async (
    userId: string,
    page: number = PAGE_NUMBER,
    pageSize: number = PAGE_SIZE
  ): Promise<PaginatedResponse<Like>> => {
    if (USE_MOCKS) {
      return mockFetchLikes(page, pageSize);
    }
    return (
      await apiClient.get<PaginatedResponse<Like>>(`/users/${userId}/likes`, {
        params: { page, page_size: pageSize },
      })
    ).data;
  },

  getPostLikes: async (
    postId: string,
    page: number = PAGE_NUMBER,
    pageSize: number = PAGE_SIZE
  ): Promise<PaginatedResponse<Like>> => {
    if (USE_MOCKS) {
      return mockFetchLikes(page, pageSize);
    }
    return (
      await apiClient.get<PaginatedResponse<Like>>(`/posts/${postId}/likes`, {
        params: { page, page_size: pageSize },
      })
    ).data;
  },
};
