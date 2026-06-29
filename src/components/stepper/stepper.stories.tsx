import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Stepper } from './stepper';

const STEPS = [
  { id: '1', label: 'Cart Review', description: 'Review your items' },
  { id: '2', label: 'Shipping', description: 'Enter address' },
  { id: '3', label: 'Payment', description: 'Enter payment' },
  { id: '4', label: 'Confirm', description: 'Review order' },
];

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  render: () => <Stepper steps={STEPS} currentStep={1} />,
};

export const Step1: Story = {
  render: () => <Stepper steps={STEPS} currentStep={0} />,
};

export const Step3: Story = {
  render: () => <Stepper steps={STEPS} currentStep={2} />,
};

export const AllComplete: Story = {
  render: () => <Stepper steps={STEPS} currentStep={4} />,
};

export const Vertical: Story = {
  render: () => <Stepper steps={STEPS} currentStep={2} orientation="vertical" />,
};
