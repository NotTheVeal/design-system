import React, { useState } from 'react';

const FONT = "'Source Sans 3', -apple-system, sans-serif";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'clickable';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

const PADDING_MAP: Record<string, number> = { none: 0, sm: 12, md: 20, lg: 32 };

const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'default', padding = 'md', children, className = '', style, onClick, ...rest },
  ref,
) {
  const [hovered, setHovered] = useState(false);
  const isClickable = variant === 'clickable' || !!onClick;
  const pad = PADDING_MAP[padding];

  const cardStyle: React.CSSProperties = {
    background: '#FFFFFF',
    border: '1px solid #DCDCDC',
    borderRadius: 4,
    padding: pad,
    fontFamily: FONT,
    boxShadow: variant === 'elevated' ? '0 2px 10px rgba(0,47,72,0.10)' : 'none',
    cursor: isClickable ? 'pointer' : 'default',
    transition: 'border-color 200ms ease, box-shadow 200ms ease',
    ...(isClickable && hovered ? {
      borderColor: '#005BA6',
      boxShadow: '0 4px 12px rgba(0,47,72,0.15)',
    } : {}),
    ...style,
  };

  return (
    <div
      ref={ref}
      className={className}
      style={cardStyle}
      onClick={onClick}
      tabIndex={isClickable ? 0 : undefined}
      role={isClickable ? 'button' : undefined}
      onMouseEnter={() => isClickable && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={isClickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
      } : undefined}
      {...rest}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export { Card };
export default Card;

