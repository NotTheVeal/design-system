import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Toast from './toast';

const font = "'Source Sans Pro', 'Source Sans 3', sans-serif";

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
    message: { control: 'text' },
    title: { control: 'text' },
    duration: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  render: () => (
    <Toast
      message="Part added to cart successfully."
      variant="success"
      title="Part Added"
      duration={0}
      onDismiss={() => {}}
    />
  ),
};

export const SuccessToast: Story = {
  name: 'Success',
  render: () => (
    <Toast
      message="PO #12847 has been submitted and is processing."
      variant="success"
      title="Order Submitted"
      duration={0}
      onDismiss={() => {}}
    />
  ),
};

export const ErrorToast: Story = {
  name: 'Error',
  render: () => (
    <Toast
      message="Unable to process payment. Please retry."
      variant="error"
      title="Order Failed"
      duration={0}
      onDismiss={() => {}}
    />
  ),
};

export const WarningToast: Story = {
  name: 'Warning',
  render: () => (
    <Toast
      message="Only 2 units remaining for SKU CT-7821."
      variant="warning"
      title="Low Stock Alert"
      duration={0}
      onDismiss={() => {}}
    />
  ),
};

export const InfoToast: Story = {
  name: 'Info',
  render: () => (
    <Toast
      message="Quote #Q-2847 is ready for your review."
      variant="info"
      title="Quote Ready"
      duration={0}
      onDismiss={() => {}}
    />
  ),
};

export const AllTypes: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
      <Toast message="PO #12847 is processing." variant="success" title="Order Submitted" duration={0} onDismiss={() => {}} />
      <Toast message="Your card was declined." variant="error" title="Payment Failed" duration={0} onDismiss={() => {}} />
      <Toast message="Only 3 units remaining." variant="warning" title="Stock Warning" duration={0} onDismiss={() => {}} />
      <Toast message="Maintenance tonight at 2am." variant="info" title="System Update" duration={0} onDismiss={() => {}} />
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const WithoutTitle: Story = {
  name: 'Without Title',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
      <Toast message="Purchase order submitted successfully." variant="success" duration={0} onDismiss={() => {}} />
      <Toast message="Unable to connect. Check network and retry." variant="error" duration={0} onDismiss={() => {}} />
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Interactive: Story = {
  name: 'Interactive (auto-dismiss)',
  render: () => {
    const [visible, setVisible] = React.useState<{ variant: 'success' | 'error' | 'warning' | 'info'; message: string; title: string } | null>(null);
    const show = (variant: 'success' | 'error' | 'warning' | 'info', title: string, message: string) =>
      setVisible({ variant, message, title });
    return (
      <div style={{ fontFamily: font, padding: 24 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          <button onClick={() => show('success', 'Order Submitted', 'PO #12847 is processing')}
            style={{ padding: '8px 16px', background: '#17AB78', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: font, fontSize: 13, fontWeight: 600 }}>
            + Success
          </button>
          <button onClick={() => show('error', 'Payment Failed', 'Your card was declined')}
            style={{ padding: '8px 16px', background: '#D32F2F', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: font, fontSize: 13, fontWeight: 600 }}>
            + Error
          </button>
          <button onClick={() => show('warning', 'Stock Warning', 'Only 3 units remaining')}
            style={{ padding: '8px 16px', background: '#E3A92D', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: font, fontSize: 13, fontWeight: 600 }}>
            + Warning
          </button>
          <button onClick={() => show('info', 'System Update', 'Maintenance tonight at 2am')}
            style={{ padding: '8px 16px', background: '#005BA6', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: font, fontSize: 13, fontWeight: 600 }}>
            + Info
          </button>
        </div>
        <p style={{ fontSize: 13, color: '#777777', margin: '0 0 16px' }}>
          Click a button — toast appears and auto-dismisses after 4 seconds.
        </p>
        {visible && (
          <Toast
            message={visible.message}
            variant={visible.variant}
            title={visible.title}
            duration={4000}
            onDismiss={() => setVisible(null)}
          />
        )}
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};
