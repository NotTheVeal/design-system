import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ColorScheme = 'current' | 'future';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  colorScheme?: ColorScheme;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const heights: Record<ButtonSize, number> = { sm: 32, md: 40, lg: 50 };
const fontSizes: Record<ButtonSize, number> = { sm: 13, md: 14, lg: 14 };
const paddings: Record<ButtonSize, string> = { sm: '0 14px', md: '0 20px', lg: '0 24px' };

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'lg',
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
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const h = heights[size];
  const fs = fontSizes[size];
  const pad = paddings[size];
  const isDisabled = disabled || loading;

  // Primary colors
  const primaryFill = colorScheme === 'future' ? '#005BA6' : '#FF9505';
  const primaryHover = colorScheme === 'future' ? '#004A84' : '#EC8000';

  const baseStyle: React.CSSProperties = {
    height: h,
    padding: pad,
    fontSize: fs,
    fontWeight: 600,
    fontFamily: font,
    borderRadius: 4,
    border: '2px solid transparent',
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
    ...style,
  };

  const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      background: primaryFill,
      borderColor: primaryFill,
      color: '#FFFFFF',
    },
    secondary: {
      background: '#FFFFFF',
      borderColor: '#DCDCDC',
      color: '#4A4A4A',
    },
    tertiary: {
      background: '#F1F1F1',
      borderColor: 'transparent',
      color: '#2B2B2B',
      borderRadius: 100,
    },
    ghost: {
      background: 'transparent',
      borderColor: 'transparent',
      color: '#005BA6',
    },
    danger: {
      background: '#FFFFFF',
      borderColor: '#D32F2F',
      color: '#D32F2F',
    },
  };

  const hoverStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: { background: primaryHover, borderColor: primaryHover },
    secondary: { background: '#005BA6', borderColor: '#005BA6', color: '#FFFFFF' },
    tertiary: { background: '#DCDCDC' },
    ghost: { background: 'rgba(0,91,166,0.06)' },
    danger: { background: '#D32F2F', color: '#FFFFFF' },
  };

  const [hovered, setHovered] = React.useState(false);
  const computedStyle = {
    ...baseStyle,
    ...variantStyles[variant],
    ...(hovered && !isDisabled ? hoverStyles[variant] : {}),
  };

  return (
    <button
      {...rest}
      disabled={isDisabled}
      style={computedStyle}
      onMouseEnter={(e) => { setHovered(true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHovered(false); onMouseLeave?.(e); }}
    >
      {loading && <span style={{ width: fs, height: fs, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite', display: 'inline-block' }} />}
      {!loading && icon && iconPosition === 'left' && icon}
      {children}
      {!loading && icon && iconPosition === 'right' && icon}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
};

export default Button;
