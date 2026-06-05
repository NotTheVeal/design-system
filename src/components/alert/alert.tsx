import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

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
      className={`flex items-start gap-3 px-4 py-3 rounded-[4px] w-full ${className}`}
      style={{ backgroundColor: bg, color }}
    >
      <Icon size={18} strokeWidth={1.75} className="flex-shrink-0 mt-[1px]" />
      <div className="flex-1 min-w-0">
        <span
          className="text-[14px] font-semibold leading-snug"
          style={{ fontFamily: "'Source Sans Pro', 'Source Sans 3', sans-serif" }}
        >
          {title}
        </span>
        {message && (
          <p
            className="text-[14px] font-normal mt-0.5 leading-snug"
            style={{ fontFamily: "'Source Sans Pro', 'Source Sans 3', sans-serif" }}
          >
            {message}
          </p>
        )}
        {actions && <div className="flex items-center gap-2 mt-2">{actions}</div>}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss alert"
          className="flex-shrink-0 hover:opacity-70 transition-opacity"
          style={{ color }}
        >
          <X size={18} strokeWidth={1.75} />
        </button>
      )}
    </div>
  );
};

export default Alert;
