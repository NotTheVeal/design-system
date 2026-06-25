import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Drawer } from './drawer';

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Slide-over drawer panel. Supports right/left/bottom placement, configurable width, form content, multi-step, and loading states.',
      },
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

const Field = ({ label, placeholder }: { label: string; placeholder: string }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#4A4A4A', marginBottom: 4, fontFamily: "'Source Sans 3',sans-serif" }}>{label}</label>
    <input placeholder={placeholder} style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', border: '1px solid #DCDCDC', borderRadius: 4, fontSize: 14, color: '#4A4A4A', fontFamily: "'Source Sans 3',sans-serif", outline: 'none' }} />
  </div>
);

const SkeletonLine = ({ w = '100%' }: { w?: string }) => (
  <div style={{ height: 16, width: w, background: 'linear-gradient(90deg,#F1F1F1 25%,#E8E8E8 50%,#F1F1F1 75%)', backgroundSize: '200% 100%', borderRadius: 4, marginBottom: 12, animation: 'shimmer 1.4s infinite' }} />
);

const TriggerBtn = ({ onClick, label }: { onClick: () => void; label: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#F5F7FA' }}>
    <button onClick={onClick} style={{ padding: '12px 24px', background: '#005BA6', color: '#fff', border: 'none', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'Source Sans 3',sans-serif" }}>
      {label}
    </button>
  </div>
);

export const Wide: Story = {
  name: 'Wide — 680px',
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <TriggerBtn onClick={() => setOpen(true)} label="Open Wide Drawer (680px)" />
        <Drawer open={open} onClose={() => setOpen(false)} title="Wide Drawer" width={680}
          footer={
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button onClick={() => setOpen(false)} style={{ padding: '8px 16px', border: '1px solid #DCDCDC', background: '#fff', borderRadius: 4, fontSize: 14, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => setOpen(false)} style={{ padding: '8px 16px', background: '#005BA6', color: '#fff', border: 'none', borderRadius: 4, fontSize: 14, cursor: 'pointer', fontWeight: 600 }}>Save</button>
            </div>
          }
        >
          <p style={{ fontSize: 14, color: '#4A4A4A', lineHeight: 1.6 }}>This drawer is 680px wide — suitable for complex content, data tables, or side-by-side layouts.</p>
        </Drawer>
      </>
    );
  },
};

export const Narrow: Story = {
  name: 'Narrow — 320px',
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <TriggerBtn onClick={() => setOpen(true)} label="Open Narrow Drawer (320px)" />
        <Drawer open={open} onClose={() => setOpen(false)} title="Quick Actions" width={320}>
          <p style={{ fontSize: 14, color: '#4A4A4A', lineHeight: 1.6 }}>A narrow 320px drawer for quick actions, filters, or short context panels.</p>
        </Drawer>
      </>
    );
  },
};

export const WithForm: Story = {
  name: 'With Form',
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <TriggerBtn onClick={() => setOpen(true)} label="Open Drawer with Form" />
        <Drawer open={open} onClose={() => setOpen(false)} title="Add Team Member"
          footer={
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button onClick={() => setOpen(false)} style={{ padding: '8px 16px', border: '1px solid #DCDCDC', background: '#fff', borderRadius: 4, fontSize: 14, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => setOpen(false)} style={{ padding: '8px 16px', background: '#005BA6', color: '#fff', border: 'none', borderRadius: 4, fontSize: 14, cursor: 'pointer', fontWeight: 600 }}>Add Member</button>
            </div>
          }
        >
          <Field label="Full Name" placeholder="e.g. Jane Smith" />
          <Field label="Email Address" placeholder="jane@partssource.com" />
          <Field label="Department" placeholder="e.g. Engineering" />
        </Drawer>
      </>
    );
  },
};

