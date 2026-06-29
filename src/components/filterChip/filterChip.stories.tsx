import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { FilterChip } from './filterChip';

const meta: Meta<typeof FilterChip> = {
  title: 'Components/FilterChip',
  component: FilterChip,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof FilterChip>;

export const Default: Story = { render: () => <FilterChip label="Category" onSelect={() => {}} /> };
export const Selected: Story = { render: () => <FilterChip label="In Stock" selected onSelect={() => {}} onRemove={() => {}} /> };
export const WithCount: Story = { render: () => <FilterChip label="Orders" count={12} onSelect={() => {}} /> };
export const SelectedWithCount: Story = { render: () => <FilterChip label="Active" count={5} selected onSelect={() => {}} onRemove={() => {}} /> };
export const Disabled: Story = { render: () => <FilterChip label="Disabled" disabled onSelect={() => {}} /> };
export const Interactive: Story = {
  parameters: { layout: 'padded' },
  render: () => {
    const filters = ['All', 'In Stock', 'Low Stock', 'On Order', 'Out of Stock'];
    const [active, setActive] = useState('All');
    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: 16 }}>
        {filters.map(f => (
          <FilterChip
            key={f}
            label={f}
            selected={active === f}
            onSelect={() => setActive(f)}
            onRemove={active === f ? () => setActive('All') : undefined}
          />
        ))}
      </div>
    );
  },
};
