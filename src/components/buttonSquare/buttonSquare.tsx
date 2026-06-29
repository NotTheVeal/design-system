import React from 'react';

export type ButtonSquareSize = 'sm' | 'lg';
export type ButtonSquareVariant = 'normal' | 'hover' | 'pressed' | 'disabled';

export interface ButtonSquareProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSquareSize;
  icon?: React.ReactNode;
  label?: string;
  variant?: ButtonSquareVariant;
  loading?: boolean;
}

// Figma (node 400:98 Button/SquareLG, 400:107 Button/SquareSM):
// LG: 48px height, 4px radius
// SM: 32px height, 4px radius
// White bg, 1px #005BA6 border, #005BA6 text
// Hover: fills #005BA6, white text
// Disabled: #DCDCDC border, grey text

export const ButtonSquare: React.FC<ButtonSquareProps> = ({
  size = 'lg', icon, label, variant, loading = false, disabled, style, onMouseEnter, onMouseLeave, ...rest
}) => {
  const [hovered, setHovered] = React.useState(false);
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const h = size === 'sm' ? 32 : 48;
  const fontSize = size === 'sm' ? 12 : 14;
  const isDisabled = disabled || loading;
  const isHovered = hovered && !isDisabled;

  return (
    <button
      {...rest}
      disabled={isDisabled}
      onMouseEnter={e => { setHovered(true); onMouseEnter?.(e); }}
      onMouseLeave={e => { setHovered(false); onMouseLeave?.(e); }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        height: h,
        padding: `0 ${size === 'sm' ? 12 : 16}px`,
        minWidth: h,
        borderRadius: 4,
        fontFamily: font,
        fontSize,
        fontWeight: 600,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        border: `1px solid ${isDisabled ? '#DCDCDC' : '#005BA6'}`,
        background: isDisabled ? '#FFFFFF' : isHovered ? '#005BA6' : '#FFFFFF',
        color: isDisabled ? '#DCDCDC' : isHovered ? '#FFFFFF' : '#005BA6',
        transition: 'all 200ms ease',
        opacity: 1,
        ...style,
      }}
    >
      {loading && (
        <span style={{ width: 14, height: 14, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'ps-spin 0.6s linear infinite', display: 'inline-block' }} />
      )}
      {!loading && icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {!loading && label && <span>{label}</span>}
      <style>{`@keyframes ps-spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
};

export default ButtonSquare;
