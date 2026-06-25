import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import PageShell from './pageShell';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

// ─── NavTop sample ────────────────────────────────────────────────────────────

const SampleNavTop = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      padding: '0 20px',
      gap: 16,
      width: '100%',
      boxSizing: 'border-box',
      fontFamily,
    }}
  >
    {/* Logo / Brand */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 4,
          background: '#005BA6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="2" width="12" height="12" rx="2" fill="white" fillOpacity="0.9" />
        </svg>
      </div>
      <span style={{ fontSize: 16, fontWeight: 700, color: '#005BA6' }}>PartsSource</span>
    </div>

    {/* Nav items */}
    <nav style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      {['Catalog', 'Orders', 'Reports'].map(item => (
        <a
          key={item}
          href="#"
          style={{
            fontSize: 14,
            color: '#4A4A4A',
            textDecoration: 'none',
            fontWeight: 400,
            fontFamily,
          }}
        >
          {item}
        </a>
      ))}
    </nav>

    {/* User avatar */}
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        background: '#005BA6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      RV
    </div>
  </div>
);

// ─── NavLeft sample ───────────────────────────────────────────────────────────

const navItems = [
  { label: 'Dashboard', icon: '⊞' },
  { label: 'Equipment', icon: '⚙' },
  { label: 'Orders', icon: '📋' },
  { label: 'Inventory', icon: '📦' },
  { label: 'Vendors', icon: '🏢' },
  { label: 'Reports', icon: '📊' },
  { label: 'Settings', icon: '⚙' },
];

const SampleNavLeft = ({ collapsed = false }: { collapsed?: boolean }) => (
  <nav style={{ padding: '12px 0', fontFamily }}>
    {navItems.map((item, i) => (
      <a
        key={item.label}
        href="#"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: collapsed ? 0 : 10,
          padding: collapsed ? '10px 0' : '10px 16px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          color: i === 0 ? '#005BA6' : '#4A4A4A',
          background: i === 0 ? '#E5F1FB' : 'transparent',
          textDecoration: 'none',
          fontSize: 14,
          fontWeight: i === 0 ? 600 : 400,
          borderLeft: i === 0 ? '3px solid #005BA6' : '3px solid transparent',
          fontFamily,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
        {!collapsed && item.label}
      </a>
    ))}
  </nav>
);

// ─── Sample page content ──────────────────────────────────────────────────────

const SampleContent = () => (
  <div style={{ fontFamily }}>
    <h1 style={{ fontSize: 24, fontWeight: 600, color: '#2B2B2B', marginBottom: 8, marginTop: 0 }}>
      Dashboard
    </h1>
    <p style={{ fontSize: 14, color: '#777777', marginBottom: 24 }}>
      Welcome back. Here is your equipment summary.
    </p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      {[
        { label: 'Active Orders', value: '142', color: '#005BA6' },
        { label: 'Equipment Items', value: '1,847', color: '#17AB78' },
        { label: 'Pending Approvals', value: '23', color: '#E3A92D' },
      ].map(card => (
        <div
          key={card.label}
          style={{
            background: '#FFFFFF',
            border: '1px solid #DCDCDC',
            borderRadius: 6,
            padding: '20px 24px',
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700, color: card.color, marginBottom: 4 }}>
            {card.value}
          </div>
          <div style={{ fontSize: 13, color: '#777777' }}>{card.label}</div>
        </div>
      ))}
    </div>
  </div>
);

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof PageShell> = {
  title: 'Components/PageShell',
  component: PageShell,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Layout shell with a pinned 56px NavTop, pinned 240px NavLeft, and a main content area with correct padding offsets. Supports a collapsed 60px sidebar mode.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — NavTop + NavLeft + Content',
  render: () => (
    <div style={{ height: 600, position: 'relative', overflow: 'hidden' }}>
      <PageShell
        navTop={<SampleNavTop />}
        navLeft={<SampleNavLeft />}
      >
        <SampleContent />
      </PageShell>
    </div>
  ),
};

export const ContentOnly: Story = {
  name: 'Content Only — No Nav Bars',
  render: () => (
    <div style={{ height: 400, position: 'relative', overflow: 'hidden' }}>
      <PageShell>
        <SampleContent />
      </PageShell>
    </div>
  ),
};

export const WithSidebarCollapsed: Story = {
  name: 'With Sidebar Collapsed — 60px icon-only mode',
  render: () => (
    <div style={{ height: 600, position: 'relative', overflow: 'hidden' }}>
      <PageShell
        navTop={<SampleNavTop />}
        navLeft={<SampleNavLeft collapsed />}
        sidebarCollapsed
      >
        <SampleContent />
      </PageShell>
    </div>
  ),
};
