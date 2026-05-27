import type { Meta, StoryObj } from '@storybook/react';
import Toast from './toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ["success","error","warning","info"] },
    message: { control: 'text' },
    onDismiss: { action: 'called' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    type: 'success',
    message: 'message',
    onDismiss: () => {},
    className: 'className',
  },
};

