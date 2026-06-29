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
export const AtMinimum: Story = {
  render: () => {
    const [val, setVal] = useState(1);
    return <QuantityStepper value={val} onChange={setVal} min={1} max={99} />;
  },
};
export const AtMaximum: Story = {
  render: () => {
    const [val, setVal] = useState(99);
    return <QuantityStepper value={val} onChange={setVal} min={1} max={99} />;
  },
};
export const Disabled: Story = {
  render: () => <QuantityStepper value={3} onChange={() => {}} disabled />,
};
export const InContext: Story = {
  parameters: { layout: 'padded' },
  render: () => {
    const [qty, setQty] = useState(1);
    return (
      <div style={{ display:'flex', alignItems:'center', gap:16, padding:16, border:'1px solid #DCDCDC', borderRadius:4, fontFamily:"'Source Sans Pro',sans-serif", width:380 }}>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:14, fontWeight:600, color:'#2B2B2B' }}>GE Healthcare Probe</div>
          <div style={{ fontSize:12, color:'#777777' }}>SKU: 4542-0012</div>
        </div>
        <QuantityStepper value={qty} onChange={setQty} min={1} max={99} />
        <div style={{ fontSize:16, fontWeight:700, color:'#2B2B2B', minWidth:80, textAlign:'right' }}>
          ${(qty * 1249).toLocaleString()}.00
        </div>
      </div>
    );
  },
};
