import React from 'react';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface AlertProps {
  type?: AlertType;
  title?: string;
  message: string;
  onClose?: () => void;
  action?: { label: string; onClick: () => void };
  className?: string;
}

// Figma exact palette (node 456:199):
// Success: bg #E2F5EE, text #0E7C55
// Error/Fail: bg #FEF0F0, text #E00000  ← Figma says E00000 not D32F2F
// Info: bg #EFF9FE, text #005BA6
// Warning: bg #FFF4E5, text #B45309

const STYLES: Record<AlertType, { bg: string; color: string }> = {
  success: { bg: '#E2F5EE', color: '#0E7C55' },
  error:   { bg: '#FEF0F0', color: '#E00000' },   // Figma: #E00000
  warning: { bg: '#FFF4E5', color: '#B45309' },
  info:    { bg: '#EFF9FE', color: '#005BA6' },
};

// Lucide-style SVG icons (24×24)
const SuccessIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const ErrorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);
const WarningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const InfoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const ICONS: Record<AlertType, React.ReactNode> = {
  success: <SuccessIcon />,
  error:   <ErrorIcon />,
  warning: <WarningIcon />,
  info:    <InfoIcon />,
};

export const Alert: React.FC<AlertProps> = ({
  type = 'info', title, message, onClose, action, className = '',
}) => {
  const s = STYLES[type];
  const font = "'Source Sans Pro', -apple-system, sans-serif";

  return (
    <div
      role="alert"
      className={className}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 18,             // Figma: 18px gap between icon and text
        padding: '12px 18px',
        background: s.bg,
        color: s.color,
        fontFamily: font,
        minHeight: 48,       // Figma: 48px height
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Lucide icon, 24×24 */}
      <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center', marginTop: 1 }}>
        {ICONS[type]}
      </span>

      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <div style={{ fontSize: 14, fontWeight: 600, lineHeight: '20px', marginBottom: 2 }}>
            {title}
          </div>
        )}
        <div style={{ fontSize: 14, fontWeight: 400, lineHeight: '20px' }}>
          {message}
        </div>
        {action && (
          <button
            onClick={action.onClick}
            style={{
              marginTop: 8,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'inherit',
              fontSize: 13,
              fontWeight: 600,
              padding: 0,
              fontFamily: font,
              textDecoration: 'underline',
            }}
          >
            {action.label}
          </button>
        )}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'inherit',
            padding: 0,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            opacity: 0.6,
            transition: 'opacity 150ms',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
          aria-label="Dismiss"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export default Alert;
