import React, { useEffect, useRef } from 'react';

export type DrawerWidth = 'narrow' | 'default' | 'wide';
export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  width?: DrawerWidth;
  className?: string;
}

const WIDTH_MAP: Record<DrawerWidth, number> = { narrow: 320, default: 480, wide: 600 };

export const Drawer: React.FC<DrawerProps> = ({
  isOpen, onClose, title, subtitle, children, footer, width='default', className='',
}) => {
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const panelWidth = WIDTH_MAP[width];
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    setTimeout(() => firstFocusRef.current?.focus(), 50);
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.32)', // Figma: 32% overlay
        display: 'flex', justifyContent: 'flex-end',
        animation: 'ps-drawer-overlay 250ms ease-out',
        fontFamily: font,
      }}
      onClick={e => { if (e.currentTarget === e.target) onClose(); }}
    >
      {/* Drawer panel — slides in from right, 0px border-radius (flush) */}
      <div
        className={className}
        style={{
          width: panelWidth,
          height: '100%',
          background: '#FFFFFF',
          borderRadius: 0,              // Figma: 0px — flush edges
          boxShadow: '0 0 32px rgba(0,0,0,0.18)', // Figma shadow
          display: 'flex',
          flexDirection: 'column',
          animation: 'ps-drawer-slide 250ms ease-out',
        }}
      >
        {/* Header — 56px, 1px bottom border */}
        <div style={{
          height: 56, flexShrink: 0,
          padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid #DCDCDC',
        }}>
          <div>
            {title && <div style={{ fontSize: 17, fontWeight: 700, color: '#002F48', fontFamily: font }}>{title}</div>}
            {subtitle && <div style={{ fontSize: 12, color: '#777777', fontFamily: font, marginTop: 2 }}>{subtitle}</div>}
          </div>
          {/* Close button — 28×28px */}
          <button
            ref={firstFocusRef}
            onClick={onClose}
            aria-label="Close drawer"
            style={{
              width: 28, height: 28, borderRadius: 4,
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#777777', transition: 'color 150ms, background 150ms',
              flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#002F48'; e.currentTarget.style.background = '#F1F1F1'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#777777'; e.currentTarget.style.background = 'none'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Scrollable body — 24px padding */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24, fontFamily: font }}>
          {children}
        </div>

        {/* Sticky footer — 64px, 1px top border, actions right-aligned */}
        {footer && (
          <div style={{
            height: 64, flexShrink: 0,
            padding: '0 24px',
            borderTop: '1px solid #DCDCDC',
            display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12,
          }}>
            {footer}
          </div>
        )}
      </div>
      <style>{`
        @keyframes ps-drawer-overlay { from { opacity:0 } to { opacity:1 } }
        @keyframes ps-drawer-slide { from { transform:translateX(100%) } to { transform:translateX(0) } }
      `}</style>
    </div>
  );
};

export default Drawer;
