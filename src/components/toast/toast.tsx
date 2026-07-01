import React, { useEffect } from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  title?: string;
  onDismiss?: () => void;
  duration?: number;
  className?: string;
}

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const AlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const VARIANTS: Record<ToastVariant, {
  bg: string; borderColor: string; iconColor: string; titleColor: string; textColor: string; icon: React.ReactNode;
}> = {
  success: {
    bg: '#E2F5EE', borderColor: '#0E7C55', iconColor: '#0E7C55',
    titleColor: '#0E7C55', textColor: '#0E7C55', icon: <CheckIcon />,
  },
  error: {
    bg: '#FEF0F0', borderColor: '#E00000', iconColor: '#E00000',
    titleColor: '#E00000', textColor: '#E00000', icon: <XCircleIcon />,
  },
  warning: {
    bg: '#FFF4E5', borderColor: '#B45309', iconColor: '#B45309',
    titleColor: '#B45309', textColor: '#B45309', icon: <AlertIcon />,
  },
  info: {
    bg: '#EFF9FE', borderColor: '#005BA6', iconColor: '#005BA6',
    titleColor: '#005BA6', textColor: '#005BA6', icon: <InfoIcon />,
  },
};

const Toast: React.FC<ToastProps> = ({
  message,
  variant = 'info',
  title,
  onDismiss,
  duration = 5000,
  className = '',
}) => {
  useEffect(() => {
    if (duration > 0 && onDismiss) {
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);

  const v = VARIANTS[variant];

  return (
    <div
      role="alert"
      aria-live="polite"
      className={className}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        minWidth: 320,
        maxWidth: 380,
        padding: '14px 16px',
        borderRadius: 8,
        borderLeft: `4px solid ${v.borderColor}`,
        background: v.bg,
        boxShadow: '0 6px 20px rgba(0,47,72,0.18)',
        fontFamily,
      }}
    >
      {/* Icon */}
      <span style={{ flexShrink: 0, color: v.iconColor, marginTop: 1, display: 'flex' }}>
        {v.icon}
      </span>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <p style={{ margin: '0 0 2px', fontSize: 14, fontWeight: 600, color: v.titleColor, fontFamily }}>
            {title}
          </p>
        )}
        <p style={{ margin: 0, fontSize: 14, fontWeight: 400, color: v.textColor, fontFamily }}>
          {message}
        </p>
      </div>

      {/* Dismiss */}
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss notification"
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24,
            height: 24,
            border: 'none',
            background: 'transparent',
            color: v.iconColor,
            cursor: 'pointer',
            opacity: 0.6,
            borderRadius: 4,
            padding: 0,
            transition: 'opacity 150ms ease',
            fontFamily,
          }}
          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.opacity = '1'}
          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.opacity = '0.6'}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export default Toast;
