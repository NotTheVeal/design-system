import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Input from './input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Input label="Part Number" placeholder="e.g. MRI-7842" />
    </div>
  ),
};

export const WithValue: Story = {
  render: () => {
    const [val, setVal] = useState('Siemens MAGNETOM Aera');
    return (
      <div style={{ width: 360 }}>
        <Input label="Equipment Name" value={val} onChange={e => setVal(e.target.value)} />
      </div>
    );
  },
};

export const Required: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Input label="PO Number" required placeholder="PO-XXXXX" />
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Input label="Budget Code" helperText="Enter the 6-digit cost center code from your finance team." placeholder="123456" />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Input label="Shipping Address" error="Shipping address is required before submitting the order." defaultValue="" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Input label="Contract Number" defaultValue="SC-2024-0193" disabled />
    </div>
  ),
};

export const LargeSize: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Input label="Purchase Description" size="large" placeholder="Describe the equipment or part..." />
    </div>
  ),
};

export const PasswordType: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Input label="Password" type="password" required />
    </div>
  ),
};

export const CheckoutForm: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 480, padding: 24, border: '1px solid #DCDCDC', borderRadius: 8 }}>
      <Input label="Facility Name" required defaultValue="St. Mary Medical Center" />
      <Input label="Delivery Address" required placeholder="123 Hospital Dr" />
      <div style={{ display: 'flex', gap: 12 }}>
        <Input label="City" required placeholder="Columbus" />
        <Input label="ZIP Code" placeholder="43215" />
      </div>
      <Input label="Purchase Order #" required placeholder="PO-XXXXX" helperText="Must match your ERP system PO number." />
    </div>
  ),
};
