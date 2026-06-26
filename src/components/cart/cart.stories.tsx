import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Cart, CartIconBadge } from './cart';

const meta: Meta<typeof Cart> = {
  title: 'Components/Cart',
  component: Cart,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof Cart>;

export const Default: Story = {
  render: () => <Cart onCheckout={() => alert('Checkout!')} onContinueShopping={() => {}} />,
};

export const EmptyCart: Story = {
  render: () => <Cart items={[]} onCheckout={() => {}} onContinueShopping={() => {}} />,
};

export const SingleItem: Story = {
  render: () => (
    <Cart
      items={[{ id: '1', name: 'GE Healthcare Ultrasound Probe', sku: '4542-0012', manufacturer: 'GE Healthcare', price: 1249.00, quantity: 1 }]}
      onCheckout={() => {}}
      onContinueShopping={() => {}}
    />
  ),
};

export const CartIconInHeader: Story = {
  render: () => {
    const [count, setCount] = React.useState(3);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '12px 24px', background: '#FFFFFF', border: '1px solid #DCDCDC', borderRadius: 4 }}>
        <div style={{ fontWeight: 700, fontSize: 18, color: '#002F48', fontFamily: 'Source Sans Pro, sans-serif' }}>PartsSource</div>
        <div style={{ flex: 1 }} />
        <CartIconBadge count={count} onClick={() => setCount(c => Math.max(0, c - 1))} />
        <span style={{ fontSize: 12, color: '#949494' }}>Click badge to decrement</span>
      </div>
    );
  },
};

export const FreeShipping: Story = {
  name: 'With Free Shipping (>$500)',
  render: () => (
    <Cart
      items={[
        { id: '1', name: 'GE Healthcare Ultrasound Probe', sku: '4542-0012', manufacturer: 'GE Healthcare', price: 1249.00, quantity: 2 },
        { id: '2', name: 'Stryker Surgical Instrument Set', sku: 'STR-9900', manufacturer: 'Stryker', price: 3450.00, quantity: 1 },
      ]}
      onCheckout={() => {}}
    />
  ),
};
