import type { Meta, StoryObj } from '@storybook/react';
import Toast from './toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Order Submitted',
    message: 'Your purchase order #PO-28471 has been submitted for approval.',
    onDismiss: () => {},
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Checkout Failed',
    message: 'Unable to process your order. Please verify payment details and try again.',
    onDismiss: () => {},
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Low Inventory',
    message: 'Only 2 units remaining for Part #MRI-7842. Consider ordering soon.',
    onDismiss: () => {},
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Price Update',
    message: 'Pricing for CT Scanner components has been updated effective today.',
    onDismiss: () => {},
  },
};

export const NoTitle: Story = {
  args: {
    variant: 'success',
    message: 'Contract renewal for Siemens service agreement has been approved.',
    onDismiss: () => {},
  },
};

export const NoDismiss: Story = {
  args: {
    variant: 'info',
    title: 'Maintenance Window',
    message: 'Scheduled maintenance tonight 11 PM–2 AM EST. Some features may be unavailable.',
    duration: 0,
  },
};
