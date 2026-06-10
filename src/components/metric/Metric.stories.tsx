import type { Meta, StoryObj } from '@storybook/react';
import Metric from './metric';

const meta: Meta<typeof Metric> = {
  title: 'Components/Metric',
  component: Metric,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    trend: { control: 'select', options: ['positive', 'negative', 'neutral'] },
  },
};

export default meta;
type Story = StoryObj<typeof Metric>;

export const Positive: Story = {
  args: {
    value: '98.4%',
    label: 'On-Time Delivery Rate',
    trend: 'positive',
  },
};

export const Negative: Story = {
  args: {
    value: '$24,180',
    label: 'Overdue Purchase Orders',
    trend: 'negative',
  },
};

export const Neutral: Story = {
  args: {
    value: '2.4 days',
    label: 'Avg. Lead Time',
    trend: 'neutral',
  },
};

export const LargeNumber: Story = {
  args: {
    value: '1,284',
    label: 'Parts Orders This Quarter',
    trend: 'positive',
  },
};
