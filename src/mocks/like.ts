import { Like } from '@/types/like';
import { mockFetchPosts } from './post';
import { mockUser } from './user';
import { PaginatedResponse } from '@/types/pagination';
import { PostTypes } from '@/types/post';

export const mockFetchLikes = async (
  page: number,
  pageSize: number
): Promise<PaginatedResponse<Like>> => {
  const posts = await mockFetchPosts(page, pageSize, PostTypes.IMAGE);
  const likes = posts.data.map((post) => ({
    id: post.id,
    post,
    author: mockUser,
    created_at: new Date(),
    updated_at: new Date(),
  }));

  return {
    page: page,
    total: posts.total,
    total_pages: posts.total_pages,
    is_last_page: posts.is_last_page,
    data: likes,
  };
};
