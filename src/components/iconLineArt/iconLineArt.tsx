import React from 'react';

interface IconLineArtProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'default' | 'brand' | 'onDark' | 'subtle';
  className?: string;
  ariaLabel?: string;
}

const IconLineArt: React.FC<IconLineArtProps> = ({ 
  size = 'md', 
  color = 'default', 
  className = '', 
  ariaLabel = 'icon line art' 
}) => {
  const sizeMap = {
    sm: '80px',
    md: '120px',
    lg: '160px',
    xl: '200px',
  };

  const colorMap = {
    default: '#DCDCDC',
    brand: '#005BA6',
    onDark: '#DCDCDC',
    subtle: '#808080',
  };

  return (
    <div 
      role="img" 
      aria-label={ariaLabel}
      className={`icon-line-art ${className}`} 
      style={{
        width: sizeMap[size],
        height: sizeMap[size],
        backgroundColor: '#F0F0F0',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <style>
        {`
          `}
      </style>
    </div>
  );
};

export default IconLineArt;
