import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Status from './status';

const meta: Meta<typeof Status> = {
  title: 'Components/Status',
  component: Status,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Status>;

export const Active: Story = {
  args: { type: 'active', label: 'Active' },
};

export const Online: Story = {
  args: { type: 'online', label: 'Online' },
};

export const Inactive: Story = {
  args: { type: 'inactive', label: 'Inactive' },
};

export const Offline: Story = {
  args: { type: 'offline', label: 'Offline' },
};

export const Busy: Story = {
  args: { type: 'busy', label: 'Busy' },
};

export const Away: Story = {
  args: { type: 'away', label: 'Away' },
};

export const Error: Story = {
  args: { type: 'error', label: 'Error' },
};

export const Warning: Story = {
  args: { type: 'warning', label: 'Pending Review' },
};

export const Info: Story = {
  args: { type: 'info', label: 'Processing' },
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>
      {(['active','online','inactive','offline','busy','away','error','warning','info'] as const).map(type => (
        <Status key={type} type={type} label={type.charAt(0).toUpperCase() + type.slice(1)} />
      ))}
    </div>
  ),
};

export const OrderStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16, fontFamily: 'Source Sans Pro, sans-serif' }}>
      <Status type="active" label="Order Confirmed" />
      <Status type="info" label="Processing" />
      <Status type="away" label="Awaiting Approval" />
      <Status type="warning" label="On Backorder" />
      <Status type="error" label="Order Failed" />
      <Status type="inactive" label="Cancelled" />
    </div>
  ),
};
