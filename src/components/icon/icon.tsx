import React from 'react';

const Icon: React.FC<IconProps> = ({ size = 'default', color = 'default', className, 'aria-label': ariaLabel }) => {
  const sizes = {
    xs: '14px',
    sm: '16px',
    md: '20px',
    default: '24px',
    lg: '32px',
  };

  const colors = {
    default: '#4A4A4A',
    secondary: '#777777',
    tertiary: '#949494',
    brand: '#005BA6',
    light: '#009CF4',
    onDark: '#FFFFFF',
    success: '#0E7C55',
    error: '#E00000',
    warning: '#B45309',
    disabled: '#CCCCCC',
  };

  return (
    <span
      className={`icon ${className}`}
      style={{
        width: sizes[size],
        height: sizes[size],
        borderColor: colors[color],
        display: 'inline-block',
        fill: colors[color],
      }}
      role="img"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          console.log('Icon clicked');
        }
      }}
    >
      {/* Add SVG here */}
    </span>
  );
};

export interface IconProps {
  size?: 'xs' | 'sm' | 'md' | 'default' | 'lg';
  color?: 'default' | 'secondary' | 'tertiary' | 'brand' | 'light' | 'onDark' | 'success' | 'error' | 'warning' | 'disabled';
  className?: string;
  'aria-label'?: string;
}

const styles = `
;
  --ps-icon-color-secondary: {semantic.color.text.secondary};
  --ps-icon-color-tertiary: {semantic.color.text.tertiary};
  --ps-icon-color-brand: {semantic.color.brand.primary};
  --ps-icon-color-light: {semantic.color.brand.light};
  --ps-icon-color-onDark: {semantic.color.surface.default};
  --ps-icon-color-success: {semantic.color.feedback.successDark};
  --ps-icon-color-error: {semantic.color.feedback.dangerDark};
  --ps-icon-color-warning: {semantic.color.feedback.warningDark};
  --ps-icon-color-disabled: {semantic.color.text.disabled};
}
`;

export default Icon;
