import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Input from './input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ maxWidth:400, width:'100%', margin:'40px auto' }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = { args: { label: 'Email address', type:'email' } };
export const WithValue: Story = { args: { label: 'Email address', value:'rachael@partssource.com', onChange:()=>{} } };
export const WithHelperText: Story = { args: { label: 'Part Number', helperText:'Enter the manufacturer part number' } };
export const WithError: Story = { args: { label: 'Email address', value:'invalid', errorText:'Please enter a valid email address', onChange:()=>{} } };
export const Disabled: Story = { args: { label: 'Account ID', value:'ACC-00192', disabled:true, onChange:()=>{} } };
export const Large: Story = { args: { label: 'Description', size:'large' } };
export const Interactive: Story = {
  render: () => {
    const [val, setVal] = React.useState('');
    return <Input label="Search parts" value={val} onChange={e=>setVal(e.target.value)} />;
  },
};
export const AllStates: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display:'flex', flexDirection:'column', gap:20, maxWidth:400, margin:'0 auto' }}>
      <Input label="Default empty" />
      <Input label="With value" value="ACC-00192" onChange={()=>{}} />
      <Input label="With helper text" helperText="Enter your account ID" />
      <Input label="Error state" value="bad-value" errorText="This field is required" onChange={()=>{}} />
      <Input label="Disabled" value="Read only" disabled onChange={()=>{}} />
    </div>
  ),
};
