import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Radio, RadioGroup } from './radio';

const OPTIONS = [
  { value: 'oem', label: 'OEM Parts only' },
  { value: 'aftermarket', label: 'Aftermarket Parts only' },
  { value: 'both', label: 'OEM and Aftermarket' },
];

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState('oem');
    return <RadioGroup name="default" options={OPTIONS.slice(0, 1)} value={val} onChange={setVal} />;
  },
};
export const Group: Story = {
  parameters: { layout: 'padded' },
  render: () => {
    const [val, setVal] = useState('oem');
    return <RadioGroup name="parts-group" options={OPTIONS} value={val} onChange={setVal} />;
  },
};
export const Horizontal: Story = {
  parameters: { layout: 'padded' },
  render: () => {
    const [val, setVal] = useState('oem');
    return <RadioGroup name="parts-h" options={OPTIONS} value={val} onChange={setVal} orientation="horizontal" />;
  },
};
export const WithDisabled: Story = {
  parameters: { layout: 'padded' },
  render: () => {
    const [val, setVal] = useState('oem');
    return (
      <RadioGroup
        name="parts-d"
        options={[...OPTIONS, { value: 'na', label: 'Not Available', disabled: true }]}
        value={val}
        onChange={setVal}
      />
    );
  },
};
export const Selected: Story = {
  parameters: { layout: 'padded' },
  render: () => {
    const [val, setVal] = useState('aftermarket');
    return <RadioGroup name="selected" options={OPTIONS} value={val} onChange={setVal} />;
  },
};
