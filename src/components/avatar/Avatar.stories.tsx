import type { Meta, StoryObj } from '@storybook/react';
import Avatar from './avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    size: { control: 'select', options: ["xs","sm","md","lg","xl"] },
    fallback: { control: 'text' },
    online: { control: 'boolean' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: 'https://via.placeholder.com/40',
    alt: 'alt',
    size: 'xs',
    fallback: 'fallback',
    online: true,
    className: 'className',
  },
};

