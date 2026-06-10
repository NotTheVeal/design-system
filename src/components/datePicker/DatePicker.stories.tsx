import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DatePicker from './datePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div style={{ width: 320 }}>
        <DatePicker
          label="Delivery Date"
          value={date}
          onChange={setDate}
        />
      </div>
    );
  },
};

export const WithPreselectedDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date(2025, 5, 15));
    return (
      <div style={{ width: 320 }}>
        <DatePicker
          label="Contract Effective Date"
          value={date}
          onChange={setDate}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <DatePicker
        label="Service Date"
        value={new Date(2025, 3, 28)}
        disabled
      />
    </div>
  ),
};

export const CustomPlaceholder: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div style={{ width: 320 }}>
        <DatePicker
          label="PO Expiry Date"
          placeholder="Select expiry..."
          value={date}
          onChange={setDate}
        />
      </div>
    );
  },
};

export const MultipleFields: Story = {
  render: () => {
    const [start, setStart] = useState<Date | null>(null);
    const [end, setEnd] = useState<Date | null>(null);
    return (
      <div style={{ display: 'flex', gap: 16 }}>
        <DatePicker
          label="Contract Start"
          value={start}
          onChange={setStart}
        />
        <DatePicker
          label="Contract End"
          value={end}
          onChange={setEnd}
        />
      </div>
    );
  },
};
