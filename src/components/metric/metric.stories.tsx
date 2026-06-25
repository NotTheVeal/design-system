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

export const Positive: Story = { args: { value: 94.2, label: 'Fill Rate', trend: 'up', trendValue: '+3.1%' } };
export const Negative: Story = { args: { value: 2.4, label: 'Error Rate', trend: 'down', trendValue: '-0.8%' } };
export const Neutral: Story = { args: { value: 47, label: 'Pending Orders', trend: 'neutral' } };
export const LargeNumber: Story = { args: { value: 1284392, label: 'Total Parts Ordered', trend: 'up', trendValue: '+12%' } };
