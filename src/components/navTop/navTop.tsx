import React from 'react';

interface NavTopProps {
  className?: string;
}

const NavTop: React.FC<NavTopProps> = ({ className }) => {
  return (
    <nav className={`${className} navTop`} role="navigation" aria-label="Main Navigation">
      <style jsx>{`
        :root {
          --ps-font: 'Source Sans Pro', sans-serif;
          --ps-primary-color: #005BA6;
          --ps-midnight: #002F48;
          --ps-border-radius: 4px;
          --ps-border-radius-modal: 8px;
          --ps-border-radius-pill: 100px;
          --ps-container-background: var(--ps-primary-color);
          --ps-container-border-bottom: #002F48;
          --ps-container-height: 64px;
          --ps-container-padding-h: 24px;
          --ps-container-gap: 16px;
          --ps-logo-text: #ffffff;
          --ps-logo-icon: #ffffff;
          --ps-search-background: #002F48;
          --ps-search-background-focus: #ffffff;
          --ps-search-text: #ffffff;
          --ps-search-text-focus: #005BA6;
          --ps-search-placeholder: #ffffff;
          --ps-search-placeholder-focus: #cccccc;
          --ps-search-border: transparent;
          --ps-search-border-focus: #005BA6;
          --ps-search-height: 40px;
          --ps-search-padding-h: 12px;
          --ps-search-radius: 4px;
          --ps-icon-color: #ffffff;
          --ps-icon-background: transparent;
          --ps-icon-hover-background: #002F48;
          --ps-badge-background: #ff0000;
          --ps-badge-text: #ffffff;
          --ps-badge-size: 18px;
          --ps-userMenu-height: 40px;
          --ps-dropdown-background: #ffffff;
          --ps-dropdown-border: #cccccc;
          --ps-dropdown-radius: 4px;
          --ps-dropdown-item-height: 40px;
        }
        .navTop {
          background: var(--ps-container-background);
          border-bottom: 1px solid var(--ps-container-border-bottom);
          height: var(--ps-container-height);
          display: flex;
          align-items: center;
          padding: 0 var(--ps-container-padding-h);
          gap: var(--ps-container-gap);
          font-family: var(--ps-font);
        }
        .navTop .logo {
          color: var(--ps-logo-text);
        }
        .navTop .search {
          background: var(--ps-search-background);
          border: 1px solid var(--ps-search-border);
          color: var(--ps-search-text);
          height: var(--ps-search-height);
          padding: 0 var(--ps-search-padding-h);
          border-radius: var(--ps-search-radius);
          transition: border-color 0.2s;
        }
        .navTop .search:focus {
          border-color: var(--ps-search-border-focus);
          background: var(--ps-search-background-focus);
          color: var(--ps-search-text-focus);
        }
        .navTop .icon {
          color: var(--ps-icon-color);
          background: var(--ps-icon-background);
          border-radius: var(--ps-border-radius);
          width: var(--ps-icon-size);
          height: var(--ps-icon-size);
        }
        .navTop .icon:hover {
          background: var(--ps-icon-hover-background);
        }
        .navTop .badge {
          background: var(--ps-badge-background);
          color: var(--ps-badge-text);
          border-radius: var(--ps-border-radius-pill);
          height: var(--ps-badge-size);
          padding: 0 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
      <div className="logo">PartsSource</div>
      <input
        type="text"
        className="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button className="icon" aria-label="Menu">☰</button>
      <div className="badge" aria-label="Notifications">3</div>
      <button className="userMenu" aria-label="User Menu">User</button>
    </nav>
  );
};

export default NavTop;
