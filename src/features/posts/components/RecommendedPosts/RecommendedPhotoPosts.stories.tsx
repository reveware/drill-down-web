import type { Meta, StoryObj } from '@storybook/react';
import { RecommendedPhotoPosts } from './RecommendedPhotoPosts';
import { generatePosts } from '@/mocks/posts';
import { PhotoPost, PostTypes } from '@/types/post';

const meta: Meta<typeof RecommendedPhotoPosts> = {
  title: 'Features/Posts/RecommendedPhotoPosts',
  component: RecommendedPhotoPosts,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof RecommendedPhotoPosts>;

export const Default: Story = {
  args: {
    posts: generatePosts(9, PostTypes.PHOTO) as PhotoPost[],
  },
};

export const WithFewPosts: Story = {
  args: {
    posts: generatePosts(4, PostTypes.PHOTO) as PhotoPost[],
  },
};

export const WithManyPosts: Story = {
  args: {
    posts: generatePosts(15, PostTypes.PHOTO) as PhotoPost[],
  },
};

export const EmptyState: Story = {
  args: {
    posts: [],
  },
};

export const CustomTitle: Story = {
  args: {
    posts: generatePosts(9, PostTypes.PHOTO) as PhotoPost[],
  },
};

export const FullGrid: Story = {
  args: {
    posts: generatePosts(12, PostTypes.PHOTO) as PhotoPost[],
  },
};
