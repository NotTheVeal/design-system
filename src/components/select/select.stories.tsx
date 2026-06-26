import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Select from './select';

const OPTS = [
  { value:'imaging',    label:'Imaging Equipment' },
  { value:'ultrasound', label:'Ultrasound' },
  { value:'monitoring', label:'Patient Monitoring' },
  { value:'surgical',   label:'Surgical Instruments' },
  { value:'lab',        label:'Laboratory Equipment' },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ maxWidth:400, width:'100%', margin:'40px auto' }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = { args: { label:'Category', options:OPTS } };
export const WithValue: Story = { args: { label:'Category', options:OPTS, value:'imaging', onChange:()=>{} } };
export const WithHelperText: Story = { args: { label:'Equipment Type', options:OPTS, helperText:'Select the primary equipment category' } };
export const WithError: Story = { args: { label:'Category', options:OPTS, errorText:'Please select a category' } };
export const Disabled: Story = { args: { label:'Category', options:OPTS, value:'imaging', disabled:true, onChange:()=>{} } };
export const Interactive: Story = {
  render: () => {
    const [val, setVal] = React.useState('');
    return <Select label="Select category" options={OPTS} value={val} onChange={setVal} />;
  },
};
