import { mockUser } from './user';
import { sleep } from '@/lib/utils';
import { PaginatedResponse } from '@/types/pagination.types';
import { PostOverview, PostTag } from '@/types/post.types';

const tag = (name: string): PostTag => ({ name, slug: name.toLowerCase().replace(/\s+/g, '-') });

export const imagePost = (id: string, seed?: number): PostOverview => ({
  id,
  author: mockUser,
  description: 'Lorem ipsum dolor sit amet...',
  like_count: Math.floor(Math.random() * 50) + 1,
  comment_count: Math.floor(Math.random() * 20) + 1,
  tags: [tag('random'), tag('tag'), tag('another tag')],
  images: [
    {
      url: `https://picsum.photos/seed/${seed || id}/400/400`,
      meta: {
        width: 400,
        height: 400,
        aspect_ratio: 1,
        byte_size: 1000,
        mime_type: 'image/jpeg',
      },
    },
  ],
  created_at: '2024-06-01T12:00:00.000Z',
  updated_at: '2024-06-01T12:00:00.000Z',
  is_liked: false,
});

const generatePosts = (length: number): PostOverview[] => {
  const posts: PostOverview[] = [];

  for (let i = 1; i <= length; i++) {
    posts.push(imagePost(i.toString(), i * 10));
  }

  return posts;
};

export async function mockFetchPosts(
  page: number,
  pageSize: number
): Promise<PaginatedResponse<PostOverview>> {
  await sleep(3);

  const postsToUse = generatePosts(20);
  const start = (page - 1) * pageSize; // Fix: page should be 1-indexed
  const end = start + pageSize;
  const totalPages = Math.ceil(postsToUse.length / pageSize);

  const data = postsToUse.slice(start, end);

  return {
    page,
    total: postsToUse.length,
    data,
    total_pages: totalPages,
    is_last_page: page >= totalPages,
  };
}
