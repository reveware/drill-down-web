import { mockUser } from './user';
import { sleep } from '@/lib/utils';
import { PaginatedResponse } from '@/types/pagination';
import { ImagePost, PostOverview, PostTypes } from '@/types/post';
import { QuotePost } from '@/types/post';

export const imagePost = (id: string, seed?: number): PostOverview => ({
  id,
  author: mockUser,
  description: 'Lorem ipsum dolor sit amet...',
  like_count: Math.floor(Math.random() * 50) + 1,
  comment_count: Math.floor(Math.random() * 20) + 1,
  tags: ['random', 'tag', 'another tag'],
  type: PostTypes.IMAGE,
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

export const quotePost = (id: string): PostOverview => ({
  id,
  author: mockUser,
  description: 'Inspirational quote...',
  like_count: Math.floor(Math.random() * 30) + 1,
  comment_count: Math.floor(Math.random() * 10) + 1,
  tags: [
    'quote',
    'tag',
    'another tag',
    'random',
    'tag',
    'another tag',
    'random',
    'tag',
    'another tag',
  ],
  created_at: '2024-06-01T12:00:00.000Z',
  updated_at: '2024-06-01T12:00:00.000Z',
  type: PostTypes.QUOTE,
  quote: "The stars don't look bigger, but they do look brighter.",
  quote_author: 'Sally Ride',
  is_liked: true,
});

export const generatePosts = (length: number, type?: PostTypes): PostOverview[] => {
  const posts: PostOverview[] = [];

  if (type === PostTypes.IMAGE) {
    // Generate only photo posts
    for (let i = 1; i <= length; i++) {
      posts.push(imagePost(i.toString(), i * 10));
    }
  } else if (type === PostTypes.QUOTE) {
    // Generate only quote posts
    for (let i = 1; i <= length; i++) {
      posts.push(quotePost(i.toString()));
    }
  } else {
    // Generate mixed posts (default behavior)
    for (let i = 1; i <= length; i++) {
      if (i % 3 === 0) {
        posts.push(quotePost(i.toString()));
      } else {
        posts.push(imagePost(i.toString(), i * 10));
      }
    }
  }

  return posts;
};

export async function mockFetchPosts<T extends ImagePost | QuotePost>(
  page: number,
  pageSize: number,
  type?: PostTypes
): Promise<PaginatedResponse<T>> {
  await sleep(3);

  const postsToUse = generatePosts(20, type);
  const start = (page - 1) * pageSize; // Fix: page should be 1-indexed
  const end = start + pageSize;
  const totalPages = Math.ceil(postsToUse.length / pageSize);

  const data = postsToUse.slice(start, end) as T[];

  return {
    page,
    total: postsToUse.length,
    data,
    total_pages: totalPages,
    is_last_page: page >= totalPages,
  };
}
