import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ErrorMessage from './errorMessage';

const meta: Meta<typeof ErrorMessage> = {
  title: 'Components/ErrorMessage',
  component: ErrorMessage,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ErrorMessage>;

export const Default: Story = {
  args: {
    message: 'An error occurred. Please try again.',
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Order Failed',
    message: 'Unable to submit purchase order. Please check your payment details and try again.',
  },
};

export const ValidationError: Story = {
  args: {
    title: 'Required Field Missing',
    message: 'Shipping address is required before proceeding to checkout.',
  },
};

export const PaymentError: Story = {
  args: {
    title: 'Payment Declined',
    message: 'Your purchase card ending in 4821 was declined. Please contact your finance team.',
  },
};

export const PermissionError: Story = {
  args: {
    title: 'Access Denied',
    message: 'You do not have permission to approve orders above $10,000. Contact your administrator.',
  },
};

export const MessageOnly: Story = {
  args: {
    message: 'Part number MRI-7842 is no longer available from this supplier.',
  },
};

export const WithChildren: Story = {
  render: () => (
    <ErrorMessage title="Contract Expired">
      Service contract <strong>SC-2024-0193</strong> expired on January 1, 2025.
      Please renew through the <a href="#" style={{ color: '#E00000' }}>Contracts portal</a>.
    </ErrorMessage>
  ),
};
