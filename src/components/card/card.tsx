import React, { useState } from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

const PADDING: Record<string, string | number> = {
  none: 0,
  sm: 12,
  md: 16,
  lg: 24,
};

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
  padding = 'md',
  header,
  footer,
}) => {
  const [hovered, setHovered] = useState(false);
  const isHoverable = hoverable || !!onClick;

  return (
    <div
      className={className}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter') onClick(); } : undefined}
      onMouseEnter={() => { if (isHoverable) setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#FFFFFF',
        border: '1px solid #DCDCDC',
        borderRadius: 4,
        boxShadow: hovered && isHoverable
          ? '0 4px 12px rgba(0,0,0,0.1)'
          : '0 1px 4px rgba(0,47,72,0.08)',
        transition: 'box-shadow 200ms ease',
        cursor: onClick ? 'pointer' : undefined,
        fontFamily,
      }}
    >
      {header && (
        <div style={{
          padding: '12px 16px',
          borderBottom: '1px solid #DCDCDC',
        }}>
          {header}
        </div>
      )}
      <div style={{ padding: PADDING[padding] }}>
        {children}
      </div>
      {footer && (
        <div style={{
          padding: '12px 16px',
          borderTop: '1px solid #DCDCDC',
          background: '#FAFAFA',
          borderRadius: '0 0 4px 4px',
        }}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
