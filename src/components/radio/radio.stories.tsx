import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Radio, RadioGroup } from './radio';
const meta: Meta<typeof Radio> = { title:'Components/Radio', component:Radio, parameters:{layout:'padded'} };
export default meta;
type Story = StoryObj<typeof Radio>;
export const Default: Story = { args:{value:'opt1',label:'Option 1'} };
export const Checked: Story = { args:{value:'opt1',label:'Selected option',checked:true} };
export const WithDescription: Story = { args:{value:'opt1',label:'Standard Shipping',description:'3-5 business days, free on orders over $500',checked:true} };
export const Disabled: Story = { args:{value:'opt1',label:'Unavailable option',disabled:true} };
export const ShippingGroup: Story = {
  render: () => {
    const [v,setV] = useState('standard');
    return (<RadioGroup name="shipping" value={v} onChange={setV} options={[
      {value:'standard',label:'Standard Shipping',description:'3-5 business days — Free on orders over $500'},
      {value:'express',label:'Express Shipping',description:'1-2 business days — $24.99'},
      {value:'overnight',label:'Overnight',description:'Next business day — $49.99'},
      {value:'pickup',label:'Will Call Pickup',description:'Available same day at PartsSource warehouse'},
    ]}/>);
  },
};
export const HorizontalGroup: Story = {
  render: () => {
    const [v,setV] = useState('oem');
    return (<RadioGroup name="partType" value={v} onChange={setV} orientation="horizontal" options={[
      {value:'oem',label:'OEM Parts'},{value:'aftermarket',label:'Aftermarket'},{value:'refurb',label:'Refurbished'},
    ]}/>);
  },
};
