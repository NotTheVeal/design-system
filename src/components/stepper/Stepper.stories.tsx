import type { Meta, StoryObj } from '@storybook/react';
import Stepper from './stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    steps: { control: 'text' },
    currentStep: { control: 'number' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  args: {
    steps: [],
    currentStep: 1,
    className: 'className',
  },
};

