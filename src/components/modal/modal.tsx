import React, { useEffect, useRef, useId } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showClose?: boolean;
}

export type { ModalProps };

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(function Modal(
  {
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    className = '',
    showClose = true,
  },
  ref,
) {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const setRef = (node: HTMLDivElement | null) => {
    (modalRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    if (typeof ref === 'function') { ref(node); }
    else if (ref) { (ref as React.MutableRefObject<HTMLDivElement | null>).current = node; }
  };

  useEffect(() => {
    if (isOpen) { document.body.style.overflow = 'hidden'; }
    else { document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const firstFocusable = modalRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); return; }
    if (e.key !== 'Tab') return;
    const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) ?? [];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last?.focus(); } }
    else { if (document.activeElement === last) { e.preventDefault(); first?.focus(); } }
  };

  if (!isOpen) return null;

  const maxW: Record<string, number> = { sm: 480, md: 640, lg: 880, xl: 1100 };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      onKeyDown={handleKeyDown}
      style={{ position:'fixed', inset:0, zIndex:50, display:'flex', alignItems:'center', justifyContent:'center', padding:16 }}
    >
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{ position:'absolute', inset:0, background:'rgba(0,47,72,0.6)' }}
      />
      <div
        ref={setRef}
        className={className}
        style={{ position:'relative', width:'100%', maxWidth:maxW[size], background:'#FFFFFF', borderRadius:8, boxShadow:'0 6px 20px rgba(0,47,72,0.18)' }}
      >
        {(title || showClose) && (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'24px 24px 16px', borderBottom:'1px solid #F1F1F1' }}>
            {title && <h2 id={titleId} style={{ margin:0, fontSize:30, fontWeight:300, color:'#002F48', fontFamily:"'Source Sans 3',-apple-system,sans-serif" }}>{title}</h2>}
            {showClose && (
              <button onClick={onClose} aria-label="Close modal" style={{ marginLeft:'auto', background:'none', border:'none', cursor:'pointer', fontSize:24, color:'#777777', lineHeight:1, padding:4 }}>×</button>
            )}
          </div>
        )}
        <div style={{ padding:24 }}>{children}</div>
      </div>
    </div>
  );
});

export { Modal };
export default Modal;
