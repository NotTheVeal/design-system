import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'secondary-sm' | 'tertiary' | 'ghost' | 'danger';
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

function getStyles(variant: ButtonVariant): React.CSSProperties {
  switch (variant) {
    case 'primary':
      return { height: 50, padding: '0 24px', fontSize: 14, background: '#005BA6', border: '2px solid #005BA6', color: '#FFFFFF' };
    case 'secondary':
      return { height: 50, padding: '0 24px', fontSize: 14, background: '#FFFFFF', border: '2px solid #005BA6', color: '#005BA6' };
    case 'secondary-sm':
      return { height: 32, padding: '0 14px', fontSize: 13, background: '#FFFFFF', border: '1px solid #DCDCDC', color: '#4A4A4A' };
    case 'tertiary':
      return { height: 40, padding: '0 20px', fontSize: 14, background: '#F1F1F1', border: '2px solid transparent', color: '#2B2B2B', borderRadius: 100 };
    case 'ghost':
      return { height: 40, padding: '0 20px', fontSize: 14, background: 'transparent', border: '2px solid transparent', color: '#005BA6' };
    case 'danger':
      return { height: 40, padding: '0 20px', fontSize: 14, background: '#FFFFFF', border: '2px solid #D32F2F', color: '#D32F2F' };
    default:
      return { height: 50, padding: '0 24px', fontSize: 14, background: '#005BA6', border: '2px solid #005BA6', color: '#FFFFFF' };
  }
}

const hoverStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: { background: '#004A84', border: '2px solid #004A84' },
  secondary: { background: '#005BA6', color: '#FFFFFF' },
  'secondary-sm': { background: '#F1F1F1' },
  tertiary: { background: '#DCDCDC' },
  ghost: { background: 'rgba(0,91,166,0.06)' },
  danger: { background: '#D32F2F', color: '#FFFFFF' },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size,
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
  const isDisabled = disabled || loading;
  const vs = getStyles(variant);

  const baseStyle: React.CSSProperties = {
    fontWeight: 600,
    fontFamily: font,
    borderRadius: variant === 'tertiary' ? 100 : 4,
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
    ...vs,
    ...style,
  };

  const [hovered, setHovered] = React.useState(false);
  const computedStyle = {
    ...baseStyle,
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
      {loading && <span style={{ width: 14, height: 14, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite', display: 'inline-block' }} />}
      {!loading && icon && iconPosition === 'left' && icon}
      {children}
      {!loading && icon && iconPosition === 'right' && icon}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
};

export default Button;
