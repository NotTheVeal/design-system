import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['success', 'danger', 'warning', 'info'] },
  },
};
export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: { variant: 'success', message: 'Order submitted successfully', description: 'Your order #45231 has been placed.', visible: true, duration: 0 },
};
export const Danger: Story = {
  args: { variant: 'danger', message: 'Action failed', description: 'Unable to process your request. Please try again.', visible: true, duration: 0 },
};
export const Warning: Story = {
  args: { variant: 'warning', message: 'Session expiring soon', description: 'You will be logged out in 5 minutes.', visible: true, duration: 0 },
};
export const Info: Story = {
  args: { variant: 'info', message: 'Update available', description: 'A new version of the app is ready.', visible: true, duration: 0 },
};
