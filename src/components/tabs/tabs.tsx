import React, { useState } from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

// ─── Folder Tab (page-level navigation) ──────────────────────────────────────

interface TabItem {
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
  count?: number;
}

interface TabsProps {
  tabs: TabItem[];
  activeTabIndex?: number;
  defaultActiveIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTabIndex,
  defaultActiveIndex = 0,
  onTabChange,
  className = '',
}) => {
  const [internalActive, setInternalActive] = useState(defaultActiveIndex);
  const controlled = activeTabIndex !== undefined;
  const active = controlled ? activeTabIndex! : internalActive;

  const handleClick = (i: number) => {
    if (tabs[i].disabled) return;
    if (!controlled) setInternalActive(i);
    onTabChange?.(i);
  };

  return (
    <div style={{ fontFamily }} className={className}>
      <div role="tablist" style={{ display: 'flex', borderBottom: '1px solid #DCDCDC' }}>
        {tabs.map((tab, i) => {
          const isActive = i === active;
          const isDisabled = !!tab.disabled;
          return (
            <button
              key={i}
              role="tab"
              aria-selected={isActive}
              aria-disabled={isDisabled}
              disabled={isDisabled}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleClick(i)}
              style={{
                height: 44,
                padding: '0 24px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontFamily,
                fontSize: 16,
                fontWeight: isActive ? 700 : 400,
                color: isDisabled ? '#BBBBBB' : isActive ? '#005BA6' : '#4A4A4A',
                background: 'transparent',
                borderTop: isActive ? '3px solid #005BA6' : '3px solid transparent',
                borderLeft: isActive ? '1px solid #DCDCDC' : '1px solid transparent',
                borderRight: isActive ? '1px solid #DCDCDC' : '1px solid transparent',
                borderBottom: isActive ? '1px solid #FFF' : 'none',
                marginBottom: isActive ? -1 : 0,
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                outline: 'none',
                transition: 'color 150ms ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                if (!isActive && !isDisabled)
                  (e.currentTarget as HTMLButtonElement).style.color = '#005BA6';
              }}
              onMouseLeave={e => {
                if (!isActive && !isDisabled)
                  (e.currentTarget as HTMLButtonElement).style.color = '#4A4A4A';
              }}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  minWidth: 20, height: 20, borderRadius: 10,
                  background: isActive ? 'rgba(0,91,166,0.12)' : '#DCDCDC',
                  color: isActive ? '#005BA6' : '#4A4A4A',
                  fontSize: 11, fontWeight: 600, padding: '0 5px', fontFamily,
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {tabs[active]?.content !== undefined && (
        <div role="tabpanel" style={{ paddingTop: 24 }}>
          {tabs[active].content}
        </div>
      )}
    </div>
  );
};

// ─── Segmented View Toggle ────────────────────────────────────────────────────

interface SegmentedOption {
  label?: string;
  icon?: React.ReactNode;
  value: string;
}

interface SegmentedTabsProps {
  options: SegmentedOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const SegmentedTabs: React.FC<SegmentedTabsProps> = ({
  options, value, defaultValue, onChange, className = '',
}) => {
  const [internal, setInternal] = useState(defaultValue ?? options[0]?.value);
  const controlled = value !== undefined;
  const active = controlled ? value! : internal;

  const handleClick = (v: string) => {
    if (!controlled) setInternal(v);
    onChange?.(v);
  };

  return (
    <div role="group" style={{ display: 'inline-flex', height: 34, background: '#F4F4F8', borderRadius: 5, padding: 2, gap: 1, fontFamily }} className={className}>
      {options.map(opt => {
        const isActive = opt.value === active;
        return (
          <button
            key={opt.value}
            onClick={() => handleClick(opt.value)}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 4,
              padding: '0 10px', height: '100%', border: 'none', borderRadius: 4,
              background: isActive ? '#FFFFFF' : 'transparent',
              boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
              color: isActive ? '#005BA6' : '#4A4A4A',
              fontSize: 14, fontWeight: isActive ? 600 : 400,
              cursor: 'pointer', fontFamily, transition: 'all 150ms ease', outline: 'none',
            }}
          >
            {opt.icon && <span style={{ display: 'flex', alignItems: 'center' }}>{opt.icon}</span>}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

// ─── Pill Filter Tabs ─────────────────────────────────────────────────────────

interface PillTabOption {
  label: string;
  value: string;
  count?: number;
  disabled?: boolean;
}

interface PillTabsProps {
  options: PillTabOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const PillTabs: React.FC<PillTabsProps> = ({
  options, value, defaultValue, onChange, className = '',
}) => {
  const [internal, setInternal] = useState(defaultValue ?? options[0]?.value);
  const controlled = value !== undefined;
  const active = controlled ? value! : internal;

  const handleClick = (v: string) => {
    if (!controlled) setInternal(v);
    onChange?.(v);
  };

  return (
    <div role="group" style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8, fontFamily }} className={className}>
      {options.map(opt => {
        const isActive = opt.value === active;
        const isDisabled = !!opt.disabled;
        return (
          <button
            key={opt.value}
            disabled={isDisabled}
            onClick={() => !isDisabled && handleClick(opt.value)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              height: 35, padding: '0 16px', borderRadius: 100,
              border: `1.5px solid ${isActive ? '#005BA6' : '#949494'}`,
              background: isActive ? '#005BA6' : 'transparent',
              color: isActive ? '#FFFFFF' : isDisabled ? '#BBBBBB' : '#4A4A4A',
              fontSize: 14, fontWeight: 600,
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              fontFamily, transition: 'all 150ms ease', outline: 'none',
            }}
          >
            {opt.label}
            {opt.count !== undefined && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                minWidth: 18, height: 18, borderRadius: 9,
                background: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.1)',
                fontSize: 11, fontWeight: 600, padding: '0 4px',
              }}>
                {opt.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
