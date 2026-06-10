import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Stepper from './stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const orderSteps = [
  { label: 'Select Parts', description: 'Add items to order' },
  { label: 'Review Order', description: 'Confirm quantities' },
  { label: 'Approve PO', description: 'Manager approval' },
  { label: 'Submit', description: 'Send to supplier' },
];

export const Default: Story = {
  args: {
    steps: orderSteps,
    currentStep: 1,
    orientation: 'horizontal',
  },
};

export const FirstStep: Story = {
  args: {
    steps: orderSteps,
    currentStep: 0,
    orientation: 'horizontal',
  },
};

export const Completed: Story = {
  args: {
    steps: orderSteps,
    currentStep: 4,
    orientation: 'horizontal',
  },
};

export const Vertical: Story = {
  args: {
    steps: [
      { label: 'Request Submitted', description: 'Service request logged' },
      { label: 'Technician Assigned', description: 'GE Healthcare Tech #42' },
      { label: 'Parts Ordered', description: 'PO-2025-0841 created' },
      { label: 'Repair In Progress', description: 'Scheduled Jun 12, 2025' },
      { label: 'Completed', description: 'Sign-off required' },
    ],
    currentStep: 2,
    orientation: 'vertical',
  },
};

export const Interactive: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    const steps = [
      { label: 'Vendor Info', description: 'Select supplier' },
      { label: 'Item Details', description: 'Part number & qty' },
      { label: 'Shipping', description: 'Delivery address' },
      { label: 'Review', description: 'Confirm order' },
      { label: 'Submit', description: 'Send PO' },
    ];

    return (
      <div style={{ width: 600, padding: 24, fontFamily: "'Source Sans Pro', sans-serif" }}>
        <Stepper steps={steps} currentStep={step} />
        <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            style={{
              padding: '8px 20px',
              border: '1px solid #DCDCDC',
              borderRadius: 4,
              background: '#fff',
              color: step === 0 ? '#949494' : '#4A4A4A',
              cursor: step === 0 ? 'not-allowed' : 'pointer',
              fontSize: 14,
            }}
          >
            Back
          </button>
          <button
            onClick={() => setStep(s => Math.min(steps.length, s + 1))}
            disabled={step === steps.length}
            style={{
              padding: '8px 20px',
              border: 'none',
              borderRadius: 4,
              background: step === steps.length ? '#DCDCDC' : '#005BA6',
              color: '#fff',
              cursor: step === steps.length ? 'not-allowed' : 'pointer',
              fontSize: 14,
            }}
          >
            {step === steps.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
        <p style={{ marginTop: 16, fontSize: 13, color: '#777' }}>
          Step {Math.min(step + 1, steps.length)} of {steps.length}
          {step === steps.length && ' — Order Submitted!'}
        </p>
      </div>
    );
  },
};

export const ContractRenewal: Story = {
  args: {
    steps: [
      { label: 'Review Contract', description: 'Check terms & pricing' },
      { label: 'Negotiate', description: 'Vendor discussion' },
      { label: 'Legal Review', description: 'Compliance check' },
      { label: 'Executive Sign-off' },
      { label: 'Active' },
    ],
    currentStep: 2,
    orientation: 'horizontal',
  },
};
