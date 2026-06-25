import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { StatusBadge } from './statusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  parameters: { layout: 'padded' },
  argTypes: {
    color: { control: 'select', options: ['success', 'warning', 'danger', 'info', 'neutral', 'primary'] },
    variant: { control: 'select', options: ['status', 'outlined', 'dot'] },
    size: { control: 'select', options: ['sm', 'md'] },
  },
};
export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const StatusPill: Story = {
  args: { label: 'In Stock', color: 'success', variant: 'status' },
};

export const OutlinedBadge: Story = {
  args: { label: 'Pending', color: 'warning', variant: 'outlined' },
};

export const DotBadge: Story = {
  args: { label: 'Active', color: 'success', variant: 'dot' },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontFamily: "'Source Sans Pro', sans-serif" }}>
      {(['success', 'warning', 'danger', 'info', 'neutral', 'primary'] as const).map(c => (
        <StatusBadge key={c} label={c} color={c} variant="status" />
      ))}
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: '#777', fontFamily: 'Source Sans Pro, sans-serif' }}>Status (solid pill)</p>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['success', 'warning', 'danger', 'info', 'neutral'] as const).map(c => (
            <StatusBadge key={c} label={c === 'success' ? 'In Stock' : c === 'warning' ? 'Low Stock' : c === 'danger' ? 'Out of Stock' : c === 'info' ? 'On Order' : 'Inactive'} color={c} variant="status" />
          ))}
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: '#777', fontFamily: 'Source Sans Pro, sans-serif' }}>Outlined</p>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['success', 'warning', 'danger', 'info', 'neutral'] as const).map(c => (
            <StatusBadge key={c} label={c === 'success' ? 'Approved' : c === 'warning' ? 'Review' : c === 'danger' ? 'Rejected' : c === 'info' ? 'Draft' : 'Archived'} color={c} variant="outlined" />
          ))}
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: '#777', fontFamily: 'Source Sans Pro, sans-serif' }}>Dot</p>
        <div style={{ display: 'flex', gap: 16 }}>
          {(['success', 'warning', 'danger', 'info', 'neutral'] as const).map(c => (
            <StatusBadge key={c} label={c === 'success' ? 'Active' : c === 'warning' ? 'Pending' : c === 'danger' ? 'Error' : c === 'info' ? 'Processing' : 'Inactive'} color={c} variant="dot" />
          ))}
        </div>
      </div>
    </div>
  ),
};

export const SmallSize: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <StatusBadge label="Active" color="success" variant="status" size="sm" />
      <StatusBadge label="Pending" color="warning" variant="outlined" size="sm" />
      <StatusBadge label="Online" color="info" variant="dot" size="sm" />
    </div>
  ),
};
