import { sleep } from '@/lib/utils';
import { PostOverview, PostTypes } from '@/types/post';
import { mockUser } from './user';

const mockPosts: PostOverview[] = [
  {
    id: 1,
    author: mockUser,
    description: 'Lorem ipsum dolor sit amet...',
    like_count: 26,
    comment_count: 14,
    tags: [],
    created_at: '2024-06-01T12:00:00.000Z',
    updated_at: '2024-06-01T12:00:00.000Z',
    type: PostTypes.PHOTO,
    content: {
      urls: ['https://picsum.photos/200/300'],
    },
  },
  {
    id: 2,
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
  },

  {
    id: 3,
    author: mockUser,
    description: 'Lorem ipsum dolor sit amet...',
    like_count: 3,
    comment_count: 134,
    tags: [],
    created_at: '2024-06-01T12:00:00.000Z',
    updated_at: '2024-06-01T12:00:00.000Z',
    type: PostTypes.PHOTO,
    content: {
      urls: ['https://picsum.photos/seed/picsum/450/300?grayscale'],
    },
  },
  {
    id: 4,
    author: mockUser,
    description: 'Lorem ipsum dolor sit amet...',
    like_count: 26,
    comment_count: 14,
    tags: [],
    created_at: '2024-06-01T12:00:00.000Z',
    updated_at: '2024-06-01T12:00:00.000Z',
    type: PostTypes.PHOTO,
    content: {
      urls: ['https://picsum.photos/200/300'],
    },
  },
  {
    id: 5,
    author: mockUser,
    description: 'Lorem ipsum dolor sit amet...',
    like_count: 26,
    comment_count: 14,
    tags: [],
    created_at: '2024-06-01T12:00:00.000Z',
    updated_at: '2024-06-01T12:00:00.000Z',
    type: PostTypes.PHOTO,
    content: {
      urls: ['https://picsum.photos/200/300'],
    },
  },
];

export async function fetchMockPosts(page: number, pageSize: number): Promise<PostOverview[]> {
  await sleep(3);
  const start = page * pageSize;
  return mockPosts.slice(start, start + pageSize);
}
