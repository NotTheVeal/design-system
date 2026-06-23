import React, { useState } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
  size?: 'lg' | 'sm';
  disabled?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// Fix: 'Source Sans 3' is the correct font name (Source Sans Pro is deprecated)
const FONT = "'Source Sans 3', -apple-system, sans-serif";

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
  const [active, setActive] = useState(false);
  const base: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    borderStyle: 'solid', borderRadius: '4px', fontFamily: FONT, fontWeight: 600,
    cursor: 'pointer', transition: 'all 200ms ease', outline: 'none', userSelect: 'none',
  };
  if (disabled) {
    const sz = size === 'lg' ? { height: '50px', padding: '0 24px', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.08em' } : { height: '32px', padding: '0 16px', fontSize: '14px' };
    return <button {...rest} disabled style={{ ...base, ...sz, borderWidth: '1px', borderColor: '#777777', backgroundColor: '#DCDCDC', color: '#777777', cursor: 'not-allowed', ...style }}>{children}</button>;
  }
  if (variant === 'tertiary') {
    const bg = active ? '#CCCCCC' : hovered ? '#DCDCDC' : '#F1F1F1';
    return <button {...rest} onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setActive(false); }} onMouseDown={() => setActive(true)} onMouseUp={() => setActive(false)} style={{ ...base, height: '40px', padding: '0 24px', fontSize: '15px', borderRadius: '100px', borderWidth: '0', backgroundColor: bg, color: '#4A4A4A', ...style }}>{children}</button>;
  }
  if (variant === 'ghost') {
    const sz = size === 'sm' ? { height: '32px', padding: '0 16px', fontSize: '14px' } : { height: '50px', padding: '0 24px', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.08em' };
    const bg = active ? '#D9F0FC' : hovered ? '#EFF9FE' : 'transparent';
    return <button {...rest} onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setActive(false); }} onMouseDown={() => setActive(true)} onMouseUp={() => setActive(false)} style={{ ...base, ...sz, borderWidth: '0', backgroundColor: bg, color: '#005BA6', ...style }}>{children}</button>;
  }
  if (variant === 'danger') {
    const sz = size === 'sm' ? { height: '32px', padding: '0 16px', fontSize: '14px' } : { height: '50px', padding: '0 24px', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.08em' };
    const bg = active ? '#CC0000' : hovered ? '#FF0000' : '#FFFFFF';
    const clr = hovered || active ? '#FFFFFF' : '#FF0000';
    return <button {...rest} onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setActive(false); }} onMouseDown={() => setActive(true)} onMouseUp={() => setActive(false)} style={{ ...base, ...sz, borderWidth: '2px', borderColor: '#FF0000', backgroundColor: bg, color: clr, ...style }}>{children}</button>;
  }
  if (variant === 'secondary') {
    const sz = size === 'sm' ? { height: '32px', padding: '0 16px', fontSize: '14px' } : { height: '50px', padding: '0 24px', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.08em' };
    const bg = active ? '#004A84' : hovered ? '#005BA6' : '#FFFFFF';
    const clr = hovered || active ? '#FFFFFF' : '#4A4A4A';
    const bdr = hovered || active ? '#005BA6' : '#DCDCDC';
    return <button {...rest} onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setActive(false); }} onMouseDown={() => setActive(true)} onMouseUp={() => setActive(false)} style={{ ...base, ...sz, borderWidth: '1px', borderColor: bdr, backgroundColor: bg, color: clr, ...style }}>{children}</button>;
  }
  const sz = size === 'sm' ? { height: '32px', padding: '0 16px', fontSize: '14px' } : { height: '50px', padding: '0 24px', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.08em' };
  const bg = active ? '#004A84' : hovered ? '#005BA6' : '#FFFFFF';
  const clr = hovered || active ? '#FFFFFF' : '#005BA6';
  const borderColor = active ? '#004A84' : hovered ? '#009CF4' : '#005BA6';
  return <button {...rest} onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setActive(false); }} onMouseDown={() => setActive(true)} onMouseUp={() => setActive(false)} style={{ ...base, ...sz, borderWidth: '2px', borderColor, backgroundColor: bg, color: clr, ...style }}>{children}</button>;
};
export default Button;
