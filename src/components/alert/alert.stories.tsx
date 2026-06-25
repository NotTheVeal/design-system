import type { Meta, StoryObj } from '@storybook/react';
import Alert from './alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['success', 'danger', 'warning', 'info'] },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Success: Story = {
  args: {
    type: 'success',
    title: 'Order Submitted',
    message: 'Your purchase order #PO-28491 has been successfully submitted and is pending approval.',
    onDismiss: () => {},
  },
};

export const Danger: Story = {
  args: {
    type: 'danger',
    title: 'Payment Failed',
    message: 'We could not process your payment. Please verify your billing information and try again.',
    onDismiss: () => {},
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Low Inventory',
    message: 'This part has fewer than 5 units remaining. Consider placing a reorder to avoid stockouts.',
    onDismiss: () => {},
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    title: 'Scheduled Maintenance',
    message: 'The platform will be unavailable on Saturday June 14 from 2:00â4:00 AM EST for scheduled maintenance.',
    onDismiss: () => {},
  },
};

export const NoDismiss: Story = {
  args: {
    type: 'info',
    title: 'Contract Renewal Due',
    message: 'Your service contract for GE Dash 4000 expires in 30 days. Review renewal options in the portal.',
  },
};
