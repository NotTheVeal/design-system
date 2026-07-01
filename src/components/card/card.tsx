import React, { useState } from 'react';

const FONT = "'Source Sans 3', -apple-system, sans-serif";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'clickable';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

const PADDING: Record<string, number> = { none: 0, sm: 12, md: 20, lg: 32 };

const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'default', padding = 'md', children, className = '', style, onClick, ...rest },
  ref,
) {
  const [hovered, setHovered] = useState(false);
  const clickable = variant === 'clickable' || !!onClick;
  const pad = PADDING[padding];

  const cardStyle: React.CSSProperties = {
    background: '#FFFFFF',
    border: '1px solid #DCDCDC',
    borderRadius: 4,
    padding: pad,
    fontFamily: FONT,
    cursor: clickable ? 'pointer' : 'default',
    transition: 'border-color 200ms ease, box-shadow 200ms ease',
    boxShadow: variant === 'elevated' ? '0 2px 10px rgba(0,47,72,0.10)' : 'none',
    ...(clickable && hovered ? {
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
      tabIndex={clickable ? 0 : undefined}
      role={clickable ? 'button' : undefined}
      onMouseEnter={() => clickable && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={clickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
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
