import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Metric } from './metric';

const meta: Meta<typeof Metric> = {
  title: 'Components/Metric',
  component: Metric,
  parameters: { layout: 'padded' },
  argTypes: {
    trend: { control: 'select', options: ['up', 'down', 'neutral'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['default', 'card'] },
  },
};
export default meta;
type Story = StoryObj<typeof Metric>;

export const Default: Story = {
  args: { label: 'Total Revenue', value: '\$2.4M', trend: 'up', delta: '+12.5%', deltaLabel: 'vs last quarter', size: 'md' },
};

export const Large: Story = {
  args: { label: 'Parts Ordered', value: '14,820', unit: 'units', trend: 'up', delta: '+8.3%', deltaLabel: 'vs last month', size: 'lg' },
};

export const NegativeTrend: Story = {
  args: { label: 'Avg. Order Value', value: '\$847', trend: 'down', delta: '-3.2%', deltaLabel: 'vs last month', size: 'md' },
};

export const Neutral: Story = {
  args: { label: 'On-Time Delivery', value: '94%', trend: 'neutral', delta: '0%', deltaLabel: 'vs last week', size: 'md' },
};

export const CardVariant: Story = {
  args: { label: 'Active Vendors', value: '312', trend: 'up', delta: '+15', deltaLabel: 'new this month', variant: 'card', size: 'md' },
};

export const VisualAnalyticsEvolution: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontFamily: 'Source Sans Pro, sans-serif' }}>
      <Metric label="Total Parts Ordered" value="247,891" trend="up" delta="+18.2%" deltaLabel="YoY" variant="card" size="lg" />
      <Metric label="Avg. Resolution Time" value="4.2" unit="hrs" trend="down" delta="-22%" deltaLabel="vs Q1" variant="card" size="lg" />
      <Metric label="Vendor Compliance" value="98.4%" trend="up" delta="+2.1pts" deltaLabel="vs last year" variant="card" size="lg" />
      <Metric label="Cost Savings" value="\$1.8M" trend="up" delta="+31%" deltaLabel="YoY" variant="card" size="lg" />
    </div>
  ),
};

export const SmallKPIs: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Metric label="Orders" value="1,284" trend="up" delta="+5%" size="sm" />
      <Metric label="Revenue" value="\$892K" trend="up" delta="+12%" size="sm" />
      <Metric label="Returns" value="42" trend="down" delta="-8%" size="sm" />
      <Metric label="NPS" value="67" trend="neutral" delta="±0" size="sm" />
    </div>
  ),
};
