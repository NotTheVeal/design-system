import React from 'react';

interface DrawerProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, title, onClose, className, children }) => {
  return (
    <>
      {isOpen && (
        <div className={`drawer-overlay`} role="dialog" aria-labelledby="drawer-title" aria-modal="true">
          <div className={`drawer ${className}`}>
            <header className="drawer-header">
              <h2 id="drawer-title" className="drawer-title">{title}</h2>
              <button className="drawer-close" onClick={onClose} aria-label="Close drawer">×</button>
            </header>
            <div className="drawer-body">{children}</div>
            <footer className="drawer-footer">
              {/* Footer content can go here */}
            </footer>
          </div>
        </div>
      )}
      <style jsx>{`
        :root {
          --ps-drawer-background: {semantic.color.surface.default};
          --ps-drawer-overlay: rgba(0, 47, 72, 0.40);
          --ps-drawer-border: {semantic.color.border.default};
          --ps-drawer-radius: 0;
          --ps-drawer-width-narrow: 320px;
          --ps-drawer-width-default: 480px;
          --ps-drawer-width-wide: 600px;
          --ps-drawer-header-height: 64px;
          --ps-drawer-header-padding-h: 24px;
          --ps-drawer-footer-height: 72px;
          --ps-drawer-body-padding-h: 24px;
          --ps-drawer-body-padding-v: 24px;
          --ps-drawer-animation-duration: 250ms;
          --ps-drawer-animation-easing: cubic-bezier(0.4, 0, 0.2, 1);
        }
        .drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--ps-drawer-overlay);
          z-index: 400;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .drawer {
          width: var(--ps-drawer-width-default);
          background: var(--ps-drawer-background);
          border: var(--ps-drawer-border);
          border-radius: var(--ps-drawer-radius);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .drawer-header {
          height: var(--ps-drawer-header-height);
          padding: var(--ps-drawer-header-padding-h);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--ps-drawer-border);
        }
        .drawer-title {
          color: {semantic.color.text.primary};
          font-size: var(--ps-drawer-header-title-fontSize);
          font-weight: var(--ps-drawer-header-title-fontWeight);
        }
        .drawer-close {
          background: none;
          border: none;
          color: {semantic.color.text.secondary};
          font-size: var(--ps-drawer-header-close-size);
          cursor: pointer;
          transition: color 250ms;
        }
        .drawer-close:hover {
          color: {semantic.color.brand.primary};
        }
        .drawer-body {
          padding: var(--ps-drawer-body-padding-h) var(--ps-drawer-body-padding-v);
        }
        .drawer-footer {
          height: var(--ps-drawer-footer-height);
          padding: var(--ps-drawer-footer-padding-h);
          display: flex;
          gap: 12px;
          border-top: 1px solid var(--ps-drawer-border);
        }
      `}</style>
    </>
  );
};

export default Drawer;
