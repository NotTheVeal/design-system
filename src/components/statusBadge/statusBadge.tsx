import React, { forwardRef } from 'react';

export type StatusBadgeVariant =
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'neutral';

export type StatusBadgeShape = 'status' | 'list';

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual status variant */
  variant?: StatusBadgeVariant;
  /** Shape/style of the badge */
  shape?: StatusBadgeShape;
  /** Label text rendered inside the badge */
  label: string;
  /** Optional leading dot indicator */
  withDot?: boolean;
}

// ─── Token map ────────────────────────────────────────────────────────────────

const VARIANT_COLORS: Record<
  StatusBadgeVariant,
  { bg: string; text: string; dot: string; border: string }
> = {
  success: {
    bg: '#EAF7F2',
    text: '#17AB78',
    dot: '#17AB78',
    border: '#17AB78',
  },
  danger: {
    bg: '#FFF0F0',
    text: '#FF0000',
    dot: '#FF0000',
    border: '#FF0000',
  },
  warning: {
    bg: '#FEF7E8',
    text: '#E3A92D',
    dot: '#E3A92D',
    border: '#E3A92D',
  },
  info: {
    bg: '#E5F1FB',
    text: '#005BA6',
    dot: '#005BA6',
    border: '#005BA6',
  },
  neutral: {
    bg: '#F1F1F1',
    text: '#777777',
    dot: '#777777',
    border: '#949494',
  },
};

const SHAPE_STYLES: Record<StatusBadgeShape, React.CSSProperties> = {
  status: {
    borderRadius: '4px',
    padding: '4px 8px',
  },
  list: {
    borderRadius: '100px',
    padding: '6px 16px',
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  (
    {
      variant = 'neutral',
      shape = 'status',
      label,
      withDot = false,
      style,
      className,
      ...rest
    },
    ref
  ) => {
    const colors = VARIANT_COLORS[variant];
    const shapeStyle = SHAPE_STYLES[shape];

    const badgeStyle: React.CSSProperties = {
      // Layout
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      // Shape
      ...shapeStyle,
      // Colors
      backgroundColor: colors.bg,
      color: colors.text,
      border: `1px solid ${colors.border}`,
      // Typography
      fontFamily: "'Source Sans 3', -apple-system, sans-serif",
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: 1,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      // Misc
      verticalAlign: 'middle',
      boxSizing: 'border-box',
      ...style,
    };

    const dotStyle: React.CSSProperties = {
      display: 'inline-block',
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      backgroundColor: colors.dot,
      flexShrink: 0,
    };

    // Map variant to a human-readable accessible label
    const roleDescription: Record<StatusBadgeVariant, string> = {
      success: 'success status',
      danger: 'error status',
      warning: 'warning status',
      info: 'informational status',
      neutral: 'neutral status',
    };

    return (
      <span
        ref={ref}
        role="status"
        aria-label={`${roleDescription[variant]}: ${label}`}
        className={className}
        style={badgeStyle}
        {...rest}
      >
        {withDot && (
          <span
            aria-hidden="true"
            style={dotStyle}
          />
        )}
        {label}
      </span>
    );
  }
);

StatusBadge.displayName = 'StatusBadge';

export default StatusBadge;
