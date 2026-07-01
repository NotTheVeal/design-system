import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AvailabilityChip } from './availabilityChip';

const meta: Meta<typeof AvailabilityChip> = {
  title: 'Components/AvailabilityChip',
  component: AvailabilityChip,
  parameters: { layout: 'centered' },
  argTypes: {
    status: { control: 'select', options: ['available', 'unavailable', 'on-order', 'discontinued'] },
  },
};
export default meta;
type Story = StoryObj<typeof AvailabilityChip>;

export const Default: Story = { args: { status: 'available' } };
export const Available: Story = { args: { status: 'available' } };
export const Unavailable: Story = { args: { status: 'unavailable' } };
export const OnOrder: Story = { args: { status: 'on-order' } };
export const Discontinued: Story = { args: { status: 'discontinued' } };
export const CustomLabel: Story = { args: { status: 'available', label: 'In Stock — 47 units' } };

export const AllStatuses: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', fontFamily: "'Source Sans 3', sans-serif" }}>
      <AvailabilityChip status="available" />
      <AvailabilityChip status="unavailable" />
      <AvailabilityChip status="on-order" />
      <AvailabilityChip status="discontinued" />
    </div>
  ),
};

export const InContext: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{
      border: '1px solid #DCDCDC', borderRadius: 4, padding: 16, width: 400,
      fontFamily: "'Source Sans 3', sans-serif",
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#002F48' }}>GE Healthcare Ultrasound Probe</span>
        <AvailabilityChip status="available" />
      </div>
      <span style={{ fontSize: 12, color: '#777777' }}>SKU: GE-4542-0012 · $1,249.00</span>
    </div>
  ),
};
