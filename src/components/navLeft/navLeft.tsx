import React, { useState } from 'react';

/**
 * NavLeft — PS Design System 2.0
 *
 * Vertical left-side navigation rail. Supports light and dark (ProProcure) variants.
 *
 * Dark variant spec (ProProcure / B2B default):
 *   - Background: #002F48 (Midnight)
 *   - Active item bg: #004A84, border-left 3px solid #009CF4 (Azure)
 *   - Active text: #009CF4
 *   - Hover bg: #003A68
 *   - Text: #FFFFFF
 *   - Icon color: #FFFFFF (default), #009CF4 (active)
 *   - Collapsed: 56px icon-only
 *
 * Light variant spec:
 *   - Background: #FFFFFF
 *   - Active item bg: #EBF3FA, border-left 3px solid #005BA6
 *   - Active text: #005BA6
 *   - Hover bg: #F1F1F1
 *   - Text: #4A4A4A
 *   - Collapsed: 56px icon-only
 */

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  badge?: number;
  children?: NavItem[];
}

export interface NavLeftProps {
  /** Navigation items */
  items: NavItem[];
  /** Collapse to icon-only (56px wide) */
  collapsed?: boolean;
  /** Initially active item id */
  activeId?: string;
  /** Show logo/brand header */
  showLogo?: boolean;
  /** Color variant */
  colorVariant?: 'dark' | 'light';
  /** Called when an item is clicked with its id */
  onNavigate?: (id: string) => void;
  className?: string;
}

const FONT = "'Source Sans 3', -apple-system, sans-serif";

// ── Color token sets ──────────────────────────────────────────────────────────
const DARK = {
  bg: '#002F48',
  activeBg: '#004A84',
  activeAccent: '#009CF4',
  hoverBg: '#003A68',
  text: '#FFFFFF',
  activeText: '#009CF4',
  border: 'rgba(255,255,255,0.10)',
  divider: 'rgba(255,255,255,0.08)',
  logoText: '#FFFFFF',
  badgeBg: '#009CF4',
  badgeText: '#FFFFFF',
  subGroupLine: 'rgba(255,255,255,0.15)',
};

const LIGHT = {
  bg: '#FFFFFF',
  activeBg: '#EBF3FA',
  activeAccent: '#005BA6',
  hoverBg: '#F1F1F1',
  text: '#4A4A4A',
  activeText: '#005BA6',
  border: '#DCDCDC',
  divider: '#DCDCDC',
  logoText: '#4A4A4A',
  badgeBg: '#005BA6',
  badgeText: '#FFFFFF',
  subGroupLine: '#DCDCDC',
};

export function NavLeft({
  items,
  collapsed = false,
  activeId: externalActiveId,
  showLogo = true,
  colorVariant = 'dark',
  onNavigate,
  className,
}: NavLeftProps) {
  const [activeId, setActiveId] = useState(externalActiveId || items[0]?.id || '');
  const [expanded, setExpanded] = useState<string[]>([]);

  const c = colorVariant === 'dark' ? DARK : LIGHT;
  const width = collapsed ? 56 : 220;

  const handleItemClick = (item: NavItem) => {
    setActiveId(item.id);
    onNavigate?.(item.id);
    if (item.children?.length) {
      setExpanded((prev) =>
        prev.includes(item.id)
          ? prev.filter((id) => id !== item.id)
          : [...prev, item.id]
      );
    }
  };

  const NavItemComponent = ({
    item,
    depth = 0,
  }: {
    item: NavItem;
    depth?: number;
  }) => {
    const isActive = activeId === item.id;
    const hasChildren = !!item.children?.length;
    const isExpanded = expanded.includes(item.id);

    return (
      <>
        <button
          onClick={() => handleItemClick(item)}
          title={collapsed ? item.label : undefined}
          aria-current={isActive ? 'page' : undefined}
          aria-expanded={hasChildren ? isExpanded : undefined}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            width: '100%',
            minHeight: 40,
            padding: collapsed
              ? '0'
              : `0 16px 0 ${depth > 0 ? 32 : 16}px`,
            paddingLeft: collapsed ? 0 : undefined,
            justifyContent: collapsed ? 'center' : 'flex-start',
            background: isActive ? c.activeBg : 'transparent',
            borderLeft: isActive
              ? `3px solid ${c.activeAccent}`
              : '3px solid transparent',
            border: 'none',
            cursor: 'pointer',
            color: isActive ? c.activeText : c.text,
            fontSize: 14,
            fontWeight: isActive ? 600 : 400,
            textAlign: 'left',
            transition: 'background 150ms ease, color 150ms ease',
            fontFamily: FONT,
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            if (!isActive) {
              e.currentTarget.style.background = c.hoverBg;
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive) {
              e.currentTarget.style.background = 'transparent';
            }
          }}
        >
          {/* Icon */}
          {item.icon && (
            <span
              style={{
                fontSize: 16,
                flexShrink: 0,
                lineHeight: 1,
                color: isActive ? c.activeText : c.text,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: collapsed ? '100%' : 'auto',
              }}
            >
              {item.icon}
            </span>
          )}

          {/* Label (hidden when collapsed) */}
          {!collapsed && (
            <>
              <span style={{ flex: 1, lineHeight: 1.3 }}>{item.label}</span>

              {/* Badge */}
              {item.badge !== undefined && (
                <span
                  style={{
                    background: c.badgeBg,
                    color: c.badgeText,
                    fontSize: 10,
                    fontWeight: 700,
                    borderRadius: 10,
                    padding: '1px 6px',
                    minWidth: 18,
                    textAlign: 'center',
                    lineHeight: 1.6,
                  }}
                >
                  {item.badge}
                </span>
              )}

              {/* Expand chevron */}
              {hasChildren && (
                <span
                  style={{
                    fontSize: 12,
                    transform: isExpanded ? 'rotate(180deg)' : 'none',
                    transition: 'transform 200ms ease',
                    opacity: 0.7,
                  }}
                >
                  ▾
                </span>
              )}
            </>
          )}
        </button>

        {/* Sub-items */}
        {hasChildren && isExpanded && !collapsed && (
          <div
            style={{
              borderLeft: `2px solid ${c.subGroupLine}`,
              marginLeft: 24,
            }}
          >
            {item.children!.map((child) => (
              <NavItemComponent key={child.id} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <nav
      className={className}
      aria-label="Primary navigation"
      style={{
        width,
        minHeight: 500,
        background: c.bg,
        borderRight: `1px solid ${c.border}`,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 200ms ease',
        overflow: 'hidden',
        flexShrink: 0,
        fontFamily: FONT,
      }}
    >
      {/* Logo header */}
      {showLogo && (
        <div
          style={{
            height: 56,
            display: 'flex',
            alignItems: 'center',
            padding: collapsed ? '0 14px' : '0 16px',
            borderBottom: `1px solid ${c.divider}`,
            gap: 10,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              background: '#009CF4',
              borderRadius: 4,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 700 }}>PS</span>
          </div>
          {!collapsed && (
            <span
              style={{
                fontWeight: 700,
                fontSize: 14,
                color: c.logoText,
                whiteSpace: 'nowrap',
              }}
            >
              ProProcure
            </span>
          )}
        </div>
      )}

      {/* Nav items */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {items.map((item) => (
          <NavItemComponent key={item.id} item={item} />
        ))}
      </div>
    </nav>
  );
}

export default NavLeft;
