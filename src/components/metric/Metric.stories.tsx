import type { Meta, StoryObj } from '@storybook/react';
import Metric from './metric';

const meta: Meta<typeof Metric> = {
  title: 'Components/Metric',
  component: Metric,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    trend: {
      control: 'select',
      options: ['up', 'down', 'neutral'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Metric>;

export const Positive: Story = {
  args: {
    value: '98.4%',
    label: 'On-Time Delivery Rate',
    trend: 'up',
    trendValue: '+2.1%',
    trendLabel: 'vs last quarter',
  },
};

export const Negative: Story = {
  args: {
    value: '$24,180',
    label: 'Overdue Purchase Orders',
    trend: 'down',
    trendValue: '-$3,200',
    trendLabel: 'vs last month',
  },
};

export const Neutral: Story = {
  args: {
    value: '2.4 days',
    label: 'Avg. Lead Time',
    trend: 'neutral',
    trendValue: 'No change',
  },
};

export const LargeNumber: Story = {
  args: {
    value: '1,284',
    label: 'Parts Orders This Quarter',
    trend: 'up',
    trendValue: '+184',
    trendLabel: 'vs Q1',
  },
};

export const WithUnit: Story = {
  args: {
    value: '94.7',
    unit: '%',
    label: 'Parts Availability Rate',
    trend: 'up',
    trendValue: '+1.3%',
    trendLabel: 'month over month',
  },
};

export const NoTrend: Story = {
  args: {
    value: '342',
    label: 'Active Suppliers',
  },
};

export const CurrencyMetric: Story = {
  args: {
    value: '$1.2M',
    label: 'Annual Parts Spend',
    trend: 'down',
    trendValue: '-8.4%',
    trendLabel: 'budget saved YTD',
  },
};
