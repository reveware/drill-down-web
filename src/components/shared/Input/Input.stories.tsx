import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password'],
      defaultValue: 'text',
    },
    placeholder: {
      control: 'text',
      defaultValue: 'Enter text...',
    },
    disabled: {
      control: 'boolean',
    },
    value: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Playground: Story = {
  args: {
    type: 'select',
    placeholder: 'Enter text...',
    disabled: false,
  },
};

export const Checkbox: Story = {
  args: {
    type: 'checkbox',
    checked: true,
  },
};

export const Radio: Story = {
  args: {
    type: 'radio',
    checked: true,
  },
};
export const Date: Story = {
  args: {
    type: 'date',
    value: '2025-05-23',
  },
};

export const File: Story = {
  args: {
    type: 'file',
  },
};
