import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Slider from './slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    showValue: { control: 'boolean' },
    label: { control: 'text' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <div style={{ width: 320, padding: 16 }}>
        <Slider
          label="Price Range"
          value={value}
          min={0}
          max={100}
          step={1}
          onChange={setValue}
          showValue
          valueSuffix="%"
        />
      </div>
    );
  },
};

export const Quantity: Story = {
  render: () => {
    const [value, setValue] = useState(5);
    return (
      <div style={{ width: 320, padding: 16 }}>
        <Slider
          label="Order Quantity"
          value={value}
          min={1}
          max={50}
          step={1}
          onChange={setValue}
          showValue
        />
      </div>
    );
  },
};

export const BudgetFilter: Story = {
  render: () => {
    const [value, setValue] = useState(2500);
    return (
      <div style={{ width: 320, padding: 16 }}>
        <Slider
          label="Maximum Budget"
          value={value}
          min={0}
          max={10000}
          step={100}
          onChange={setValue}
          showValue
          valueSuffix=" USD"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 320, padding: 16 }}>
      <Slider
        label="Lead Time (days)"
        value={14}
        min={0}
        max={30}
        step={1}
        onChange={() => {}}
        showValue
        disabled
      />
    </div>
  ),
};
