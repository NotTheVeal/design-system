import React, { useState, useRef, useEffect } from 'react';

export type ContextActionVariant = 'default' | 'danger';

export interface ContextAction {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  variant?: ContextActionVariant;
  disabled?: boolean;
  divider?: boolean;
}

export interface ContextActionsProps {
  actions: ContextAction[];
  placement?: 'bottom-start' | 'bottom-end';
  triggerSize?: number;
  className?: string;
}

// PS Design System ContextActions:
// Trigger: 32×32 ⋮ icon button, 4px radius, hover #F1F1F1
// Dropdown: 4px radius, 1px #DCDCDC border, shadow
// Items: 40px height, 14px, hover #F1F1F1
// Danger: #E00000 text

const KebabIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
  </svg>
);

export const ContextActions: React.FC<ContextActionsProps> = ({
  actions, placement = 'bottom-end', triggerSize = 32, className = '',
}) => {
  const [open, setOpen] = useState(false);
  const [trigHovered, setTrigHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const font = "'Source Sans Pro', -apple-system, sans-serif";

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    if (open) { document.addEventListener('mousedown', handler); document.addEventListener('keydown', esc); }
    return () => { document.removeEventListener('mousedown', handler); document.removeEventListener('keydown', esc); };
  }, [open]);

  return (
    <div ref={ref} className={className} style={{ position: 'relative', display: 'inline-block' }}>
      {/* Trigger: ⋮ kebab */}
      <button
        onClick={() => setOpen(v => !v)}
        onMouseEnter={() => setTrigHovered(true)}
        onMouseLeave={() => setTrigHovered(false)}
        aria-label="More actions"
        aria-expanded={open}
        aria-haspopup="menu"
        style={{
          width: triggerSize, height: triggerSize, borderRadius: 4,
          background: open || trigHovered ? '#F1F1F1' : 'none',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#4A4A4A', transition: 'background 150ms ease',
          padding: 0,
        }}
      >
        <KebabIcon />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            [placement === 'bottom-end' ? 'right' : 'left']: 0,
            zIndex: 200,
            minWidth: 160,
            background: '#FFFFFF',
            border: '1px solid #DCDCDC',
            borderRadius: 4,
            boxShadow: '0 3px 5px rgba(148,148,148,0.5)',
            overflow: 'hidden',
            fontFamily: font,
          }}
        >
          {actions.map((action, idx) => {
            if (action.divider) {
              return <div key={idx} style={{ height: 1, background: '#F1F1F1', margin: '4px 0' }} />;
            }
            const isDanger = action.variant === 'danger';
            return (
              <button
                key={idx}
                role="menuitem"
                disabled={action.disabled}
                onClick={() => { action.onClick(); setOpen(false); }}
                style={{
                  width: '100%', height: 40,
                  padding: '0 16px',
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: 'transparent', border: 'none',
                  textAlign: 'left', cursor: action.disabled ? 'not-allowed' : 'pointer',
                  fontSize: 14, fontWeight: 400,
                  color: action.disabled ? '#DCDCDC' : isDanger ? '#E00000' : '#4A4A4A',
                  fontFamily: font, transition: 'background 100ms ease',
                  opacity: action.disabled ? 0.5 : 1,
                }}
                onMouseEnter={e => { if (!action.disabled) e.currentTarget.style.background = '#F1F1F1'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                {action.icon && <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{action.icon}</span>}
                {action.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ContextActions;
