import type { Meta, StoryObj } from '@storybook/react';
import ProgressIndicator from './progressIndicator';

const meta: Meta<typeof ProgressIndicator> = {
  title: 'Components/ProgressIndicator',
  component: ProgressIndicator,
  tags: ['autodocs'],
  argTypes: {
    steps: { control: 'select', options: ["{ label: string; status: complete","active","inactive"] },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressIndicator>;

export const Default: Story = {
  args: {
    steps: { label: string; status: 'complete',
  },
};

