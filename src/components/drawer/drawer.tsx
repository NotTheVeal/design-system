import React, { useEffect, useRef } from 'react';
const FONT = "'Source Sans 3', -apple-system, sans-serif";
export type DrawerPlacement = 'left' | 'right' | 'bottom';
export interface DrawerProps { open: boolean; onClose: () => void; placement?: DrawerPlacement; width?: number; height?: number; title?: string; children: React.ReactNode; footer?: React.ReactNode; className?: string; }
export const Drawer: React.FC<DrawerProps> = ({ open, onClose, placement = 'right', width = 480, height = 380, title, children, footer, className = '' }) => {
  const drawerRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    if (drawerRef.current) drawerRef.current.focus();
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);
  if (!open) return null;
  const isHorizontal = placement === 'left' || placement === 'right';
  const panelStyle = {
    position: 'fixed', zIndex: 1000, background: '#FFFFFF', fontFamily: FONT, display: 'flex', flexDirection: 'column', outline: 'none',
    boxShadow: placement === 'left' ? '4px 0 24px rgba(0,47,72,0.15)' : placement === 'right' ? '-4px 0 24px rgba(0,47,72,0.15)' : '0 -4px 24px rgba(0,47,72,0.15)',
    ...(isHorizontal ? { top: 0, bottom: 0, width, [placement]: 0 } : { left: 0, right: 0, height, bottom: 0 }),
  };
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 999, backgroundColor: 'rgba(0,47,72,0.4)', backdropFilter: 'blur(2px)' }} aria-hidden="true" />
      <div ref={drawerRef} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} style={panelStyle} className={className}>
        {title && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #DCDCDC', flexShrink: 0 }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#002F48', fontFamily: FONT }}>{title}</h2>
          <button onClick={onClose} aria-label="Close drawer" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', color: '#4A4A4A', borderRadius: 4 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>{children}</div>
        {footer && <div style={{ borderTop: '1px solid #DCDCDC', padding: '16px 20px', flexShrink: 0 }}>{footer}</div>}
      </div>
    </>
  );
};
export default Drawer;