export const MultiStep: Story = {
  name: 'Multi-Step',
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [step, setStep] = React.useState(1);
    const steps = ['Details', 'Review', 'Confirm'];
    return (
      <>
        <TriggerBtn onClick={() => { setStep(1); setOpen(true); }} label="Open Multi-Step Drawer" />
        <Drawer open={open} onClose={() => setOpen(false)} title="New Order"
          footer={
            <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', alignItems: 'center' }}>
              <button onClick={() => step > 1 ? setStep(s => s - 1) : setOpen(false)} style={{ padding: '8px 16px', border: '1px solid #DCDCDC', background: '#fff', borderRadius: 4, fontSize: 14, cursor: 'pointer' }}>
                {step > 1 ? 'Back' : 'Cancel'}
              </button>
              <button onClick={() => step < 3 ? setStep(s => s + 1) : setOpen(false)} style={{ padding: '8px 16px', background: '#005BA6', color: '#fff', border: 'none', borderRadius: 4, fontSize: 14, cursor: 'pointer', fontWeight: 600 }}>
                {step === 3 ? 'Finish' : 'Next'}
              </button>
            </div>
          }
        >
          <div style={{ display: 'flex', gap: 0, marginBottom: 24 }}>
            {steps.map((s, i) => (
              <div key={s} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: i + 1 <= step ? '#005BA6' : '#DCDCDC', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, margin: '0 auto 4px', fontFamily: "'Source Sans 3',sans-serif" }}>
                  {i + 1}
                </div>
                <div style={{ fontSize: 12, color: i + 1 <= step ? '#005BA6' : '#949494', fontFamily: "'Source Sans 3',sans-serif" }}>{s}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14, color: '#4A4A4A', lineHeight: 1.6 }}>Step {step} of {steps.length} — {steps[step - 1]}</p>
          {step === 1 && <Field label="Order Name" placeholder="e.g. Quarterly Restock" />}
          {step === 2 && <p style={{ fontSize: 14, color: '#777' }}>Review your order details before confirming.</p>}
          {step === 3 && <p style={{ fontSize: 14, color: '#0E7C55', fontWeight: 600 }}>Ready to submit!</p>}
        </Drawer>
      </>
    );
  },
};

export const DetailPanel: Story = {
  name: 'Detail Panel',
  render: () => {
    const [open, setOpen] = React.useState(false);
    const meta2 = [
      { label: 'Order ID', value: 'PO-2026-00412' },
      { label: 'Status', value: 'In Transit' },
      { label: 'Supplier', value: 'Acme Parts Co.' },
      { label: 'Created', value: 'Jun 10, 2026' },
      { label: 'Expected', value: 'Jun 28, 2026' },
      { label: 'Total', value: '$4,250.00' },
    ];
    return (
      <>
        <TriggerBtn onClick={() => setOpen(true)} label="Open Detail Panel" />
        <Drawer open={open} onClose={() => setOpen(false)} title="Order Details">
          <dl style={{ margin: 0 }}>
            {meta2.map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F1F1F1' }}>
                <dt style={{ fontSize: 13, color: '#777777', fontFamily: "'Source Sans 3',sans-serif" }}>{row.label}</dt>
                <dd style={{ fontSize: 13, fontWeight: 600, color: '#4A4A4A', margin: 0, fontFamily: "'Source Sans 3',sans-serif" }}>{row.value}</dd>
              </div>
            ))}
          </dl>
        </Drawer>
      </>
    );
  },
};

export const Loading: Story = {
  name: 'Loading State',
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <style>{' @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} } '}</style>
        <TriggerBtn onClick={() => setOpen(true)} label="Open Loading Drawer" />
        <Drawer open={open} onClose={() => setOpen(false)} title="Loading...">
          <SkeletonLine w="60%" />
          <SkeletonLine w="100%" />
          <SkeletonLine w="80%" />
          <SkeletonLine w="100%" />
          <SkeletonLine w="45%" />
          <div style={{ height: 24 }} />
          <SkeletonLine w="70%" />
          <SkeletonLine w="100%" />
          <SkeletonLine w="55%" />
        </Drawer>
      </>
    );
  },
};
