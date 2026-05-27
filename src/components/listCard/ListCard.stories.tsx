import type { Meta, StoryObj } from '@storybook/react';
import ListCard from './listCard';

const meta: Meta<typeof ListCard> = {
  title: 'Components/ListCard',
  component: ListCard,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    avatarUrl: { control: 'text' },
    onClick: { action: 'called' },
    className: { control: 'text' },
    isSelected: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof ListCard>;

export const Default: Story = {
  args: {
    title: 'Sample Title',
    description: 'A brief description.',
    avatarUrl: 'avatarUrl',
    onClick: () => {},
    className: 'className',
    isSelected: true,
  },
};

