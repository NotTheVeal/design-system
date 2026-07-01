import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PriceTag } from './priceTag';

const meta: Meta<typeof PriceTag> = {
  title: 'Components/PriceTag',
  component: PriceTag,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof PriceTag>;

export const Default: Story = { args: { price: 1249, originalPrice: 1499 } };
export const NoDiscount: Story = { args: { price: 89.50 } };
export const Large: Story = { args: { price: 4999, originalPrice: 5999, size: 'lg' } };
export const Small: Story = { args: { price: 12.99, originalPrice: 19.99, size: 'sm' } };

export const AllSizes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <PriceTag price={1249} originalPrice={1499} size="sm" />
      <PriceTag price={1249} originalPrice={1499} size="md" />
      <PriceTag price={1249} originalPrice={1499} size="lg" />
    </div>
  ),
};
