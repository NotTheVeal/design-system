import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Metric } from './metric';

const meta: Meta<typeof Metric> = {
  title: 'Components/Metric',
  component: Metric,
  tags: ['autodocs'],
  argTypes: {
    trend: { control: 'select', options: ['up', 'down', 'neutral'] },
  },
};
export default meta;
type Story = StoryObj<typeof Metric>;

export const Default: Story = {
  name: 'Default',
  args: {
    value: 1284,
    label: 'Total Orders',
    card: true,
  },
};

export const WithTrend: Story = {
  name: 'WithTrend',
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Metric value={94.2} label="Fill Rate" trend="up" trendValue="+3.1%" trendLabel="vs last month" card />
      <Metric value={2.4} label="Error Rate" trend="down" trendValue="-0.8%" trendLabel="vs last month" card />
    </div>
  ),
};

export const MetricGrid: Story = {
  name: 'MetricGrid',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, width: 480 }}>
      <Metric value={1284} label="Total Orders" trend="up" trendValue="+12%" card />
      <Metric value={94.2} label="Fill Rate" unit="%" trend="up" trendValue="+3.1%" card />
      <Metric value={47} label="Pending" trend="neutral" description="Awaiting approval" card />
      <Metric value={2.4} label="Error Rate" unit="%" trend="down" trendValue="-0.8%" card />
    </div>
  ),
};

export const WithSparkline: Story = {
  name: 'WithSparkline',
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Metric
        value={8421}
        label="Revenue"
        unit="$"
        trend="up"
        trendValue="+18%"
        card
        sparkline={[
          { value: 5200 }, { value: 6100 }, { value: 5800 }, { value: 7200 },
          { value: 6900 }, { value: 7800 }, { value: 8421 },
        ]}
      />
      <Metric
        value={342}
        label="Parts Shipped"
        trend="up"
        trendValue="+7%"
        card
        sparkline={[
          { value: 210 }, { value: 240 }, { value: 195 }, { value: 280 },
          { value: 310 }, { value: 295 }, { value: 342 },
        ]}
      />
    </div>
  ),
};

export const Positive: Story = { args: { value: 94.2, label: 'Fill Rate', trend: 'up', trendValue: '+3.1%' } };
export const Negative: Story = { args: { value: 2.4, label: 'Error Rate', trend: 'down', trendValue: '-0.8%' } };
export const Neutral: Story = { args: { value: 47, label: 'Pending Orders', trend: 'neutral' } };
export const LargeNumber: Story = { args: { value: 1284392, label: 'Total Parts Ordered', trend: 'up', trendValue: '+12%' } };
