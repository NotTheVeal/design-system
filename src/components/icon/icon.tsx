import React from 'react';

const Icon: React.FC<IconProps> = ({ size = 'default', color = 'default', className, 'aria-label': ariaLabel }) => {
  const sizes = {
    xs: 'var(--ps-icon-size-xs)',
    sm: 'var(--ps-icon-size-sm)',
    md: 'var(--ps-icon-size-md)',
    default: 'var(--ps-icon-size-default)',
    lg: 'var(--ps-icon-size-lg)',
  };

  const colors = {
    default: 'var(--ps-icon-color-default)',
    secondary: 'var(--ps-icon-color-secondary)',
    tertiary: 'var(--ps-icon-color-tertiary)',
    brand: 'var(--ps-icon-color-brand)',
    light: 'var(--ps-icon-color-light)',
    onDark: 'var(--ps-icon-color-onDark)',
    success: 'var(--ps-icon-color-success)',
    error: 'var(--ps-icon-color-error)',
    warning: 'var(--ps-icon-color-warning)',
    disabled: 'var(--ps-icon-color-disabled)',
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
:root {
  --ps-icon-size-xs: 14px;
  --ps-icon-size-sm: 16px;
  --ps-icon-size-md: 20px;
  --ps-icon-size-default: 24px;
  --ps-icon-size-lg: 32px;
  --ps-icon-color-default: {semantic.color.text.primary};
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
