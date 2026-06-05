import React, { useState } from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

type InlineButtonVariant = 'tall' | 'link' | 'linkBlue' | 'iconButton';

interface InlineButtonProps {
  variant?: InlineButtonVariant;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  'aria-label'?: string;
}

const InlineButton: React.FC<InlineButtonProps> = ({
  variant = 'tall',
  children,
  onClick,
  disabled = false,
  className = '',
  icon,
  'aria-label': ariaLabel,
}) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    border: 'none',
    background: 'none',
    padding: 0,
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily,
    opacity: disabled ? 0.4 : 1,
    transition: 'color 150ms ease, background 150ms ease',
    textDecoration: 'none',
    outline: 'none',
  };

  let variantStyle: React.CSSProperties = {};

  if (variant === 'tall') {
    variantStyle = {
      height: 40,
      borderRadius: 100,
      background: pressed && !disabled
        ? '#CCCCCC'
        : hovered && !disabled
        ? '#DCDCDC'
        : '#F1F1F1',
      padding: '0 16px',
      fontSize: 16,
      fontWeight: 400,
      color: '#2B2B2B',
    };
  } else if (variant === 'link') {
    variantStyle = {
      fontSize: 14,
      fontWeight: 400,
      color: hovered && !disabled ? '#4A4A4A' : '#4A4A4A',
      textDecoration: hovered && !disabled ? 'underline' : 'none',
    };
  } else if (variant === 'linkBlue') {
    variantStyle = {
      fontSize: 14,
      fontWeight: 400,
      color: hovered && !disabled ? '#004A84' : '#005BA6',
      textDecoration: hovered && !disabled ? 'underline' : 'none',
    };
  } else if (variant === 'iconButton') {
    variantStyle = {
      width: 32,
      height: 32,
      borderRadius: 4,
      background: pressed && !disabled
        ? '#CCCCCC'
        : hovered && !disabled
        ? '#DCDCDC'
        : 'transparent',
      color: '#4A4A4A',
      padding: 0,
    };
  }

  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{ ...base, ...variantStyle }}
    >
      {icon}
      {children}
    </button>
  );
};

export default InlineButton;
