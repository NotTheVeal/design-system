import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { StockLevel } from './stockLevel';

const meta: Meta<typeof StockLevel> = {
  title: 'Components/StockLevel',
  component: StockLevel,
  parameters: { layout: 'padded' },
  argTypes: {
    current: { control: { type: 'range', min: 0, max: 100 } },
    max: { control: { type: 'number' } },
  },
};
export default meta;
type Story = StoryObj<typeof StockLevel>;

export const Default: Story = { args: { current: 47, max: 100 } };
export const InStock: Story = { args: { current: 85, max: 100 } };
export const LowStock: Story = { args: { current: 12, max: 100 } };
export const OutOfStock: Story = { args: { current: 0, max: 100 } };

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 300, fontFamily: "'Source Sans 3', sans-serif" }}>
      <StockLevel current={85} max={100} />
      <StockLevel current={18} max={100} />
      <StockLevel current={0} max={100} />
    </div>
  ),
};
