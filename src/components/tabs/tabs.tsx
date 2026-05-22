import React from 'react';

interface Tab {
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  activeTabIndex: number;
  onTabChange: (index: number) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTabIndex, onTabChange, className }) => {
  return (
    <div className={`tabs ${className}`}>
      <div className="tabs__indicator" />
      <div className="tabs__items">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tabs__item ${index === activeTabIndex ? 'active' : ''} ${tab.disabled ? 'disabled' : ''}`}
            onClick={() => !tab.disabled && onTabChange(index)}
            aria-selected={index === activeTabIndex}
            disabled={tab.disabled}
            aria-label={tab.label}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabs__panel">{tabs[activeTabIndex].content}</div>
      <style jsx>{`
        :root {
          --ps-font: 'Source Sans Pro', sans-serif;
          --ps-primary-color: #005BA6;
          --ps-midnight-color: #002F48;
          --ps-padding-h: 16px;
          --ps-tab-height: 44px;
          --ps-tab-indicator-height: 2px;
          --ps-tab-border-width: 1px;
          --ps-tab-border-color: #DCDCDC;
          --ps-tab-background-hover: #f0f0f0;
          --ps-tab-text-default: #333;
          --ps-tab-text-active: var(--ps-primary-color);
          --ps-tab-text-disabled: #ccc;
          --ps-tab-badge-background: #e0e0e0;
          --ps-tab-badge-text: #333;
          --ps-panel-padding-v: 24px;
        }
        .tabs {
          font-family: var(--ps-font);
        }
        .tabs__items {
          display: flex;
          border-bottom: var(--ps-tab-border-width) solid var(--ps-tab-border-color);
        }
        .tabs__item {
          padding: var(--ps-padding-h);
          height: var(--ps-tab-height);
          background: transparent;
          border: none;
          cursor: pointer;
          color: var(--ps-tab-text-default);
          font-size: 14px;
          font-weight: 600;
          transition: background 0.2s, color 0.2s;
        }
        .tabs__item.active {
          color: var(--ps-tab-text-active);
        }
        .tabs__item:hover {
          background: var(--ps-tab-background-hover);
        }
        .tabs__item.disabled {
          color: var(--ps-tab-text-disabled);
          cursor: not-allowed;
        }
        .tabs__indicator {
          height: var(--ps-tab-indicator-height);
          background: var(--ps-primary-color);
          transition: transform 0.2s;
        }
        .tabs__panel {
          padding: var(--ps-panel-padding-v) 0;
        }
      `}</style>
    </div>
  );
};

export default Tabs;
