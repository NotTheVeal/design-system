import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { StatusBadge } from './statusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  parameters: { layout: 'centered' },
  argTypes: {
    color: { control: 'select', options: ['success','warning','danger','info','neutral','primary'] },
    variant: { control: 'select', options: ['status','outlined','dot'] },
    size: { control: 'select', options: ['sm','md'] },
  },
};
export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Default: Story = { args: { label: 'In Stock', color: 'success', variant: 'status' } };
export const StatusPill: Story = { args: { label: 'In Stock', color: 'success', variant: 'status' } };
export const OutlinedBadge: Story = { args: { label: 'Pending', color: 'warning', variant: 'outlined' } };
export const DotBadge: Story = { args: { label: 'Active', color: 'success', variant: 'dot' } };

export const AllColors: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display:'flex', flexWrap:'wrap', gap:12, fontFamily:"'Source Sans Pro',sans-serif" }}>
      {(['success','warning','danger','info','neutral','primary'] as const).map(c => (
        <StatusBadge key={c} label={c} color={c} variant="status" />
      ))}
    </div>
  ),
};

export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display:'flex', flexDirection:'column', gap:24, fontFamily:"'Source Sans Pro',sans-serif" }}>
      <div>
        <p style={{ margin:'0 0 8px', fontSize:13, color:'#777' }}>Status (solid pill)</p>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          <StatusBadge label="In Stock"    color="success" variant="status" />
          <StatusBadge label="Low Stock"   color="warning" variant="status" />
          <StatusBadge label="Out of Stock" color="danger" variant="status" />
          <StatusBadge label="On Order"    color="info"    variant="status" />
          <StatusBadge label="Inactive"    color="neutral" variant="status" />
        </div>
      </div>
      <div>
        <p style={{ margin:'0 0 8px', fontSize:13, color:'#777' }}>Outlined</p>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          <StatusBadge label="Approved"  color="success" variant="outlined" />
          <StatusBadge label="Review"    color="warning" variant="outlined" />
          <StatusBadge label="Rejected"  color="danger"  variant="outlined" />
          <StatusBadge label="Draft"     color="info"    variant="outlined" />
          <StatusBadge label="Archived"  color="neutral" variant="outlined" />
        </div>
      </div>
      <div>
        <p style={{ margin:'0 0 8px', fontSize:13, color:'#777' }}>Dot</p>
        <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
          <StatusBadge label="Active"     color="success" variant="dot" />
          <StatusBadge label="Pending"    color="warning" variant="dot" />
          <StatusBadge label="Error"      color="danger"  variant="dot" />
          <StatusBadge label="Processing" color="info"    variant="dot" />
          <StatusBadge label="Inactive"   color="neutral" variant="dot" />
        </div>
      </div>
    </div>
  ),
};

export const SmallSize: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display:'flex', gap:8 }}>
      <StatusBadge label="Active"  color="success" variant="status"   size="sm" />
      <StatusBadge label="Pending" color="warning" variant="outlined" size="sm" />
      <StatusBadge label="Online"  color="info"    variant="dot"      size="sm" />
    </div>
  ),
};
