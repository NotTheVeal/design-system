import React, { useEffect } from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  position?: 'left' | 'right';
  width?: string;
  className?: string;
}

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  position = 'right',
  width = '400px',
  className = '',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 40,
          background: 'rgba(0,47,72,0.6)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 300ms ease',
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
        style={{
          position: 'fixed',
          top: 0,
          [position === 'right' ? 'right' : 'left']: 0,
          height: '100%',
          width,
          zIndex: 50,
          background: '#FFFFFF',
          boxShadow: '0 6px 20px rgba(0,47,72,0.18)',
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : position === 'right' ? 'translateX(100%)' : 'translateX(-100%)',
          transition: 'transform 300ms ease',
          fontFamily,
        }}
        className={className}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          height: 56,
          borderBottom: '1px solid #DCDCDC',
          flexShrink: 0,
        }}>
          {title && (
            <h2 id="drawer-title" style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 600,
              color: '#002F48',
              fontFamily,
            }}>
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            aria-label="Close drawer"
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              border: 'none',
              background: 'transparent',
              color: '#777777',
              cursor: 'pointer',
              borderRadius: 4,
              transition: 'color 150ms ease, background 150ms ease',
              fontFamily,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.color = '#4A4A4A';
              (e.currentTarget as HTMLButtonElement).style.background = '#F1F1F1';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.color = '#777777';
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {children}
        </div>

        {/* Footer (optional) */}
        {footer && (
          <div style={{
            padding: '16px 24px',
            borderTop: '1px solid #DCDCDC',
            display: 'flex',
            gap: 8,
            justifyContent: 'flex-end',
            flexShrink: 0,
          }}>
            {footer}
          </div>
        )}
      </div>
    </>
  );
};

export default Drawer;
