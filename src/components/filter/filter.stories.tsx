import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CheckboxFilter, TreeFilter } from './filter';
import type { TreeFilterNode } from './filter';

const meta: Meta = {
  title: 'Components/Filter',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Two filter types: CheckboxFilter (dropdown multi-select) and TreeFilter (hierarchical expandable tree with checkboxes).',
      },
    },
  },
};

export default meta;

// âââ Sample data ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

const categoryOptions = [
  { label: 'Patient Monitoring', value: 'patient-monitoring' },
  { label: 'Infusion Therapy', value: 'infusion-therapy' },
  { label: 'Respiratory Care', value: 'respiratory-care' },
  { label: 'Surgical Equipment', value: 'surgical-equipment' },
  { label: 'Imaging Systems', value: 'imaging-systems' },
];

const treeNodes: TreeFilterNode[] = [
  {
    id: 'patient-monitoring',
    label: 'Patient Monitoring',
    children: [
      { id: 'vital-signs', label: 'Vital Signs Monitors' },
      { id: 'ecg', label: 'ECG Monitors' },
      { id: 'pulse-ox', label: 'Pulse Oximeters' },
    ],
  },
  {
    id: 'infusion-therapy',
    label: 'Infusion Therapy',
    children: [
      { id: 'iv-pumps', label: 'IV Pumps' },
      { id: 'syringe-pumps', label: 'Syringe Pumps' },
    ],
  },
  {
    id: 'respiratory-care',
    label: 'Respiratory Care',
    children: [
      { id: 'ventilators', label: 'Ventilators' },
      { id: 'nebulizers', label: 'Nebulizers' },
      { id: 'cpap', label: 'CPAP Devices' },
    ],
  },
  {
    id: 'surgical',
    label: 'Surgical Equipment',
    children: [
      { id: 'electrosurgery', label: 'Electrosurgery Units' },
      { id: 'surgical-lights', label: 'Surgical Lights' },
    ],
  },
];

// âââ CheckboxFilter stories âââââââââââââââââââââââââââââââââââââââââââââââââââ

export const Default: StoryObj = {
  name: 'Default â CheckboxFilter',
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <CheckboxFilter label="Category" options={categoryOptions} />
      <CheckboxFilter label="Status" options={[
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Pending', value: 'pending' },
      ]} />
      <CheckboxFilter label="Priority" options={[
        { label: 'High', value: 'high' },
        { label: 'Medium', value: 'medium' },
        { label: 'Low', value: 'low' },
      ]} />
    </div>
  ),
};

export const WithSelection: StoryObj = {
  name: 'With Selection â CheckboxFilter',
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <CheckboxFilter
        label="Category"
        options={categoryOptions}
        defaultValue={['patient-monitoring', 'respiratory-care']}
      />
      <CheckboxFilter
        label="Status"
        options={[
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
          { label: 'Pending', value: 'pending' },
        ]}
        defaultValue={['active']}
      />
    </div>
  ),
};

// âââ TreeFilter stories âââââââââââââââââââââââââââââââââââââââââââââââââââââââ

export const TreeFilterStory: StoryObj = {
  name: 'TreeFilter â Hierarchical',
  render: () => (
    <div style={{ width: 280 }}>
      <TreeFilter nodes={treeNodes} defaultValue={['vital-signs', 'ecg', 'ventilators']} />
    </div>
  ),
};

export const TreeFilterWithSearch: StoryObj = {
  name: 'TreeFilter â With Search',
  render: () => (
    <div style={{ width: 280 }}>
      <TreeFilter
        nodes={treeNodes}
        searchable
        searchPlaceholder="Search equipment..."
        defaultValue={['vital-signs']}
      />
    </div>
  ),
};
