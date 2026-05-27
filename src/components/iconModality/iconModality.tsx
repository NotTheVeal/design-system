import React from 'react';

interface IconModalityProps {
  type: 'squareFilled' | 'squareOutline' | 'circleFilled' | 'circleOutline';
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  'aria-label'?: string;
}

const IconModality: React.FC<IconModalityProps> = ({ type, icon, size = 'md', className, 'aria-label': ariaLabel }) => {
  const sizes = {
    sm: 'var(--ps-iconModality-size-sm)',
    md: 'var(--ps-iconModality-size-md)',
    lg: 'var(--ps-iconModality-size-lg)',
    xl: 'var(--ps-iconModality-size-xl)',
  };

  const styles = {
    squareFilled: {
      background: 'var(--ps-iconModality-squareFilled-background)',
      color: 'var(--ps-iconModality-squareFilled-icon)',
      borderRadius: 'var(--ps-iconModality-squareFilled-radius)',
      padding: 'var(--ps-iconModality-squareFilled-padding)',
    },
    squareOutline: {
      background: 'var(--ps-iconModality-squareOutline-background)',
      color: 'var(--ps-iconModality-squareOutline-icon)',
      border: `1px solid var(--ps-iconModality-squareOutline-border)`,
      borderRadius: 'var(--ps-iconModality-squareOutline-radius)',
      padding: 'var(--ps-iconModality-squareOutline-padding)',
    },
    circleFilled: {
      background: 'var(--ps-iconModality-circleFilled-background)',
      color: 'var(--ps-iconModality-circleFilled-icon)',
      borderRadius: 'var(--ps-iconModality-circleFilled-radius)',
      padding: 'var(--ps-iconModality-circleFilled-padding)',
    },
    circleOutline: {
      background: 'var(--ps-iconModality-circleOutline-background)',
      color: 'var(--ps-iconModality-circleOutline-icon)',
      border: `1px solid var(--ps-iconModality-circleOutline-border)`,
      borderRadius: 'var(--ps-iconModality-circleOutline-radius)',
      padding: 'var(--ps-iconModality-circleOutline-padding)',
    },
  };

  const currentStyle = styles[type];

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      className={`icon-modality ${className}`}
      style={{
        ...currentStyle,
        height: sizes[size],
        width: sizes[size],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        outline: 'none',
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          // Implement click logic here if required
        }
      }}
      onClick={() => {
        // Implement click logic here if required
      }}
    >
      {icon}
    </div>
  );
};

export default IconModality;
