import { sleep } from '@/lib/utils';
import { PostOverview, PostTypes } from '@/types/post';
import { mockUser } from './user';

export const photoPost = (id: number): PostOverview => ({
  id,
  author: mockUser,
  description: 'Lorem ipsum dolor sit amet...',
  like_count: 26,
  comment_count: 14,
  tags: [],
  type: PostTypes.PHOTO,
  content: {
    urls: ['https://picsum.photos/200/300'],
  },
  created_at: '2024-06-01T12:00:00.000Z',
  updated_at: '2024-06-01T12:00:00.000Z',
});

export const quotePost = (id: number): PostOverview => ({
  id,
  author: mockUser,
  description: 'Inspirational quote...',
  like_count: 8,
  comment_count: 3,
  tags: [],
  created_at: '2024-06-01T12:00:00.000Z',
  updated_at: '2024-06-01T12:00:00.000Z',
  type: PostTypes.QUOTE,
  content: {
    quote: "The stars don't look bigger, but they do look brighter.",
    author: 'Sally Ride',
  },
});
const mockPosts: PostOverview[] = [
  photoPost(1),
  quotePost(2),
  photoPost(3),
  photoPost(4),
  quotePost(5),
];

export async function fetchMockPosts(page: number, pageSize: number): Promise<PostOverview[]> {
  await sleep(3);
  const start = page * pageSize;
  return mockPosts.slice(start, start + pageSize);
}
