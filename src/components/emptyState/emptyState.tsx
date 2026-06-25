import React from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

// ─── Primary CTA Button ───────────────────────────────────────────────────────

interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const EmptyStateCTAButton: React.FC<CTAButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
}) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
      padding: '0 20px',
      background: variant === 'primary' ? '#005BA6' : '#FFFFFF',
      color: variant === 'primary' ? '#FFFFFF' : '#005BA6',
      border: variant === 'primary' ? '1px solid #005BA6' : '1px solid #005BA6',
      borderRadius: 4,
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily,
      transition: 'background 150ms ease, border-color 150ms ease',
    }}
  >
    {children}
  </button>
);

// ─── EmptyState Component ─────────────────────────────────────────────────────

interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  /** CTA content — use EmptyStateCTAButton for the PS Blue filled primary button */
  action?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = '',
}) => (
  <div
    className={className}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: '48px 24px',
      fontFamily,
    }}
  >
    {icon && (
      <div
        style={{
          width: 60,
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#DCDCDC',
          marginBottom: 16,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
    )}
    {title && (
      <div
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: '#2B2B2B',
          marginBottom: 8,
          fontFamily,
        }}
      >
        {title}
      </div>
    )}
    {description && (
      <div
        style={{
          fontSize: 14,
          color: '#777777',
          maxWidth: 400,
          marginBottom: 24,
          lineHeight: 1.5,
          fontFamily,
        }}
      >
        {description}
      </div>
    )}
    {action}
  </div>
);

export default EmptyState;
