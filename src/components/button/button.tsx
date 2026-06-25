import React, { useState } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
  colorScheme?: 'future' | 'current';
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
  colorScheme = 'future',
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
    const sz = size === 'lg' ? { height: '50px', padding: '0 24px', fontSize: '15px', textTransform: 'uppercase' as const, letterSpacing: '0.08em' } : { height: '32px', padding: '0 16px', fontSize: '14px' };
    return <button {...rest} disabled style={{ ...base, ...sz, borderWidth: '1px', borderColor: '#777777', backgroundColor: '#DCDCDC', color: '#777777', cursor: 'not-allowed', ...style }}>{children}</button>;
  }

  if (variant === 'tertiary') {
    const bg = active ? '#CCCCCC' : hovered ? '#DCDCDC' : '#F1F1F1';
    return <button {...rest} onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setActive(false); }} onMouseDown={() => setActive(true)} onMouseUp={() => setActive(false)} style={{ ...base, height: '40px', padding: '0 24px', fontSize: '15px', borderRadius: '100px', borderWidth: '0', backgroundColor: bg, color: '#4A4A4A', ...style }}>{children}</button>;
  }

  if (variant === 'ghost') {
    const sz = size === 'sm' ? { height: '32px', padding: '0 16px', fontSize: '14px' } : { height: '50px', padding: '0 24px', fontSize: '15px', textTransform: 'uppercase' as const, letterSpacing: '0.08em' };
    const bg = active ? '#D9F0FC' : hovered ? '#EFF9FE' : 'transparent';
    return <button {...rest} onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setActive(false); }} onMouseDown={() => setActive(true)} onMouseUp={() => setActive(false)} style={{ ...base, ...sz, borderWidth: '0', backgroundColor: bg, color: '#005BA6', ...style }}>{children}</button>;
  }

  if (variant === 'danger') {
    const sz = size === 'sm' ? { height: '32px', padding: '0 16px', fontSize: '14px' } : { height: '50px', padding: '0 24px', fontSize: '15px', textTransform: 'uppercase' as const, letterSpacing: '0.08em' };
    const bg = active ? '#CC0000' : hovered ? '#FF0000' : '#FFFFFF';
    const clr = hovered || active ? '#FFFFFF' : '#FF0000';
    return <button {...rest} onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setActive(false); }} onMouseDown={() => setActive(true)} onMouseUp={() => setActive(false)} style={{ ...base, ...sz, borderWidth: '2px', borderColor: '#FF0000', backgroundColor: bg, color: clr, ...style }}>{children}</button>;
  }

  if (variant === 'secondary') {
    const sz = size === 'sm' ? { height: '32px', padding: '0 16px', fontSize: '14px' } : { height: '50px', padding: '0 24px', fontSize: '15px', textTransform: 'uppercase' as const, letterSpacing: '0.08em' };
    if (colorScheme === 'current') {
      // Current secondary: white bg, orange border — outline style (legacy)
      const bg = active ? '#CC7800' : hovered ? '#FF9505' : '#FFFFFF';
      const clr = hovered || active ? '#FFFFFF' : '#FF9505';
      return <button {...rest} onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setActive(false); }} onMouseDown={() => setActive(true)} onMouseUp={() => setActive(false)} style={{ ...base, ...sz, borderWidth: '2px', borderColor: '#FF9505', backgroundColor: bg, color: clr, ...style }}>{children}</button>;
    }
    // Future secondary: white bg, PS Blue border — outline style
    const bg = active ? '#004A84' : hovered ? '#005BA6' : '#FFFFFF';
    const clr = hovered || active ? '#FFFFFF' : '#005BA6';
    return <button {...rest} onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setActive(false); }} onMouseDown={() => setActive(true)} onMouseUp={() => setActive(false)} style={{ ...base, ...sz, borderWidth: '2px', borderColor: '#005BA6', backgroundColor: bg, color: clr, ...style }}>{children}</button>;
  }

  // Primary variant — FILLED (not outline)
  const sz = size === 'sm' ? { height: '32px', padding: '0 16px', fontSize: '14px' } : { height: '50px', padding: '0 24px', fontSize: '15px', textTransform: 'uppercase' as const, letterSpacing: '0.08em' };
  if (colorScheme === 'current') {
    // Current primary: filled orange background, white text (legacy)
    const bg = active ? '#CC7800' : hovered ? '#E08700' : '#FF9505';
    return <button {...rest} onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setActive(false); }} onMouseDown={() => setActive(true)} onMouseUp={() => setActive(false)} style={{ ...base, ...sz, borderWidth: '2px', borderColor: bg, backgroundColor: bg, color: '#FFFFFF', ...style }}>{children}</button>;
  }
  // Future primary: filled PS Blue (#005BA6) background, white text
  const bg = active ? '#003D6B' : hovered ? '#004A84' : '#005BA6';
  return <button {...rest} onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setActive(false); }} onMouseDown={() => setActive(true)} onMouseUp={() => setActive(false)} style={{ ...base, ...sz, borderWidth: '2px', borderColor: bg, backgroundColor: bg, color: '#FFFFFF', ...style }}>{children}</button>;
};

export default Button;
