import React, { useEffect, useRef } from 'react';
const FONT = "'Source Sans 3', -apple-system, sans-serif";
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';
const SIZE_WIDTH = { sm: 480, md: 640, lg: 880, xl: 1200 };
export interface ModalProps { open: boolean; onClose: () => void; size?: ModalSize; title?: string; children: React.ReactNode; footer?: React.ReactNode; closeOnBackdrop?: boolean; className?: string; }
export const Modal: React.FC<ModalProps> = ({ open, onClose, size = 'md', title, children, footer, closeOnBackdrop = true, className = '' }) => {
  const dialogRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    if (dialogRef.current) dialogRef.current.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = prev; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div role="presentation" style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={(e) => { if (closeOnBackdrop && e.target === e.currentTarget) onClose(); }}>
      {/* Backdrop */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,47,72,0.5)', backdropFilter: 'blur(2px)' }} aria-hidden="true" />
      {/* Panel */}
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={title ? 'modal-title' : undefined} tabIndex={-1} style={{ position: 'relative', width: '100%', maxWidth: SIZE_WIDTH[size], maxHeight: 'calc(100vh - 96px)', backgroundColor: '#FFFFFF', borderRadius: 8, boxShadow: '0 8px 32px rgba(0,47,72,0.22)', display: 'flex', flexDirection: 'column', fontFamily: FONT, outline: 'none' }} className={className}>
        {/* Header */}
        {title && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #DCDCDC', flexShrink: 0 }}>
          <h2 id="modal-title" style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#002F48', fontFamily: FONT }}>{title}</h2>
          <button onClick={onClose} aria-label="Close" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', color: '#777777', borderRadius: 4 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>}
        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>{children}</div>
        {/* Footer */}
        {footer && <div style={{ borderTop: '1px solid #DCDCDC', padding: '16px 24px', flexShrink: 0, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>{footer}</div>}
      </div>
    </div>
  );
};
Modal.displayName = 'Modal';
export default Modal;
