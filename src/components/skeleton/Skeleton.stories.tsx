import type { Meta, StoryObj } from '@storybook/react';
import Skeleton from './skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    height: { control: 'number' },
    width: { control: 'number' },
    style: { control: 'text' },
    animate: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    className: 'className',
    height: 1,
    width: 1,
    style: 'style',
    animate: true,
  },
};

