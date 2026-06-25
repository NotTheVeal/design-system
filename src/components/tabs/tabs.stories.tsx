import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, SegmentedTabs, PillTabs, TabPanel } from './tabs';
import type { TabsProps } from './tabs';

// ── Shared sample data ─────────────────────────────────────────────────────────

const basicTabs = [
  { label: 'Overview', value: 'overview' },
  { label: 'Details', value: 'details' },
  { label: 'History', value: 'history' },
];

const tabsWithCounts = [
  { label: 'Open', value: 'open', count: 12 },
  { label: 'In Progress', value: 'progress', count: 4 },
  { label: 'Closed', value: 'closed', count: 87 },
];

const tabsWithDisabled = [
  { label: 'Available', value: 'available' },
  { label: 'Restricted', value: 'restricted', disabled: true },
  { label: 'Settings', value: 'settings' },
];

const manyTabs = [
  { label: 'General', value: 'general' },
  { label: 'Billing', value: 'billing' },
  { label: 'Team', value: 'team' },
  { label: 'Integrations', value: 'integrations' },
  { label: 'Security', value: 'security' },
];

// ── Controlled wrapper ─────────────────────────────────────────────────────────

function ControlledWrapper<P extends TabsProps>({
  Component,
  initialValue,
  ...props
}: { Component: React.FC<P>; initialValue: string } & Omit<P, 'value' | 'onChange'>) {
  const [value, setValue] = useState(initialValue);
  return (
    <div>
      <Component {...(props as unknown as P)} value={value} onChange={setValue} />
      <div style={{ marginTop: 16, padding: 12, background: '#F8F8F8', borderRadius: 6, fontSize: 13, color: '#555', fontFamily: "'Source Sans 3', sans-serif" }}>
        Active tab: <strong>{value}</strong>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TABS (standard underline)
// ─────────────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => <ControlledWrapper Component={Tabs} tabs={basicTabs} initialValue="overview" />,
};

export const WithCounts: Story = {
  name: 'With Count Badges',
  render: () => <ControlledWrapper Component={Tabs} tabs={tabsWithCounts} initialValue="open" />,
};

export const WithDisabled: Story = {
  name: 'With Disabled Tab',
  render: () => <ControlledWrapper Component={Tabs} tabs={tabsWithDisabled} initialValue="available" />,
};

export const SizeSmall: Story = {
  name: 'Size: Small',
  render: () => <ControlledWrapper Component={Tabs} tabs={basicTabs} initialValue="details" size="sm" />,
};

export const ManyTabs: Story = {
  name: 'Five Tabs',
  render: () => <ControlledWrapper Component={Tabs} tabs={manyTabs} initialValue="general" />,
};

export const WithTabPanels: Story = {
  name: 'With TabPanel Content',
  render: () => {
    const [active, setActive] = useState('overview');
    return (
      <div>
        <Tabs tabs={basicTabs} value={active} onChange={setActive} />
        <TabPanel value="overview" activeValue={active}>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: '#333' }}>Overview panel content — summary information goes here.</p>
        </TabPanel>
        <TabPanel value="details" activeValue={active}>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: '#333' }}>Details panel — extended metadata and specifications.</p>
        </TabPanel>
        <TabPanel value="history" activeValue={active}>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: '#333' }}>History panel — changelog and audit trail.</p>
        </TabPanel>
      </div>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SEGMENTED TABS
// ─────────────────────────────────────────────────────────────────────────────

export const Segmented: Story = {
  name: 'SegmentedTabs — Default',
  render: () => (
    <ControlledWrapper Component={SegmentedTabs} tabs={basicTabs} initialValue="overview" />
  ),
};

export const SegmentedSmall: Story = {
  name: 'SegmentedTabs — Small',
  render: () => (
    <ControlledWrapper Component={SegmentedTabs} tabs={basicTabs} initialValue="details" size="sm" />
  ),
};

export const SegmentedWithCounts: Story = {
  name: 'SegmentedTabs — With Counts',
  render: () => (
    <ControlledWrapper Component={SegmentedTabs} tabs={tabsWithCounts} initialValue="open" />
  ),
};

export const SegmentedWithDisabled: Story = {
  name: 'SegmentedTabs — With Disabled',
  render: () => (
    <ControlledWrapper Component={SegmentedTabs} tabs={tabsWithDisabled} initialValue="available" />
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// PILL TABS
// ─────────────────────────────────────────────────────────────────────────────

export const Pill: Story = {
  name: 'PillTabs — Default',
  render: () => (
    <ControlledWrapper Component={PillTabs} tabs={basicTabs} initialValue="overview" />
  ),
};

export const PillSmall: Story = {
  name: 'PillTabs — Small',
  render: () => (
    <ControlledWrapper Component={PillTabs} tabs={basicTabs} initialValue="details" size="sm" />
  ),
};

export const PillWithCounts: Story = {
  name: 'PillTabs — With Counts',
  render: () => (
    <ControlledWrapper Component={PillTabs} tabs={tabsWithCounts} initialValue="open" />
  ),
};

export const PillWithDisabled: Story = {
  name: 'PillTabs — With Disabled',
  render: () => (
    <ControlledWrapper Component={PillTabs} tabs={tabsWithDisabled} initialValue="available" />
  ),
};

export const PillManyTabs: Story = {
  name: 'PillTabs — Five Tabs',
  render: () => (
    <ControlledWrapper Component={PillTabs} tabs={manyTabs} initialValue="general" />
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// ALL THREE VARIANTS SIDE BY SIDE
// ─────────────────────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants Comparison',
  render: () => {
    const [t1, setT1] = useState('overview');
    const [t2, setT2] = useState('overview');
    const [t3, setT3] = useState('overview');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: "'Source Sans 3', sans-serif" }}>
        <div>
          <p style={{ fontSize: 12, color: '#777', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Standard Tabs</p>
          <Tabs tabs={basicTabs} value={t1} onChange={setT1} />
        </div>
        <div>
          <p style={{ fontSize: 12, color: '#777', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Segmented Tabs</p>
          <SegmentedTabs tabs={basicTabs} value={t2} onChange={setT2} />
        </div>
        <div>
          <p style={{ fontSize: 12, color: '#777', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pill Tabs</p>
          <PillTabs tabs={basicTabs} value={t3} onChange={setT3} />
        </div>
      </div>
    );
  },
};
