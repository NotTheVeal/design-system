import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { VendorBadge } from './vendorBadge';

const meta: Meta<typeof VendorBadge> = {
  title: 'Components/VendorBadge',
  component: VendorBadge,
  parameters: { layout: 'centered' },
  argTypes: {
    tier: { control: 'select', options: ['preferred', 'approved', 'standard', 'new'] },
  },
};
export default meta;
type Story = StoryObj<typeof VendorBadge>;

export const Default: Story = { args: { name: 'GE Healthcare', tier: 'preferred' } };
export const Approved: Story = { args: { name: 'Siemens Healthineers', tier: 'approved' } };
export const Standard: Story = { args: { name: 'Philips Healthcare', tier: 'standard' } };
export const NewVendor: Story = { args: { name: 'Acme Medical', tier: 'new' } };
export const Compact: Story = { args: { name: 'GE Healthcare', tier: 'preferred', compact: true } };

export const AllTiers: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: "'Source Sans 3', sans-serif" }}>
      <VendorBadge name="GE Healthcare" tier="preferred" />
      <VendorBadge name="Siemens Healthineers" tier="approved" />
      <VendorBadge name="Philips Healthcare" tier="standard" />
      <VendorBadge name="Acme Medical" tier="new" />
    </div>
  ),
};
