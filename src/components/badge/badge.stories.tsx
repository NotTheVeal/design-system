import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Badge from './badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['status','list','assignment'] },
    status: { control: 'select', options: ['available','unavailable','pending','on-order','active','inactive','neutral','new','sale','featured'] },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { label: 'Available', variant: 'status', status: 'available' } };
export const Available: Story = { args: { label: 'Available', variant: 'status', status: 'available' } };
export const Unavailable: Story = { args: { label: 'Unavailable', variant: 'status', status: 'unavailable' } };
export const OnOrder: Story = { args: { label: 'On Order', variant: 'status', status: 'on-order' } };
export const Pending: Story = { args: { label: 'Pending', variant: 'status', status: 'pending' } };
export const New: Story = { args: { label: 'New', variant: 'status', status: 'new' } };
export const Neutral: Story = { args: { label: 'Draft', variant: 'status', status: 'neutral' } };
export const ListPill: Story = { args: { label: 'Category', variant: 'list', status: 'new' } };
export const AssignmentTag: Story = { args: { label: 'Assigned', variant: 'assignment', status: 'available' } };

export const AllStatuses: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display:'flex', flexWrap:'wrap', gap:12, padding:24, fontFamily:"'Source Sans Pro',sans-serif" }}>
      <Badge label="Available"   variant="status" status="available" />
      <Badge label="Unavailable" variant="status" status="unavailable" />
      <Badge label="On Order"    variant="status" status="on-order" />
      <Badge label="Pending"     variant="status" status="pending" />
      <Badge label="New"         variant="status" status="new" />
      <Badge label="Featured"    variant="status" status="featured" />
      <Badge label="Draft"       variant="status" status="neutral" />
      <Badge label="List Pill"   variant="list"   status="new" />
      <Badge label="Tag"         variant="assignment" status="pending" />
    </div>
  ),
};
