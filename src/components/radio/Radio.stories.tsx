import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from './radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    colorScheme: { control: 'select', options: ['current', 'future'] },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    label: 'Standard Delivery (3–5 business days)',
    selected: false,
    disabled: false,
    value: 'standard',
  },
};

export const Selected: Story = {
  args: {
    label: 'Expedited Delivery (1–2 business days)',
    selected: true,
    disabled: false,
    value: 'expedited',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Overnight Delivery (unavailable in your region)',
    selected: false,
    disabled: true,
    value: 'overnight',
  },
};

export const Group: Story = {
  render: () => {
    const [value, setValue] = useState('expedited');
    return (
      <RadioGroup
        value={value}
        name="shipping-method"
        options={[
          { label: 'Standard Delivery (3–5 business days) — Free', value: 'standard' },
          { label: 'Expedited Delivery (1–2 business days) — $15.00', value: 'expedited' },
          { label: 'Overnight Delivery (unavailable in your region)', value: 'overnight', disabled: true },
        ]}
        onChange={setValue}
      />
    );
  },
};
