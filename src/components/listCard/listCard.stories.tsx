import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ListCard from './listCard';

const meta: Meta<typeof ListCard> = {
  title: 'Components/ListCard',
  component: ListCard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ListCard>;

const PartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" />
  </svg>
);

const DocIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
  </svg>
);

const SupplierIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

export const Default: Story = {
  args: {
    title: 'Siemens MAGNETOM Aera â MRI Coil Assembly',
    subtitle: 'Part #MRI-7842 Â· In Stock',
    meta: '$1,240.00',
  },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
};

export const WithIcon: Story = {
  args: {
    title: 'CT Scanner Detector Module',
    subtitle: 'Part #CT-4421 Â· Ships in 3â5 days',
    meta: '$4,800.00',
    icon: <PartIcon />,
  },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
};

export const WithAction: Story = {
  render: () => (
    <div style={{ width: 480 }}>
      <ListCard
        title="Service Contract â Philips Brilliance CT"
        subtitle="Contract #SC-2024-0193 Â· Expires Dec 31, 2025"
        meta="Active"
        icon={<DocIcon />}
        action={
          <button style={{ padding: '4px 12px', borderRadius: 4, border: '1px solid #005BA6', background: '#fff', color: '#005BA6', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Source Sans Pro, sans-serif' }}>
            Renew
          </button>
        }
      />
    </div>
  ),
};

export const Clickable: Story = {
  args: {
    title: 'GE Healthcare â Preferred Supplier',
    subtitle: 'Biomedical Equipment Â· 47 active contracts',
    icon: <SupplierIcon />,
    onClick: () => alert('Opening supplier profile'),
  },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
};

export const TitleOnly: Story = {
  args: {
    title: 'Pending Approval: PO-28471',
  },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
};

export const EquipmentList: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 520 }}>
      {[
        { title: 'MRI Gradient Coil Assembly', subtitle: 'Part #MRI-7842 Â· Siemens', meta: '$12,400' },
        { title: 'CT Detector Array Module', subtitle: 'Part #CT-4421 Â· GE Healthcare', meta: '$4,800' },
        { title: 'Ultrasound Probe 3.5MHz', subtitle: 'Part #US-1190 Â· Philips', meta: '$2,200' },
        { title: 'X-Ray Flat Panel Detector', subtitle: 'Part #XR-8834 Â· Canon Medical', meta: '$8,650' },
      ].map((item, i) => (
        <ListCard key={i} title={item.title} subtitle={item.subtitle} meta={item.meta} icon={<PartIcon />} />
      ))}
    </div>
  ),
};
