import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Cart } from './cart';

const FONT = "'Source Sans 3', 'Source Sans Pro', -apple-system, sans-serif";

const meta: Meta<typeof Cart> = {
  title: 'Components/Cart',
  component: Cart,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Full cart panel component with items list, totals, and checkout button. Also includes a CartIcon button variant for use in navigation.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Cart>;

/* ── Full Cart Panel ─────────────────────────────────────────────────── */

export const Default: Story = {
  name: 'Cart Panel — Default',
  render: () => (
    <div style={{ padding: 24 }}>
      <Cart />
    </div>
  ),
};

export const EmptyCart: Story = {
  name: 'Cart Panel — Empty',
  render: () => (
    <div style={{ padding: 24 }}>
      <Cart items={[]} title="My Cart" />
    </div>
  ),
};

export const SingleItem: Story = {
  name: 'Cart Panel — Single Item',
  render: () => (
    <div style={{ padding: 24 }}>
      <Cart
        items={[{ id: '1', name: 'Patient Cable, SpO2 Spot Check', partNumber: 'OEM-89400-01', quantity: 1, price: '$85.00' }]}
      />
    </div>
  ),
};

/* ── Cart Icon Button (for use in NavTop / navigation) ───────────────── */

/**
 * CartIcon — icon button used in navigation bars.
 * Shows a ShoppingCart icon (Lucide, 24px) with a red count badge at top-right.
 * Clicking opens the full cart panel.
 */
export const CartIcon: Story = {
  name: 'Cart Icon Button (nav use)',
  render: () => {
    const CartIconDemo = () => {
      const [open, setOpen] = useState(false);
      const itemCount = 4;

      return (
        <div style={{ fontFamily: FONT }}>
          {/* Simulated nav bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              height: 56,
              background: '#FFFFFF',
              borderBottom: '1px solid #DCDCDC',
              padding: '0 24px',
              gap: 8,
            }}
          >
            {/* Cart icon button */}
            <button
              aria-label={`Cart (${itemCount} items)`}
              onClick={() => setOpen(!open)}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                background: 'transparent',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                color: '#4A4A4A',
                padding: 0,
              }}
            >
              <ShoppingCart size={24} strokeWidth={1.8} />
              {/* Red count badge */}
              {itemCount > 0 && (
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    minWidth: 16,
                    height: 16,
                    background: '#D63B3B',
                    borderRadius: 8,
                    color: '#FFF',
                    fontSize: 10,
                    fontWeight: 700,
                    fontFamily: FONT,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 3px',
                    lineHeight: 1,
                    pointerEvents: 'none',
                  }}
                >
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Cart panel — shown when icon is clicked */}
          {open && (
            <div style={{ padding: 24 }}>
              <Cart onCheckout={() => setOpen(false)} />
            </div>
          )}

          {!open && (
            <div style={{ padding: 24, fontSize: 14, color: '#4A4A4A' }}>
              Click the cart icon above to open the cart panel.
            </div>
          )}
        </div>
      );
    };

    return <CartIconDemo />;
  },
};

/* ── Side-by-side reference ──────────────────────────────────────────── */

export const SideBySide: Story = {
  name: 'Side-by-Side: Icon + Panel',
  render: () => (
    <div style={{ display: 'flex', gap: 32, padding: 24, flexWrap: 'wrap', fontFamily: FONT, alignItems: 'flex-start' }}>
      {/* Icon button specimen */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#005BA6', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Cart Icon Button (nav)
        </div>
        <div style={{ position: 'relative', display: 'inline-flex' }}>
          <button
            aria-label="Cart (4 items)"
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              background: '#F5F5F5',
              border: '1px solid #DCDCDC',
              borderRadius: 4,
              cursor: 'pointer',
              color: '#4A4A4A',
              padding: 0,
            }}
          >
            <ShoppingCart size={24} strokeWidth={1.8} />
            <span
              style={{
                position: 'absolute',
                top: 2,
                right: 2,
                minWidth: 16,
                height: 16,
                background: '#D63B3B',
                borderRadius: 8,
                color: '#FFF',
                fontSize: 10,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 3px',
              }}
            >
              4
            </span>
          </button>
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: '#777' }}>ShoppingCart 24px · badge #D63B3B</div>
      </div>

      {/* Full panel specimen */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#005BA6', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Cart Panel (full)
        </div>
        <Cart />
      </div>
    </div>
  ),
};
