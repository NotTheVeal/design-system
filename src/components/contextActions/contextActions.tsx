import React, { useState, useRef, useEffect } from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

interface ContextAction {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

interface ContextActionsProps {
  actions: ContextAction[];
  className?: string;
}

const DotsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="4" r="1" fill="currentColor" stroke="none" />
    <circle cx="10" cy="10" r="1" fill="currentColor" stroke="none" />
    <circle cx="10" cy="16" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const ContextActions: React.FC<ContextActionsProps> = ({ actions, className = '' }) => {
  const [open, setOpen] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', display: 'inline-block', fontFamily }}
    >
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        onMouseEnter={() => setHoveredBtn(true)}
        onMouseLeave={() => setHoveredBtn(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          background: hoveredBtn ? '#DCDCDC' : 'transparent',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          color: '#777777',
          padding: 0,
          transition: 'background 150ms ease',
        }}
      >
        <DotsIcon />
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            right: 0,
            zIndex: 100,
            background: '#FFFFFF',
            border: '1px solid #DCDCDC',
            borderRadius: 4,
            boxShadow: '0 2px 10px rgba(0,47,72,0.10)',
            minWidth: 192,
            paddingTop: 4,
            paddingBottom: 4,
          }}
        >
          {actions.map((action, i) => (
            <button
              key={i}
              type="button"
              disabled={action.disabled}
              onClick={() => {
                if (!action.disabled) {
                  action.onClick?.();
                  setOpen(false);
                }
              }}
              onMouseEnter={() => setHoveredItem(i)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                width: '100%',
                padding: '8px 16px',
                background: hoveredItem === i && !action.disabled ? '#FAFAFA' : 'none',
                border: 'none',
                cursor: action.disabled ? 'not-allowed' : 'pointer',
                fontSize: 14,
                color: '#4A4A4A',
                textAlign: 'left',
                opacity: action.disabled ? 0.5 : 1,
                fontFamily,
                transition: 'background 150ms ease',
              }}
            >
              {action.icon && (
                <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, color: '#777777' }}>
                  {action.icon}
                </span>
              )}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContextActions;
