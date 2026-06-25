import React from 'react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  ctaLabel?: string;
  onCta?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  variant?: 'default' | 'search' | 'error' | 'no-data';
  className?: string;
}

const DefaultIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="32" fill="#DCEAED" />
    <path d="M32 20C25.373 20 20 25.373 20 32s5.373 12 12 12 12-5.373 12-12S38.627 20 32 20zm0 2c5.523 0 10 4.477 10 10S37.523 42 32 42 22 37.523 22 32s4.477-10 10-10zm-1 5v6h-4l5 5 5-5h-4v-6h-2z" fill="#005BA6"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect width="64" height="64" rx="32" fill="#DCEAED" />
    <circle cx="29" cy="29" r="10" stroke="#005BA6" strokeWidth="2" fill="none"/>
    <line x1="36.5" y1="36.5" x2="44" y2="44" stroke="#005BA6" strokeWidth="2" strokeLinecap="round"/>
    <line x1="26" y1="29" x2="32" y2="29" stroke="#005BA6" strokeWidth="2" strokeLinecap="round"/>
    <line x1="29" y1="26" x2="29" y2="32" stroke="#005BA6" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ErrorIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect width="64" height="64" rx="32" fill="#FACBCB" />
    <path d="M32 20l14 24H18L32 20z" stroke="#D32F2F" strokeWidth="2" fill="none" strokeLinejoin="round"/>
    <line x1="32" y1="29" x2="32" y2="36" stroke="#D32F2F" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="32" cy="40" r="1" fill="#D32F2F"/>
  </svg>
);

const iconMap = { default: <DefaultIcon />, search: <SearchIcon />, error: <ErrorIcon />, 'no-data': <DefaultIcon /> };

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  ctaLabel,
  onCta,
  secondaryLabel,
  onSecondary,
  variant = 'default',
  className = '',
}) => {
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const displayIcon = icon || iconMap[variant];

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 32px',
        textAlign: 'center',
        fontFamily: font,
        maxWidth: 480,
        margin: '0 auto',
      }}
    >
      {/* Icon */}
      <div style={{ marginBottom: 24 }}>{displayIcon}</div>

      {/* Title */}
      <h3 style={{
        margin: '0 0 12px',
        fontSize: 20,
        fontWeight: 300,
        color: '#002F48',
        lineHeight: '28px',
        fontFamily: font,
      }}>
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p style={{
          margin: '0 0 32px',
          fontSize: 14,
          fontWeight: 400,
          color: '#777777',
          lineHeight: '22px',
          maxWidth: 360,
        }}>
          {description}
        </p>
      )}
      {!description && (ctaLabel || secondaryLabel) && <div style={{ height: 8 }} />}

      {/* Actions */}
      {(ctaLabel || secondaryLabel) && (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          {ctaLabel && (
            <button
              onClick={onCta}
              style={{
                height: 50,
                padding: '0 24px',
                fontSize: 14,
                fontWeight: 600,
                background: '#005BA6',
                color: '#FFFFFF',
                border: '2px solid #005BA6',
                borderRadius: 4,
                cursor: 'pointer',
                fontFamily: font,
                transition: 'all 200ms ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { const b = e.currentTarget; b.style.background = '#004A84'; b.style.borderColor = '#004A84'; }}
              onMouseLeave={e => { const b = e.currentTarget; b.style.background = '#005BA6'; b.style.borderColor = '#005BA6'; }}
            >
              {ctaLabel}
            </button>
          )}
          {secondaryLabel && (
            <button
              onClick={onSecondary}
              style={{
                height: 50,
                padding: '0 24px',
                fontSize: 14,
                fontWeight: 600,
                background: '#FFFFFF',
                color: '#005BA6',
                border: '2px solid #005BA6',
                borderRadius: 4,
                cursor: 'pointer',
                fontFamily: font,
                transition: 'all 200ms ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { const b = e.currentTarget; b.style.background = '#005BA6'; b.style.color = '#FFFFFF'; }}
              onMouseLeave={e => { const b = e.currentTarget; b.style.background = '#FFFFFF'; b.style.color = '#005BA6'; }}
            >
              {secondaryLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
