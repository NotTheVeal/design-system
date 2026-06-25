import React from 'react';

// Three badge types per PS Design System 2.0:
// 1. status  — solid fill pill (semantic color)
// 2. outlined — border only, light bg
// 3. dot      — 8px colored circle + label text

export type StatusBadgeVariant = 'status' | 'outlined' | 'dot';
export type StatusBadgeColor = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'primary';

export interface StatusBadgeProps {
  label: string;
  color?: StatusBadgeColor;
  variant?: StatusBadgeVariant;
  size?: 'sm' | 'md';
  className?: string;
}

const colorMap: Record<StatusBadgeColor, { bg: string; text: string; border: string; dot: string }> = {
  success: { bg: '#E2F5EE', text: '#0E7C55', border: '#0E7C55', dot: '#17AB78' },
  warning: { bg: '#FFF4D0', text: '#B45309', border: '#B45309', dot: '#E3A92D' },
  danger:  { bg: '#FACBCB', text: '#D32F2F', border: '#D32F2F', dot: '#FF0000' },
  info:    { bg: '#EFF9FE', text: '#005BA6', border: '#009CF4', dot: '#009CF4' },
  neutral: { bg: '#F1F1F1', text: '#777777', border: '#949494', dot: '#949494' },
  primary: { bg: '#DCEAED', text: '#002F48', border: '#005BA6', dot: '#005BA6' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  color = 'neutral',
  variant = 'status',
  size = 'md',
  className = '',
}) => {
  const c = colorMap[color];
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const fontSize = size === 'sm' ? 11 : 12;
  const padding = size === 'sm' ? '1px 7px' : '2px 10px';

  if (variant === 'dot') {
    return (
      <span
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontFamily: font,
          fontSize,
          fontWeight: 600,
          color: '#4A4A4A',
          lineHeight: '20px',
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: c.dot,
            flexShrink: 0,
            display: 'inline-block',
          }}
        />
        {label}
      </span>
    );
  }

  if (variant === 'outlined') {
    return (
      <span
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding,
          borderRadius: '4px',
          border: `1px solid ${c.border}`,
          background: c.bg,
          fontFamily: font,
          fontSize,
          fontWeight: 700,
          color: c.text,
          lineHeight: '16px',
          letterSpacing: '0.2px',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    );
  }

  // default: solid status badge (pill)
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding,
        borderRadius: '100px',
        background: c.bg,
        border: `1px solid ${c.border}`,
        fontFamily: font,
        fontSize,
        fontWeight: 700,
        color: c.text,
        lineHeight: '16px',
        letterSpacing: '0.5px',
        textTransform: 'uppercase' as const,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
};

export default StatusBadge;
