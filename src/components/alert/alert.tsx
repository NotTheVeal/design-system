import React from 'react';

interface AlertProps {
  type: 'success' | 'danger' | 'warning' | 'info';
  title: string;
  message: string;
  onDismiss?: () => void;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({ type, title, message, onDismiss, className }) => {
  const alertStyles = {
    success: {
      background: 'var(--ps-alert-success-background)',
      color: 'var(--ps-alert-success-text)',
    },
    danger: {
      background: 'var(--ps-alert-danger-background)',
      color: 'var(--ps-alert-danger-text)',
    },
    warning: {
      background: 'var(--ps-alert-warning-background)',
      color: 'var(--ps-alert-warning-text)',
    },
    info: {
      background: 'var(--ps-alert-info-background)',
      color: 'var(--ps-alert-info-text)',
    },
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        background: alertStyles[type].background,
        color: alertStyles[type].color,
        padding: 'var(--ps-alert-paddingV) var(--ps-alert-paddingH)',
        borderRadius: 'var(--ps-alert-radius)',
        borderWidth: 'var(--ps-alert-borderWidth)',
        borderStyle: 'solid',
        borderColor: 'transparent',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
      className={className}
    >
      <div>
        <strong style={{ fontSize: 'var(--ps-alert-title-fontSize)', fontWeight: 'var(--ps-alert-title-fontWeight)' }}>
          {title}
        </strong>
        <p style={{ fontSize: 'var(--ps-alert-body-fontSize)', fontWeight: 'var(--ps-alert-body-fontWeight)' }}>
          {message}
        </p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss alert"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--ps-alert-dismiss-icon)',
            fontSize: 'var(--ps-alert-dismiss-size)',
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Alert;
