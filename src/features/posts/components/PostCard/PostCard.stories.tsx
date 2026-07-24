import type { Meta, StoryObj } from '@storybook/react';
import { PostCard } from './PostCard';
import { imagePost } from '@/mocks/post';

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

export const MultiImage: Story = {
  name: 'Multiple Images',
  args: {
    post: {
      ...imagePost('5'),
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
