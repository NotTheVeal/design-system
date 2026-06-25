import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DataVisualization } from './dataVisualization';

const meta: Meta<typeof DataVisualization> = {
  title: 'Components/DataVisualization',
  component: DataVisualization,
  parameters: { layout: 'padded' },
  argTypes: { type: { control: 'select', options: ['bar', 'line', 'area', 'pie', 'donut'] } },
};
export default meta;
type Story = StoryObj<typeof DataVisualization>;

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const quarterSeries = [
  { name: 'Parts Ordered', data: [420, 580, 490, 720, 650, 810] },
  { name: 'Parts Returned', data: [38, 52, 45, 63, 58, 71] },
];
const revenueSeries = [
  { name: 'Revenue', data: [180000, 245000, 210000, 320000, 290000, 380000] },
];
const vendorData = [
  { label: 'GE Healthcare', value: 38 },
  { label: 'Siemens', value: 27 },
  { label: 'Philips', value: 19 },
  { label: 'Stryker', value: 9 },
  { label: 'Other', value: 7 },
];

export const BarChart: Story = {
  args: { type: 'bar', title: 'Parts Activity — H1 2025', labels: months, series: quarterSeries, height: 260, showLegend: true },
};

export const LineChart: Story = {
  args: { type: 'line', title: 'Revenue Trend', labels: months, series: revenueSeries, height: 240, showLegend: true },
};

export const AreaChart: Story = {
  args: { type: 'area', title: 'Parts Ordered (Area)', labels: months, series: quarterSeries, height: 240, showLegend: true },
};

export const PieChart: Story = {
  args: { type: 'pie', title: 'Vendor Distribution', data: vendorData, height: 220 },
};

export const DonutChart: Story = {
  args: { type: 'donut', title: 'Vendor Mix', data: vendorData, height: 220 },
};

export const MultiSeriesBar: Story = {
  render: () => (
    <DataVisualization
      type="bar"
      title="Q1–Q2 Performance by Category"
      labels={['Imaging', 'Surgical', 'Monitoring', 'Infusion', 'Lab']}
      series={[
        { name: 'Q1 2025', data: [120, 85, 210, 65, 98] },
        { name: 'Q2 2025', data: [145, 102, 248, 78, 115] },
      ]}
      height={280}
      showValues
    />
  ),
};

export const Dashboard: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ flex: 2 }}>
          <DataVisualization type="area" title="Monthly Revenue" labels={months} series={revenueSeries} height={200} />
        </div>
        <div style={{ flex: 1 }}>
          <DataVisualization type="donut" title="Top Vendors" data={vendorData} height={200} />
        </div>
      </div>
      <DataVisualization type="bar" title="Parts Volume by Month" labels={months} series={quarterSeries} height={200} showLegend />
    </div>
  ),
};
