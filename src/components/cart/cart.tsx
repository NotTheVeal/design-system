import React from 'react';

interface CartProps {
  className?: string;
  itemCount?: number;
}

const Cart: React.FC<CartProps> = ({ className = '', itemCount = 0 }) => {
  return (
    <div className={`cart ${className}`} role="button" tabIndex={0} aria-label="Shopping Cart">
      <div className="cart-icon" style={{ position: 'relative' }}>
        <svg width="24" height="24" fill="var(--ps-cart.icon)" aria-hidden="true">
          <path d="M7 4h14l1 2H8.5L7 4zm0 4h16l1 2H8.5l-1-2zm0 4h16l1 2H8.5l-1-2z" />
        </svg>
        {itemCount > 0 && (
          <div className="badge" style={{ 
            backgroundColor: 'var(--ps-cart.badge.background)', 
            color: 'var(--ps-cart.badge.text)', 
            borderRadius: 'var(--ps-cart.badge.radius)', 
            fontSize: 'var(--ps-cart.badge.fontSize)', 
            fontWeight: 'var(--ps-cart.badge.fontWeight)',
            minWidth: 'var(--ps-cart.badge.minWidth)',
            height: 'var(--ps-cart.badge.height)',
            position: 'absolute', 
            top: '-8px', 
            right: '-8px',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center'
          }}>
            {itemCount}
          </div>
        )}
      </div>
      <style jsx>{`
        :root {
          --ps-cart-icon: #005BA6;
          --ps-cart-badge-background: #005BA6;
          --ps-cart-badge-text: #FFFFFF;
          --ps-cart-badge-radius: 100px;
          --ps-cart-badge-fontSize: 10px;
          --ps-cart-badge-fontWeight: 700;
          --ps-cart-badge-minWidth: 16px;
          --ps-cart-badge-height: 16px;
        }
        .cart {
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          border: 1px solid transparent;
          border-radius: 4px;
          padding: 10px;
          transition: box-shadow 0.2s;
        }
        .cart:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .cart:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(0,147,244,0.3);
        }
      `}</style>
    </div>
  );
};

export default Cart;
