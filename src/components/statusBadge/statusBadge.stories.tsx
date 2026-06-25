import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { StatusBadge } from './statusBadge';
import type { StatusBadgeVariant, StatusBadgeShape } from './statusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A compact badge used to communicate status, category, or state. Supports five semantic variants and two shape styles.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'danger', 'warning', 'info', 'neutral'] satisfies StatusBadgeVariant[],
      description: 'Visual status variant',
      table: {
        defaultValue: { summary: 'neutral' },
      },
    },
    shape: {
      control: 'radio',
      options: ['status', 'list'] satisfies StatusBadgeShape[],
      description: 'Shape/style of the badge',
      table: {
        defaultValue: { summary: 'status' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text rendered inside the badge',
    },
    withDot: {
      control: 'boolean',
      description: 'Optional leading dot indicator',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    label: 'Active',
    variant: 'neutral',
    shape: 'status',
    withDot: false,
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    variant: 'info',
    label: 'In Progress',
  },
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants — Status Shape',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
      <StatusBadge variant="success" label="Success" shape="status" />
      <StatusBadge variant="danger"  label="Error"   shape="status" />
      <StatusBadge variant="warning" label="Warning" shape="status" />
      <StatusBadge variant="info"    label="Info"    shape="status" />
      <StatusBadge variant="neutral" label="Neutral" shape="status" />
    </div>
  ),
};

export const AllVariantsList: Story = {
  name: 'All Variants — List Shape',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
      <StatusBadge variant="success" label="Success" shape="list" />
      <StatusBadge variant="danger"  label="Error"   shape="list" />
      <StatusBadge variant="warning" label="Warning" shape="list" />
      <StatusBadge variant="info"    label="Info"    shape="list" />
      <StatusBadge variant="neutral" label="Neutral" shape="list" />
    </div>
  ),
};

// ─── With Dot ─────────────────────────────────────────────────────────────────

export const WithDot: Story = {
  name: 'With Dot Indicator',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
      <StatusBadge variant="success" label="Online"      shape="status" withDot />
      <StatusBadge variant="danger"  label="Offline"     shape="status" withDot />
      <StatusBadge variant="warning" label="Degraded"    shape="status" withDot />
      <StatusBadge variant="info"    label="Syncing"     shape="status" withDot />
      <StatusBadge variant="neutral" label="Unknown"     shape="status" withDot />
    </div>
  ),
};

export const WithDotList: Story = {
  name: 'With Dot Indicator — List Shape',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
      <StatusBadge variant="success" label="Online"   shape="list" withDot />
      <StatusBadge variant="danger"  label="Offline"  shape="list" withDot />
      <StatusBadge variant="warning" label="Degraded" shape="list" withDot />
      <StatusBadge variant="info"    label="Syncing"  shape="list" withDot />
      <StatusBadge variant="neutral" label="Unknown"  shape="list" withDot />
    </div>
  ),
};

// ─── Individual Variants ──────────────────────────────────────────────────────

export const Success: Story = {
  args: { variant: 'success', label: 'Completed', withDot: true },
};

export const Danger: Story = {
  args: { variant: 'danger', label: 'Failed', withDot: true },
};

export const Warning: Story = {
  args: { variant: 'warning', label: 'Pending', withDot: true },
};

export const Info: Story = {
  args: { variant: 'info', label: 'In Review', withDot: true },
};

export const Neutral: Story = {
  args: { variant: 'neutral', label: 'Draft', withDot: false },
};

// ─── Real-world usage ─────────────────────────────────────────────────────────

export const InContext: Story = {
  name: 'In Context — Order Table Row',
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px 20px',
        border: '1px solid #DCDCDC',
        borderRadius: '6px',
        fontFamily: "'Source Sans 3', -apple-system, sans-serif",
        fontSize: '14px',
        color: '#4A4A4A',
        width: '480px',
      }}
    >
      <span style={{ flex: 1 }}>PO-2024-00871</span>
      <span style={{ color: '#777777' }}>Apr 12, 2025</span>
      <StatusBadge variant="success" label="Shipped" shape="status" withDot />
    </div>
  ),
};

export const LongLabel: Story = {
  name: 'Long Label',
  args: {
    variant: 'warning',
    label: 'Awaiting Approval',
    shape: 'list',
    withDot: true,
  },
};

export const CustomStyle: Story = {
  name: 'Custom Style Override',
  args: {
    variant: 'info',
    label: 'Custom',
    shape: 'status',
    style: { fontSize: '14px', padding: '6px 12px' },
  },
};
