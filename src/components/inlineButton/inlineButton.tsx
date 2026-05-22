import React from 'react';

interface InlineButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'tall' | 'link' | 'linkBlue' | 'directory' | 'iconButton';
  className?: string;
  ariaLabel?: string;
}

const InlineButton: React.FC<InlineButtonProps> = ({ label, onClick, variant = 'tall', className, ariaLabel }) => {
  const baseClass = 'inline-button';
  const variantClass = `${baseClass}--${variant}`;
  
  return (
    <button
      className={`${baseClass} ${variantClass} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {label}
    </button>
  );
};

const styles = `
:root {
  --ps-base-display: inline-flex;
  --ps-background: transparent;
  --ps-border: none;
  --ps-link-font-size: 14px;
  --ps-link-font-weight: 400;
  --ps-link-color-default: #777777;
  --ps-link-color-hover: #005BA6;
  --ps-link-text-decoration-default: underline;
  --ps-link-text-decoration-offset: 4px;
  --ps-link-blue-font-size: 16px;
  --ps-link-blue-font-weight: 700;
  --ps-link-blue-color-default: #005DA6;
  --ps-link-blue-color-hover: #004A84;
  --ps-tall-height: 48px;
  --ps-tall-font-size: 14px;
  --ps-tall-font-weight: 600;
  --ps-tall-color-default: #777777;
  --ps-tall-color-hover: #005BA6;
  --ps-icon-button-sizing: 28px;
  --ps-icon-button-border-radius: 4px;
  --ps-icon-button-border-width: 1px;
  --ps-icon-button-background-default: transparent;
  --ps-icon-button-background-hover: #F1F1F1;
  --ps-icon-button-background-pressed: #DCDCDC;
  --ps-icon-button-color-icon: #4A4A4A;
  --ps-gap: 6px;
}

.inline-button {
  display: var(--ps-base-display);
  background: var(--ps-background);
  border: var(--ps-border);
  cursor: pointer;
  padding: 0 var(--ps-gap);
}

.inline-button--tall {
  height: var(--ps-tall-height);
  font-size: var(--ps-tall-font-size);
  font-weight: var(--ps-tall-font-weight);
  color: var(--ps-tall-color-default);
  text-transform: uppercase;
}

.inline-button--tall:hover {
  color: var(--ps-tall-color-hover);
}

.inline-button--link {
  font-size: var(--ps-link-font-size);
  font-weight: var(--ps-link-font-weight);
  color: var(--ps-link-color-default);
  text-decoration: var(--ps-link-text-decoration-default);
}

.inline-button--link:hover {
  color: var(--ps-link-color-hover);
}

.inline-button--linkBlue {
  font-size: var(--ps-link-blue-font-size);
  font-weight: var(--ps-link-blue-font-weight);
  color: var(--ps-link-blue-color-default);
}

.inline-button--linkBlue:hover {
  color: var(--ps-link-blue-color-hover);
  text-decoration: var(--ps-link-blue-text-decoration.hover);
}

.inline-button--iconButton {
  width: var(--ps-icon-button-sizing);
  height: var(--ps-icon-button-sizing);
  border-radius: var(--ps-icon-button-border-radius);
  background: var(--ps-icon-button-background-default);
  border: var(--ps-icon-button-border-width) solid transparent;
}

.inline-button--iconButton:hover {
  background: var(--ps-icon-button-background-hover);
}

.inline-button--iconButton:active {
  background: var(--ps-icon-button-background-pressed);
  color: var(--ps-icon-button-color-icon);
}

`;

export default InlineButton;
