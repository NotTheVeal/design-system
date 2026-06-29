import React from 'react';
import { Cart } from '../cart/cart';
import type { CartCount } from '../cart/cart';

export interface NavTopAction {
  key: string;
  icon: React.ReactNode;
  onClick?: () => void;
  badge?: string;
}

export interface NavTopProps {
  logo?: React.ReactNode;
  search?: React.ReactNode;
  cartCount?: CartCount;
  onCartClick?: () => void;
  actions?: NavTopAction[];
  userAvatar?: React.ReactNode;
  className?: string;
}

// PS Design System NavTop:
// Height: 56px, white bg, bottom border 1px #DCDCDC
// Logo left, search center (flex-grow), actions right
// Cart icon with count badge

export const NavTop: React.FC<NavTopProps> = ({
  logo, search, cartCount, onCartClick, actions = [], userAvatar, className = '',
}) => {
  const font = "'Source Sans Pro', -apple-system, sans-serif";

  const defaultLogo = (
    <span style={{ fontSize: 20, fontWeight: 700, color: '#005BA6', fontFamily: font, letterSpacing: '-0.5px' }}>
      PartsSource
    </span>
  );

  return (
    <header
      className={className}
      style={{
        height: 56, width: '100%',
        background: '#FFFFFF',
        borderBottom: '1px solid #DCDCDC',
        display: 'flex', alignItems: 'center',
        padding: '0 24px', gap: 16,
        fontFamily: font,
        boxSizing: 'border-box',
      }}
    >
      {/* Logo */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
        {logo || defaultLogo}
      </div>

      {/* Search — grows to fill center */}
      {search && (
        <div style={{ flex: 1, maxWidth: 640, minWidth: 0 }}>
          {search}
        </div>
      )}
      {!search && <div style={{ flex: 1 }} />}

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
        {actions.map(action => (
          <button
            key={action.key}
            onClick={action.onClick}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              width: 40, height: 40, borderRadius: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#4A4A4A', transition: 'background 150ms',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#F1F1F1')}
            onMouseLeave={e => (e.currentTarget.style.background = 'none')}
          >
            {action.icon}
          </button>
        ))}
        {/* Cart */}
        {(cartCount !== undefined || onCartClick) && (
          <Cart cart={cartCount || 'Default'} onClick={onCartClick} />
        )}
        {/* User avatar */}
        {userAvatar && (
          <div style={{ marginLeft: 4 }}>{userAvatar}</div>
        )}
      </div>
    </header>
  );
};

export default NavTop;
