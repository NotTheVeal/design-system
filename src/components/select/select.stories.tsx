import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Select } from './select';
const CATEGORIES = [{value:'imaging',label:'Imaging & Diagnostics'},{value:'surgical',label:'Surgical Equipment'},{value:'monitoring',label:'Patient Monitoring'},{value:'infusion',label:'Infusion Systems'},{value:'lab',label:'Lab Supplies'},{value:'respiratory',label:'Respiratory'}];
const MANUFACTURERS = [{value:'ge',label:'GE Healthcare'},{value:'siemens',label:'Siemens Healthineers'},{value:'philips',label:'Philips Healthcare'},{value:'stryker',label:'Stryker'},{value:'medtronic',label:'Medtronic'},{value:'bd',label:'Becton Dickinson'}];
const meta: Meta<typeof Select> = { title:'Components/Select', component:Select, parameters:{layout:'padded'}, argTypes:{size:{control:'select',options:['sm','md','lg']},disabled:{control:'boolean'}} };
export default meta;
type Story = StoryObj<typeof Select>;
export const Default: Story = { args:{options:CATEGORIES,placeholder:'Select category'} };
export const WithLabel: Story = { args:{options:CATEGORIES,label:'Category'} };
export const PreSelected: Story = { args:{options:CATEGORIES,label:'Category',defaultValue:'imaging'} };
export const WithError: Story = { args:{options:CATEGORIES,label:'Category',error:'Please select a category'} };
export const Disabled: Story = { args:{options:CATEGORIES,label:'Category',defaultValue:'imaging',disabled:true} };
export const SmallSize: Story = { args:{options:MANUFACTURERS,label:'Manufacturer',size:'sm'} };
export const Interactive: Story = {
  render: () => {
    const [cat,setCat] = useState('');
    const [mfr,setMfr] = useState('');
    return (
      <div style={{ display:'flex', flexDirection:'column', gap:16, maxWidth:400, fontFamily:'Source Sans Pro, sans-serif' }}>
        <Select options={CATEGORIES} label="Category" value={cat} onChange={setCat} />
        <Select options={MANUFACTURERS} label="Manufacturer" value={mfr} onChange={setMfr} />
        <div style={{ padding:'12px 16px', background:'#F1F1F1', borderRadius:4, fontSize:13 }}>
          <strong>Selected:</strong> {cat||'—'} / {mfr||'—'}
        </div>
      </div>
    );
  },
};
