import type { Meta, StoryObj } from '@storybook/react';
import Avatar from './avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    status: { control: 'select', options: ['online', 'offline', 'away', 'busy'] },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Initials: Story = {
  args: {
    name: 'Rachael Veal',
    size: 'md',
    status: 'online',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/80?img=47',
    alt: 'Rachael Veal',
    name: 'Rachael Veal',
    size: 'md',
    status: 'online',
  },
};

export const Offline: Story = {
  args: {
    name: 'John Barker',
    size: 'md',
    status: 'offline',
  },
};

export const Away: Story = {
  args: {
    name: 'Sam Torres',
    size: 'md',
    status: 'away',
  },
};

export const Busy: Story = {
  args: {
    name: 'Maria Chen',
    size: 'md',
    status: 'busy',
  },
};

export const Large: Story = {
  args: {
    name: 'Rachael Veal',
    size: 'xl',
    status: 'online',
  },
};

export const Small: Story = {
  args: {
    name: 'RV',
    size: 'sm',
  },
};
