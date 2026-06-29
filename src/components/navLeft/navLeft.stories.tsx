import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import NavLeft from './navLeft';
import type { NavItem } from './navLeft';

const meta = {
  title: 'Components/NavLeft',
  component: NavLeft,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    colorVariant: {
      control: 'radio',
      options: ['dark', 'light'],
      description: 'dark = ProProcure Midnight bg | light = white bg',
      table: { defaultValue: { summary: 'dark' } },
    },
    collapsed: { control: 'boolean' },
    showLogo: { control: 'boolean' },
  },
} satisfies Meta<typeof NavLeft>;

export default meta;
type Story = StoryObj<typeof meta>;

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
  {
    id: 'orders',
    label: 'Orders',
    icon: '📋',
    badge: 12,
    children: [
      { id: 'orders-active', label: 'Active Orders' },
      { id: 'orders-history', label: 'Order History' },
      { id: 'orders-drafts', label: 'Drafts', badge: 3 },
    ],
  },
  { id: 'suppliers', label: 'Suppliers', icon: '🏭' },
  { id: 'catalog', label: 'Catalog', icon: '📦' },
  { id: 'budgets', label: 'Budgets', icon: '💰' },
  { id: 'reports', label: 'Reports', icon: '📊' },
  { id: 'settings', label: 'Settings', icon: '⚙' },
];

export const Default: Story = {
  name: 'Default (Dark)',
  args: {
    items: NAV_ITEMS,
    colorVariant: 'dark',
    collapsed: false,
    activeId: 'dashboard',
    showLogo: true,
  },
};

export const DarkDefault: Story = {
  name: 'Dark — ProProcure (default)',
  args: {
    items: NAV_ITEMS,
    colorVariant: 'dark',
    collapsed: false,
    activeId: 'dashboard',
    showLogo: true,
  },
};

export const DarkCollapsed: Story = {
  name: 'Dark — Collapsed (56px icon-only)',
  args: {
    items: NAV_ITEMS,
    colorVariant: 'dark',
    collapsed: true,
    activeId: 'dashboard',
    showLogo: true,
  },
};

export const DarkWithNestedItems: Story = {
  name: 'Dark — With nested nav groups',
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div style={{ display: 'flex', height: 560 }}>
        <NavLeft
          items={NAV_ITEMS}
          activeId="orders-active"
          colorVariant="dark"
          collapsed={collapsed}
          onNavigate={(id) => console.log('Navigate to:', id)}
        />
        <div style={{ padding: 24, fontFamily: "'Source Sans 3', sans-serif", background: '#F8F8F8', flex: 1 }}>
          <button
            onClick={() => setCollapsed((c) => !c)}
            style={{ fontSize: 13, padding: '6px 14px', cursor: 'pointer', border: '1px solid #DCDCDC', borderRadius: 4, fontFamily: "'Source Sans 3', sans-serif", background: '#FFFFFF', color: '#4A4A4A', marginBottom: 16 }}
          >
            {collapsed ? 'Expand' : 'Collapse'} nav
          </button>
          <p style={{ color: '#777777', fontSize: 14, margin: 0 }}>
            Click "Orders" in the nav to expand nested items. The active item is "Active Orders".
          </p>
        </div>
      </div>
    );
  },
};

export const LightDefault: Story = {
  name: 'Light — White bg variant',
  args: {
    items: NAV_ITEMS,
    colorVariant: 'light',
    collapsed: false,
    activeId: 'dashboard',
    showLogo: true,
  },
};

export const LightCollapsed: Story = {
  name: 'Light — Collapsed (56px icon-only)',
  args: {
    items: NAV_ITEMS,
    colorVariant: 'light',
    collapsed: true,
    activeId: 'dashboard',
    showLogo: true,
  },
};

export const DarkVsLight: Story = {
  name: 'Comparison — Dark vs Light',
  render: () => (
    <div style={{ display: 'flex', gap: 0, height: 560 }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#002F48', padding: '6px 12px', fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, fontWeight: 700, color: '#009CF4', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          dark (default)
        </div>
        <NavLeft items={NAV_ITEMS.slice(0, 5)} colorVariant="dark" activeId="dashboard" showLogo />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#EBF3FA', padding: '6px 12px', fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, fontWeight: 700, color: '#005BA6', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          light
        </div>
        <NavLeft items={NAV_ITEMS.slice(0, 5)} colorVariant="light" activeId="dashboard" showLogo />
      </div>
    </div>
  ),
};

export const DarkWithBadges: Story = {
  name: 'Dark — With badge counts',
  args: {
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
      { id: 'orders', label: 'Orders', icon: '📋', badge: 24 },
      { id: 'approvals', label: 'Pending Approval', icon: '⏳', badge: 7 },
      { id: 'catalog', label: 'Catalog', icon: '📦' },
      { id: 'messages', label: 'Messages', icon: '💬', badge: 3 },
      { id: 'settings', label: 'Settings', icon: '⚙' },
    ],
    colorVariant: 'dark',
    activeId: 'orders',
    showLogo: true,
  },
};

export const DarkNoLogo: Story = {
  name: 'Dark — No logo header',
  args: {
    items: NAV_ITEMS.slice(0, 5),
    colorVariant: 'dark',
    activeId: 'catalog',
    showLogo: false,
  },
};
