import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Status } from './status';

const meta: Meta<typeof Status> = {
  title: 'Components/Status',
  component: Status,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Status>;

export const Default: Story = { args: { state: 'active', label: 'Active' } };
export const Success: Story = { args: { state: 'success', label: 'Success' } };
export const Error: Story = { args: { state: 'error', label: 'Error' } };
export const Warning: Story = { args: { state: 'warning', label: 'Warning' } };
export const Info: Story = { args: { state: 'info', label: 'Processing' } };
export const Inactive: Story = { args: { state: 'inactive', label: 'Inactive' } };
export const Online: Story = { args: { state: 'online', label: 'Online' } };
export const Offline: Story = { args: { state: 'offline', label: 'Offline' } };

export const AllStatuses: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, padding: 16, fontFamily: "'Source Sans Pro', sans-serif" }}>
      {(['active','inactive','success','error','warning','info','online','offline','away','busy','pending','processing','completed','cancelled'] as const).map(s => (
        <Status key={s} state={s} label={s.charAt(0).toUpperCase() + s.slice(1)} />
      ))}
    </div>
  ),
};
