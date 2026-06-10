import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DataVisualization from './dataVisualization';

const meta: Meta<typeof DataVisualization> = {
  title: 'Components/DataVisualization',
  component: DataVisualization,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataVisualization>;

export const BarChart: Story = {
  args: {
    type: 'bar',
    title: 'Monthly Spend by Category',
    subtitle: 'Q1 2025 — ProProcure',
    data: [
      { label: 'Jan', value: 148000 },
      { label: 'Feb', value: 192000 },
      { label: 'Mar', value: 167000 },
      { label: 'Apr', value: 214000 },
      { label: 'May', value: 188000 },
      { label: 'Jun', value: 231000 },
    ],
    height: 280,
  },
  decorators: [(Story) => <div style={{ width: 560 }}><Story /></div>],
};

export const DonutChart: Story = {
  args: {
    type: 'donut',
    title: 'Spend by Equipment Type',
    subtitle: 'YTD 2025',
    data: [
      { label: 'Imaging', value: 42 },
      { label: 'Surgical', value: 28 },
      { label: 'Patient Monitoring', value: 18 },
      { label: 'Lab Equipment', value: 12 },
    ],
    height: 240,
  },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
};

export const LineChart: Story = {
  args: {
    type: 'line',
    title: 'Contract Renewals',
    subtitle: 'Last 6 months',
    data: [
      { label: 'Jan', value: 8 },
      { label: 'Feb', value: 14 },
      { label: 'Mar', value: 11 },
      { label: 'Apr', value: 19 },
      { label: 'May', value: 16 },
      { label: 'Jun', value: 23 },
    ],
    height: 260,
  },
  decorators: [(Story) => <div style={{ width: 560 }}><Story /></div>],
};

export const SupplierSpendDonut: Story = {
  args: {
    type: 'donut',
    title: 'Spend by Supplier',
    data: [
      { label: 'Siemens Healthineers', value: 35, color: '#005BA6' },
      { label: 'GE Healthcare', value: 27, color: '#009CF4' },
      { label: 'Philips Medical', value: 22, color: '#17AB78' },
      { label: 'Canon Medical', value: 10, color: '#E3A92D' },
      { label: 'Other', value: 6, color: '#CCCCCC' },
    ],
    height: 220,
  },
  decorators: [(Story) => <div style={{ width: 440 }}><Story /></div>],
};

export const BudgetBar: Story = {
  args: {
    type: 'bar',
    title: 'Budget vs Actual — FY2025',
    data: [
      { label: 'Imaging', value: 580000, color: '#005BA6' },
      { label: 'Surgical', value: 340000, color: '#009CF4' },
      { label: 'ICU', value: 420000, color: '#17AB78' },
      { label: 'Lab', value: 195000, color: '#E3A92D' },
      { label: 'Rehab', value: 140000, color: '#777777' },
    ],
    height: 260,
  },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};

export const PriceLineTrend: Story = {
  args: {
    type: 'line',
    title: 'Average Part Cost Trend',
    subtitle: 'MRI Coil Assemblies · 2024–2025',
    data: [
      { label: 'Jul', value: 11200 },
      { label: 'Aug', value: 10800 },
      { label: 'Sep', value: 11600 },
      { label: 'Oct', value: 12100 },
      { label: 'Nov', value: 11900 },
      { label: 'Dec', value: 12400 },
      { label: 'Jan', value: 13200 },
    ],
    height: 260,
  },
  decorators: [(Story) => <div style={{ width: 560 }}><Story /></div>],
};
