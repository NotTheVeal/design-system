import React from 'react';
import type { Meta } from '@storybook/react';
import type { ToastVariant } from './toast';

const meta: Meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;

const BG: Record<ToastVariant, string> = {
  success: '#E2F5EE',
  danger: '#FEF0F0',
  warning: '#FFF4E5',
  info: '#EFF9FE',
};

const CLR: Record<ToastVariant, string> = {
  success: '#17AB78',
  danger: '#FF0000',
  warning: '#E3A92D',
  info: '#009CF4',
};

const ICON: Record<ToastVariant, string> = {
  success: '\u2713',
  danger: '\u2715',
  warning: '\u26A0',
  info: '\u2139',
};

interface ToastPreviewProps {
  variant?: ToastVariant;
  message: string;
  description?: string;
  showDismiss?: boolean;
  action?: string;
}

const ToastPreview: React.FC<ToastPreviewProps> = ({
  variant = 'info',
  message,
  description,
  showDismiss = true,
  action,
}) => {
  const bg = BG[variant];
  const clr = CLR[variant];
  const icon = ICON[variant];

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px',
      backgroundColor: bg, borderRadius: 8,
      boxShadow: '0 4px 12px rgba(0,47,72,0.15), 0 0 0 1px rgba(0,47,72,0.05)',
      fontFamily: "'Source Sans 3', -apple-system, sans-serif", color: clr,
      maxWidth: 420, width: '100%',
    }}>
      <span style={{
        flexShrink: 0, width: 20, height: 20, borderRadius: '50%',
        backgroundColor: clr, color: '#FFFFFF', fontSize: 11, fontWeight: 700,
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1,
      }}>{icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, lineHeight: '20px', color: clr }}>{message}</div>
        {description && (
          <div style={{ fontSize: 13, fontWeight: 400, lineHeight: '18px', color: clr, opacity: 0.85, marginTop: 2 }}>
            {description}
          </div>
        )}
        {action && (
          <button style={{
            marginTop: 8, padding: '4px 12px', backgroundColor: 'transparent',
            border: `1px solid ${clr}`, borderRadius: 4, color: clr,
            fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          }}>{action}</button>
        )}
      </div>
      {showDismiss && (
        <button aria-label="Dismiss" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, width: 24, height: 24, padding: 0, background: 'none',
          border: 'none', borderRadius: 4, cursor: 'pointer', color: clr,
          opacity: 0.7, fontSize: 16, marginTop: -2, marginRight: -4,
        }}>\u00D7</button>
      )}
    </div>
  );
};

export const Success = {
  render: () => <ToastPreview variant="success" message="Order Submitted" description="Your purchase order #PO-28471 has been submitted for approval." />,
};

export const Error = {
  render: () => <ToastPreview variant="danger" message="Checkout Failed" description="Unable to process your order. Please verify payment details and try again." />,
};

export const Warning = {
  render: () => <ToastPreview variant="warning" message="Low Inventory" description="Only 2 units remaining for Part #MRI-7842. Consider ordering soon." />,
};

export const Info = {
  render: () => <ToastPreview variant="info" message="Price Update" description="Pricing for CT Scanner components has been updated effective today." />,
};

export const NoTitle = {
  render: () => <ToastPreview variant="success" message="Contract renewal for Siemens service agreement has been approved." />,
};

export const NoDismiss = {
  render: () => <ToastPreview variant="info" message="Maintenance Window" description="Scheduled maintenance tonight 11 PM\u20132 AM EST. Some features may be unavailable." showDismiss={false} />,
};

export const WithAction = {
  render: () => <ToastPreview variant="warning" message="Contract Expiring Soon" description="GE Healthcare service agreement expires in 14 days." action="Renew Now" />,
};

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ToastPreview variant="success" message="Order Submitted Successfully" description="PO-28471 is pending approval." />
      <ToastPreview variant="danger" message="Checkout Failed" description="Unable to process your order. Please verify payment details." />
      <ToastPreview variant="warning" message="Low Inventory" description="Only 2 units remaining for Part #MRI-7842." />
      <ToastPreview variant="info" message="Price Update" description="CT Scanner component pricing updated effective today." />
    </div>
  ),
};
