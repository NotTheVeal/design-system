import React from 'react';

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
  const paddingClasses: Record<string, string> = { none: '', sm: 'p-3', md: 'p-4', lg: 'p-6' };

  return (
    <div
      className={`bg-white border border-[#DCDCDC] rounded-[4px] shadow-[0_1px_4px_rgba(0,47,72,0.08)] transition-shadow duration-200 ${hoverable || onClick ? 'hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter') onClick(); } : undefined}
    >
      {header && <div className="px-4 py-3 border-b border-[#DCDCDC]">{header}</div>}
      <div className={paddingClasses[padding]}>{children}</div>
      {footer && <div className="px-4 py-3 border-t border-[#DCDCDC] bg-[#FAFAFA] rounded-b-[4px]">{footer}</div>}
    </div>
  );
};

export default Card;
