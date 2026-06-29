import React, { useState } from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  badge?: string | number;
  children?: NavItem[];
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export interface NavLeftProps {
  sections: NavSection[];
  activeId?: string;
  onNavigate?: (id: string) => void;
  logo?: React.ReactNode;
  footer?: React.ReactNode;
  collapsed?: boolean;
  className?: string;
}

// PS Design System NavLeft:
// Bg: #002F48 (Midnight), width 240px (56px collapsed)
// Item height: 44px, Source Sans Pro 14px
// Active: #005BA6 bg, white text
// Hover: rgba(255,255,255,0.08) overlay
// Disabled: opacity 40%
// Section title: 11px uppercase #949494

export const NavLeft: React.FC<NavLeftProps> = ({
  sections, activeId, onNavigate, logo, footer, collapsed = false, className = '',
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const width = collapsed ? 56 : 240;

  const renderItem = (item: NavItem, depth = 0) => {
    const isActive = item.id === activeId;
    const isHovered = hoveredId === item.id;
    const pl = collapsed ? 16 : 16 + depth * 16;

    return (
      <div key={item.id}>
        <a
          href={item.href || '#'}
          onClick={e => {
            if (!item.href) e.preventDefault();
            if (!item.disabled) onNavigate?.(item.id);
            item.onClick?.();
          }}
          onMouseEnter={() => !item.disabled && setHoveredId(item.id)}
          onMouseLeave={() => setHoveredId(null)}
          aria-current={isActive ? 'page' : undefined}
          aria-disabled={item.disabled}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            height: 44,
            padding: `0 ${pl}px`,
            textDecoration: 'none',
            borderRadius: 4,
            margin: '1px 8px',
            cursor: item.disabled ? 'not-allowed' : 'pointer',
            opacity: item.disabled ? 0.4 : 1,
            background: isActive
              ? '#005BA6'
              : isHovered
                ? 'rgba(255,255,255,0.08)'
                : 'transparent',
            color: '#FFFFFF',
            fontFamily: font,
            fontSize: 14,
            fontWeight: isActive ? 600 : 400,
            transition: 'background 150ms ease',
            overflow: 'hidden',
          }}
        >
          {item.icon && (
            <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.75)' }}>
              {item.icon}
            </span>
          )}
          {!collapsed && <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>}
          {!collapsed && item.badge !== undefined && (
            <span style={{
              background: isActive ? 'rgba(255,255,255,0.25)' : '#005BA6',
              color: '#FFFFFF', fontSize: 11, fontWeight: 700, borderRadius: 100,
              padding: '1px 7px', flexShrink: 0,
            }}>{item.badge}</span>
          )}
        </a>
        {item.children && !collapsed && item.id === activeId && (
          <div>{item.children.map(child => renderItem(child, depth + 1))}</div>
        )}
      </div>
    );
  };

  return (
    <nav
      className={className}
      style={{
        width, minHeight: '100vh', flexShrink: 0,
        background: '#002F48',
        display: 'flex', flexDirection: 'column',
        fontFamily: font,
        transition: 'width 200ms ease',
        overflow: 'hidden',
      }}
    >
      {logo && (
        <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
          {logo}
        </div>
      )}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {sections.map((section, i) => (
          <div key={i}>
            {section.title && !collapsed && (
              <div style={{
                fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px',
                color: '#949494', padding: '16px 24px 6px', fontFamily: font,
              }}>
                {section.title}
              </div>
            )}
            {section.items.map(item => renderItem(item))}
          </div>
        ))}
      </div>
      {footer && (
        <div style={{ padding: '12px 8px', borderTop: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
          {footer}
        </div>
      )}
    </nav>
  );
};

export default NavLeft;
