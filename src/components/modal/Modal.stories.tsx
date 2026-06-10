import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Modal from './modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const TriggerBtn = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    style={{
      padding: '10px 20px',
      background: '#005BA6',
      color: '#fff',
      border: 'none',
      borderRadius: 4,
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: "'Source Sans Pro', sans-serif",
    }}
  >
    {label}
  </button>
);

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <TriggerBtn label="Open Modal" onClick={() => setOpen(true)} />
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Confirm Purchase Order"
          primaryLabel="Submit Order"
          secondaryLabel="Cancel"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        >
          <p style={{ margin: 0, fontFamily: "'Source Sans Pro', sans-serif", fontSize: 14, color: '#4A4A4A', lineHeight: 1.6 }}>
            You are about to submit <strong>PO-2025-0842</strong> to GE Healthcare for
            2× Ultrasound Probe 3.5MHz at <strong>$778.00</strong>. This action will
            send the order for manager approval.
          </p>
        </Modal>
      </>
    );
  },
};

export const Destructive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <TriggerBtn label="Cancel Contract" onClick={() => setOpen(true)} />
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Cancel Service Contract?"
          primaryLabel="Yes, Cancel Contract"
          secondaryLabel="Keep Contract"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        >
          <p style={{ margin: 0, fontFamily: "'Source Sans Pro', sans-serif", fontSize: 14, color: '#4A4A4A', lineHeight: 1.6 }}>
            Are you sure you want to cancel <strong>CON-2025-0142</strong> (Siemens
            Healthineers Comprehensive Service Agreement)? This cannot be undone and
            your equipment will no longer be covered.
          </p>
        </Modal>
      </>
    );
  },
};

export const SmallSize: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <TriggerBtn label="Session Timeout" onClick={() => setOpen(true)} />
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Session Expiring"
          size="sm"
          primaryLabel="Stay Signed In"
          secondaryLabel="Log Out"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        >
          <p style={{ margin: 0, fontFamily: "'Source Sans Pro', sans-serif", fontSize: 14, color: '#4A4A4A' }}>
            Your session will expire in 2 minutes. Do you want to stay signed in?
          </p>
        </Modal>
      </>
    );
  },
};

export const LargeSize: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <TriggerBtn label="View Equipment Details" onClick={() => setOpen(true)} />
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Equipment Details — Philips Ingenia 3.0T"
          size="lg"
          primaryLabel="Create Service Request"
          secondaryLabel="Close"
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        >
          <div style={{ fontFamily: "'Source Sans Pro', sans-serif", fontSize: 14, color: '#4A4A4A', lineHeight: 1.6 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px' }}>
              {[
                ['Serial Number', 'SN-2024-MRI-0042'],
                ['Model', 'Ingenia Elition 3.0T'],
                ['Manufacturer', 'Philips Healthcare'],
                ['Location', 'Radiology — Room 4B'],
                ['Installation Date', 'March 8, 2022'],
                ['Contract Type', 'Full Service Agreement'],
                ['Contract Expires', 'Dec 31, 2025'],
                ['Last Service', 'March 15, 2025'],
              ].map(([label, value]) => (
                <div key={label}>
                  <div style={{ color: '#777', fontSize: 12, marginBottom: 2 }}>{label}</div>
                  <div style={{ fontWeight: 600 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      </>
    );
  },
};

export const OpenByDefault: Story = {
  args: {
    isOpen: true,
    title: 'Approve Purchase Order',
    primaryLabel: 'Approve',
    secondaryLabel: 'Reject',
    onClose: () => {},
    onPrimary: () => {},
    onSecondary: () => {},
    children: 'PO-2025-0755 from Siemens Healthineers for $12,400 is awaiting your approval.',
  },
};
