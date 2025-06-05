import { mockUser } from './user';
import { sleep } from '@/lib/utils';
import { PostOverview, PostTypes } from '@/types/post';

export const photoPost = (id: number, seed?: number): PostOverview => ({
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

export const quotePost = (id: number): PostOverview => ({
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
      posts.push(photoPost(i, i * 10));
    }
  } else if (type === PostTypes.QUOTE) {
    // Generate only quote posts
    for (let i = 1; i <= length; i++) {
      posts.push(quotePost(i));
    }
  } else {
    // Generate mixed posts (default behavior)
    for (let i = 1; i <= length; i++) {
      if (i % 3 === 0) {
        posts.push(quotePost(i));
      } else {
        posts.push(photoPost(i, i * 10));
      }
    }
  }

  return posts;
};

const mockPosts: PostOverview[] = generatePosts(20);

export async function mockFetchPosts(
  page: number,
  pageSize: number,
  type?: PostTypes
): Promise<PostOverview[]> {
  await sleep(3);

  let postsToUse = mockPosts;

  if (type) {
    postsToUse = mockPosts.filter((post) => post.type === type);
  }

  const start = page * pageSize;
  const end = start + pageSize;

  if (start >= postsToUse.length) {
    const cycleStart = start % postsToUse.length;
    const cycleEnd = Math.min(cycleStart + pageSize, postsToUse.length);
    return postsToUse.slice(cycleStart, cycleEnd);
  }

  return postsToUse.slice(start, end);
}
