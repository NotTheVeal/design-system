import React, { useState } from 'react';

export interface Tab {
  label: string;
  value: string;
  disabled?: boolean;
  count?: number;
}

export interface TabsProps {
  tabs: Tab[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  [key: string]: unknown;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { tabs, value, defaultValue, onChange, className = '', ...rest },
  ref,
) {
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? tabs[0]?.value ?? '',
  );
  const controlled = value !== undefined;
  const activeTab = controlled ? value! : internalValue;

  const handleChange = (tabValue: string) => {
    if (!controlled) setInternalValue(tabValue);
    onChange?.(tabValue);
  };

  return (
    <div ref={ref} className={`w-full ${className}`} {...rest}>
      <div
        className="flex border-b border-[#DCDCDC] overflow-x-auto"
        role="tablist"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;
          return (
            <button
              key={tab.value}
              id={`tab-${tab.value}`}
              role="tab"
              aria-selected={isActive}
              aria-disabled={tab.disabled}
              aria-controls={`panel-${tab.value}`}
              disabled={tab.disabled}
              onClick={() => { if (!tab.disabled) handleChange(tab.value); }}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                height: 44,
                padding: '0 16px',
                fontSize: 14,
                fontWeight: 600,
                whiteSpace: 'nowrap',
                border: 'none',
                borderBottom: isActive ? '2px solid #005BA6' : '2px solid transparent',
                marginBottom: -1,
                background: 'transparent',
                cursor: tab.disabled ? 'not-allowed' : 'pointer',
                color: isActive ? '#005BA6' : tab.disabled ? '#CCCCCC' : '#777777',
                fontFamily: "'Source Sans 3',-apple-system,sans-serif",
                transition: 'color 150ms, border-color 150ms',
              }}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  minWidth: 20, height: 20, padding: '0 6px', borderRadius: 10,
                  fontSize: 11, fontWeight: 700,
                  background: isActive ? '#005BA6' : '#F1F1F1',
                  color: isActive ? '#FFFFFF' : '#777777',
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        if (!isActive) return null;
        return (
          <div
            key={tab.value}
            id={`panel-${tab.value}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.value}`}
          />
        );
      })}
    </div>
  );
});

export { Tabs };
export default Tabs;
