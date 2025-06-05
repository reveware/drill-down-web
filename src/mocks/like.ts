import { Like } from '@/types/like';
import { mockFetchPosts } from './post';
import { mockUser } from './user';

export const mockFetchLikes = async (
  userId: number,
  page: number,
  pageSize: number
): Promise<Like[]> => {
  return (await mockFetchPosts(page, pageSize)).map((post) => ({
    id: post.id,
    post,
    author: mockUser,
    created_at: new Date(),
    updated_at: new Date(),
  }));
};
