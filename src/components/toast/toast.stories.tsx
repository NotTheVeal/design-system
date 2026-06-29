import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Toast } from './toast';
import type { ToastMessage } from './toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof Toast>;

// All 4 types — passed to a single Toast so they stack naturally at top-right
const ALL_TYPES: ToastMessage[] = [
  { id: '1', type: 'success', title: 'Part Added to Cart',  message: 'GE Healthcare Probe added.',            duration: 0 },
  { id: '2', type: 'error',   title: 'Order Failed',        message: 'Unable to process. Please retry.',      duration: 0 },
  { id: '3', type: 'warning', title: 'Low Stock Alert',     message: 'Only 2 units left for SKU CT-7821.',    duration: 0 },
  { id: '4', type: 'info',    title: 'Quote Ready',         message: 'Quote #Q-2847 is available.',           duration: 0 },
];

export const Default: Story = {
  render: () => (
    <div style={{ minHeight: 400 }}>
      <Toast toasts={[ALL_TYPES[0]]} position="top-right" onDismiss={() => {}} />
    </div>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ minHeight: 500 }}>
      <Toast toasts={ALL_TYPES} position="top-right" onDismiss={() => {}} />
    </div>
  ),
};

export const SuccessToast: Story = {
  render: () => <div style={{ minHeight: 200 }}><Toast toasts={[ALL_TYPES[0]]} position="top-right" onDismiss={() => {}} /></div>,
};

export const ErrorToast: Story = {
  render: () => <div style={{ minHeight: 200 }}><Toast toasts={[ALL_TYPES[1]]} position="top-right" onDismiss={() => {}} /></div>,
};

export const WarningToast: Story = {
  render: () => <div style={{ minHeight: 200 }}><Toast toasts={[ALL_TYPES[2]]} position="top-right" onDismiss={() => {}} /></div>,
};

export const InfoToast: Story = {
  render: () => <div style={{ minHeight: 200 }}><Toast toasts={[ALL_TYPES[3]]} position="top-right" onDismiss={() => {}} /></div>,
};

export const Interactive: Story = {
  render: () => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);
    const add = (type: ToastMessage['type'], title: string, message: string) => {
      const id = Date.now().toString();
      setToasts(p => [...p, { id, type, title, message, duration: 4000 }]);
    };
    const dismiss = (id: string) => setToasts(p => p.filter(t => t.id !== id));
    const font = "'Source Sans Pro', sans-serif";
    return (
      <div style={{ fontFamily: font, padding: 24, minHeight: 400 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          <button onClick={() => add('success', 'Order Submitted', 'PO #12847 is processing')}
            style={{ padding: '8px 16px', background: '#17AB78', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: font, fontSize: 13, fontWeight: 600 }}>
            + Success
          </button>
          <button onClick={() => add('error', 'Payment Failed', 'Your card was declined')}
            style={{ padding: '8px 16px', background: '#D32F2F', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: font, fontSize: 13, fontWeight: 600 }}>
            + Error
          </button>
          <button onClick={() => add('warning', 'Stock Warning', 'Only 3 units remaining')}
            style={{ padding: '8px 16px', background: '#E3A92D', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: font, fontSize: 13, fontWeight: 600 }}>
            + Warning
          </button>
          <button onClick={() => add('info', 'System Update', 'Maintenance tonight at 2am')}
            style={{ padding: '8px 16px', background: '#005BA6', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: font, fontSize: 13, fontWeight: 600 }}>
            + Info
          </button>
        </div>
        <p style={{ fontSize: 13, color: '#777777' }}>Click buttons above — toasts appear top-right and auto-dismiss after 4s</p>
        <Toast toasts={toasts} position="top-right" onDismiss={dismiss} />
      </div>
    );
  },
};
