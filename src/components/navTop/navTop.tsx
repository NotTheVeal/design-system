import React, { useState } from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
}

interface NavTopProps {
  logo: React.ReactNode;
  items: NavItem[];
  actions?: React.ReactNode;
  className?: string;
}

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
    <line x1="3" y1="5" x2="17" y2="5" />
    <line x1="3" y1="10" x2="17" y2="10" />
    <line x1="3" y1="15" x2="17" y2="15" />
  </svg>
);

const NavItemLink: React.FC<{ item: NavItem }> = ({ item }) => {
  const [hovered, setHovered] = useState(false);

  const style: React.CSSProperties = {
    display: 'block',
    padding: '8px 12px',
    borderRadius: 4,
    fontSize: 14,
    fontWeight: 500,
    fontFamily,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 150ms ease, background 150ms ease',
    background: item.active ? '#EFF9FE' : hovered ? '#FAFAFA' : 'transparent',
    color: item.active ? '#005BA6' : hovered ? '#005BA6' : '#777777',
  };

  return (
    <a
      href={item.href}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={item.onClick}
    >
      {item.label}
    </a>
  );
};

const NavTop: React.FC<NavTopProps> = ({
  logo,
  items,
  actions,
  className = '',
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuBtnHovered, setMenuBtnHovered] = useState(false);

  return (
    <nav
      className={className}
      style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #DCDCDC',
        fontFamily,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Main bar */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 16px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 56,
          }}
        >
          {/* Left: logo + nav links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <div style={{ flexShrink: 0 }}>{logo}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {items.map((item, i) => (
                <NavItemLink key={i} item={item} />
              ))}
            </div>
          </div>

          {/* Right: actions + mobile toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {actions && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {actions}
              </div>
            )}
            <button
              type="button"
              onClick={() => setMobileOpen(o => !o)}
              onMouseEnter={() => setMenuBtnHovered(true)}
              onMouseLeave={() => setMenuBtnHovered(false)}
              style={{
                padding: 8,
                borderRadius: 4,
                border: 'none',
                background: menuBtnHovered ? '#F1F1F1' : 'transparent',
                color: '#777777',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                transition: 'background 150ms ease',
              }}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            borderTop: '1px solid #DCDCDC',
            padding: '8px 16px',
          }}
        >
          {items.map((item, i) => (
            <NavItemLink key={i} item={item} />
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavTop;
