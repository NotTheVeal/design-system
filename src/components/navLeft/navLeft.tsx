import React from 'react';

interface NavLeftProps {
  className?: string;
  collapsed?: boolean;
  items: NavItemProps[];
}

interface NavItemProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  subItems?: SubItemProps[];
}

interface SubItemProps {
  label: string;
  onClick: () => void;
}

const NavLeft: React.FC<NavLeftProps> = ({ className, collapsed = false, items }) => {
  return (
    <div className={`nav-left ${className}`} style={{ width: collapsed ? '64px' : '240px' }}>
      <div className="header" role="banner" aria-label="Navigation">
        <span className="logo">Logo</span>
      </div>
      <div className="container">
        {items.map((item, index) => (
          <div key={index} className={`item ${item.active ? 'active' : ''}`} onClick={item.onClick}>
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
            {item.subItems && item.subItems.length > 0 && (
              <div className="sub-items">
                {item.subItems.map((subItem, subIndex) => (
                  <div key={subIndex} className="sub-item" onClick={subItem.onClick}>
                    {subItem.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <style jsx>{`
        :root {
          --ps-font: 'Source Sans Pro', sans-serif;
          --ps-primary-color: #005BA6;
          --ps-midnight: #002F48;
          --ps-background: var(--ps-midnight);
          --ps-border: #DCDCDC;
          --ps-item-height: 40px;
          --ps-border-radius: 4px;
          --ps-padding: 16px;
        }

        .nav-left {
          background-color: var(--ps-background);
          padding: var(--ps-padding);
          border-right: 1px solid var(--ps-border);
          display: flex;
          flex-direction: column;
        }

        .header {
          height: 64px;
          display: flex;
          align-items: center;
          padding: var(--ps-padding);
          background-color: var(--ps-background);
        }

        .item {
          height: var(--ps-item-height);
          display: flex;
          align-items: center;
          padding: var(--ps-padding);
          cursor: pointer;
          transition: background 0.3s;
        }

        .item:hover {
          background-color: var(--ps-primary-color);
          color: white;
        }

        .active {
          border-left: 3px solid var(--ps-primary-color);
        }

        .sub-items {
          margin-left: 20px;
        }

        .sub-item {
          padding: var(--ps-padding);
          cursor: pointer;
        }

        .sub-item:hover {
          background-color: var(--ps-primary-color);
          color: white;
        }

        .label {
          margin-left: 12px;
        }
      `}</style>
    </div>
  );
};

export default NavLeft;
