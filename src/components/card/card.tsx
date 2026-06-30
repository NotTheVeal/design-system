import React from 'react';

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
  const isClickable = variant === 'clickable' || !!onClick;
  const pad = PADDING_MAP[padding];

  return (
    <>
      <style>{`
        .ps-card { transition: border-color 200ms ease, box-shadow 200ms ease; }
        .ps-card-clickable:hover { border-color: #005BA6 !important; box-shadow: 0 4px 12px rgba(0,47,72,0.15) !important; cursor: pointer; }
        .ps-card-clickable:active { box-shadow: 0 2px 8px rgba(0,47,72,0.22) !important; }
      `}</style>
      <div
        ref={ref}
        className={`ps-card ${isClickable ? 'ps-card-clickable' : ''} ${className}`}
        onClick={onClick}
        tabIndex={isClickable ? 0 : undefined}
        role={isClickable ? 'button' : undefined}
        onKeyDown={isClickable ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>); } : undefined}
        style={{
          background: '#FFFFFF',
          border: '1px solid #DCDCDC',
          borderRadius: 4,
          padding: pad,
          fontFamily: FONT,
          boxShadow: variant === 'elevated' ? '0 2px 10px rgba(0,47,72,0.10)' : 'none',
          ...style,
        }}
        {...rest}
      >
        {children}
      </div>
    </>
  );
});

Card.displayName = 'Card';

export { Card };
export default Card;
