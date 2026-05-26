import React from 'react';

interface ContextActionItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  isDestructive?: boolean;
}

interface ContextActionsProps {
  items: ContextActionItem[];
  className?: string;
  trigger: React.ReactNode;
}

const ContextActions: React.FC<ContextActionsProps> = ({ items, className, trigger }) => {
  return (
    <div className={`context-actions ${className}`}>
      <button
        className="trigger"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {trigger}
      </button>
      <div className="menu">
        {items.map((item, index) => (
          <div
            key={index}
            className={`item ${item.isDestructive ? 'destructive' : ''}`}
            onClick={item.onClick}
            role="menuitem"
            aria-label={item.label}
          >
            {item.icon && <span className="icon">{item.icon}</span>}
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContextActions; 

<style jsx global>{`
  :root {
    --ps-menu-bg: #FFFFFF;
    --ps-menu-border-color: #DCDCDC;
    --ps-menu-border-radius: 4px;
    --ps-menu-shadow: 0 2px 10px rgba(0,47,72,0.10);
    --ps-menu-min-width: 160px;
    --ps-menu-padding-y: 4px;
    --ps-item-height: 40px;
    --ps-item-padding-x: 16px;
    --ps-item-color: #4A4A4A;
    --ps-item-font-size: 14px;
    --ps-item-font-weight: 400;
    --ps-item-bg: transparent;
    --ps-item-hover-bg: #F1F1F1;
    --ps-item-hover-color: #4A4A4A;
    --ps-item-icon-color: #777777;
    --ps-item-icon-size: 16px;
    --ps-item-icon-gap: 8px;
    --ps-destructive-color: #E00000;
    --ps-destructive-icon-color: #E00000;
    --ps-destructive-hover-bg: #FEF0F0;
    --ps-divider-color: #DCDCDC;
    --ps-divider-margin-y: 4px;
    --ps-trigger-icon-color: #4A4A4A;
    --ps-trigger-icon-size: 20px;
    --ps-trigger-hover-bg: #F1F1F1;
    --ps-trigger-size: 32px;
    --ps-trigger-border-radius: 4px;
    --ps-z-index: 500;
  }

  .context-actions {
    position: relative;
    display: inline-block;
  }

  .trigger {
    width: var(--ps-trigger-size);
    height: var(--ps-trigger-size);
    border-radius: var(--ps-trigger-border-radius);
    background: transparent;
    border: 1px solid var(--ps-menu-border-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s;
  }

  .trigger:hover {
    background: var(--ps-trigger-hover-bg);
  }

  .menu {
    background: var(--ps-menu-bg);
    border: 1px solid var(--ps-menu-border-color);
    border-radius: var(--ps-menu-border-radius);
    box-shadow: var(--ps-menu-shadow);
    min-width: var(--ps-menu-min-width);
    padding: var(--ps-menu-padding-y) 0;
    position: absolute;
    z-index: var(--ps-z-index);
    display: none;
  }

  .context-actions:hover .menu {
    display: block;
  }

  .item {
    height: var(--ps-item-height);
    padding: 0 var(--ps-item-padding-x);
    color: var(--ps-item-color);
    font-size: var(--ps-item-font-size);
    font-weight: var(--ps-item-font-weight);
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: background 0.3s;
  }

  .item:hover {
    background: var(--ps-item-hover-bg);
    color: var(--ps-item-hover-color);
  }

  .item .icon {
    color: var(--ps-item-icon-color);
    margin-right: var(--ps-item-icon-gap);
    font-size: var(--ps-item-icon-size);
  }

  .destructive {
    color: var(--ps-destructive-color);
  }

  .destructive:hover {
    background: var(--ps-destructive-hover-bg);
  }
`}</style>
