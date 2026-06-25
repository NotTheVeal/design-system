import React, { useState, useRef, useEffect } from 'react';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  disabled?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
  delay = 200,
  disabled = false,
}) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const show = () => {
    if (disabled) return;
    timerRef.current = setTimeout(() => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      const gap = 8;
      let top = 0, left = 0;
      switch (placement) {
        case 'top':
          top = rect.top - gap;
          left = rect.left + rect.width / 2;
          break;
        case 'bottom':
          top = rect.bottom + gap;
          left = rect.left + rect.width / 2;
          break;
        case 'left':
          top = rect.top + rect.height / 2;
          left = rect.left - gap;
          break;
        case 'right':
          top = rect.top + rect.height / 2;
          left = rect.right + gap;
          break;
      }
      setCoords({ top, left });
      setVisible(true);
    }, delay);
  };

  const hide = () => {
    clearTimeout(timerRef.current);
    setVisible(false);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const transformMap: Record<string, string> = {
    top: 'translateX(-50%) translateY(-100%)',
    bottom: 'translateX(-50%)',
    left: 'translateX(-100%) translateY(-50%)',
    right: 'translateY(-50%)',
  };

  const arrowMap: Record<string, React.CSSProperties> = {
    top: { bottom: -4, left: '50%', transform: 'translateX(-50%) rotate(45deg)' },
    bottom: { top: -4, left: '50%', transform: 'translateX(-50%) rotate(45deg)' },
    left: { right: -4, top: '50%', transform: 'translateY(-50%) rotate(45deg)' },
    right: { left: -4, top: '50%', transform: 'translateY(-50%) rotate(45deg)' },
  };

  const child = React.cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: (e: React.MouseEvent) => {
      show();
      children.props.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hide();
      children.props.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      show();
      children.props.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      hide();
      children.props.onBlur?.(e);
    },
  });

  return (
    <>
      {child}
      {visible && (
        <div
          role="tooltip"
          style={{
            position: 'fixed',
            top: coords.top,
            left: coords.left,
            transform: transformMap[placement],
            background: '#002F48',
            color: '#FFFFFF',
            fontSize: '12px',
            fontFamily: "'Source Sans Pro', -apple-system, sans-serif",
            fontWeight: 400,
            lineHeight: '16px',
            padding: '6px 10px',
            borderRadius: '4px',
            zIndex: 9999,
            whiteSpace: 'nowrap',
            maxWidth: '280px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.24)',
            pointerEvents: 'none',
          }}
        >
          {content}
          <span
            style={{
              position: 'absolute',
              width: 8,
              height: 8,
              background: '#002F48',
              ...arrowMap[placement],
            }}
          />
        </div>
      )}
    </>
  );
};

export default Tooltip;
