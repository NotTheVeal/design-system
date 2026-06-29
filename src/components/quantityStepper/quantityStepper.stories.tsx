import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { QuantityStepper } from './quantityStepper';

const meta: Meta<typeof QuantityStepper> = {
  title: 'Components/QuantityStepper',
  component: QuantityStepper,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof QuantityStepper>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState(1);
    return <QuantityStepper value={val} onChange={setVal} />;
  },
};

export const Small: Story = {
  render: () => {
    const [val, setVal] = useState(1);
    return <QuantityStepper value={val} onChange={setVal} size="sm" />;
  },
};

export const WithLimits: Story = {
  render: () => {
    const [val, setVal] = useState(5);
    return <QuantityStepper value={val} onChange={setVal} min={1} max={10} />;
  },
};

export const Disabled: Story = {
  render: () => <QuantityStepper value={3} onChange={() => {}} disabled />,
};
