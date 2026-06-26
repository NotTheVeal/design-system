import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Slider } from './slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: { layout: 'padded' },
  argTypes: { disabled: { control: 'boolean' } },
};
export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = { args: { label:'Budget Range', defaultValue:50, showValue:true } };
export const PriceRange: Story = { args: { label:'Max Price ($)', min:0, max:10000, step:100, defaultValue:2500, showMinMax:true, showValue:true } };
export const Quantity: Story = { args: { label:'Quantity', min:1, max:100, step:1, defaultValue:10, showValue:true } };
export const Disabled: Story = { args: { label:'Discount (%)', defaultValue:15, disabled:true, showValue:true } };

export const Interactive: Story = {
  render: () => {
    const [val, setVal] = React.useState(1500);
    return (
      <div style={{ maxWidth:400, fontFamily:'Source Sans Pro, sans-serif' }}>
        <Slider label="Spend Limit" min={0} max={5000} step={50} value={val} onChange={setVal} showValue showMinMax />
        <p style={{ marginTop:16, fontSize:14, color:'#4A4A4A' }}>
          Monthly spend cap: <strong style={{color:'#005BA6'}}>{`$${val.toLocaleString()}`}</strong>
        </p>
      </div>
    );
  },
};
