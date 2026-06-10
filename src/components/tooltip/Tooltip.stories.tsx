import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Top: Story = {
  render: () => (
    <div style={{ padding: 80 }}>
      <Tooltip content="Click to view equipment details" placement="top">
        <button style={{ padding: '8px 16px', borderRadius: 4, border: '1px solid #DCDCDC', background: '#fff', cursor: 'pointer', fontFamily: 'Source Sans Pro, sans-serif' }}>
          View Details
        </button>
      </Tooltip>
    </div>
  ),
};

export const Bottom: Story = {
  render: () => (
    <div style={{ padding: 80 }}>
      <Tooltip content="Part number: MRI-7842-A" placement="bottom">
        <button style={{ padding: '8px 16px', borderRadius: 4, border: '1px solid #DCDCDC', background: '#fff', cursor: 'pointer', fontFamily: 'Source Sans Pro, sans-serif' }}>
          Part #MRI-7842
        </button>
      </Tooltip>
    </div>
  ),
};

export const Left: Story = {
  render: () => (
    <div style={{ padding: 80 }}>
      <Tooltip content="Remove from cart" placement="left">
        <button style={{ padding: '8px 12px', borderRadius: 4, border: '1px solid #DCDCDC', background: '#fff', cursor: 'pointer', fontFamily: 'Source Sans Pro, sans-serif' }}>
          ✕
        </button>
      </Tooltip>
    </div>
  ),
};

export const Right: Story = {
  render: () => (
    <div style={{ padding: 80 }}>
      <Tooltip content="Requires 3-quote approval for orders over $5,000" placement="right">
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, borderRadius: '50%', background: '#005BA6', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'default', fontFamily: 'Source Sans Pro, sans-serif' }}>
          i
        </span>
      </Tooltip>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <div style={{ padding: 80 }}>
      <Tooltip content="This item is on a GPO contract. Pricing shown includes your negotiated discount of 18% off list price." placement="top">
        <button style={{ padding: '8px 16px', borderRadius: 4, border: '1px solid #005BA6', background: '#fff', color: '#005BA6', cursor: 'pointer', fontFamily: 'Source Sans Pro, sans-serif' }}>
          GPO Contract
        </button>
      </Tooltip>
    </div>
  ),
};
