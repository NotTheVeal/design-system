import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import NavLeft from './navLeft';

const meta: Meta<typeof NavLeft> = {
  title: 'Components/NavLeft',
  component: NavLeft,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof NavLeft>;

const psNavItems = [
  { label: 'Dashboard', value: 'dashboard', badge: undefined },
  { label: 'Orders', value: 'orders', badge: 4 },
  {
    label: 'Equipment',
    value: 'equipment',
    children: [
      { label: 'All Equipment', value: 'equipment-all' },
      { label: 'Service Requests', value: 'equipment-service' },
      { label: 'Maintenance', value: 'equipment-maintenance' },
    ],
  },
  { label: 'Contracts', value: 'contracts' },
  { label: 'Suppliers', value: 'suppliers' },
  { label: 'Reports', value: 'reports' },
  { label: 'Settings', value: 'settings', disabled: true },
];

export const Default: Story = {
  args: {
    items: psNavItems,
    activeValue: 'dashboard',
    onItemClick: () => {},
  },
  decorators: [(Story) => <div style={{ height: 500 }}><Story /></div>],
};

export const ActiveOrders: Story = {
  args: {
    items: psNavItems,
    activeValue: 'orders',
    onItemClick: () => {},
  },
  decorators: [(Story) => <div style={{ height: 500 }}><Story /></div>],
};

export const Collapsed: Story = {
  args: {
    items: psNavItems,
    activeValue: 'dashboard',
    collapsed: true,
    onCollapseToggle: () => {},
    onItemClick: () => {},
  },
  decorators: [(Story) => <div style={{ height: 500 }}><Story /></div>],
};

export const WithCollapseToggle: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    const [active, setActive] = useState('dashboard');
    return (
      <div style={{ height: 500 }}>
        <NavLeft
          items={psNavItems}
          activeValue={active}
          collapsed={collapsed}
          onCollapseToggle={() => setCollapsed(c => !c)}
          onItemClick={setActive}
        />
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [active, setActive] = useState('dashboard');
    return (
      <div style={{ display: 'flex', height: 500 }}>
        <NavLeft
          items={psNavItems}
          activeValue={active}
          onItemClick={setActive}
        />
        <div style={{ flex: 1, padding: 24, fontFamily: "'Source Sans Pro', sans-serif", fontSize: 14, color: '#4A4A4A' }}>
          <strong>Active page:</strong> {active}
        </div>
      </div>
    );
  },
};
