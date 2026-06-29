import React, { useEffect, useRef } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: number;
  className?: string;
}

// Figma spec (node 489:363):
// Max-width: 850px, border-radius: 4px
// Title: Source Sans Pro Light 30px, color #002F48
// Subtitle: 14px, #4A4A4A
// Divider: #F1F1F1
// Overlay: rgba(0,0,0,0.5), fade-in 200ms
// ESC to close, click outside to close, focus trap

export const Modal: React.FC<ModalProps> = ({
  isOpen, onClose, title, subtitle, children, footer, maxWidth=850, className='',
}) => {
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    firstFocusRef.current?.focus();
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.5)',
        animation: 'ps-modal-fade 200ms ease',
        padding: '16px',
        fontFamily: font,
      }}
      onClick={e => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div
        className={className}
        style={{
          background: '#FFFFFF',
          borderRadius: 4,                  // Figma: 4px
          width: '100%',
          maxWidth,                         // Figma: 850px default
          boxShadow: '0 20px 60px rgba(0,47,72,0.25)',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
          overflow: 'hidden',
          animation: 'ps-modal-slide 200ms ease',
        }}
      >
        {/* Header */}
        <div style={{ padding: '24px 32px 16px', borderBottom: '1px solid #F1F1F1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            {title && (
              <div>
                {/* Figma: Source Sans Pro Light 30px, #002F48 */}
                <h2 id="modal-title" style={{ margin: 0, fontSize: 30, fontWeight: 300, color: '#002F48', fontFamily: font, lineHeight: 1.2 }}>
                  {title}
                </h2>
                {subtitle && (
                  <p style={{ margin: '4px 0 0', fontSize: 14, color: '#4A4A4A', fontFamily: font }}>
                    {subtitle}
                  </p>
                )}
              </div>
            )}
            <button
              ref={firstFocusRef}
              onClick={onClose}
              aria-label="Close modal"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 8, borderRadius: 4, color: '#777777',
                display: 'flex', alignItems: 'center', flexShrink: 0,
                marginLeft: 16,
                transition: 'color 150ms',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#002F48')}
              onMouseLeave={e => (e.currentTarget.style.color = '#777777')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        {children && (
          <div style={{ padding: '20px 32px', flex: 1, overflowY: 'auto', fontSize: 14, color: '#4A4A4A', fontFamily: font }}>
            {children}
          </div>
        )}

        {/* Footer */}
        {footer && (
          <div style={{ padding: '16px 32px', borderTop: '1px solid #F1F1F1', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            {footer}
          </div>
        )}
      </div>
      <style>{`
        @keyframes ps-modal-fade { from { opacity:0 } to { opacity:1 } }
        @keyframes ps-modal-slide { from { transform:translateY(-8px) scale(0.98); opacity:0 } to { transform:none; opacity:1 } }
      `}</style>
    </div>
  );
};

export default Modal;
