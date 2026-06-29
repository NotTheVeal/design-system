import React, { useEffect, useRef, useState } from 'react';

export type PopoverVariant = 'default' | 'text-only' | 'cta';
export interface PopoverAction { label: string; onClick: () => void; variant?: 'primary' | 'secondary'; }

export interface PopoverProps {
  trigger: React.ReactNode;
  title?: string;
  content: React.ReactNode;
  variant?: PopoverVariant;
  actions?: PopoverAction[];
  placement?: 'bottom' | 'top';
  className?: string;
}

// Figma spec (node 4962:6112):
// Width: 280px, border: 1px solid #DCDCDC, border-radius: 4px
// Shadow: 0 4px 16px rgba(0,47,72,0.14)
// Title: SemiBold 16px #002F48 + X close icon 24x24
// Divider: #DCDCDC 1px horizontal
// Body: Regular 14px #4A4A4A
// CTA buttons: 36px height, 4px radius, 100px wide
//   Cancel: white bg, #DCDCDC border, #4A4A4A text
//   Primary: #005BA6 fill, white text

export const Popover: React.FC<PopoverProps> = ({
  trigger, title, content, variant = 'default', actions = [], placement = 'bottom', className = '',
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const font = "'Source Sans Pro', -apple-system, sans-serif";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    if (open) {
      document.addEventListener('mousedown', handler);
      document.addEventListener('keydown', esc);
    }
    return () => { document.removeEventListener('mousedown', handler); document.removeEventListener('keydown', esc); };
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <div onClick={() => setOpen(v => !v)} style={{ cursor: 'pointer' }}>{trigger}</div>

      {open && (
        <div
          className={className}
          style={{
            position: 'absolute',
            [placement === 'top' ? 'bottom' : 'top']: 'calc(100% + 8px)',
            left: 0, zIndex: 200,
            width: 280,                               // Figma: 280px
            background: '#FFFFFF',
            border: '1px solid #DCDCDC',
            borderRadius: 4,                          // Figma: 4px
            boxShadow: '0 4px 16px rgba(0,47,72,0.14)', // Figma shadow
            fontFamily: font,
            overflow: 'hidden',
          }}
        >
          {/* Header — only for default and cta */}
          {variant !== 'text-only' && title && (
            <>
              <div style={{ padding: '16px 16px 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ fontSize: 16, fontWeight: 600, color: '#002F48', fontFamily: font, flex: 1 }}>{title}</span>
                <button
                  onClick={() => setOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#777777', display: 'flex', alignItems: 'center', flexShrink: 0 }}
                  aria-label="Close"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              {/* Divider */}
              <div style={{ height: 1, background: '#DCDCDC', margin: '12px 16px 0' }} />
            </>
          )}

          {/* Body */}
          <div style={{ padding: variant === 'text-only' ? 16 : '12px 16px', fontSize: 14, fontWeight: 400, color: '#4A4A4A', fontFamily: font, lineHeight: 1.5 }}>
            {content}
          </div>

          {/* CTA actions */}
          {variant === 'cta' && actions.length > 0 && (
            <>
              <div style={{ height: 1, background: '#DCDCDC', margin: '0 16px' }} />
              <div style={{ padding: '12px 16px', display: 'flex', gap: 10 }}>
                {actions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => { action.onClick(); setOpen(false); }}
                    style={{
                      height: 36, padding: '0 16px', borderRadius: 4,
                      flex: 1,
                      background: action.variant === 'primary' ? '#005BA6' : '#FFFFFF',
                      border: action.variant === 'primary' ? 'none' : '1px solid #DCDCDC',
                      color: action.variant === 'primary' ? '#FFFFFF' : '#4A4A4A',
                      fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: font,
                    }}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Popover;
