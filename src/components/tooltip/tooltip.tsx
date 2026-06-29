import React, { useState, useRef, useEffect } from 'react';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: React.ReactNode;
  placement?: TooltipPlacement;
  delay?: number;
  /** Trigger element — preferred API used in stories */
  trigger?: React.ReactElement;
  /** Alternatively, wrap children directly */
  children?: React.ReactElement;
  className?: string;
}

// Figma (node 4386:28791):
// Dark container: #323232, 4px radius, shadow 0 2px 8px rgba(0,0,0,0.25)
// Text: white, 12px Source Sans Pro, 16px line-height
// Arrow: 6px triangle pointing to trigger element
// Max-width: 200px (wraps automatically)

const ARROW_SIZE = 6;

export const Tooltip: React.FC<TooltipProps> = ({
  content, placement = 'top', delay = 300, trigger, children, className = '',
}) => {
  const triggerEl = trigger ?? children;
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const font = "'Source Sans Pro', -apple-system, sans-serif";

  const show = () => {
    timerRef.current = setTimeout(() => setVisible(true), delay);
  };
  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  // Arrow position per placement
  const arrowStyle: React.CSSProperties = {
    position: 'absolute',
    width: 0, height: 0,
    border: `${ARROW_SIZE}px solid transparent`,
  };
  const placements: Record<TooltipPlacement, { tooltip: React.CSSProperties; arrow: React.CSSProperties }> = {
    top: {
      tooltip: { bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' },
      arrow: { ...arrowStyle, top: '100%', left: '50%', transform: 'translateX(-50%)', borderTopColor: '#323232', borderBottom: 'none' },
    },
    bottom: {
      tooltip: { top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' },
      arrow: { ...arrowStyle, bottom: '100%', left: '50%', transform: 'translateX(-50%)', borderBottomColor: '#323232', borderTop: 'none' },
    },
    left: {
      tooltip: { right: 'calc(100% + 8px)', top: '50%', transform: 'translateY(-50%)' },
      arrow: { ...arrowStyle, left: '100%', top: '50%', transform: 'translateY(-50%)', borderLeftColor: '#323232', borderRight: 'none' },
    },
    right: {
      tooltip: { left: 'calc(100% + 8px)', top: '50%', transform: 'translateY(-50%)' },
      arrow: { ...arrowStyle, right: '100%', top: '50%', transform: 'translateY(-50%)', borderRightColor: '#323232', borderLeft: 'none' },
    },
  };

  const { tooltip: tooltipPos, arrow: arrowPos } = placements[placement];

  return (
    <span
      className={className}
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {triggerEl}
      {visible && (
        <span
          role="tooltip"
          style={{
            position: 'absolute',
            zIndex: 1000,
            background: '#323232',
            color: '#FFFFFF',
            fontSize: 12,
            fontWeight: 400,
            fontFamily: font,
            lineHeight: '16px',
            padding: '6px 12px',
            borderRadius: 4,
            maxWidth: 200,
            whiteSpace: 'pre-wrap',
            boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
            pointerEvents: 'none',
            ...tooltipPos,
          }}
        >
          {content}
          <span style={arrowPos} />
        </span>
      )}
    </span>
  );
};

export default Tooltip;
