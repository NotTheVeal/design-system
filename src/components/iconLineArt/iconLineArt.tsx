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
    default: 'var(--ps-iconLineArt-color-default)',
    brand: 'var(--ps-iconLineArt-color-brand)',
    onDark: 'var(--ps-iconLineArt-color-onDark)',
    subtle: 'var(--ps-iconLineArt-color-subtle)',
  };

  return (
    <div 
      role="img" 
      aria-label={ariaLabel}
      className={`icon-line-art ${className}`} 
      style={{
        width: sizeMap[size],
        height: sizeMap[size],
        backgroundColor: 'var(--ps-iconLineArt-container-background)',
        borderRadius: 'var(--ps-iconLineArt-container-radius)',
        padding: 'var(--ps-iconLineArt-container-padding)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <style>
        {`
          :root {
            --ps-iconLineArt-color-default: #DCDCDC;
            --ps-iconLineArt-color-brand: #005BA6;
            --ps-iconLineArt-color-onDark: #DCDCDC;
            --ps-iconLineArt-color-subtle: #808080;
            --ps-iconLineArt-container-background: #F0F0F0;
            --ps-iconLineArt-container-radius: 8px;
            --ps-iconLineArt-container-padding: 24px;
          }
        `}
      </style>
    </div>
  );
};

export default IconLineArt;
