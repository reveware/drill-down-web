import { apiClient } from '../client';
import { PostOverview, PostSearchParams, CreatePost } from '@/types/post.types';
import { mockFetchPosts } from '@/mocks/post';
import { PaginatedResponse } from '@/types/pagination.types';
import { PAGE_NUMBER, PAGE_SIZE, USE_MOCKS } from '../constants';

export const PostApi = {
  getFeedPosts: async (
    page: number = PAGE_NUMBER,
    pageSize: number = PAGE_SIZE
  ): Promise<PaginatedResponse<PostOverview>> => {
    if (USE_MOCKS) {
      return await mockFetchPosts(page, pageSize);
    }
    return (
      await apiClient.get<PaginatedResponse<PostOverview>>('/posts/feed', {
        params: { page, page_size: pageSize },
      })
    ).data;
  },

  searchPosts: async (
    search: PostSearchParams,
    page: number = PAGE_NUMBER,
    pageSize: number = PAGE_SIZE
  ): Promise<PaginatedResponse<PostOverview>> => {
    if (USE_MOCKS) {
      return await mockFetchPosts(page, pageSize);
    }
    return (
      await apiClient.get<PaginatedResponse<PostOverview>>('/posts', {
        params: { ...search, page, page_size: pageSize },
      })
    ).data;
  },

  createPost: async (post: CreatePost): Promise<PostOverview> => {
    const formData = new FormData();
    post.images.forEach((file) => formData.append('images', file));
    post.tags.forEach((tag, i) => formData.append(`tags[${i}]`, tag));

    if (post.description) {
      formData.append('description', post.description);
    }

    return (
      await apiClient.post('/posts/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    ).data;
  },

  deletePost: async (postId: string): Promise<boolean> => {
    if (USE_MOCKS) {
      return true;
    }
    return (await apiClient.delete(`/posts/${postId}`)).data;
  },
};
