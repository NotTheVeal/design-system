import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Tabs, { SegmentedTabs, PillTabs } from './tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const ff = "'Source Sans Pro', sans-serif";

// ─── Folder Tabs ──────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    tabs: [
      {
        label: 'Overview',
        content: (
          <div style={{ fontFamily: ff, fontSize: 14, color: '#4A4A4A' }}>
            <p><strong>PO-2025-0841</strong> — GE Healthcare</p>
            <p>Status: Delivered | Total: $4,200</p>
          </div>
        ),
      },
      {
        label: 'Line Items',
        content: (
          <div style={{ fontFamily: ff, fontSize: 14, color: '#4A4A4A' }}>
            <p>1× Ultrasound Probe 3.5MHz — $389.00</p>
            <p>2× SpO2 Sensor Reusable — $178.00</p>
          </div>
        ),
      },
      {
        label: 'History',
        content: (
          <div style={{ fontFamily: ff, fontSize: 14, color: '#4A4A4A' }}>
            <p>Jun 3 — Submitted by R. Veal</p>
            <p>Jun 4 — Approved by J. Barker</p>
            <p>Jun 6 — Shipped from GE Louisville</p>
          </div>
        ),
      },
    ],
    defaultActiveIndex: 0,
  },
};

export const WithCount: Story = {
  args: {
    tabs: [
      { label: 'All Orders', content: 'Showing all 24 orders.', count: 24 },
      { label: 'Pending', content: 'Showing 4 pending orders.', count: 4 },
      { label: 'Delivered', content: 'Showing 18 delivered orders.', count: 18 },
      { label: 'Cancelled', content: 'Showing 2 cancelled orders.', count: 2 },
    ],
    defaultActiveIndex: 0,
  },
};

export const WithDisabledTab: Story = {
  args: {
    tabs: [
      { label: 'Details', content: 'Equipment details panel.' },
      { label: 'Service History', content: 'Service history panel.' },
      { label: 'Compliance Docs', content: 'Documents panel.', disabled: true },
    ],
    defaultActiveIndex: 0,
  },
};

export const Controlled: Story = {
  render: () => {
    const [active, setActive] = useState(0);
    const tabs = [
      { label: 'Equipment', content: 'Equipment tab content.' },
      { label: 'Contracts', content: 'Contracts tab content.' },
      { label: 'Suppliers', content: 'Suppliers tab content.' },
    ];
    return (
      <div>
        <Tabs tabs={tabs} activeTabIndex={active} onTabChange={setActive} />
        <p style={{ fontFamily: ff, fontSize: 13, color: '#777', marginTop: 8 }}>Active index: {active}</p>
      </div>
    );
  },
};

// ─── Segmented Tabs (separate stories file workaround via render) ──────────────

export const Segmented: Story = {
  render: () => {
    const [view, setView] = useState('grid');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <SegmentedTabs
          value={view}
          onChange={setView}
          options={[
            { label: 'Grid', value: 'grid' },
            { label: 'List', value: 'list' },
            { label: 'Map', value: 'map' },
          ]}
        />
        <p style={{ fontFamily: ff, fontSize: 13, color: '#777' }}>View: {view}</p>
      </div>
    );
  },
};

// ─── Pill Tabs ────────────────────────────────────────────────────────────────

export const Pills: Story = {
  render: () => {
    const [status, setStatus] = useState('all');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <PillTabs
          value={status}
          onChange={setStatus}
          options={[
            { label: 'All', value: 'all', count: 42 },
            { label: 'In Transit', value: 'transit', count: 7 },
            { label: 'Delivered', value: 'delivered', count: 31 },
            { label: 'Backordered', value: 'backorder', count: 4 },
            { label: 'Archived', value: 'archived', disabled: true },
          ]}
        />
        <p style={{ fontFamily: ff, fontSize: 13, color: '#777' }}>Filter: {status}</p>
      </div>
    );
  },
};
