import { apiClient } from '../client';
import { PhotoPost, PostOverview, PostSearchParams, QuotePost, PostTypes } from '@/types/post';
import { mockFetchPosts } from '@/mocks/post';
import { PaginatedResponse } from '@/types/pagination';

const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export const postApi = {
  getFeedPosts: async (page: number, limit: number): Promise<PaginatedResponse<PostOverview>> => {
    if (useMocks) {
      return await mockFetchPosts(page, limit);
    }
    return (await apiClient.get<PaginatedResponse<PostOverview>>('/posts/feed')).data;
  },

  getRecommendedPosts: async <T extends PhotoPost | QuotePost>(
    userId: number,
    page: number,
    limit: number,
    type: PostTypes = PostTypes.PHOTO
  ): Promise<PaginatedResponse<T>> => {
    if (useMocks) {
      return (await mockFetchPosts(page, limit, type)) as PaginatedResponse<T>;
    }
    return (
      await apiClient.get<PaginatedResponse<T>>('/posts/recommended', {
        params: { userId, type, page, limit },
      })
    ).data;
  },

  async searchPosts(
    search: PostSearchParams,
    page: number,
    limit: number
  ): Promise<PaginatedResponse<PostOverview>> {
    if (useMocks) {
      return await mockFetchPosts(page, limit);
    }
    return (
      await apiClient.get<PaginatedResponse<PostOverview>>('/posts', {
        params: { ...search, page, limit },
      })
    ).data;
  },
};
