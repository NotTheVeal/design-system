import React from 'react';

export type ButtonVariant =
  | 'primary'       // Solid #005BA6 fill — main CTA
  | 'secondary'     // Outlined white + #005BA6 border LG — fills on hover
  | 'secondary-sm'  // Outlined white + #005BA6 border SM — fills on hover
  | 'tertiary'      // #F1F1F1 pill — save/filter actions
  | 'ghost'         // Transparent, blue text
  | 'danger';       // Red outlined

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

// Figma-exact specs per variant
// Primary (3392:130): bg #005BA6, white text, SemiBold 600, 16px, uppercase, px-40 py-15, r-4
// Secondary/LG (3500:394): bg white, border 2px #005BA6, text #005BA6, 16px, uppercase, h-50, px-56
// Secondary/SM: bg white, border 1px #005BA6 (or #DCDCDC), text #4A4A4A, 13px, h-32
// Tertiary: bg #F1F1F1, r-100, h-40, text #2B2B2B, 14px
const VARIANTS: Record<ButtonVariant, {
  default: React.CSSProperties;
  hover: React.CSSProperties;
  disabled: React.CSSProperties;
}> = {
  primary: {
    default: {
      height: 52,
      padding: '0 40px',
      fontSize: 16,
      fontWeight: 600,
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
      background: '#005BA6',
      border: 'none',
      color: '#FFFFFF',
      borderRadius: 4,
    },
    hover:    { background: '#004A84' },
    disabled: { background: '#DCDCDC', color: '#F1F1F1' },
  },

  secondary: {
    default: {
      height: 50,
      padding: '0 40px',
      fontSize: 16,
      fontWeight: 600,
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
      background: '#FFFFFF',
      border: '2px solid #005BA6',
      color: '#005BA6',
      borderRadius: 4,
    },
    hover:    { background: '#005BA6', color: '#FFFFFF', border: '2px solid #005BA6' },
    disabled: { background: '#DCDCDC', color: '#777777', border: '2px solid #777777' },
  },

  'secondary-sm': {
    default: {
      height: 32,
      padding: '0 16px',
      fontSize: 13,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.3px',
      background: '#FFFFFF',
      border: '1px solid #005BA6',
      color: '#005BA6',
      borderRadius: 4,
    },
    hover:    { background: '#005BA6', color: '#FFFFFF' },
    disabled: { background: '#DCDCDC', color: '#777777', border: '1px solid #777777' },
  },

  tertiary: {
    default: {
      height: 40,
      padding: '0 20px',
      fontSize: 14,
      fontWeight: 400,
      background: '#F1F1F1',
      border: '2px solid transparent',
      color: '#2B2B2B',
      borderRadius: 100,
    },
    hover:    { background: '#DCDCDC' },
    disabled: { background: '#F1F1F1', color: '#949494', opacity: 0.7 },
  },

  ghost: {
    default: {
      height: 40,
      padding: '0 20px',
      fontSize: 14,
      fontWeight: 600,
      background: 'transparent',
      border: '2px solid transparent',
      color: '#005BA6',
      borderRadius: 4,
    },
    hover:    { background: 'rgba(0,91,166,0.06)' },
    disabled: { color: '#949494' },
  },

  danger: {
    default: {
      height: 40,
      padding: '0 20px',
      fontSize: 14,
      fontWeight: 600,
      background: '#FFFFFF',
      border: '2px solid #D32F2F',
      color: '#D32F2F',
      borderRadius: 4,
    },
    hover:    { background: '#D32F2F', color: '#FFFFFF' },
    disabled: { background: '#DCDCDC', color: '#949494', border: '2px solid #DCDCDC' },
  },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
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
    fontFamily: font,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: fullWidth ? '100%' : 'auto',
    transition: 'all 200ms ease',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    lineHeight: 1,
    boxSizing: 'border-box',
    ...v.default,
    ...(hovered && !isDisabled ? v.hover : {}),
    ...(isDisabled ? v.disabled : {}),
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
        <span style={{
          width: 14, height: 14,
          border: '2px solid currentColor',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'ps-spin 0.6s linear infinite',
          display: 'inline-block',
        }} />
      )}
      {!loading && icon && iconPosition === 'left' && icon}
      {children}
      {!loading && icon && iconPosition === 'right' && icon}
      <style>{`@keyframes ps-spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
};

export default Button;
