import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs, SegmentedTabs, PillTabs } from './tabs';

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
          'Active indicator: 3px solid #005BA6 with marginBottom:-1px to overlap container border.',
          'Active text: #005BA6 weight 600. Inactive: #777777. Hover: #002F48.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Standard Tabs',
  render: () => {
    const [active, setActive] = useState('overview');
    return (
      <div style={{ maxWidth: 600, fontFamily: "'Source Sans 3', sans-serif" }}>
        <Tabs tabs={TABS} value={active} onChange={setActive} />
        <div style={{ padding: '16px 0', fontSize: 14, color: '#4A4A4A' }}>
          {active === 'overview' && <><strong>PO-2025-0841</strong> — GE Healthcare. Status: Delivered. Total: $4,200</>}
          {active === 'line-items' && <>3 line items · Qty 1 each</>}
          {active === 'history' && <>Created: Jan 15, 2025 · Approved: Jan 16, 2025</>}
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
          { label: 'Completed', value: 'completed', count: 0 },
        ]}
        value={active}
        onChange={setActive}
      />
    );
  },
};

export const SmallSize: Story = {
  name: 'Small Size',
  render: () => {
    const [active, setActive] = useState('overview');
    return <Tabs tabs={TABS} value={active} onChange={setActive} size="sm" />;
  },
};

export const Segmented: Story = {
  name: 'Segmented Tabs',
  render: () => {
    const [active, setActive] = useState('parts');
    return (
      <SegmentedTabs
        tabs={[{ label: 'Parts', value: 'parts' }, { label: 'Service', value: 'service' }, { label: 'Supplies', value: 'supplies' }]}
        value={active}
        onChange={setActive}
      />
    );
  },
};

export const PillVariant: Story = {
  name: 'Pill Tabs',
  render: () => {
    const [active, setActive] = useState('all');
    return (
      <PillTabs
        tabs={[{ label: 'All', value: 'all' }, { label: 'Pending', value: 'pending' }, { label: 'Approved', value: 'approved' }]}
        value={active}
        onChange={setActive}
      />
    );
  },
};
