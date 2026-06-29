import React, { useState } from 'react';

// Figma token values (node 4099:6022):
const FONT          = "'Source Sans Pro', -apple-system, sans-serif";
const PS_BLUE       = '#005BA6';
const MIDNIGHT      = '#002F48';  // active tab text
const INACTIVE      = '#777777';  // default tab text
const DISABLED_CLR  = '#BBBBBB';  // Figma: #BBBBBB not #949494
const RAIL_CLR      = '#E0E0E0';  // Figma rail/side border
const GREY_400      = '#949494';  // Pill default border

export interface Tab {
  label: string;
  value: string;
  disabled?: boolean;
  count?: number;
  icon?: React.ReactNode;
}

export type TabItem = Tab;

export interface TabsProps {
  tabs: Tab[];
  value?: string;
  onChange?: (value: string) => void;
  size?: 'default' | 'sm';
  className?: string;
  style?: React.CSSProperties;
}

// ── Folder Tabs ─────────────────────────────────────────────────────────────
// Active: 3px PS Blue top border, #002F48 Bold, white bg, lifts above rail
// Hover:  #005BA6 text + 2px blue bottom line
// Default: #777777 text, transparent bg
// Disabled: #BBBBBB, not-allowed
// Rail: 1px solid #E0E0E0 at container bottom
// Padding: 24px per side (Figma: --ps-cmp-tab-ul-padding-x = 24px)

export const Tabs: React.FC<TabsProps> = ({
  tabs, value, onChange, size = 'default', className = '', style,
}) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const padX = 24; // Figma: 24px side padding

  return (
    <div
      role="tablist"
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'row',
        borderBottom: `1px solid ${RAIL_CLR}`, // Figma rail #E0E0E0
        fontFamily: FONT,
        ...style,
      }}
    >
      {tabs.map((tab) => {
        const isActive   = tab.value === value;
        const isHovered  = hoveredTab === tab.value && !tab.disabled;

        const color =
          tab.disabled ? DISABLED_CLR :
          isActive     ? MIDNIGHT :    // Figma: active = #002F48 Bold
          isHovered    ? PS_BLUE  :    // Figma: hover = #005BA6
          INACTIVE;

        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={isActive}
            aria-disabled={tab.disabled}
            tabIndex={tab.disabled ? -1 : 0}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              height: 44,
              padding: `0 ${padX}px`,
              fontFamily: FONT,
              fontSize: 16,
              fontWeight: isActive ? 700 : 400,  // Figma: active = Bold
              cursor: tab.disabled ? 'not-allowed' : 'pointer',
              border: 'none',
              background: 'transparent',
              outline: 'none',
              position: 'relative',
              color,
              // Active: 3px PS Blue top border (Figma: --ps-cmp-tab-ul-indicator-color)
              // Active side borders: 1px #E0E0E0 left+right, open bottom
              borderTop: isActive ? `3px solid ${PS_BLUE}` : '3px solid transparent',
              borderLeft: isActive ? `1px solid ${RAIL_CLR}` : '1px solid transparent',
              borderRight: isActive ? `1px solid ${RAIL_CLR}` : '1px solid transparent',
              borderBottom: isHovered && !isActive ? `2px solid ${PS_BLUE}` : '2px solid transparent',
              marginBottom: isActive ? -1 : 0,  // lifts above rail
              transition: 'color 0.15s ease, border-color 0.15s ease',
              whiteSpace: 'nowrap',
              userSelect: 'none',
              boxSizing: 'border-box',
            }}
            onClick={() => { if (!tab.disabled) onChange?.(tab.value); }}
            onMouseEnter={() => !tab.disabled && setHoveredTab(tab.value)}
            onMouseLeave={() => setHoveredTab(null)}
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && !tab.disabled) {
                e.preventDefault();
                onChange?.(tab.value);
              }
            }}
          >
            {tab.icon && (
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>{tab.icon}</span>
            )}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                minWidth: 20, height: 18, padding: '0 5px',
                borderRadius: 30,
                backgroundColor: isActive ? PS_BLUE : '#DCDCDC',
                color: isActive ? '#FFFFFF' : '#5C5C5C',
                fontFamily: FONT, fontSize: 12, fontWeight: 700, lineHeight: 1,
              }}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export const TabPanel: React.FC<{
  value: string;
  activeValue?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ value, activeValue, children, style }) => {
  if (value !== activeValue) return null;
  return (
    <div role="tabpanel" style={{ fontFamily: FONT, paddingTop: 16, backgroundColor: '#FFFFFF', ...style }}>
      {children}
    </div>
  );
};

