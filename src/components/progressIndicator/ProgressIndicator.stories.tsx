import type { Meta, StoryObj } from '@storybook/react';
import ProgressIndicator from './progressIndicator';

const meta: Meta<typeof ProgressIndicator> = {
  title: 'Components/ProgressIndicator',
  component: ProgressIndicator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ProgressIndicator component from the PartsSource design system.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    steps: { control: 'object' },
    currentStep: { control: 'number' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressIndicator>;

export const Default: Story = {
  args: {
    steps: [
      { label: 'Step 1', status: 'complete' },
      { label: 'Step 2', status: 'active' },
      { label: 'Step 3', status: 'inactive' },
    ],
    currentStep: 1,
  },
};

export const AllComplete: Story = {
  args: {
    steps: [
      { label: 'Step 1', status: 'complete' },
      { label: 'Step 2', status: 'complete' },
      { label: 'Step 3', status: 'complete' },
    ],
    currentStep: 2,
  },
};
