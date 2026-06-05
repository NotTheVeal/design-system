import React from 'react';

type BadgeVariant = 'success' | 'error' | 'warning' | 'info' | 'neutral' | 'primary';
type BadgeType = 'status' | 'list' | 'assignment';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  type?: BadgeType;
  filled?: boolean;
  style?: React.CSSProperties;
}

const FONT_FAMILY = "'Source Sans Pro', 'Source Sans 3', sans-serif";

const STATUS_COLORS: Record<BadgeVariant, { bg: string; color: string; border: string }> = {
  success: { bg: '#E2F5EE', color: '#0E7C55', border: '#0E7C55' },
  error:   { bg: '#FEF0F0', color: '#E00000', border: '#E00000' },
  warning: { bg: '#FFF4E5', color: '#B45309', border: '#B45309' },
  info:    { bg: '#EFF9FE', color: '#005BA6', border: '#005BA6' },
  neutral: { bg: '#F1F1F1', color: '#4A4A4A', border: '#DCDCDC' },
  primary: { bg: '#E8F0FB', color: '#005BA6', border: '#005BA6' },
};

const LIST_COLORS: Record<BadgeVariant, { color: string; border: string }> = {
  success: { color: '#0E7C55', border: '#0E7C55' },
  error:   { color: '#E00000', border: '#E00000' },
  warning: { color: '#B45309', border: '#B45309' },
  info:    { color: '#005BA6', border: '#005BA6' },
  neutral: { color: '#4A4A4A', border: '#DCDCDC' },
  primary: { color: '#005BA6', border: '#005BA6' },
};

const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'neutral',
  type = 'status',
  filled = false,
  style,
}) => {
  if (type === 'assignment') {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4px 12px',
          borderRadius: '4px',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: '#FF9505',
          backgroundColor: filled ? '#FF9505' : '#FFFFFF',
          color: filled ? '#FFFFFF' : '#FF9505',
          fontSize: '12px',
          fontWeight: 700,
          fontFamily: FONT_FAMILY,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          ...style,
        }}
      >
        {label}
      </span>
    );
  }

  if (type === 'list') {
    const c = LIST_COLORS[variant];
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2px 8px',
          borderRadius: '100px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: c.border,
          backgroundColor: '#FFFFFF',
          color: c.color,
          fontSize: '12px',
          fontWeight: 700,
          fontFamily: FONT_FAMILY,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          ...style,
        }}
      >
        {label}
      </span>
    );
  }

  const c = STATUS_COLORS[variant];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2px 6px',
        borderRadius: '4px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: c.border,
        backgroundColor: c.bg,
        color: c.color,
        fontSize: '12px',
        fontWeight: 700,
        fontFamily: FONT_FAMILY,
        ...style,
      }}
    >
      {label}
    </span>
  );
};

export default Badge;