// ── Segmented Tabs ────────────────────────────────────────────────────────────
// Track: #F4F6F8, 5px radius, 34px height
// Active segment: WHITE (#FFFFFF) pill with shadow — NOT blue
// Figma: "Active segment = white pill with 0 1px 2px shadow"

export const SegmentedTabs: React.FC<TabsProps> = ({
  tabs, value, onChange, size = 'default', className = '', style,
}) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <div
      role="tablist"
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'row',
        backgroundColor: '#F4F6F8',  // Figma: --ps-cmp-tab-seg-track-bg
        borderRadius: 4,              // Figma: 5px
        padding: 3,
        gap: 2,
        height: 34,                  // Figma: --ps-cmp-tab-seg-height = 34px
        alignItems: 'center',
        fontFamily: FONT,
        ...style,
      }}
    >
      {tabs.map((tab) => {
        const isActive  = tab.value === value;
        const isHovered = hoveredTab === tab.value && !tab.disabled;

        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={isActive}
            aria-disabled={tab.disabled}
            tabIndex={tab.disabled ? -1 : 0}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              height: 28,
              padding: '0 14px',
              fontFamily: FONT,
              fontSize: 14,
              fontWeight: isActive ? 600 : 400,
              color: tab.disabled ? DISABLED_CLR : isActive ? MIDNIGHT : isHovered ? MIDNIGHT : INACTIVE,
              // Figma: active = WHITE (#FFFFFF) with shadow
              backgroundColor: isActive ? '#FFFFFF' : 'transparent',
              border: 'none',
              borderRadius: 4,
              cursor: tab.disabled ? 'not-allowed' : 'pointer',
              outline: 'none',
              // Figma: "white pill with 0 1px 2px shadow"
              boxShadow: isActive ? '0 1px 2px rgba(0,0,0,0.18)' : 'none',
              transition: 'background-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}
            onClick={() => { if (!tab.disabled) onChange?.(tab.value); }}
            onMouseEnter={() => !tab.disabled && setHoveredTab(tab.value)}
            onMouseLeave={() => setHoveredTab(null)}
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && !tab.disabled) {
                e.preventDefault();
                onChange?.(tab.value);
              }
            }}
          >
            {tab.icon && (
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>{tab.icon}</span>
            )}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// ── Pill Filter Tabs ──────────────────────────────────────────────────────────
// Figma: 30px height, full radius (15px), border #949494 default
// Active: #005BA6 fill + white text
// Count badge: rgba(255,255,255,0.25) on active, #DCDCDC on default

export const PillTabs: React.FC<TabsProps> = ({
  tabs, value, onChange, size = 'default', className = '', style,
}) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <div
      role="tablist"
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        fontFamily: FONT,
        ...style,
      }}
    >
      {tabs.map((tab) => {
        const isActive  = tab.value === value;
        const isHovered = hoveredTab === tab.value && !tab.disabled;
        const bg          = isActive ? PS_BLUE : 'transparent';
        const color       = tab.disabled ? DISABLED_CLR : isActive ? '#FFFFFF' : isHovered ? PS_BLUE : INACTIVE;
        const borderColor = tab.disabled ? '#DCDCDC' : isActive ? PS_BLUE : isHovered ? PS_BLUE : GREY_400;  // Figma: #949494 default

        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={isActive}
            aria-disabled={tab.disabled}
            tabIndex={tab.disabled ? -1 : 0}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              height: 30,              // Figma: --ps-cmp-tab-pill-height = 30px
              padding: '0 14px',
              fontFamily: FONT,
              fontSize: 14,
              fontWeight: isActive ? 700 : 400,
              color,
              backgroundColor: bg,
              border: `1px solid ${borderColor}`,  // Figma: 1px (not 1.5px)
              borderRadius: 15,         // Figma: full pill (15px)
              cursor: tab.disabled ? 'not-allowed' : 'pointer',
              outline: 'none',
              transition: 'background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}
            onClick={() => { if (!tab.disabled) onChange?.(tab.value); }}
            onMouseEnter={() => !tab.disabled && setHoveredTab(tab.value)}
            onMouseLeave={() => setHoveredTab(null)}
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && !tab.disabled) {
                e.preventDefault();
                onChange?.(tab.value);
              }
            }}
          >
            {tab.icon && (
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>{tab.icon}</span>
            )}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                minWidth: 18, height: 16, padding: '0 4px',
                borderRadius: 30,
                backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : '#DCDCDC',
                color: isActive ? '#FFFFFF' : '#5C5C5C',
                fontFamily: FONT, fontSize: 11, fontWeight: 700, lineHeight: 1,
              }}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
