import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

interface AlertProps {
  type: 'success' | 'danger' | 'warning' | 'info';
  title: string;
  message?: string;
  onDismiss?: () => void;
  className?: string;
  actions?: React.ReactNode;
}

const ALERT_CONFIG = {
  success: {
    bg: '#E2F5EE',
    color: '#0E7C55',
    Icon: CheckCircle2,
  },
  danger: {
    bg: '#FEF0F0',
    color: '#E00000',
    Icon: XCircle,
  },
  warning: {
    bg: '#FFF4E5',
    color: '#B45309',
    Icon: AlertTriangle,
  },
  info: {
    bg: '#EFF9FE',
    color: '#005BA6',
    Icon: Info,
  },
} as const;

const Alert: React.FC<AlertProps> = ({ type, title, message, onDismiss, className = '', actions }) => {
  const { bg, color, Icon } = ALERT_CONFIG[type];

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={className}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '12px 16px',
        borderRadius: 4,
        width: '100%',
        backgroundColor: bg,
        color,
        boxSizing: 'border-box',
        fontFamily,
      }}
    >
      <Icon size={18} strokeWidth={1.75} style={{ flexShrink: 0, marginTop: 1 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <span
          style={{
            fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: 1.35,
            display: 'block',
          }}
        >
          {title}
        </span>
        {message && (
          <p
            style={{
              fontFamily,
              fontSize: 14,
              fontWeight: 400,
              marginTop: 2,
              marginBottom: 0,
              lineHeight: 1.35,
            }}
          >
            {message}
          </p>
        )}
        {actions && <div style={{ marginTop: 8 }}>{actions}</div>}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss alert"
          style={{
            flexShrink: 0,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            color,
            display: 'flex',
            alignItems: 'center',
            transition: 'opacity 150ms ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          <X size={18} strokeWidth={1.75} />
        </button>
      )}
    </div>
  );
};

export default Alert;
