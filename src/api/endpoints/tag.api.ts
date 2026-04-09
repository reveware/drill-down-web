import { Tag } from '@/types/tag';
import { apiClient } from '../client';
import { PaginatedResponse } from '@/types/pagination';
import { PAGE_NUMBER, PAGE_SIZE, USE_MOCKS } from '../constants';
import { mockSearchTags } from '@/mocks/tag';

export const TagApi = {
  searchTags: async (query: string, page = PAGE_NUMBER, pageSize = PAGE_SIZE) => {
    if (USE_MOCKS) {
      return mockSearchTags(query, page, pageSize);
    }
    return (
      await apiClient.get<PaginatedResponse<Tag>>('/tags/search', {
        params: { query, page, page_size: pageSize },
      })
    ).data;
  },
};
