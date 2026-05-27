import type { Meta, StoryObj } from '@storybook/react';
import ErrorMessage from './errorMessage';

const meta: Meta<typeof ErrorMessage> = {
  title: 'Components/ErrorMessage',
  component: ErrorMessage,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ["inline","banner","toast"] },
    title: { control: 'text' },
    message: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorMessage>;

export const Default: Story = {
  args: {
    type: 'inline',
    title: 'Sample Title',
    message: 'message',
    className: 'className',
  },
};

