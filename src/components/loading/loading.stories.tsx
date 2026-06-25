import type { Meta, StoryObj } from '@storybook/react';
import Loading from './loading';

const meta: Meta<typeof Loading> = {
  title: 'Components/Loading',
  component: Loading,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Medium: Story = {
  args: {
    size: 'md',
    ariaLabel: 'Loading parts catalog...',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    ariaLabel: 'Loading...',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    ariaLabel: 'Loading order details...',
  },
};
