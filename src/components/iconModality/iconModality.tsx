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
    sm: '24px',
    md: '32px',
    lg: '40px',
    xl: '48px',
  };

  const styles = {
    squareFilled: {
      background: '#EFF9FE',
      color: '#005BA6',
      borderRadius: '4px',
      padding: '8px',
    },
    squareOutline: {
      background: 'transparent',
      color: '#005BA6',
      border: '1px solid #DCDCDC',
      borderRadius: '4px',
      padding: '8px',
    },
    circleFilled: {
      background: '#EFF9FE',
      color: '#005BA6',
      borderRadius: '50%',
      padding: '8px',
    },
    circleOutline: {
      background: 'transparent',
      color: '#005BA6',
      border: '1px solid #DCDCDC',
      borderRadius: '50%',
      padding: '8px',
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
