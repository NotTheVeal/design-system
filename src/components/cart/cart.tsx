import React from 'react';

export type CartCount = 'Default' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10+';

export interface CartProps {
  cart?: CartCount;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

// PS Blue cart icon SVG (Lucide-style, 24px viewport inside 42px container)
const CartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#005BA6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" fill="#005BA6" stroke="none" />
    <circle cx="20" cy="21" r="1" fill="#005BA6" stroke="none" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const Cart = React.forwardRef<HTMLButtonElement, CartProps>(function Cart(
  { cart = 'Default', onClick, className = '', ...rest },
  ref,
) {
  const count = cart === 'Default' ? null : cart;
  const font = "'Source Sans Pro', -apple-system, sans-serif";

  return (
    <button
      ref={ref}
      className={className}
      onClick={onClick}
      aria-label={count ? `Cart, ${count} item${count === '1' ? '' : 's'}` : 'Cart, empty'}
      style={{
        position: 'relative',
        width: 42,
        height: 42,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        borderRadius: 4,
        transition: 'background 150ms ease',
        flexShrink: 0,
      }}
      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,91,166,0.06)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'none')}
      {...rest}
    >
      <CartIcon />

      {count && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            minWidth: 18,
            height: 18,
            borderRadius: 9,
            background: '#005BA6',
            color: '#FFFFFF',
            fontSize: count === '10+' ? 9 : 10,
            fontWeight: 700,
            fontFamily: font,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 4px',
            lineHeight: 1,
            border: '1.5px solid #FFFFFF',
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
});

export { Cart };
export default Cart;
