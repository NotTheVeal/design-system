import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { StatusBadge, StatusBadgeProps } from './statusBadge';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof StatusBadge> = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'StatusBadge communicates the state or category of an item. It supports five semantic variants and two shape styles — `status` (pill-rect) and `list` (fully rounded).',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'danger', 'warning', 'info', 'neutral'],
      description: 'Semantic color variant',
      table: { defaultValue: { summary: 'neutral' } },
    },
    shape: {
      control: 'radio',
      options: ['status', 'list'],
      description: '`status` — 4px radius · `list` — 100px radius',
      table: { defaultValue: { summary: 'status' } },
    },
    label: {
      control: 'text',
      description: 'Text content of the badge',
    },
    withDot: {
      control: 'boolean',
      description: 'Show a leading dot indicator',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    label: 'In Stock',
    variant: 'success',
    shape: 'status',
    withDot: false,
  },
};

// ─── All Variants — Status Shape ──────────────────────────────────────────────

export const AllVariantsStatus: Story = {
  name: 'All Variants · Status Shape',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center',
        fontFamily: "'Source Sans 3', -apple-system, sans-serif",
      }}
    >
      <StatusBadge variant="success" shape="status" label="Active" />
      <StatusBadge variant="danger"  shape="status" label="Critical" />
      <StatusBadge variant="warning" shape="status" label="Pending" />
      <StatusBadge variant="info"    shape="status" label="Info" />
      <StatusBadge variant="neutral" shape="status" label="Inactive" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All five semantic variants rendered with the default `status` shape (4px border-radius).',
      },
    },
  },
};

// ─── All Variants — List Shape ────────────────────────────────────────────────

export const AllVariantsList: Story = {
  name: 'All Variants · List Shape',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center',
        fontFamily: "'Source Sans 3', -apple-system, sans-serif",
      }}
    >
      <StatusBadge variant="success" shape="list" label="Active" />
      <StatusBadge variant="danger"  shape="list" label="Critical" />
      <StatusBadge variant="warning" shape="list" label="Pending" />
      <StatusBadge variant="info"    shape="list" label="Info" />
      <StatusBadge variant="neutral" shape="list" label="Inactive" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All five semantic variants rendered with the `list` shape (100px border-radius — fully rounded pill).',
      },
    },
  },
};

// ─── With Dot Indicator ───────────────────────────────────────────────────────

export const WithDotIndicator: Story = {
  name: 'With Dot Indicator',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center',
        fontFamily: "'Source Sans 3', -apple-system, sans-serif",
      }}
    >
      <StatusBadge variant="success" shape="status" label="Online"   withDot />
      <StatusBadge variant="danger"  shape="status" label="Offline"  withDot />
      <StatusBadge variant="warning" shape="status" label="Degraded" withDot />
      <StatusBadge variant="info"    shape="status" label="Syncing"  withDot />
      <StatusBadge variant="neutral" shape="status" label="Unknown"  withDot />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An optional 6px leading dot reinforces the status color at a glance.',
      },
    },
  },
};

// ─── With Dot — List Shape ────────────────────────────────────────────��───────

export const WithDotList: Story = {
  name: 'With Dot · List Shape',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center',
        fontFamily: "'Source Sans 3', -apple-system, sans-serif",
      }}
    >
      <StatusBadge variant="success" shape="list" label="Fulfilled"    withDot />
      <StatusBadge variant="danger"  shape="list" label="Backordered"  withDot />
      <StatusBadge variant="warning" shape="list" label="Low Stock"    withDot />
      <StatusBadge variant="info"    shape="list" label="On Order"     withDot />
      <StatusBadge variant="neutral" shape="list" label="Discontinued" withDot />
    </div>
  ),
};

// ─── Real-World: Order Table Row ──────────────────────────────────────────────

export const OrderTableRow: Story = {
  name: 'Real-World · Order Table Row',
  render: () => (
    <div
      style={{
        fontFamily: "'Source Sans 3', -apple-system, sans-serif",
        border: '1px solid #DCDCDC',
        borderRadius: '6px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,47,72,0.10)',
        minWidth: '560px',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr 1fr 1fr',
          padding: '10px 16px',
          backgroundColor: '#F1F1F1',
          borderBottom: '1px solid #DCDCDC',
          fontSize: '12px',
          fontWeight: 700,
          color: '#777777',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        <span>Order #</span>
        <span>Part</span>
        <span>Qty</span>
        <span>Status</span>
      </div>

      {/* Rows */}
      {[
        { order: 'PO-10041', part: 'Ventilator Filter HEPA', qty: 12, variant: 'success' as const, label: 'Fulfilled' },
        { order: 'PO-10042', part: 'IV Pump Tubing Set',     qty: 3,  variant: 'warning' as const, label: 'Low Stock' },
        { order: 'PO-10043', part: 'Defibrillator Electrode',qty: 1,  variant: 'danger'  as const, label: 'Backordered' },
        { order: 'PO-10044', part: 'Patient Monitor Cable',  qty: 6,  variant: 'info'    as const, label: 'On Order' },
        { order: 'PO-10045', part: 'Syringe Infusion Pump',  qty: 2,  variant: 'neutral' as const, label: 'Discontinued' },
      ].map((row, i) => (
        <div
          key={row.order}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr 1fr 1fr',
            padding: '12px 16px',
            borderBottom: i < 4 ? '1px solid #DCDCDC' : undefined,
            fontSize: '14px',
            color: '#4A4A4A',
            alignItems: 'center',
          }}
        >
          <span style={{ color: '#005BA6', fontWeight: 600 }}>{row.order}</span>
          <span>{row.part}</span>
          <span>{row.qty}</span>
          <StatusBadge
            variant={row.variant}
            shape="status"
            label={row.label}
            withDot
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'StatusBadge used inside a procurement order table — a common PartsSource pattern.',
      },
    },
  },
};

// ─── Individual Variant Stories ───────────────────────────────────────────────

export const Success: Story = {
  args: { variant: 'success', label: 'Active', shape: 'status', withDot: true },
};

export const Danger: Story = {
  args: { variant: 'danger', label: 'Critical', shape: 'status', withDot: true },
};

export const Warning: Story = {
  args: { variant: 'warning', label: 'Pending', shape: 'status', withDot: true },
};

export const Info: Story = {
  args: { variant: 'info', label: 'In Review', shape: 'status', withDot: true },
};

export const Neutral: Story = {
  args: { variant: 'neutral', label: 'Inactive', shape: 'status', withDot: false },
};
