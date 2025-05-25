import type { Meta, StoryObj } from '@storybook/react';
import { Home } from './Home';

const meta: Meta<typeof Home> = {
  title: 'Pages/Home',
  component: Home,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Home>;

export const Default: Story = {};
