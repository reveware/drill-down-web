import type { Meta, StoryObj } from '@storybook/react';
import { PostCard } from './PostCard';
import { imagePost, quotePost } from '@/mocks/post';

import { PostTypes } from '@/types/post';

const meta: Meta<typeof PostCard> = {
  title: 'Features/Posts/PostCard',
  component: PostCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    nextjs: { appDirectory: true },
  },
  argTypes: {
    post: {
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PostCard>;

export const Image: Story = {
  name: 'Image Post',
  args: {
    post: imagePost('1'),
  },
};

export const Quote: Story = {
  name: 'Quote Post',
  args: {
    post: quotePost('2'),
  },
};

export const LongQuote: Story = {
  name: 'Long Quote',
  args: {
    post: {
      ...quotePost('3'),
      type: PostTypes.QUOTE,
      quote: 'This is a very long quote that keeps going. '.repeat(10),
      quote_author: 'John Doe',
    },
  },
};

export const MultiImage: Story = {
  name: 'Multiple Images',
  args: {
    post: {
      ...imagePost('5'),
      type: PostTypes.IMAGE,
      images: [
        {
          url: 'https://picsum.photos/200/300?1',
          meta: {
            width: 200,
            height: 300,
            aspect_ratio: 200 / 300,
            byte_size: 1000,
            mime_type: 'image/jpeg',
          },
        },
        {
          url: 'https://picsum.photos/200/300?2',
          meta: {
            width: 200,
            height: 300,
            aspect_ratio: 200 / 300,
            byte_size: 1000,
            mime_type: 'image/jpeg',
          },
        },
        {
          url: 'https://picsum.photos/200/300?3',
          meta: {
            width: 200,
            height: 300,
            aspect_ratio: 200 / 300,
            byte_size: 1000,
            mime_type: 'image/jpeg',
          },
        },
      ],
    },
  },
};
