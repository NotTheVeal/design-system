import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Checkbox } from './checkbox';
const meta: Meta<typeof Checkbox> = { title:'Components/Checkbox', component:Checkbox, parameters:{layout:'padded'}, argTypes:{disabled:{control:'boolean'},error:{control:'boolean'}} };
export default meta;
type Story = StoryObj<typeof Checkbox>;
export const Default: Story = { args:{label:'Accept terms and conditions'} };
export const Checked: Story = { args:{label:'Email notifications',defaultChecked:true} };
export const WithDescription: Story = { args:{label:'Approved Vendor Only',description:'Only show parts from approved vendors',defaultChecked:true} };
export const Indeterminate: Story = { args:{label:'Select all items',indeterminate:true} };
export const Disabled: Story = { args:{label:'Disabled option',disabled:true,defaultChecked:true} };
export const CheckboxGroup: Story = {
  render: () => {
    const [selected,setSelected]=useState(['imaging']);
    const toggle=(v:string)=>setSelected(p=>p.includes(v)?p.filter(x=>x!==v):[...p,v]);
    return (<div style={{display:'flex',flexDirection:'column',gap:12,fontFamily:'Source Sans Pro,sans-serif'}}>
      <p style={{margin:0,fontSize:13,fontWeight:600,color:'#4A4A4A'}}>Filter by Category ({selected.length} selected)</p>
      {[['imaging','Imaging'],['surgical','Surgical'],['monitoring','Monitoring'],['infusion','Infusion'],['lab','Lab']].map(([v,l])=><Checkbox key={v} label={l} checked={selected.includes(v)} onChange={()=>toggle(v)}/>)}
    </div>);
  },
};
export const Interactive: Story = { render: () => { const [c,setC]=useState(false); return <Checkbox label={c?'Checked':'Unchecked'} description="Click to toggle" checked={c} onChange={setC}/>; } };
