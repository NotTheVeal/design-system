import React, { useState } from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

type CtaBarVariant = 'default' | 'info' | 'success' | 'warning';

interface CtaBarProps {
  variant?: CtaBarVariant;
  title: string;
  description?: string;
  onClose?: () => void;
  className?: string;
}

const VARIANT_STYLES: Record<CtaBarVariant, { bg: string; border: string; color: string }> = {
  default:  { bg: '#002F48', border: '#004A84', color: '#FFFFFF' },
  info:     { bg: '#EFF9FE', border: '#009CF4', color: '#005BA6' },
  success:  { bg: '#E2F5EE', border: '#0E7C55', color: '#0E7C55' },
  warning:  { bg: '#FFF4E5', border: '#E3A92D', color: '#B45309' },
};

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
    <line x1="4" y1="4" x2="14" y2="14" />
    <line x1="14" y1="4" x2="4" y2="14" />
  </svg>
);

const CtaBar: React.FC<CtaBarProps> = ({
  variant = 'default',
  title,
  description,
  onClose,
  className = '',
}) => {
  const [closeHovered, setCloseHovered] = useState(false);
  const s = VARIANT_STYLES[variant];

  return (
    <div
      className={className}
      style={{
        width: '100%',
        padding: '12px 24px',
        borderBottom: `1px solid ${s.border}`,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        background: s.bg,
        fontFamily,
        boxSizing: 'border-box',
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: s.color,
            fontFamily,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </div>
        {description && (
          <div
            style={{
              fontSize: 13,
              color: s.color,
              opacity: 0.8,
              fontFamily,
              marginTop: 2,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {description}
          </div>
        )}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          onMouseEnter={() => setCloseHovered(true)}
          onMouseLeave={() => setCloseHovered(false)}
          style={{
            flexShrink: 0,
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            color: s.color,
            opacity: closeHovered ? 1 : 0.6,
            display: 'flex',
            alignItems: 'center',
            transition: 'opacity 150ms ease',
          }}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export default CtaBar;
