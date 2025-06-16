import { apiClient } from '../client';
import { PhotoPost, PostOverview, PostSearchParams, QuotePost, PostTypes } from '@/types/post';
import { mockFetchPosts } from '@/mocks/post';
import { PaginatedResponse } from '@/types/pagination';
import { PAGE_NUMBER, PAGE_SIZE } from '../defaults';

const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export const PostApi = {
  getFeedPosts: async (
    page: number = PAGE_NUMBER,
    limit: number = PAGE_SIZE
  ): Promise<PaginatedResponse<PostOverview>> => {
    if (useMocks) {
      return await mockFetchPosts(page, limit);
    }
    return (await apiClient.get<PaginatedResponse<PostOverview>>('/posts/feed')).data;
  },

  async searchPosts(
    search: PostSearchParams,
    page: number = PAGE_NUMBER,
    limit: number = PAGE_SIZE
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

  getRecommendedPosts: async <T extends PhotoPost | QuotePost>(
    userId: number,
    type: PostTypes = PostTypes.PHOTO,
    page: number = PAGE_NUMBER,
    limit: number = PAGE_SIZE
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
};
