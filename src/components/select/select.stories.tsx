import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Select from './select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ width: 360 }}>
        <Select
          label="Equipment Category"
          options={['MRI Systems', 'CT Scanners', 'Ultrasound', 'X-Ray', 'Patient Monitoring', 'Lab Equipment']}
          value={val}
          onChange={setVal}
        />
      </div>
    );
  },
};

export const WithSelected: Story = {
  render: () => {
    const [val, setVal] = useState('ct');
    return (
      <div style={{ width: 360 }}>
        <Select
          label="Modality"
          options={[
            { label: 'MRI', value: 'mri' },
            { label: 'CT Scanner', value: 'ct' },
            { label: 'Ultrasound', value: 'us' },
            { label: 'X-Ray', value: 'xr' },
          ]}
          value={val}
          onChange={setVal}
        />
      </div>
    );
  },
};

export const NoLabel: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ width: 280 }}>
        <Select
          placeholder="Select supplier..."
          options={['Siemens Healthineers', 'GE Healthcare', 'Philips Medical', 'Canon Medical']}
          value={val}
          onChange={setVal}
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ width: 360 }}>
        <Select
          label="Approval Level"
          options={['Manager', 'Director', 'VP', 'CFO']}
          value={val}
          onChange={setVal}
          error="Please select an approval level before submitting."
        />
      </div>
    );
  },
};

export const WithHelperText: Story = {
  render: () => {
    const [val, setVal] = useState('net30');
    return (
      <div style={{ width: 360 }}>
        <Select
          label="Payment Terms"
          options={[
            { label: 'Net 15', value: 'net15' },
            { label: 'Net 30', value: 'net30' },
            { label: 'Net 60', value: 'net60' },
            { label: 'Due on Receipt', value: 'due' },
          ]}
          value={val}
          onChange={setVal}
          helperText="Payment terms must match your active vendor agreement."
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Select
        label="Contract Type"
        options={['Full Coverage', 'Parts Only', 'Labor Only']}
        value="Full Coverage"
        onChange={() => {}}
        disabled
      />
    </div>
  ),
};

export const WithDisabledOption: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ width: 360 }}>
        <Select
          label="Service Level"
          options={[
            { label: 'Bronze', value: 'bronze' },
            { label: 'Silver', value: 'silver' },
            { label: 'Gold', value: 'gold' },
            { label: 'Platinum (Coming Soon)', value: 'platinum', disabled: true },
          ]}
          value={val}
          onChange={setVal}
        />
      </div>
    );
  },
};
