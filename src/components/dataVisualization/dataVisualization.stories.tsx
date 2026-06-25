import type { Meta, StoryObj } from '@storybook/react';
import { DataVisualization } from './dataVisualization';

const meta: Meta<typeof DataVisualization> = {
  title: 'Components/DataVisualization',
  component: DataVisualization,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DataVisualization>;

const monthly = [
  { label: 'Jan', value: 42 }, { label: 'Feb', value: 78 },
  { label: 'Mar', value: 55 }, { label: 'Apr', value: 91 },
  { label: 'May', value: 63 }, { label: 'Jun', value: 84 },
];
const category = [
  { label: 'Parts', value: 340 }, { label: 'Service', value: 210 },
  { label: 'Repair', value: 175 }, { label: 'Install', value: 95 },
];

const status = [
  { label: 'Active', value: 58, color: '#005BA6' },
  { label: 'Pending', value: 22, color: '#B45309' },
  { label: 'Closed', value: 14, color: '#0E7C55' },
  { label: 'Draft', value: 6, color: '#6B7280' },
];

export const BarChart: Story = {
  args: { type: 'bar', data: monthly, title: 'Monthly Orders', subtitle: 'Jan - Jun 2024', width: 520, height: 280 },
};
export const LineChart: Story = {
  args: { type: 'line', data: monthly, title: 'Revenue Trend', width: 520, height: 280 },
};
export const DonutChart: Story = {
  args: { type: 'donut', data: status, title: 'Order Status', width: 480, height: 240 },
};
export const PieChart: Story = {
  args: { type: 'pie', data: category, title: 'Category Breakdown', width: 480, height: 240 },
};
export const BarNoTitle: Story = {
  name: 'Bar No Title',
  args: { type: 'bar', data: category, width: 440, height: 260 },
};
