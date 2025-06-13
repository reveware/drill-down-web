import { mockUser } from './user';
import { sleep } from '@/lib/utils';
import { PaginatedResponse } from '@/types/pagination';
import { PhotoPost, PostOverview, PostTypes } from '@/types/post';
import { QuotePost } from '@/types/post';

export const photoPost = (id: string, seed?: number): PostOverview => ({
  id,
  author: mockUser,
  description: 'Lorem ipsum dolor sit amet...',
  like_count: Math.floor(Math.random() * 50) + 1,
  comment_count: Math.floor(Math.random() * 20) + 1,
  tags: ['random', 'tag', 'another tag'],
  type: PostTypes.PHOTO,
  content: {
    urls: [`https://picsum.photos/seed/${seed || id}/400/400`],
  },
  created_at: '2024-06-01T12:00:00.000Z',
  updated_at: '2024-06-01T12:00:00.000Z',
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
  content: {
    quote: "The stars don't look bigger, but they do look brighter.",
    author: 'Sally Ride',
  },
});

export const generatePosts = (length: number, type?: PostTypes): PostOverview[] => {
  const posts: PostOverview[] = [];

  if (type === PostTypes.PHOTO) {
    // Generate only photo posts
    for (let i = 1; i <= length; i++) {
      posts.push(photoPost(i.toString(), i * 10));
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
        posts.push(photoPost(i.toString(), i * 10));
      }
    }
  }

  return posts;
};

export async function mockFetchPosts<T extends PhotoPost | QuotePost>(
  page: number,
  pageSize: number,
  type?: PostTypes
): Promise<PaginatedResponse<T>> {
  await sleep(3);

  const postsToUse = generatePosts(20, type);
  const start = page * pageSize;
  const end = start + pageSize;
  const totalPages = Math.ceil(postsToUse.length / pageSize);

  const actualStart = start >= postsToUse.length ? start % postsToUse.length : start;
  const actualEnd = Math.min(actualStart + pageSize, postsToUse.length);

  return {
    page,
    total: postsToUse.length,
    data: postsToUse.slice(actualStart, actualEnd) as T[],
    total_pages: totalPages,
    is_last_page: actualEnd >= postsToUse.length,
  };
}
