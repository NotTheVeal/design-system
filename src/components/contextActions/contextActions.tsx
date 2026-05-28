import React, { useState, useRef, useEffect } from 'react';

interface ContextAction {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  destructive?: boolean;
}

interface ContextActionsProps {
  actions: ContextAction[];
  trigger?: React.ReactNode;
  className?: string;
}

const ContextActions: React.FC<ContextActionsProps> = ({ actions, trigger, className = '' }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="p-1.5 rounded hover:bg-gray-100 transition-colors"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {trigger || (
          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
          {actions.map((action, i) => (
            <button
              key={i}
              onClick={() => { action.onClick(); setOpen(false); }}
              disabled={action.disabled}
              className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-left transition-colors
                ${action.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}
                ${action.destructive ? 'text-red-600' : 'text-gray-700'}`}
            >
              {action.icon && <span className="w-4 h-4">{action.icon}</span>}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContextActions;
