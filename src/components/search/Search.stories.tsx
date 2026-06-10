import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Search from './search';

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ width: 320 }}>
        <Search
          placeholder="Search parts, equipment..."
          value={val}
          onChange={setVal}
          onSearch={(v) => alert('Searching: ' + v)}
        />
      </div>
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [val, setVal] = useState('MRI Scanner');
    return (
      <div style={{ width: 320 }}>
        <Search
          placeholder="Search parts, equipment..."
          value={val}
          onChange={setVal}
        />
      </div>
    );
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Search by part number or description...',
    defaultValue: '',
  },
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};

export const Disabled: Story = {
  args: {
    placeholder: 'Search unavailable',
    disabled: true,
  },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

export const Wide: Story = {
  args: {
    placeholder: 'Search contracts, suppliers, or part numbers...',
    defaultValue: '',
  },
  decorators: [(Story) => <div style={{ width: 560 }}><Story /></div>],
};
