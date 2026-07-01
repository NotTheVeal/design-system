import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PartReference } from './partReference';

const meta: Meta<typeof PartReference> = {
  title: 'Components/PartReference',
  component: PartReference,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof PartReference>;

export const Default: Story = { args: { sku: 'GE-4542-0012' } };
export const NoCopy: Story = { args: { sku: 'CT-7821-A', showCopy: false } };
export const CustomLabel: Story = { args: { sku: 'INF-2280', label: 'Part No' } };

export const MultipleRefs: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: "'Source Sans 3', sans-serif" }}>
      <PartReference sku="GE-4542-0012" label="SKU" />
      <PartReference sku="CT-7821-A" label="Model" />
      <PartReference sku="INF-2280" label="Part No" showCopy={false} />
    </div>
  ),
};
