import type { Meta, StoryObj } from '@storybook/react';
import DataVisualization from './dataVisualization';

const meta: Meta<typeof DataVisualization> = {
  title: 'Components/DataVisualization',
  component: DataVisualization,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    data: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof DataVisualization>;

export const Default: Story = {
  args: {
    title: 'Sample Title',
    data: [],
  },
};

