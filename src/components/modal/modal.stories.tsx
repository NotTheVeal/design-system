import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Modal } from './modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Modal — PS Design System 2.0. Sizes: sm (480px), md (640px), lg (880px), xl (1200px). Supports Escape key, backdrop click to close, focus trap, and aria-modal. Provide children for body content and footer prop for action buttons.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Wrapper that renders a button to open the modal (required since modals must be visible)
const ModalDemo = ({
  title,
  size,
  children,
  footer,
  closeOnBackdrop,
  triggerLabel = 'Open Modal',
}: {
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  footer?: React.ReactNode;
  closeOnBackdrop?: boolean;
  triggerLabel?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    React.createElement('div', { style: { padding: 32 } },
      React.createElement('button', {
        onClick: () => setOpen(true),
        style: {
          background: '#005BA6',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          padding: '10px 20px',
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: "'Source Sans 3', sans-serif",
        },
      }, triggerLabel),
      React.createElement(Modal, {
        open,
        onClose: () => setOpen(false),
        title,
        size,
        footer,
        closeOnBackdrop,
      }, children)
    )
  );
};

const PrimaryBtn = ({ label, onClick }: { label: string; onClick?: () => void }) =>
  React.createElement('button', {
    onClick,
    style: { background: '#005BA6', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif" },
  }, label);

const SecondaryBtn = ({ label, onClick }: { label: string; onClick?: () => void }) =>
  React.createElement('button', {
    onClick,
    style: { background: '#fff', color: '#005BA6', border: '1px solid #005BA6', borderRadius: 4, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif" },
  }, label);

const DangerBtn = ({ label, onClick }: { label: string; onClick?: () => void }) =>
  React.createElement('button', {
    onClick,
    style: { background: '#C00', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif" },
  }, label);

/** Default — info modal with title and body text */
export const Default: Story = {
  name: 'Default (Info)',
  render: () =>
    React.createElement(ModalDemo, {
      title: 'Information',
      size: 'md',
      footer: React.createElement(React.Fragment, null,
        React.createElement(SecondaryBtn, { label: 'Cancel' }),
        React.createElement(PrimaryBtn, { label: 'OK' }),
      ),
      triggerLabel: 'Open Info Modal',
    },
      React.createElement('p', { style: { margin: 0, fontSize: 14, color: '#4A4A4A', lineHeight: 1.6, fontFamily: "'Source Sans 3', sans-serif" } },
        'This is a standard informational modal. Use it to surface important context that requires user acknowledgement before proceeding.'
      )
    ),
};

/** WithForm — modal body contains a form */
export const WithForm: Story = {
  name: 'With Form',
  render: () =>
    React.createElement(ModalDemo, {
      title: 'Edit Profile',
      size: 'md',
      triggerLabel: 'Open Form Modal',
      footer: React.createElement(React.Fragment, null,
        React.createElement(SecondaryBtn, { label: 'Cancel' }),
        React.createElement(PrimaryBtn, { label: 'Save Changes' }),
      ),
    },
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 16, fontFamily: "'Source Sans 3', sans-serif" } },
        React.createElement('label', { style: { display: 'flex', flexDirection: 'column', gap: 4, fontSize: 14, fontWeight: 600, color: '#002F48' } },
          'Full Name',
          React.createElement('input', { type: 'text', defaultValue: 'Jane Smith', style: { height: 40, padding: '0 12px', borderRadius: 4, border: '1px solid #CCCCCC', fontSize: 14, fontFamily: 'inherit' } })
        ),
        React.createElement('label', { style: { display: 'flex', flexDirection: 'column', gap: 4, fontSize: 14, fontWeight: 600, color: '#002F48' } },
          'Email',
          React.createElement('input', { type: 'email', defaultValue: 'jane@example.com', style: { height: 40, padding: '0 12px', borderRadius: 4, border: '1px solid #CCCCCC', fontSize: 14, fontFamily: 'inherit' } })
        ),
        React.createElement('label', { style: { display: 'flex', flexDirection: 'column', gap: 4, fontSize: 14, fontWeight: 600, color: '#002F48' } },
          'Role',
          React.createElement('select', { style: { height: 40, padding: '0 12px', borderRadius: 4, border: '1px solid #CCCCCC', fontSize: 14, fontFamily: 'inherit' } },
            React.createElement('option', null, 'Viewer'),
            React.createElement('option', { selected: true }, 'Editor'),
            React.createElement('option', null, 'Admin'),
          )
        )
      )
    ),
};

/** Confirmation — destructive/danger action */
export const Confirmation: Story = {
  name: 'Confirmation (Destructive)',
  render: () =>
    React.createElement(ModalDemo, {
      title: 'Delete Item?',
      size: 'sm',
      triggerLabel: 'Open Confirm Modal',
      closeOnBackdrop: false,
      footer: React.createElement(React.Fragment, null,
        React.createElement(SecondaryBtn, { label: 'Cancel' }),
        React.createElement(DangerBtn, { label: 'Delete' }),
      ),
    },
      React.createElement('p', { style: { margin: 0, fontSize: 14, color: '#4A4A4A', lineHeight: 1.6, fontFamily: "'Source Sans 3', sans-serif" } },
        'Are you sure you want to delete this item? This action cannot be undone and all associated data will be permanently removed.'
      )
    ),
};

/** Wide — xl size modal */
export const Wide: Story = {
  name: 'Wide (XL)',
  render: () =>
    React.createElement(ModalDemo, {
      title: 'Product Details',
      size: 'xl',
      triggerLabel: 'Open Wide Modal',
      footer: React.createElement(React.Fragment, null,
        React.createElement(SecondaryBtn, { label: 'Close' }),
        React.createElement(PrimaryBtn, { label: 'Add to Cart' }),
      ),
    },
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: '#4A4A4A' } },
        React.createElement('div', null,
          React.createElement('div', { style: { background: '#F5F5F5', height: 240, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#949494', fontSize: 13 } }, 'Product Image'),
        ),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
          React.createElement('h3', { style: { margin: 0, fontSize: 18, fontWeight: 700, color: '#002F48' } }, 'Brake Pad Assembly'),
          React.createElement('p', { style: { margin: 0, fontSize: 13, color: '#777' } }, 'Part #: BPA-4521-OEM'),
          React.createElement('p', { style: { margin: 0, lineHeight: 1.6 } }, 'OEM-spec brake pad assembly for heavy-duty commercial vehicles. Includes hardware kit and installation guide.'),
          React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: '#002F48' } }, '$84.99'),
        )
      )
    ),
};
