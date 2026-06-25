import React, { useState } from 'react';

/**
 * InlineButton — PS Design System 2.0
 *
 * For inline text actions within content flow (table cells, body copy, etc.).
 * NOT for standalone CTAs — use Button for those.
 *
 * Variants:
 *   tall        — 36px pill button, white bg, gray border. For CTAs within content.
 *   link        — underlined text link, #4A4A4A. Hover: #005BA6
 *   linkBlue    — blue underlined text link, always #005BA6
 *   iconButton  — 32px circle, icon-only
 *
 * NOTE: 'tertiary' variant has been REMOVED from InlineButton.
 * The tertiary pill button (light gray #F1F1F1 bg) belongs in the main Button component.
 */

export type InlineButtonVariant = 'tall' | 'link' | 'linkBlue' | 'iconButton';

export interface InlineButtonProps {
  children?: React.ReactNode;
  variant?: InlineButtonVariant;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  /** aria-label required for iconButton variant */
  'aria-label'?: string;
}

const FONT = "'Source Sans 3', -apple-system, sans-serif";

export function InlineButton({
  children,
  variant = 'link',
  disabled = false,
  onClick,
  type = 'button',
  className,
  'aria-label': ariaLabel,
}: InlineButtonProps) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => { if (!disabled) setHovered(true); };
  const handleMouseLeave = () => setHovered(false);

  // ── Base styles shared by all variants ───────────────────────────────────
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 400,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'all 150ms ease',
    outline: 'none',
    border: 'none',
    background: 'none',
    padding: 0,
    gap: 4,
  };

  // ── tall: 36px pill, white bg, gray border ────────────────────────────────
  if (variant === 'tall') {
    return (
      <button
        type={type}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className={className}
        aria-label={ariaLabel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          ...base,
          minHeight: 36,
          padding: '0 16px',
          borderRadius: 100,
          border: `1px solid ${hovered ? '#005BA6' : '#DCDCDC'}`,
          backgroundColor: hovered ? '#EBF3FA' : '#FFFFFF',
          color: hovered ? '#005BA6' : '#4A4A4A',
        }}
      >
        {children}
      </button>
    );
  }

  // ── link: underlined, dark text, hover blue ───────────────────────────────
  if (variant === 'link') {
    return (
      <button
        type={type}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className={className}
        aria-label={ariaLabel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          ...base,
          color: hovered ? '#005BA6' : '#4A4A4A',
          textDecoration: 'underline',
          textDecorationColor: hovered ? '#005BA6' : '#4A4A4A',
        }}
      >
        {children}
      </button>
    );
  }

  // ── linkBlue: always blue, underlined ────────────────────────────────────
  if (variant === 'linkBlue') {
    return (
      <button
        type={type}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className={className}
        aria-label={ariaLabel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          ...base,
          color: '#005BA6',
          textDecoration: 'underline',
          textDecorationColor: '#005BA6',
          opacity: disabled ? 0.4 : hovered ? 0.8 : 1,
        }}
      >
        {children}
      </button>
    );
  }

  // ── iconButton: 32px circle, icon-only ───────────────────────────────────
  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={className}
      aria-label={ariaLabel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...base,
        width: 32,
        height: 32,
        borderRadius: '50%',
        border: `1px solid ${hovered ? '#005BA6' : '#DCDCDC'}`,
        backgroundColor: hovered ? '#EBF3FA' : 'transparent',
        color: hovered ? '#005BA6' : '#4A4A4A',
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}

export default InlineButton;
