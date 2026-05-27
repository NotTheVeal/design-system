import React, { useEffect, useRef } from 'react';


interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, subtitle, className, children }) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <>
      {isOpen && (
        <div className="drawer-overlay" onClick={onClose} role="presentation" aria-labelledby="drawer-title">
          <div className={`drawer ${className}`} ref={drawerRef} role="dialog" aria-modal="true">
            <header className="drawer-header">
              <h2 id="drawer-title" className="drawer-title">{title}</h2>
              {subtitle && <p className="drawer-subtitle">{subtitle}</p>}
              <button className="drawer-close-button" onClick={onClose} aria-label="Close drawer" />
            </header>
            <div className="drawer-body">{children}</div>
            <footer className="drawer-footer">
              <button className="drawer-footer-button">Action 1</button>
              <button className="drawer-footer-button">Action 2</button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default Drawer;
