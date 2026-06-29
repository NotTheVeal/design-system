import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { RadioButton, Radio, RadioGroup } from './radio';

const meta: Meta<typeof RadioButton> = {
  title: 'Components/Radio',
  component: RadioButton,
  parameters: { layout: 'centered' },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {
  args: { name: 'demo', value: 'opt1', label: 'Option 1', checked: false, onChange: () => {} },
};
export const Checked: Story = {
  args: { name: 'demo', value: 'opt1', label: 'Selected option', checked: true, onChange: () => {} },
};
export const WithDescription: Story = {
  render: () => (
    <RadioButton name="demo" value="opt1" label="Standard Shipping" checked={true} onChange={() => {}}
      description="3-5 business days — Free on orders over $500" />
  ),
};
export const Disabled: Story = {
  args: { name: 'demo', value: 'opt1', label: 'Unavailable option', checked: false, disabled: true, onChange: () => {} },
};

export const ShippingGroup: Story = {
  parameters: { layout: 'padded' },
  render: () => {
    const [v, setV] = useState('standard');
    return (
      <RadioGroup name="shipping" value={v} onChange={setV} options={[
        { value: 'standard', label: 'Standard Shipping', description: '3-5 business days — Free on orders over $500' },
        { value: 'express',  label: 'Express Shipping',  description: '1-2 business days — $24.99' },
        { value: 'overnight',label: 'Overnight',         description: 'Next business day — $49.99' },
        { value: 'pickup',   label: 'Will Call Pickup',  description: 'Available same day at PartsSource warehouse' },
      ]} />
    );
  },
};

export const HorizontalGroup: Story = {
  parameters: { layout: 'padded' },
  render: () => {
    const [v, setV] = useState('oem');
    return (
      <RadioGroup name="partType" value={v} onChange={setV} orientation="horizontal" options={[
        { value: 'oem',         label: 'OEM Parts' },
        { value: 'aftermarket', label: 'Aftermarket' },
        { value: 'refurb',      label: 'Refurbished' },
      ]} />
    );
  },
};
