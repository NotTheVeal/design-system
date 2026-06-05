import React, { useRef, useEffect } from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

interface PopoverProps {
  title?: string;
  content: React.ReactNode;
  placement?: PopoverPlacement;
  onClose?: () => void;
  anchorRef?: React.RefObject<HTMLElement>;
  className?: string;
}

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="4" x2="12" y2="12" /><line x1="12" y1="4" x2="4" y2="12" />
  </svg>
);

const Popover: React.FC<PopoverProps> = ({
  title,
  content,
  placement = 'bottom',
  onClose,
  className = '',
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose?.();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={popoverRef}
      className={className}
      role="dialog"
      aria-modal="false"
      style={{
        display: 'inline-block',
        background: '#FFFFFF',
        border: '1px solid #DCDCDC',
        borderRadius: 4,
        boxShadow: '0 2px 10px rgba(0,47,72,0.10)',
        padding: '16px',
        minWidth: 200,
        maxWidth: 320,
        fontFamily,
      }}
    >
      {(title || onClose) && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: title ? 8 : 0 }}>
          {title && (
            <span style={{ fontSize: 14, fontWeight: 600, color: '#4A4A4A', fontFamily }}>
              {title}
            </span>
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              style={{
                marginLeft: 'auto',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                color: '#777777',
                display: 'flex',
                alignItems: 'center',
                lineHeight: 1,
                transition: 'color 150ms ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#4A4A4A')}
              onMouseLeave={e => (e.currentTarget.style.color = '#777777')}
            >
              <CloseIcon />
            </button>
          )}
        </div>
      )}
      <div style={{ fontSize: 14, color: '#4A4A4A', lineHeight: 1.5, fontFamily }}>
        {content}
      </div>
    </div>
  );
};

export default Popover;
