import type { Meta, StoryObj } from '@storybook/react';
import Badge from './badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    type: { control: 'select', options: ["assignmentstatus","status","list"] },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    text: 'text',
    type: 'assignmentstatus',
    className: 'className',
  },
};

