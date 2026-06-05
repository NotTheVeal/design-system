import React, { useState } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'lg' | 'sm';
  disabled?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const FONT = "'Source Sans Pro', 'Source Sans 3', sans-serif";

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'lg',
  disabled = false,
  style,
  children,
  onClick,
  ...rest
}) => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive]   = useState(false);

  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderRadius: '4px',
    fontFamily: FONT,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 200ms ease',
    outline: 'none',
    userSelect: 'none',
  };

  if (disabled) {
    const sz: React.CSSProperties = size === 'lg'
      ? { height: '50px', padding: '0 24px', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.08em' }
      : { height: '32px', padding: '0 16px', fontSize: '14px' };
    return (
      <button
        {...rest}
        disabled
        style={{ ...base, ...sz, borderWidth: '1px', borderColor: '#777777', backgroundColor: '#DCDCDC', color: '#777777', cursor: 'not-allowed', ...style }}
      >
        {children}
      </button>
    );
  }

  if (variant === 'tertiary') {
    const bg = active ? '#CCCCCC' : hovered ? '#DCDCDC' : '#F1F1F1';
    return (
      <button
        {...rest}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setActive(false); }}
        onMouseDown={() => setActive(true)}
        onMouseUp={() => setActive(false)}
        style={{ ...base, height: '40px', padding: '0 24px', fontSize: '15px', borderRadius: '100px', borderWidth: '0', backgroundColor: bg, color: '#2B2B2B', ...style }}
      >
        {children}
      </button>
    );
  }

  if (variant === 'secondary') {
    const bg = active ? '#004A84' : hovered ? '#005BA6' : '#FFFFFF';
    const clr = hovered || active ? '#FFFFFF' : '#4A4A4A';
    const bdr = hovered || active ? '#005BA6' : '#DCDCDC';
    return (
      <button
        {...rest}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setActive(false); }}
        onMouseDown={() => setActive(true)}
        onMouseUp={() => setActive(false)}
        style={{ ...base, height: '32px', padding: '0 16px', fontSize: '14px', borderWidth: '1px', borderColor: bdr, backgroundColor: bg, color: clr, ...style }}
      >
        {children}
      </button>
    );
  }

  // Primary — outline → fills on hover
  const bg = active ? '#004A84' : hovered ? '#005BA6' : '#FFFFFF';
  const clr = hovered || active ? '#FFFFFF' : '#005BA6';
  const sz: React.CSSProperties = size === 'sm'
    ? { height: '32px', padding: '0 16px', fontSize: '14px' }
    : { height: '50px', padding: '0 24px', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.08em' };

  return (
    <button
      {...rest}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{ ...base, ...sz, borderWidth: '2px', borderColor: '#005BA6', backgroundColor: bg, color: clr, ...style }}
    >
      {children}
    </button>
  );
};

export default Button;
