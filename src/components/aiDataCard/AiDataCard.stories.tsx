import type { Meta, StoryObj } from '@storybook/react';
import AiDataCard from './aiDataCard';

const meta: Meta<typeof AiDataCard> = {
  title: 'Components/AiDataCard',
  component: AiDataCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AiDataCard>;

export const Default: Story = {
  args: {
    title: 'Total Spend',
    value: '$142,380',
    description: 'Year-to-date medical equipment procurement spend',
    trend: 'down',
    trendValue: '8.4%',
    insight: 'Spend is trending below forecast — consider re-allocating Q3 budget to critical equipment.',
    confidence: 87,
  },
};

export const TrendUp: Story = {
  args: {
    title: 'Orders Fulfilled',
    value: '1,284',
    description: 'Parts orders fulfilled this quarter',
    trend: 'up',
    trendValue: '+12%',
    insight: 'Fulfillment rate improved significantly compared to last quarter.',
    confidence: 92,
  },
};

export const Loading: Story = {
  args: {
    title: 'Equipment Uptime',
    value: '99.2%',
    isLoading: true,
  },
};

export const Minimal: Story = {
  args: {
    title: 'Open Requisitions',
    value: '47',
  },
};
