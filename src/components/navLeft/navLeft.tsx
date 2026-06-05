import React, { useState } from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

const NAV_BG        = '#002F48';
const NAV_TEXT      = '#FFFFFF';
const NAV_TEXT_DIM  = 'rgba(255,255,255,0.55)';
const NAV_ACTIVE_BG = 'rgba(255,255,255,0.15)';
const NAV_HOVER_BG  = 'rgba(255,255,255,0.08)';
const NAV_BORDER    = 'rgba(255,255,255,0.12)';

interface NavItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  children?: NavItem[];
  disabled?: boolean;
  badge?: string | number;
  href?: string;
}

interface NavLeftProps {
  items: NavItem[];
  activeValue?: string;
  onItemClick?: (value: string) => void;
  className?: string;
  collapsed?: boolean;
  onCollapseToggle?: () => void;
}

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const NavLeft: React.FC<NavLeftProps> = ({
  items = [],
  activeValue,
  onItemClick,
  className = '',
  collapsed = false,
  onCollapseToggle,
}) => {
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleExpand = (value: string) => {
    setExpanded(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const renderItem = (item: NavItem, depth = 0): React.ReactNode => {
    const isActive   = activeValue === item.value;
    const isExpanded = expanded.includes(item.value);
    const hasChildren = (item.children?.length ?? 0) > 0;

    return (
      <div key={item.value}>
        <div
          role="button"
          tabIndex={item.disabled ? -1 : 0}
          onClick={() => {
            if (item.disabled) return;
            if (hasChildren) toggleExpand(item.value);
            else onItemClick?.(item.value);
          }}
          onKeyDown={e => {
            if ((e.key === 'Enter' || e.key === ' ') && !item.disabled) {
              if (hasChildren) toggleExpand(item.value);
              else onItemClick?.(item.value);
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            height: 40,
            padding: collapsed ? '0 16px' : depth > 0 ? '0 12px 0 36px' : '0 12px',
            borderRadius: 4,
            marginBottom: 2,
            cursor: item.disabled ? 'not-allowed' : 'pointer',
            background: isActive ? NAV_ACTIVE_BG : 'transparent',
            color: item.disabled ? NAV_TEXT_DIM : NAV_TEXT,
            fontFamily,
            fontSize: 14,
            fontWeight: isActive ? 600 : 400,
            transition: 'background 150ms ease',
            userSelect: 'none',
            outline: 'none',
          }}
          onMouseEnter={e => {
            if (!isActive && !item.disabled)
              (e.currentTarget as HTMLDivElement).style.background = NAV_HOVER_BG;
          }}
          onMouseLeave={e => {
            if (!isActive)
              (e.currentTarget as HTMLDivElement).style.background = isActive ? NAV_ACTIVE_BG : 'transparent';
          }}
        >
          {item.icon && (
            <span style={{ flexShrink: 0, width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', color: NAV_TEXT }}>
              {item.icon}
            </span>
          )}
          {!collapsed && (
            <>
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {item.label}
              </span>
              {item.badge !== undefined && (
                <span style={{
                  flexShrink: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 20,
                  height: 20,
                  padding: '0 5px',
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.2)',
                  color: '#FFFFFF',
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily,
                }}>
                  {item.badge}
                </span>
              )}
              {hasChildren && (
                <span style={{
                  flexShrink: 0,
                  color: NAV_TEXT,
                  transition: 'transform 150ms ease',
                  transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                  display: 'flex',
                }}>
                  <ChevronDown />
                </span>
              )}
            </>
          )}
        </div>
        {hasChildren && isExpanded && !collapsed && (
          <div>{item.children!.map(child => renderItem(child, depth + 1))}</div>
        )}
      </div>
    );
  };

  return (
    <nav
      className={className}
      aria-label="Side navigation"
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: collapsed ? 56 : 240,
        background: NAV_BG,
        height: '100%',
        padding: '16px 8px',
        transition: 'width 200ms ease',
        fontFamily,
        boxSizing: 'border-box',
      }}
    >
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {items.map(item => renderItem(item))}
      </div>
      {onCollapseToggle && (
        <div style={{ borderTop: `1px solid ${NAV_BORDER}`, paddingTop: 8, marginTop: 8 }}>
          <button
            onClick={onCollapseToggle}
            aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-end',
              width: '100%',
              height: 36,
              border: 'none',
              background: 'transparent',
              color: NAV_TEXT_DIM,
              cursor: 'pointer',
              borderRadius: 4,
              padding: '0 8px',
              transition: 'color 150ms ease',
              fontFamily,
            }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = NAV_TEXT}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = NAV_TEXT_DIM}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavLeft;
