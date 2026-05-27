import type { Meta, StoryObj } from '@storybook/react';
import Metric from './metric';

const meta: Meta<typeof Metric> = {
  title: 'Components/Metric',
  component: Metric,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    label: { control: 'text' },
    trend: { control: 'select', options: ["positive","negative","neutral"] },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Metric>;

export const Default: Story = {
  args: {
    value: 'value',
    label: 'Label',
    trend: 'positive',
    className: 'className',
  },
};

