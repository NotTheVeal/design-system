import React from 'react';

interface IconCustomProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'squareFilled' | 'squareOutline' | 'circleFilled' | 'circleOutline';
  ariaLabel: string;
  className?: string;
  onClick?: () => void;
}

const IconCustom: React.FC<IconCustomProps> = ({
  size = 'md',
  variant = 'squareFilled',
  ariaLabel,
  className = '',
  onClick,
}) => {
  const sizeMap = {
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '48px',
  };

  const styles = {
    '--ps-icon-size': sizeMap[size],
    '--ps-icon-padding': '8px',
    '--ps-icon-border-radius': variant.includes('circle') ? '100px' : '4px',
    '--ps-icon-background': variant.includes('Filled')
      ? 'var(--ps-color-brand-primary)'
      : 'white',
    '--ps-icon-color': variant.includes('Outline')
      ? 'var(--ps-color-brand-primary)'
      : 'white',
    '--ps-icon-border-color': variant.includes('Outline') 
      ? 'var(--ps-color-brand-primary)' 
      : 'transparent',
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      className={`icon-custom ${variant} ${className}`}
      onClick={onClick}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
      style={styles}
    >
      {/* Icon content goes here */}
    </div>
  );
};

export default IconCustom;
