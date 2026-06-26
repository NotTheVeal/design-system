import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'secondary-sm' | 'tertiary' | 'ghost' | 'danger';
export type ColorScheme = 'current' | 'future';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  colorScheme?: ColorScheme;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const VARIANTS: Record<ButtonVariant, {
  default: React.CSSProperties;
  hover: React.CSSProperties;
  height: number;
  radius: number;
}> = {
  primary: {
    height: 50, radius: 4,
    default: { padding: '0 24px', fontSize: 14, background: '#FFFFFF', border: '2px solid #005BA6', color: '#005BA6' },
    hover:   { background: '#005BA6', color: '#FFFFFF', border: '2px solid #005BA6' },
  },
  secondary: {
    height: 50, radius: 4,
    default: { padding: '0 24px', fontSize: 14, background: '#FFFFFF', border: '1px solid #DCDCDC', color: '#4A4A4A' },
    hover:   { background: '#005BA6', color: '#FFFFFF', border: '1px solid #005BA6' },
  },
  'secondary-sm': {
    height: 32, radius: 4,
    default: { padding: '0 14px', fontSize: 13, background: '#FFFFFF', border: '1px solid #DCDCDC', color: '#4A4A4A' },
    hover:   { background: '#F1F1F1', border: '1px solid #DCDCDC' },
  },
  tertiary: {
    height: 40, radius: 100,
    default: { padding: '0 20px', fontSize: 14, background: '#F1F1F1', border: '2px solid transparent', color: '#2B2B2B' },
    hover:   { background: '#DCDCDC' },
  },
  ghost: {
    height: 40, radius: 4,
    default: { padding: '0 20px', fontSize: 14, background: 'transparent', border: '2px solid transparent', color: '#005BA6' },
    hover:   { background: 'rgba(0,91,166,0.06)' },
  },
  danger: {
    height: 40, radius: 4,
    default: { padding: '0 20px', fontSize: 14, background: '#FFFFFF', border: '2px solid #D32F2F', color: '#D32F2F' },
    hover:   { background: '#D32F2F', color: '#FFFFFF' },
  },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  colorScheme = 'future',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  children,
  disabled,
  style,
  onMouseEnter,
  onMouseLeave,
  ...rest
}) => {
  const [hovered, setHovered] = React.useState(false);
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const isDisabled = disabled || loading;
  const v = VARIANTS[variant];

  const computedStyle: React.CSSProperties = {
    height: v.height,
    borderRadius: v.radius,
    fontWeight: 600,
    fontFamily: font,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: fullWidth ? '100%' : 'auto',
    transition: 'all 200ms ease',
    opacity: isDisabled ? 0.5 : 1,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    lineHeight: 1,
    boxSizing: 'border-box',
    ...v.default,
    ...(hovered && !isDisabled ? v.hover : {}),
    ...style,
  };

  return (
    <button
      {...rest}
      disabled={isDisabled}
      style={computedStyle}
      onMouseEnter={(e) => { setHovered(true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHovered(false); onMouseLeave?.(e); }}
    >
      {loading && (
        <span style={{ width: 14, height: 14, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite', display: 'inline-block' }} />
      )}
      {!loading && icon && iconPosition === 'left' && icon}
      {children}
      {!loading && icon && iconPosition === 'right' && icon}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
};

export default Button;
