import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DropdownMenu } from './dropdownMenu';

const ITEMS = [
  { value: 'edit', label: 'Edit' },
  { value: 'duplicate', label: 'Duplicate' },
  { value: 'archive', label: 'Archive' },
  { value: 'delete', label: 'Delete', variant: 'danger' as const },
];

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: () => (
    <DropdownMenu
      trigger={<button style={{ padding: '8px 16px', background: '#005BA6', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: "'Source Sans Pro', sans-serif" }}>Actions ▼</button>}
      items={ITEMS}
      onSelect={(v) => console.log(v)}
    />
  ),
};

export const WithIcons: Story = {
  render: () => (
    <DropdownMenu
      trigger={<button style={{ padding: '8px 16px', background: '#FFFFFF', color: '#005BA6', border: '1px solid #005BA6', borderRadius: 4, cursor: 'pointer', fontFamily: "'Source Sans Pro', sans-serif" }}>Options ▼</button>}
      items={[
        { value: 'view', label: 'View Details' },
        { value: 'edit', label: 'Edit' },
        { value: 'export', label: 'Export CSV' },
        { value: 'delete', label: 'Delete', variant: 'danger' as const },
      ]}
      onSelect={(v) => console.log(v)}
    />
  ),
};
