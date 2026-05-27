import type { Meta, StoryObj } from '@storybook/react';
import ProgressIndicator from './progressIndicator';

const meta: Meta<typeof ProgressIndicator> = {
  title: 'Components/ProgressIndicator',
  component: ProgressIndicator,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'number' },
    max: { control: 'number' },
    variant: { control: 'select', options: ['linear', 'circular'] },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressIndicator>;

export const Default: Story = {
  args: {
    value: 60,
    max: 100,
  },
};
