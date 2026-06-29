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
export const Warning: Story = { args: { label: 'Low Stock', color: 'warning', variant: 'status' } };
export const Danger: Story = { args: { label: 'Out of Stock', color: 'danger', variant: 'status' } };
export const Info: Story = { args: { label: 'On Order', color: 'info', variant: 'status' } };
export const Neutral: Story = { args: { label: 'Draft', color: 'neutral', variant: 'status' } };
export const Outlined: Story = { args: { label: 'Pending', color: 'warning', variant: 'outlined' } };
export const Dot: Story = { args: { label: 'Active', color: 'success', variant: 'dot' } };
export const Small: Story = { args: { label: 'In Stock', color: 'success', variant: 'status', size: 'sm' } };

export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 16, fontFamily: "'Source Sans Pro', sans-serif" }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <StatusBadge label="In Stock" color="success" variant="status" />
        <StatusBadge label="Low Stock" color="warning" variant="status" />
        <StatusBadge label="Out of Stock" color="danger" variant="status" />
        <StatusBadge label="On Order" color="info" variant="status" />
        <StatusBadge label="Draft" color="neutral" variant="status" />
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <StatusBadge label="Approved" color="success" variant="outlined" />
        <StatusBadge label="Review" color="warning" variant="outlined" />
        <StatusBadge label="Rejected" color="danger" variant="outlined" />
      </div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <StatusBadge label="Active" color="success" variant="dot" />
        <StatusBadge label="Pending" color="warning" variant="dot" />
        <StatusBadge label="Error" color="danger" variant="dot" />
        <StatusBadge label="Processing" color="info" variant="dot" />
      </div>
    </div>
  ),
};
