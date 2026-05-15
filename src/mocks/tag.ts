import { Tag } from '@/types/tag';
import { PaginatedResponse } from '@/types/pagination';

const mockTags: Tag[] = [
  { id: '1', name: 'javascript', slug: 'javascript', usage_count: 1250 },
  { id: '2', name: 'react', slug: 'react', usage_count: 980 },
  { id: '3', name: 'typescript', slug: 'typescript', usage_count: 750 },
];

export const mockSearchTags = (
  query: string,
  page: number = 1,
  pageSize: number = 25
): PaginatedResponse<Tag> => {
  const filteredTags = mockTags.filter((tag) =>
    tag.name.toLowerCase().includes(query.toLowerCase())
  );

  const totalItems = filteredTags.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const items = filteredTags.slice(startIndex, endIndex);

  return {
    data: items,
    page,
    total: totalItems,
    total_pages: totalPages,
    is_last_page: page >= totalPages,
  };
};
