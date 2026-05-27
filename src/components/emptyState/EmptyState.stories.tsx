import type { Meta, StoryObj } from '@storybook/react';
import EmptyState from './emptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    icon: { control: 'text' },
    onPrimaryActionClick: { action: 'called' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: 'Sample Title',
    description: 'A brief description.',
    icon: 'Sample content',
    onPrimaryActionClick: () => {},
    className: 'className',
  },
};

