import type { Meta, StoryObj } from '@storybook/react';
import Navigation from './navigation';

const meta: Meta<typeof Navigation> = {
  title: 'Components/Navigation',
  component: Navigation,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    userName: { control: 'text' },
    items: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Navigation>;

export const Default: Story = {
  args: {
    className: 'className',
    userName: 'userName',
    items: 'items',
  },
};

