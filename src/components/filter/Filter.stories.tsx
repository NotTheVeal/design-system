import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Filter from './filter';

const meta: Meta<typeof Filter> = {
  title: 'Components/Filter',
  component: Filter,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Filter>;

const categoryOptions = [
  { label: 'Patient Monitoring', value: 'patient-monitoring' },
  { label: 'Infusion Therapy', value: 'infusion-therapy' },
  { label: 'Respiratory Care', value: 'respiratory-care' },
  { label: 'Surgical Instruments', value: 'surgical-instruments' },
];

export const Default: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);
    return (
      <div style={{ padding: 24, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <Filter
          label="Category"
          options={categoryOptions}
          value={values}
          onChange={setValues}
        />
      </div>
    );
  },
};

export const WithSelection: Story = {
  render: () => {
    const [values, setValues] = useState(['patient-monitoring', 'respiratory-care']);
    return (
      <div style={{ padding: 24, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <Filter
          label="Category"
          options={categoryOptions}
          value={values}
          onChange={setValues}
        />
        <Filter
          label="Availability"
          options={[
            { label: 'In Stock', value: 'in-stock' },
            { label: 'Ships in 1–2 days', value: 'ships-soon' },
            { label: 'Backordered', value: 'backordered' },
          ]}
          value={[]}
          onChange={() => {}}
        />
      </div>
    );
  },
};
