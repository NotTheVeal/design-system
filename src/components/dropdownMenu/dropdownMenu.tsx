import React, { useState, useRef, useEffect } from 'react';

export interface DropdownMenuItem {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  divider?: boolean;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  onSelect?: (value: string) => void;
  selectedValue?: string;
  placement?: 'bottom-start' | 'bottom-end' | 'top-start';
  className?: string;
}

// PS Design System DropdownMenu (Figma Select dropdown panel):
// White bg, 1px #DCDCDC border, 4px radius
// Shadow: 0 3px 5px rgba(148,148,148,0.5)
// Items: 48px height, 16px padding left, 16px font, #4A4A4A text
// Hover: #F1F1F1 bg
// Selected: #F1F1F1 bg + SemiBold text

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger, items, onSelect, selectedValue, placement = 'bottom-start', className = '',
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
    <div ref={ref} className={className} style={{ position: 'relative', display: 'inline-block' }}>
      <div onClick={() => setOpen(v => !v)} style={{ cursor: 'pointer' }}>{trigger}</div>

      {open && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            [placement.startsWith('top') ? 'bottom' : 'top']: 'calc(100% + 4px)',
            [placement.endsWith('end') ? 'right' : 'left']: 0,
            zIndex: 200,
            minWidth: '100%',
            background: '#FFFFFF',
            border: '1px solid #DCDCDC',
            borderRadius: 4,
            boxShadow: '0 3px 5px rgba(148,148,148,0.5)',
            overflow: 'hidden',
            fontFamily: font,
          }}
        >
          {items.map((item, idx) => {
            if (item.divider) {
              return <div key={idx} style={{ height: 1, background: '#F1F1F1', margin: '4px 0' }} />;
            }
            const isSelected = item.value === selectedValue;
            return (
              <div
                key={item.value}
                role="menuitem"
                aria-disabled={item.disabled}
                onClick={() => {
                  if (!item.disabled) { onSelect?.(item.value); setOpen(false); }
                }}
                style={{
                  height: 48,
                  padding: '0 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 16,
                  fontWeight: isSelected ? 600 : 400,
                  color: item.disabled ? '#DCDCDC' : '#4A4A4A',
                  background: isSelected ? '#F1F1F1' : 'transparent',
                  cursor: item.disabled ? 'not-allowed' : 'pointer',
                  transition: 'background 100ms ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { if (!item.disabled) e.currentTarget.style.background = '#F1F1F1'; }}
                onMouseLeave={e => { if (!item.disabled && !isSelected) e.currentTarget.style.background = 'transparent'; }}
              >
                {item.icon && <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{item.icon}</span>}
                {item.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
