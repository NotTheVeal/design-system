import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs } from './tabs';

const TABS = [
  { label: 'Overview', value: 'overview' },
  { label: 'Line Items', value: 'line-items' },
  { label: 'History', value: 'history' },
];

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '**PS Design System 2.0 — Tabs**',
          '',
          'Active: 3px solid #005BA6 bottom border, marginBottom:-1px overlapping container.',
          'Active text: #005BA6 weight 600. Inactive: #777777.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Standard Tabs — active indicator',
  render: () => {
    const [active, setActive] = useState('overview');
    return (
      <div style={{ maxWidth: 600, fontFamily: "'Source Sans 3', sans-serif" }}>
        <Tabs tabs={TABS} value={active} onChange={setActive} />
        <div style={{ padding: '16px 0', fontSize: 14, color: '#4A4A4A' }}>
          Active: <strong>{active}</strong>
        </div>
      </div>
    );
  },
};

export const WithCounts: Story = {
  name: 'With Count Badges',
  render: () => {
    const [active, setActive] = useState('active');
    return (
      <Tabs
        tabs={[
          { label: 'Active', value: 'active', count: 12 },
          { label: 'Pending', value: 'pending', count: 3 },
          { label: 'Complete', value: 'complete', count: 0 },
        ]}
        value={active}
        onChange={setActive}
      />
    );
  },
};

export const AllTabsActive: Story = {
  name: 'Each tab selected',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {TABS.map(tab => (
        <div key={tab.value}>
          <p style={{ fontSize: 11, color: '#777', marginBottom: 4, fontFamily: "'Source Sans 3', sans-serif" }}>{tab.label} active:</p>
          <Tabs tabs={TABS} value={tab.value} onChange={() => {}} />
        </div>
      ))}
    </div>
  ),
};
