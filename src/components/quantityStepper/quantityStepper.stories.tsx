import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { QuantityStepper } from './quantityStepper';

const meta: Meta<typeof QuantityStepper> = {
  title: 'Components/QuantityStepper',
  component: QuantityStepper,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
    min: { control: 'number' },
    max: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof QuantityStepper>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState(1);
    return <QuantityStepper value={val} onChange={setVal} />;
  },
};

export const MediumSize: Story = {
  render: () => {
    const [val, setVal] = useState(3);
    return <QuantityStepper value={val} onChange={setVal} size="md" />;
  },
};

export const SmallSize: Story = {
  render: () => {
    const [val, setVal] = useState(2);
    return <QuantityStepper value={val} onChange={setVal} size="sm" />;
  },
};

export const WithMax: Story = {
  render: () => {
    const [val, setVal] = useState(1);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <QuantityStepper value={val} onChange={setVal} min={1} max={5} />
        <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: '#777777' }}>Max: 5</span>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => <QuantityStepper value={3} onChange={() => {}} disabled />,
};

export const AtMinimum: Story = {
  render: () => {
    const [val, setVal] = useState(1);
    return <QuantityStepper value={val} onChange={setVal} min={1} />;
  },
};

export const InCartContext: Story = {
  render: () => {
    const [qty, setQty] = useState(1);
    const unitPrice = 24.50;
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '16px 20px', border: '1px solid #DCDCDC', borderRadius: 4, fontFamily: "'Source Sans 3', sans-serif", background: '#FFFFFF', minWidth: 360 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#4A4A4A' }}>Pulse Oximeter Probe</div>
          <div style={{ fontSize: 13, color: '#777777', marginTop: 2 }}>Part #PS-7731</div>
        </div>
        <QuantityStepper value={qty} onChange={setQty} min={1} max={99} size="md" />
        <div style={{ fontSize: 14, fontWeight: 700, color: '#005BA6', minWidth: 56, textAlign: 'right' }}>
          ${(unitPrice * qty).toFixed(2)}
        </div>
      </div>
    );
  },
};
