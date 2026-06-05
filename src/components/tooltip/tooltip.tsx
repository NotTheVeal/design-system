import React, { useState, useRef, useEffect } from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

// One-time global style injection
const STYLE_ID = 'ps-tooltip-styles';
const injectTooltipStyles = () => {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .ps-tooltip-wrapper { position: relative; display: inline-flex; }
    .ps-tooltip-bubble {
      position: absolute;
      z-index: 500;
      background: #323232;
      color: #FFFFFF;
      border-radius: 4px;
      padding: 6px 10px;
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      max-width: 240px;
      white-space: normal;
      word-break: break-word;
      box-shadow: 0 2px 10px rgba(0,47,72,0.15);
      pointer-events: none;
      opacity: 0;
      transition: opacity 150ms ease;
    }
    .ps-tooltip-bubble.visible { opacity: 1; }

    /* Placement: top (default) */
    .ps-tooltip-bubble.top    { bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
    .ps-tooltip-bubble.bottom { top: calc(100% + 8px);    left: 50%; transform: translateX(-50%); }
    .ps-tooltip-bubble.left   { right: calc(100% + 8px);  top: 50%;  transform: translateY(-50%); }
    .ps-tooltip-bubble.right  { left: calc(100% + 8px);   top: 50%;  transform: translateY(-50%); }

    /* Arrow */
    .ps-tooltip-bubble::after {
      content: '';
      position: absolute;
      border: 5px solid transparent;
    }
    .ps-tooltip-bubble.top::after    { top: 100%;  left: 50%; transform: translateX(-50%); border-top-color: #323232; }
    .ps-tooltip-bubble.bottom::after { bottom: 100%; left: 50%; transform: translateX(-50%); border-bottom-color: #323232; }
    .ps-tooltip-bubble.left::after   { left: 100%; top: 50%;  transform: translateY(-50%); border-left-color: #323232; }
    .ps-tooltip-bubble.right::after  { right: 100%; top: 50%; transform: translateY(-50%); border-right-color: #323232; }
  `;
  document.head.appendChild(style);
};

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  content: React.ReactNode;
  placement?: TooltipPlacement;
  children: React.ReactNode;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  placement = 'top',
  children,
  className = '',
}) => {
  if (typeof document !== 'undefined') injectTooltipStyles();
  const [visible, setVisible] = useState(false);
  const id = useRef(`tt-${Math.random().toString(36).slice(2, 8)}`).current;

  return (
    <span
      className={`ps-tooltip-wrapper ${className}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      style={{ fontFamily }}
    >
      <span
        aria-describedby={id}
        style={{ display: 'inline-flex' }}
      >
        {children}
      </span>
      <span
        id={id}
        role="tooltip"
        className={`ps-tooltip-bubble ${placement}${visible ? ' visible' : ''}`}
        style={{ fontFamily }}
      >
        {content}
      </span>
    </span>
  );
};

export default Tooltip;
