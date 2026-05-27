import type { Meta, StoryObj } from '@storybook/react';
import Cart from './cart';

const meta: Meta<typeof Cart> = {
  title: 'Components/Cart',
  component: Cart,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    itemCount: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Cart>;

export const Default: Story = {
  args: {
    className: 'className',
    itemCount: 1,
  },
};

