import React, { useState } from 'react';

const FONT = "'Source Sans 3', -apple-system, sans-serif";

// ââ PS Design Token Colors âââââââââââââââââââââââââââââââââââââââââââââââââââââ
const PS_BLUE = '#005BA6';
const MIDNIGHT = '#002F48';
const INACTIVE = '#777777';
const DISABLED = '#949494';
const BORDER_CLR = '#DCDCDC';

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

export const Tabs: React.FC<TabsProps> = ({ tabs, value, onChange, size = 'default', className = '', style }) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const height = size === 'sm' ? 36 : 44;
  const fontSize = size === 'sm' ? 13 : 14;
  const padX = size === 'sm' ? 14 : 20;
  return (
    <div
      role="tablist"
      className={className}
      style={{ display: 'flex', flexDirection: 'row', borderBottom: '1px solid ' + BORDER_CLR, fontFamily: FONT, ...style }}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === value;
        const isHovered = hoveredTab === tab.value && !tab.disabled;
        const color = tab.disabled ? DISABLED : isActive ? PS_BLUE : isHovered ? MIDNIGHT : INACTIVE;
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
              height,
              padding: '0 ' + padX + 'px',
              fontFamily: FONT,
              fontSize,
              fontWeight: isActive ? 600 : 400,
              cursor: tab.disabled ? 'not-allowed' : 'pointer',
              border: 'none',
              background: isActive ? '#FFFFFF' : 'transparent',
              outline: 'none',
              position: 'relative',
              color,
              // Active tab: 3px solid PS Blue at bottom. Inactive: no border-bottom.
              // marginBottom: -1 overlaps the container border so active tab border sits flush.
              borderBottom: isActive ? '3px solid #005BA6' : 'none',
              paddingBottom: isActive ? 0 : 3,
              marginBottom: isActive ? -1 : 0,
              transition: 'color 0.15s ease, border-color 0.15s ease',
              whiteSpace: 'nowrap',
              userSelect: 'none',
              boxSizing: 'border-box',
            }}
            onClick={() => { if (!tab.disabled) onChange?.(tab.value); }}
            onMouseEnter={() => !tab.disabled && setHoveredTab(tab.value)}
            onMouseLeave={() => setHoveredTab(null)}
            onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && !tab.disabled) { e.preventDefault(); onChange?.(tab.value); } }}
          >
            {tab.icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 20,
                  height: 18,
                  padding: '0 5px',
                  borderRadius: 30,
                  backgroundColor: isActive ? PS_BLUE : BORDER_CLR,
                  color: isActive ? '#FFFFFF' : '#5C5C5C',
                  fontFamily: FONT,
                  fontSize: 12,
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
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

export const SegmentedTabs: React.FC<TabsProps> = ({ tabs, value, onChange, size = 'default', className = '', style }) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const height = size === 'sm' ? 32 : 40;
  const fontSize = size === 'sm' ? 13 : 14;
  return (
    <div
      role="tablist"
      className={className}
      style={{ display: 'inline-flex', flexDirection: 'row', backgroundColor: '#F1F1F1', borderRadius: 8, padding: 4, gap: 2, fontFamily: FONT, ...style }}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === value;
        const isHovered = hoveredTab === tab.value && !tab.disabled;
        const color = tab.disabled ? DISABLED : isActive ? '#FFFFFF' : isHovered ? MIDNIGHT : INACTIVE;
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
              height,
              padding: '0 ' + (size === 'sm' ? 12 : 16) + 'px',
              fontFamily: FONT,
              fontSize,
              fontWeight: isActive ? 700 : 400,
              color,
              backgroundColor: isActive ? PS_BLUE : 'transparent',
              border: 'none',
              borderRadius: 6,
              cursor: tab.disabled ? 'not-allowed' : 'pointer',
              outline: 'none',
              transition: 'background-color 0.15s ease, color 0.15s ease',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}
            onClick={() => { if (!tab.disabled) onChange?.(tab.value); }}
            onMouseEnter={() => !tab.disabled && setHoveredTab(tab.value)}
            onMouseLeave={() => setHoveredTab(null)}
            onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && !tab.disabled) { e.preventDefault(); onChange?.(tab.value); } }}
          >
            {tab.icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 18,
                  height: 16,
                  padding: '0 4px',
                  borderRadius: 30,
                  backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : BORDER_CLR,
                  color: isActive ? '#FFFFFF' : '#5C5C5C',
                  fontFamily: FONT,
                  fontSize: 11,
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export const PillTabs: React.FC<TabsProps> = ({ tabs, value, onChange, size = 'default', className = '', style }) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const height = size === 'sm' ? 28 : 36;
  const fontSize = size === 'sm' ? 12 : 14;
  return (
    <div
      role="tablist"
      className={className}
      style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 8, fontFamily: FONT, ...style }}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === value;
        const isHovered = hoveredTab === tab.value && !tab.disabled;
        const color = tab.disabled ? DISABLED : isActive ? '#FFFFFF' : isHovered ? MIDNIGHT : INACTIVE;
        const borderColor = tab.disabled ? BORDER_CLR : isActive ? PS_BLUE : isHovered ? MIDNIGHT : BORDER_CLR;
        const bg = isActive ? PS_BLUE : 'transparent';
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
              height,
              padding: '0 ' + (size === 'sm' ? 12 : 16) + 'px',
              fontFamily: FONT,
              fontSize,
              fontWeight: isActive ? 700 : 400,
              color,
              backgroundColor: bg,
              border: '1.5px solid ' + borderColor,
              borderRadius: 9999,
              cursor: tab.disabled ? 'not-allowed' : 'pointer',
              outline: 'none',
              transition: 'background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}
            onClick={() => { if (!tab.disabled) onChange?.(tab.value); }}
            onMouseEnter={() => !tab.disabled && setHoveredTab(tab.value)}
            onMouseLeave={() => setHoveredTab(null)}
            onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && !tab.disabled) { e.preventDefault(); onChange?.(tab.value); } }}
          >
            {tab.icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 18,
                  height: 16,
                  padding: '0 4px',
                  borderRadius: 30,
                  backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : BORDER_CLR,
                  color: isActive ? '#FFFFFF' : '#5C5C5C',
                  fontFamily: FONT,
                  fontSize: 11,
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
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
