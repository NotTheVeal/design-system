import React from 'react';

interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onDismiss?: () => void;
  className?: string;
}

const Toast: React.FC<ToastProps> = ({ type, message, onDismiss, className }) => {
  const backgroundColor = {
    success: 'var(--ps-toast-color-success-background)',
    error: 'var(--ps-toast-color-error-background)',
    warning: 'var(--ps-toast-color-warning-background)',
    info: 'var(--ps-toast-color-info-background)',
  }[type];

  const textColor = {
    success: 'var(--ps-toast-color-success-text)',
    error: 'var(--ps-toast-color-error-text)',
    warning: 'var(--ps-toast-color-warning-text)',
    info: 'var(--ps-toast-color-info-text)',
  }[type];

  return (
    <div
      role="alert"
      style={{
        minHeight: 'var(--ps-toast-sizing-minHeight)',
        minWidth: 'var(--ps-toast-sizing-minWidth)',
        maxWidth: 'var(--ps-toast-sizing-maxWidth)',
        backgroundColor: backgroundColor,
        color: textColor,
        padding: 'var(--ps-toast-spacing-padding)',
        borderRadius: 'var(--ps-toast-border-radius)',
        boxShadow: 'var(--ps-toast-shadow)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--ps-toast-spacing-gap)',
        position: 'fixed',
        bottom: 'var(--ps-toast-position-bottom)',
        right: 'var(--ps-toast-position-right)',
        animation: `fade-in var(--ps-toast-animation-enter)`,
      }}
      className={className}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && onDismiss) {
          onDismiss();
        }
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="toast-icon" style={{ fontSize: 'var(--ps-toast-spacing-iconSize)' }}>
        {/* Add icon based on type here if needed */}
      </span>
      <span>{message}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          style={{
            background: 'white',
            border: '1px solid var(--ps-toast-color-dismiss)',
            color: 'var(--ps-toast-color-dismiss)',
            borderRadius: 'var(--ps-toast-border-radius)',
            cursor: 'pointer',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--ps-toast-color-dismiss)')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'white')}
        >
          ✖
        </button>
      )}
    </div>
  );
};

export default Toast;

:root {
  --ps-font-family: 'Source Sans Pro', sans-serif;
  --ps-color-primary: #005BA6;
  --ps-color-midnight: #002F48;
  --ps-toast-color-success-background: #E2F5EE;
  --ps-toast-color-success-text: #0E7C55;
  --ps-toast-color-error-background: #FEF0F0;
  --ps-toast-color-error-text: #E00000;
  --ps-toast-color-warning-background: #FFF4E5;
  --ps-toast-color-warning-text: #B45309;
  --ps-toast-color-info-background: #EFF9FE;
  --ps-toast-color-info-text: #005BA6;
  --ps-toast-color-dismiss: var(--semantic-color-text-secondary);
  --ps-toast-sizing-minHeight: 56px;
  --ps-toast-sizing-minWidth: 300px;
  --ps-toast-sizing-maxWidth: 420px;
  --ps-toast-spacing-padding: 16px;
  --ps-toast-spacing-gap: 12px;
  --ps-toast-spacing-iconSize: 24px;
  --ps-toast-border-radius: 8px;
  --ps-toast-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);
  --ps-toast-position-bottom: 24px;
  --ps-toast-position-right: 24px;
  --ps-toast-animation-enter: 250ms ease-out;
  --ps-toast-typography-fontSize: 14px;
  --ps-toast-typography-fontWeight: 600;
}
