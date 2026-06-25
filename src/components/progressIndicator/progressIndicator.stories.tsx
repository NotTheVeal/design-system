import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ProgressIndicator from './progressIndicator';

const meta: Meta<typeof ProgressIndicator> = {
  title: 'Components/ProgressIndicator',
  component: ProgressIndicator,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProgressIndicator>;

export const BarDefault: Story = {
  args: { value: 45 },
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};

export const BarWithLabel: Story = {
  args: { value: 72, showLabel: true },
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};

export const BarEmpty: Story = {
  args: { value: 0, showLabel: true },
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};

export const BarComplete: Story = {
  args: { value: 100, showLabel: true },
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};

export const BarTall: Story = {
  args: { value: 60, height: 16, showLabel: true },
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};

export const StepsBasic: Story = {
  args: {
    totalSteps: 4,
    currentStep: 2,
    labels: ['Cart', 'Approval', 'Payment', 'Confirm'],
  },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
};

export const StepsStart: Story = {
  args: {
    totalSteps: 3,
    currentStep: 1,
    labels: ['Request', 'Approve', 'Order'],
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const StepsComplete: Story = {
  args: {
    totalSteps: 3,
    currentStep: 4,
    labels: ['Request', 'Approve', 'Order'],
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const OrderCheckout: Story = {
  render: () => (
    <div style={{ width: 560, display: 'flex', flexDirection: 'column', gap: 24, padding: 24, fontFamily: 'Source Sans Pro, sans-serif' }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 14, color: '#777', fontFamily: 'inherit' }}>Budget Utilization</p>
        <ProgressIndicator value={83} showLabel height={10} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 14, color: '#777', fontFamily: 'inherit' }}>Approval Progress</p>
        <ProgressIndicator value={33} showLabel height={10} />
      </div>
      <div style={{ marginTop: 8 }}>
        <ProgressIndicator
          totalSteps={4}
          currentStep={2}
          labels={['Submit', 'Manager', 'Finance', 'Complete']}
        />
      </div>
    </div>
  ),
};
