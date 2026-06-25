import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './stepper';

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '**PS Design System 2.0 - Stepper**',
          '',
          'Multi-step progress indicator. Completed steps: #005BA6 (PS Blue).',
          'Current step: active state. Upcoming: neutral grey.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

const STEPS = [
  { id: '1', label: 'Request Details', description: 'Enter order information' },
  { id: '2', label: 'Review', description: 'Confirm your selections' },
  { id: '3', label: 'Approval', description: 'Submit for approval' },
  { id: '4', label: 'Complete', description: 'Order placed' },
];

export const Default: Story = {
  args: { steps: STEPS, currentStep: 2 },
};

export const FirstStep: Story = {
  name: 'First step active',
  args: { steps: STEPS, currentStep: 1 },
};

export const AllComplete: Story = {
  name: 'All steps complete',
  args: { steps: STEPS, currentStep: 5 },
};

export const Vertical: Story = {
  name: 'Vertical orientation',
  args: { steps: STEPS, currentStep: 2, orientation: 'vertical' },
};
