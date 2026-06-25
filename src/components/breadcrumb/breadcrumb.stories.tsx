import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Breadcrumb from './breadcrumb';
import type { BreadcrumbItem } from './breadcrumb';

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Navigation breadcrumb trail. Supports back-arrow style and overflow truncation for deep hierarchies.',
      },
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

const FF = "'Source Sans Pro','Source Sans 3',sans-serif";

export const Default: Story = {
  name: 'Default — 3 Levels',
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Orders', href: '/orders' },
      { label: 'PO-2026-00412' },
    ],
  },
};

export const BackNavigation: Story = {
  name: 'Back Navigation — Arrow Style',
  render: () => {
    const ArrowLeft = () => (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#005BA6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4, verticalAlign: 'middle' }}>
        <polyline points="9 2 4 7 9 12"/>
      </svg>
    );
    return (
      <div style={{ fontFamily: FF }}>
        <a href="#" onClick={e => e.preventDefault()} style={{ display: 'inline-flex', alignItems: 'center', fontSize: 14, color: '#005BA6', textDecoration: 'none', fontFamily: FF }}>
          <ArrowLeft />
          Back to Orders
        </a>
        <div style={{ marginTop: 16 }}>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Orders', href: '/orders' },
            { label: 'PO-2026-00412' },
          ]} />
        </div>
      </div>
    );
  },
};

export const OverflowThreePlus: Story = {
  name: 'Overflow — First + ... + Last (4+ levels)',
  render: () => {
    const deepItems: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Procurement', href: '/procurement' },
      { label: 'Purchase Orders', href: '/procurement/po' },
      { label: 'Q2 2026', href: '/procurement/po/q2-2026' },
      { label: 'PO-2026-00412' },
    ];
    const first = deepItems[0];
    const last = deepItems[deepItems.length - 1];
    return (
      <nav aria-label="breadcrumb" style={{ fontFamily: FF }}>
        <ol style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4, listStyle: 'none', margin: 0, padding: 0 }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <a href={first.href} style={{ fontSize: 14, color: '#005BA6', textDecoration: 'none', fontFamily: FF }}>{first.label}</a>
            <span style={{ fontSize: 14, color: '#DCDCDC' }}>/</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span title={"Collapsed: " + deepItems.slice(1, -1).map(i => i.label).join(" / ")} style={{ fontSize: 14, color: '#777', cursor: 'pointer', padding: '0 2px', fontFamily: FF }}>…</span>
            <span style={{ fontSize: 14, color: '#DCDCDC' }}>/</span>
          </li>
          <li>
            <span aria-current="page" style={{ fontSize: 14, fontWeight: 600, color: '#4A4A4A', fontFamily: FF }}>{last.label}</span>
          </li>
        </ol>
        <div style={{ marginTop: 8, fontSize: 12, color: '#949494', fontFamily: FF }}>
          Full path: {deepItems.map(i => i.label).join(' / ')}
        </div>
      </nav>
    );
  },
};

export const TwoLevel: Story = {
  name: 'Two Levels',
  args: {
    items: [
      { label: 'Dashboard', href: '/' },
      { label: 'Settings' },
    ],
  },
};

export const WithCustomSeparator: Story = {
  name: 'Custom Separator — Chevron',
  render: () => (
    <Breadcrumb
      separator={
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#DCDCDC" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 2 8 6 4 10"/>
        </svg>
      }
      items={[
        { label: 'Catalog', href: '/catalog' },
        { label: 'Bearings', href: '/catalog/bearings' },
        { label: 'SKF 6205-2RS' },
      ]}
    />
  ),
};
