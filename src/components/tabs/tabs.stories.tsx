import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs, SegmentedTabs, PillTabs, TabPanel } from './tabs';
import type { Tab } from './tabs';

const TABS: Tab[] = [
  { label: 'Overview',   value: 'overview' },
  { label: 'Line Items', value: 'line-items' },
  { label: 'History',    value: 'history' },
];

const TABS_WITH_COUNT: Tab[] = [
  { label: 'Active',    value: 'active',    count: 12 },
  { label: 'Pending',   value: 'pending',   count: 3  },
  { label: 'Completed', value: 'completed', count: 0  },
  { label: 'Cancelled', value: 'cancelled', count: 1, disabled: true },
];

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `**PS Design System 2.0 — Tabs**

Horizontal tab navigation with active indicator.

| Property | Value |
|---|---|
| Active indicator | 3px solid #005BA6, marginBottom: -1px |
| Active text | #005BA6, font-weight 600 |
| Inactive text | #777777 |
| Hover text | #002F48 (Midnight) |
| Container border | 1px solid #DCDCDC |
| Height | 44px (default), 36px (sm) |
`.trim(),
      },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Standard Tabs — Default',
  render: () => {
    const [active, setActive] = useState('overview');
    return (
      <div style={{ maxWidth: 640, fontFamily: "'Source Sans 3', sans-serif" }}>
        <Tabs tabs={TABS} value={active} onChange={setActive} />
        <TabPanel value="overview" activeValue={active} style={{ padding: '16px 0' }}>
          <strong>PO-2025-0841</strong> — GE Healthcare<br />
          Status: Delivered | Total: $4,200
        </TabPanel>
        <TabPanel value="line-items" activeValue={active} style={{ padding: '16px 0' }}>
          3 line items · Qty 1 each
        </TabPanel>
        <TabPanel value="history" activeValue={active} style={{ padding: '16px 0' }}>
          Created: Jan 15, 2025 · Approved: Jan 16, 2025
        </TabPanel>
      </div>
    );
  },
};

export const WithCounts: Story = {
  name: 'With Count Badges',
  render: () => {
    const [active, setActive] = useState('active');
    return (
      <Tabs tabs={TABS_WITH_COUNT} value={active} onChange={setActive} />
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
        tabs={[
          { label: 'Parts',    value: 'parts' },
          { label: 'Service',  value: 'service' },
          { label: 'Supplies', value: 'supplies' },
        ]}
        value={active}
        onChange={setActive}
      />
    );
  },
  parameters: {
    docs: {
      description: { story: 'Pill-shaped container. Active tab: #005BA6 fill, white text.' },
    },
  },
};

export const PillVariant: Story = {
  name: 'Pill Tabs',
  render: () => {
    const [active, setActive] = useState('all');
    return (
      <PillTabs
        tabs={[
          { label: 'All',       value: 'all' },
          { label: 'Pending',   value: 'pending' },
          { label: 'Approved',  value: 'approved' },
          { label: 'Rejected',  value: 'rejected', disabled: true },
        ]}
        value={active}
        onChange={setActive}
      />
    );
  },
  parameters: {
    docs: {
      description: { story: 'Standalone pill buttons. Active: #005BA6 fill. Inactive: border only.' },
    },
  },
};

export const AllVariants: Story = {
  name: 'All 3 Variants',
  render: () => {
    const [t1, setT1] = useState('overview');
    const [t2, setT2] = useState('parts');
    const [t3, setT3] = useState('all');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: "'Source Sans 3', sans-serif" }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#777', marginBottom: 8 }}>Standard</p>
          <Tabs tabs={TABS} value={t1} onChange={setT1} />
        </div>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#777', marginBottom: 8 }}>Segmented</p>
          <SegmentedTabs tabs={[{label:'Parts',value:'parts'},{label:'Service',value:'service'}]} value={t2} onChange={setT2} />
        </div>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#777', marginBottom: 8 }}>Pill</p>
          <PillTabs tabs={[{label:'All',value:'all'},{label:'Active',value:'active'},{label:'Archived',value:'archived'}]} value={t3} onChange={setT3} />
        </div>
      </div>
    );
  },
};
