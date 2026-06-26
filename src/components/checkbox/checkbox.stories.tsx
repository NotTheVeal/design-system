import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Checkbox from './checkbox';
const meta: Meta<typeof Checkbox> = { title:'Components/Checkbox', component:Checkbox, parameters:{ layout:'centered' } };
export default meta;
type Story = StoryObj<typeof Checkbox>;
export const Default: Story = { args:{ label:'Accept terms and conditions' } };
export const Checked: Story = { args:{ label:'I agree', checked:true, onChange:()=>{} } };
export const Unchecked: Story = { args:{ label:'Subscribe', checked:false, onChange:()=>{} } };
export const Indeterminate: Story = { args:{ label:'Select all', indeterminate:true } };
export const Disabled: Story = { args:{ label:'Disabled', disabled:true } };
export const DisabledChecked: Story = { args:{ label:'Disabled checked', disabled:true, checked:true, onChange:()=>{} } };
export const WithHelperText: Story = { args:{ label:'Email notifications', helperText:'Receive order updates via email' } };
export const Interactive: Story = {
  render: () => { const [c,setC]=React.useState(false); return <Checkbox label={c?'Checked':'Click to check'} checked={c} onChange={setC}/>; },
};
export const AllStates: Story = {
  parameters:{ layout:'padded' },
  render:()=>(
    <div style={{display:'flex',flexDirection:'column',gap:16,fontFamily:"'Source Sans Pro',sans-serif"}}>
      <Checkbox label="Unchecked"/>
      <Checkbox label="Checked" defaultChecked/>
      <Checkbox label="Indeterminate" indeterminate/>
      <Checkbox label="Disabled" disabled/>
      <Checkbox label="Disabled checked" disabled defaultChecked/>
    </div>
  ),
};
