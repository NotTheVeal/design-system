import React from 'react';

const styles = `
.navigation {
  font-family: 'Source Sans Pro', sans-serif;
}

.left-nav {
  background: #002F48;
  border-right: 1px solid #005BA6;
  width: 240px;
  padding: 16px 16px;
}

.left-nav-item {
  height: 40px;
  background: transparent;
  padding: 16px;
  margin-bottom: 4px;
  transition: background 0.3s;
}

.left-nav-item:hover {
  background: #DCDCDC;
}

.left-nav-item.active {
  background: #DCDCDC;
}

.top-nav {
  background: #005BA6;
  color: #FFFFFF;
  height: 64px;
  padding: 24px;
  display: flex;
  align-items: center;
}

.user-badge {
  background: #005BA6;
  color: #FFFFFF;
  border: 1px solid #DCDCDC;
  padding: 8px;
  border-radius: 4px;
}

`;

interface NavigationProps {
  className?: string;
  userName: string;
  items: Array<{ label: string; isActive?: boolean; isDisabled?: boolean }>;
}

const Navigation: React.FC<NavigationProps> = ({ className, userName, items }) => {
  return (
    <div className={`navigation ${className}`}>
      <style>{styles}</style>
      <div className="top-nav" role="navigation" aria-label="Main Navigation">
        <div className="user-badge" aria-label={`Logged in as ${userName}`}>{userName}</div>
      </div>
      <div className="left-nav">
        {items.map((item, index) => (
          <div
            key={index}
            className={`left-nav-item ${item.isActive ? 'active' : ''} ${item.isDisabled ? 'disabled' : ''}`}
            role="menuitem"
            aria-disabled={item.isDisabled}
            tabIndex={item.isDisabled ? -1 : 0}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
