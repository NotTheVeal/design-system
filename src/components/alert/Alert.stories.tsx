import type { Meta, StoryObj } from '@storybook/react';
import Alert from './alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ["success","danger","warning","info"] },
    title: { control: 'text' },
    message: { control: 'text' },
    onDismiss: { action: 'called' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    type: 'success',
    title: 'Sample Title',
    message: 'message',
    onDismiss: () => {},
    className: 'className',
  },
};

