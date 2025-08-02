import type { Meta, StoryObj } from '@storybook/react';
import { PostCard } from './PostCard';
import { photoPost, quotePost } from '@/mocks/post';

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

export const Photo: Story = {
  name: 'Photo Post',
  args: {
    post: photoPost('1'),
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

export const MultiPhoto: Story = {
  name: 'Multiple Photos',
  args: {
    post: {
      ...photoPost('5'),
      type: PostTypes.PHOTO,
      urls: [
        'https://picsum.photos/200/300?1',
        'https://picsum.photos/200/300?2',
        'https://picsum.photos/200/300?3',
      ],
    },
  },
};
