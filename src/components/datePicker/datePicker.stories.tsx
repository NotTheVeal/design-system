import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { DatePicker } from './datePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ maxWidth: 400, width: '100%', margin: '40px auto' }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return <DatePicker label="Due Date" value={val} onChange={setVal} />;
  },
};
export const WithValue: Story = {
  render: () => {
    const [val, setVal] = useState('2026-12-31');
    return <DatePicker label="Delivery Date" value={val} onChange={setVal} />;
  },
};
export const WithHelperText: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return <DatePicker label="Expected Delivery" value={val} onChange={setVal} helperText="Select the expected delivery date for this order" />;
  },
};
export const WithError: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return <DatePicker label="Expiry Date" value={val} onChange={setVal} errorText="Please select a valid date" />;
  },
};
export const Disabled: Story = {
  render: () => <DatePicker label="Locked Date" value="2026-06-15" onChange={() => {}} disabled />,
};
export const WithLimits: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return <DatePicker label="Appointment" value={val} onChange={setVal} min="2026-01-01" max="2026-12-31" helperText="Select a date in 2026" />;
  },
};
