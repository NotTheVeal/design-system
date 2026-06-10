import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Select from './select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    helperText: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const categoryOptions = [
  { label: 'Patient Monitoring', value: 'patient-monitoring' },
  { label: 'Infusion Therapy', value: 'infusion-therapy' },
  { label: 'Respiratory Care', value: 'respiratory-care' },
  { label: 'Surgical Instruments', value: 'surgical-instruments' },
  { label: 'Imaging & Diagnostics', value: 'imaging-diagnostics' },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: 320 }}>
        <Select
          options={categoryOptions}
          value={value}
          onChange={setValue}
          label="Product Category"
          placeholder="Select a category"
        />
      </div>
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState('patient-monitoring');
    return (
      <div style={{ width: 320 }}>
        <Select
          options={categoryOptions}
          value={value}
          onChange={setValue}
          label="Product Category"
        />
      </div>
    );
  },
};

export const WithHelperText: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: 320 }}>
        <Select
          options={categoryOptions}
          value={value}
          onChange={setValue}
          label="Equipment Type"
          helperText="Filter results by equipment category"
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: 320 }}>
        <Select
          options={categoryOptions}
          value={value}
          onChange={setValue}
          label="Product Category"
          error="Please select a category to continue"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Select
        options={categoryOptions}
        value="respiratory-care"
        onChange={() => {}}
        label="Product Category"
        disabled
      />
    </div>
  ),
};
