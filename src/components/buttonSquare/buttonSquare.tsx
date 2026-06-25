import React from 'react';

const FONT = "'Source Sans 3', -apple-system, sans-serif";

export interface ButtonSquareProps {
  icon: React.ReactNode;
  size?: 'sm' | 'lg';
  variant?: 'default' | 'filled' | 'ghost' | 'danger';
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel: string;
}

const variantStyles: Record<string, React.CSSProperties> = {
  default: { border: '2px solid #005BA6', background: 'transparent', color: '#005BA6' },
  filled: { border: '2px solid #005BA6', background: '#005BA6', color: '#FFFFFF' },
  ghost: { border: 'none', background: 'transparent', color: '#4A4A4A' },
  danger: { border: '2px solid #E00000', background: 'transparent', color: '#E00000' },
};

const hoverMap: Record<string, React.CSSProperties> = {
  default: { background: '#EFF9FE', borderColor: '#005BA6' },
  filled: { background: '#002F48', borderColor: '#002F48' },
  ghost: { background: '#F1F1F1' },
  danger: { background: '#FFF0F0', borderColor: '#E00000' },
};

export const ButtonSquare: React.FC<ButtonSquareProps> = ({
  icon,
  size = 'lg',
  variant = 'default',
  disabled = false,
  onClick,
  ariaLabel,
}) => {
  const [hovered, setHovered] = React.useState(false);
  const sz = size === 'sm' ? 32 : 40;

  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: sz,
        height: sz,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'all 150ms ease',
        fontFamily: FONT,
        outline: 'none',
        flexShrink: 0,
        ...(hovered && !disabled ? hoverMap[variant] : variantStyles[variant]),
      }}
    >
      {icon}
    </button>
  );
};

export default ButtonSquare;
