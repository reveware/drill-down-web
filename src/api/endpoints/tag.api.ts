import { Tag } from '@/types/tag';
import { apiClient } from '../client';
import { PaginatedResponse } from '@/types/pagination';
import { PAGE_NUMBER, PAGE_SIZE } from '../defaults';

export const TagApi = {
  searchTags: async (query: string, page = PAGE_NUMBER, pageSize = PAGE_SIZE) => {
    return (
      await apiClient.get<PaginatedResponse<Tag>>('/tags/search', {
        params: { query, page, pageSize },
      })
    ).data;
  },
};
