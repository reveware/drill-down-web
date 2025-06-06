import type { Meta, StoryObj } from '@storybook/react';
import { UpcomingTimebomb } from './UpcomingTimebomb';
import { mockTimeBomb } from '@/mocks/timebomb';

const meta: Meta<typeof UpcomingTimebomb> = {
  title: 'Features/Timebombs/UpcomingTimebomb',
  component: UpcomingTimebomb,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    nextjs: { appDirectory: true },
  },
  argTypes: {
    timebomb: {
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof UpcomingTimebomb>;

export const WithTimebomb: Story = {
  name: 'Countdown Active',
  args: {
    timebomb: mockTimeBomb,
  },
};

export const NoTimebomb: Story = {
  name: 'Empty State',
  args: {
    timebomb: null,
  },
};
