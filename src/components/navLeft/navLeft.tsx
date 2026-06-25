import React, { useState } from 'react';

/**
 * NavLeft — PS Design System 2.0
 *
 * Vertical left-side navigation rail. Supports light and dark (ProProcure) variants.
 *
 * Dark variant spec (ProProcure / B2B default):
 *   - Background: #002F48 (Midnight)
 *   - Expanded width: 240px | Collapsed width: 60px
 *   - Logo area: 56px height, border-bottom 1px solid rgba(255,255,255,0.1)
 *   - Nav item height: 44px, padding 0 16px
 *   - Nav item default: text rgba(255,255,255,0.7), no bg
 *   - Nav item hover: text rgba(255,255,255,0.9), bg rgba(255,255,255,0.08)
 *   - Nav item active: text #FFFFFF, bg #005BA6 (PS Blue)
 *   - Icons: 20px, same color as text
 *   - Group label: 11px, uppercase, letter-spacing 0.1em, rgba(255,255,255,0.4), 32px height
 *   - Badge: small pill, #005BA6 bg, white text, 18px height
 *   - Transition: width 200ms ease
 *   - Font: Source Sans 3, 14px, 400 normal, 500 for active
 *
 * Light variant spec:
 *   - Background: #FFFFFF
 *   - Active item bg: #EBF3FA, border-left 3px solid #005BA6
 *   - Active text: #005BA6
 *   - Hover bg: #F1F1F1
 *   - Text: #4A4A4A
 *   - Collapsed: 60px icon-only
 */

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  badge?: number;
  children?: NavItem[];
  /** Renders as a non-clickable group separator label */
  isGroup?: boolean;
}

export interface NavLeftProps {
  /** Navigation items */
  items: NavItem[];
  /** Collapse to icon-only (60px wide) */
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
  bg:            '#002F48',
  activeItemBg:  '#005BA6',       // PS Blue fill for active item
  activeText:    '#FFFFFF',
  defaultText:   'rgba(255,255,255,0.7)',
  hoverText:     'rgba(255,255,255,0.9)',
  hoverBg:       'rgba(255,255,255,0.08)',
  logoBorder:    'rgba(255,255,255,0.1)',
  divider:       'rgba(255,255,255,0.08)',
  groupLabel:    'rgba(255,255,255,0.4)',
  badgeBg:       '#005BA6',
  badgeText:     '#FFFFFF',
  rightBorder:   'rgba(255,255,255,0.08)',
};

const LIGHT = {
  bg:            '#FFFFFF',
  activeItemBg:  '#EBF3FA',
  activeText:    '#005BA6',
  defaultText:   '#4A4A4A',
  hoverText:     '#2B2B2B',
  hoverBg:       '#F1F1F1',
  logoBorder:    '#DCDCDC',
  divider:       '#DCDCDC',
  groupLabel:    '#949494',
  badgeBg:       '#005BA6',
  badgeText:     '#FFFFFF',
  rightBorder:   '#DCDCDC',
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
  const [activeId, setActiveId] = useState(externalActiveId || items.find(i => !i.isGroup)?.id || '');
  const [expanded, setExpanded] = useState<string[]>([]);

  const c = colorVariant === 'dark' ? DARK : LIGHT;
  const width = collapsed ? 60 : 240;

  const handleItemClick = (item: NavItem) => {
    if (item.isGroup) return;
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
    // Group label (section header)
    if (item.isGroup) {
      if (collapsed) return null;
      return (
        <div
          style={{
            height: 32,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 16,
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: c.groupLabel,
            fontFamily: FONT,
            userSelect: 'none',
            marginTop: 8,
          }}
        >
          {item.label}
        </div>
      );
    }

    const isActive = activeId === item.id;
    const hasChildren = !!(item.children?.length);
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
            height: 44,
            padding: collapsed
              ? '0'
              : `0 16px 0 ${depth > 0 ? 32 : 16}px`,
            justifyContent: collapsed ? 'center' : 'flex-start',
            background: isActive ? c.activeItemBg : 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: isActive ? c.activeText : c.defaultText,
            fontSize: 14,
            fontWeight: isActive ? 500 : 400,
            textAlign: 'left',
            transition: 'background 150ms ease, color 150ms ease',
            fontFamily: FONT,
            flexShrink: 0,
            borderRadius: 0,
          }}
          onMouseEnter={(e) => {
            if (!isActive) {
              e.currentTarget.style.background = c.hoverBg;
              e.currentTarget.style.color = c.hoverText;
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive) {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = c.defaultText;
            }
          }}
        >
          {/* Icon — 20px, same color as text (inherited via currentColor) */}
          {item.icon && (
            <span
              style={{
                flexShrink: 0,
                width: 20,
                height: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                lineHeight: 1,
                color: 'inherit',
                ...(collapsed ? { width: '100%' } : {}),
              }}
            >
              {item.icon}
            </span>
          )}

          {/* Label (hidden when collapsed) */}
          {!collapsed && (
            <>
              <span style={{ flex: 1, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {item.label}
              </span>

              {/* Badge — 18px height pill */}
              {item.badge !== undefined && (
                <span
                  style={{
                    background: c.badgeBg,
                    color: c.badgeText,
                    fontSize: 11,
                    fontWeight: 700,
                    borderRadius: 9,
                    padding: '0 6px',
                    minWidth: 18,
                    height: 18,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 1,
                    fontFamily: FONT,
                    flexShrink: 0,
                  }}
                >
                  {item.badge > 99 ? '99+' : item.badge}
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
                    flexShrink: 0,
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
              borderLeft: `2px solid ${c.divider}`,
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
        borderRight: `1px solid ${c.rightBorder}`,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 200ms ease',
        overflow: 'hidden',
        flexShrink: 0,
        fontFamily: FONT,
      }}
    >
      {/* Logo header — 56px height */}
      {showLogo && (
        <div
          style={{
            height: 56,
            display: 'flex',
            alignItems: 'center',
            padding: collapsed ? '0 14px' : '0 16px',
            borderBottom: `1px solid ${c.logoBorder}`,
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
                color: colorVariant === 'dark' ? '#FFFFFF' : '#4A4A4A',
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
