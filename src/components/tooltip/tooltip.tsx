import React, { useState, useRef, useCallback, useEffect } from 'react';
const FONT = "'Source Sans 3', -apple-system, sans-serif";
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export interface TooltipProps { content: React.ReactNode; placement?: TooltipPlacement; children: React.ReactElement; showDelay?: number; hideDelay?: number; maxWidth?: number; disabled?: boolean; }
export const Tooltip: React.FC<TooltipProps> = ({ content, placement = 'top', children, showDelay = 300, hideDelay = 100, maxWidth = 240, disabled = false }) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const showTimer = useRef(null); const hideTimer = useRef(null);
  const tooltipId = useRef('tt-' + Math.random().toString(36).slice(2, 9));
  const clearTimers = () => { if (showTimer.current) clearTimeout(showTimer.current); if (hideTimer.current) clearTimeout(hideTimer.current); };
  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;
    const t = triggerRef.current.getBoundingClientRect();
    const tt = tooltipRef.current.getBoundingClientRect();
    const sy = window.scrollY, sx = window.scrollX;
    const positions = { top: { top: t.top+sy-tt.height-14, left: t.left+sx+t.width/2-tt.width/2 }, bottom: { top: t.top+sy+t.height+14, left: t.left+sx+t.width/2-tt.width/2 }, left: { top: t.top+sy+t.height/2-tt.height/2, left: t.left+sx-tt.width-14 }, right: { top: t.top+sy+t.height/2-tt.height/2, left: t.left+sx+t.width+14 } };
    setCoords(positions[placement]);
  }, [placement]);
  const show = useCallback(() => { if (disabled) return; clearTimers(); showTimer.current = setTimeout(() => setVisible(true), showDelay); }, [disabled, showDelay]);
  const hide = useCallback(() => { clearTimers(); hideTimer.current = setTimeout(() => setVisible(false), hideDelay); }, [hideDelay]);
  useEffect(() => { if (visible) requestAnimationFrame(() => updatePosition()); }, [visible, updatePosition]);
  useEffect(() => () => clearTimers(), []);
  const child = React.Children.only(children);
  return (<>
    {React.cloneElement(child, { ref: (el) => { triggerRef.current = el; }, 'aria-describedby': visible ? tooltipId.current : '', onMouseEnter: (e) => { show(); child.props.onMouseEnter?.(e); }, onMouseLeave: (e) => { hide(); child.props.onMouseLeave?.(e); }, onFocus: (e) => { show(); child.props.onFocus?.(e); }, onBlur: (e) => { hide(); child.props.onBlur?.(e); } })}
    {visible && <div ref={tooltipRef} id={tooltipId.current} role="tooltip" style={{ position: 'absolute', top: coords.top, left: coords.left, zIndex: 10000, backgroundColor: '#002F48', color: '#FFFFFF', maxWidth, padding: '6px 10px', fontFamily: FONT, fontSize: 13, fontWeight: 400, lineHeight: '18px', borderRadius: 4, pointerEvents: 'none' }}>{content}</div>}
  </>);
};
export default Tooltip;
