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
  args: {
    label: 'Part Number',
    placeholder: 'e.g. MRI-7842',
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
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
  args: {
    label: 'PO Number',
    required: true,
    placeholder: 'PO-XXXXX',
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const WithHelperText: Story = {
  args: {
    label: 'Budget Code',
    helperText: 'Enter the 6-digit cost center code from your finance team.',
    placeholder: '123456',
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const WithError: Story = {
  args: {
    label: 'Shipping Address',
    error: 'Shipping address is required before submitting the order.',
    defaultValue: '',
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const Disabled: Story = {
  args: {
    label: 'Contract Number',
    defaultValue: 'SC-2024-0193',
    disabled: true,
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const LargeSize: Story = {
  args: {
    label: 'Purchase Description',
    size: 'large',
    placeholder: 'Describe the equipment or part...',
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const PasswordType: Story = {
  args: {
    label: 'Password',
    type: 'password',
    required: true,
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
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
