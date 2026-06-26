import React, { useState } from 'react';

export interface CartItem {
  id: string;
  name: string;
  sku: string;
  manufacturer?: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartProps {
  items?: CartItem[];
  onCheckout?: () => void;
  onUpdateQuantity?: (id: string, qty: number) => void;
  onRemoveItem?: (id: string) => void;
  onContinueShopping?: () => void;
  className?: string;
}

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
  </svg>
);

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
  </svg>
);

const font = "'Source Sans Pro', -apple-system, sans-serif";

const DEFAULT_ITEMS: CartItem[] = [
  { id: '1', name: 'GE Healthcare Ultrasound Probe', sku: '4542-0012', manufacturer: 'GE Healthcare', price: 1249.00, quantity: 1 },
  { id: '2', name: 'Siemens CT Scanner Filter', sku: 'CT-7821', manufacturer: 'Siemens Healthineers', price: 89.50, quantity: 3 },
  { id: '3', name: 'Medtronic Infusion Pump Tubing', sku: 'INF-2280', manufacturer: 'Medtronic', price: 24.99, quantity: 5 },
];

export const Cart: React.FC<CartProps> = ({
  items: propItems,
  onCheckout,
  onUpdateQuantity,
  onRemoveItem,
  onContinueShopping,
  className = '',
}) => {
  const [items, setItems] = useState<CartItem[]>(propItems || DEFAULT_ITEMS);

  const updateQty = (id: string, delta: number) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
    const item = items.find(i => i.id === id);
    if (item) onUpdateQuantity?.(id, Math.max(1, item.quantity + delta));
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
    onRemoveItem?.(id);
  };

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 15.99;
  const total = subtotal + shipping;
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className={className} style={{ width: 480, display: 'flex', flexDirection: 'column', background: '#FFFFFF', border: '1px solid #DCDCDC', borderRadius: 4, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,47,72,0.12)', fontFamily: font }}>
      {/* Header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #DCDCDC', background: '#005BA6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'white' }}>
          <CartIcon />
          <span style={{ fontSize: 16, fontWeight: 600, color: 'white' }}>My Cart</span>
          <span style={{ fontSize: 13, background: 'rgba(255,255,255,0.2)', color: 'white', padding: '2px 8px', borderRadius: 100, fontWeight: 600 }}>
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      {/* Items */}
      <div style={{ flex: 1, overflowY: 'auto', maxHeight: 360 }}>
        {items.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: '#949494' }}>
            <CartIcon />
            <p style={{ margin: '16px 0 0', fontSize: 14 }}>Your cart is empty</p>
            {onContinueShopping && (
              <button onClick={onContinueShopping} style={{ marginTop: 16, padding: '8px 20px', border: '2px solid #005BA6', borderRadius: 4, background: 'white', color: '#005BA6', cursor: 'pointer', fontFamily: font, fontSize: 13, fontWeight: 600 }}>
                Browse Parts
              </button>
            )}
          </div>
        ) : items.map((item, i) => (
          <div key={item.id} style={{ padding: '14px 20px', borderBottom: '1px solid #DCDCDC', display: 'flex', gap: 12, alignItems: 'flex-start', background: i % 2 === 1 ? '#FAFAFA' : 'white' }}>
            {/* Image placeholder */}
            <div style={{ width: 52, height: 52, background: '#DCEAED', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#005BA6', fontSize: 18, fontWeight: 700 }}>
              {item.name.charAt(0)}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#002F48', lineHeight: '18px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
              <div style={{ fontSize: 12, color: '#949494', marginTop: 2 }}>SKU: {item.sku}{item.manufacturer ? ' · ' + item.manufacturer : ''}</div>
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* Quantity stepper */}
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #DCDCDC', borderRadius: 4, overflow: 'hidden' }}>
                  <button onClick={() => updateQty(item.id, -1)} style={{ width: 28, height: 28, border: 'none', background: '#F1F1F1', cursor: 'pointer', fontSize: 16, color: '#4A4A4A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                  <span style={{ width: 36, textAlign: 'center', fontSize: 13, fontWeight: 600, color: '#002F48' }}>{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, 1)} style={{ width: 28, height: 28, border: 'none', background: '#F1F1F1', cursor: 'pointer', fontSize: 16, color: '#4A4A4A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                </div>
                <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#949494', display: 'flex', alignItems: 'center', padding: 4, borderRadius: 2, gap: 4, fontSize: 12 }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#D32F2F')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#949494')}
                >
                  <TrashIcon />
                  Remove
                </button>
              </div>
            </div>

            {/* Price */}
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#002F48' }}>{formatPrice(item.price * item.quantity)}</div>
              {item.quantity > 1 && <div style={{ fontSize: 11, color: '#949494' }}>{formatPrice(item.price)} each</div>}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      {items.length > 0 && (
        <div style={{ borderTop: '1px solid #DCDCDC', background: '#FAFAFA' }}>
          <div style={{ padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#4A4A4A' }}>
              <span>Subtotal ({itemCount} items)</span>
              <span style={{ fontWeight: 600 }}>{formatPrice(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#4A4A4A' }}>
              <span>Shipping</span>
              <span style={{ fontWeight: 600, color: shipping === 0 ? '#0E7C55' : '#4A4A4A' }}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
            </div>
            {shipping > 0 && <div style={{ fontSize: 11, color: '#949494', marginTop: -4 }}>Free shipping on orders over $500</div>}
            <div style={{ borderTop: '1px solid #DCDCDC', paddingTop: 8, display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 700, color: '#002F48' }}>
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <div style={{ padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button
              onClick={onCheckout}
              style={{ height: 48, background: '#005BA6', color: 'white', border: 'none', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: font, transition: 'background 200ms ease' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#004A84')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#005BA6')}
            >
              Proceed to Checkout
            </button>
            {onContinueShopping && (
              <button
                onClick={onContinueShopping}
                style={{ height: 40, background: 'white', color: '#005BA6', border: '2px solid #005BA6', borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: font, transition: 'all 200ms ease' }}
                onMouseEnter={e => { const b = e.currentTarget as HTMLElement; b.style.background = '#005BA6'; b.style.color = 'white'; }}
                onMouseLeave={e => { const b = e.currentTarget as HTMLElement; b.style.background = 'white'; b.style.color = '#005BA6'; }}
              >
                Continue Shopping
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

function formatPrice(n: number): string {
  return '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Cart icon badge for nav usage
export const CartIconBadge: React.FC<{ count?: number; onClick?: () => void }> = ({ count = 0, onClick }) => (
  <button onClick={onClick} style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#4A4A4A', display: 'flex', alignItems: 'center' }}>
    <CartIcon />
    {count > 0 && (
      <span style={{ position: 'absolute', top: -2, right: -2, minWidth: 16, height: 16, background: '#FF0000', color: 'white', borderRadius: '50%', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px', fontFamily: font }}>
        {count > 99 ? '99+' : count}
      </span>
    )}
  </button>
);

export default Cart;
