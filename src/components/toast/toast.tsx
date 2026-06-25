import React, { useEffect, useState, useCallback } from 'react';
const FONT = "'Source Sans 3', -apple-system, sans-serif";
export type ToastVariant = 'success' | 'danger' | 'warning' | 'info';
const BG = { success: '#E2F5EE', danger: '#FDEBEB', warning: '#FFF4E5', info: '#EFF9FE' };
const CLR = { success: '#0E7C55', danger: '#E00000', warning: '#B45309', info: '#005BA6' };
export interface ToastProps { variant?: ToastVariant; message: string; description?: string; duration?: number; onDismiss?: () => void; visible?: boolean; }
export const Toast: React.FC<ToastProps> = ({ variant = 'info', message, description, duration = 4000, onDismiss, visible = true }) => {
const [isVisible, setIsVisible] = useState(visible);
const [isExiting, setIsExiting] = useState(false);
const bg = BG[variant]; const clr = CLR[variant];
const handleDismiss = useCallback(() => { setIsExiting(true); setTimeout(() => { setIsVisible(false); onDismiss?.(); }, 200); }, [onDismiss]);
useEffect(() => {
if (!visible) { setIsVisible(false); return; }
setIsVisible(true); setIsExiting(false);
if (duration > 0) { const t = setTimeout(handleDismiss, duration); return () => clearTimeout(t); }
}, [visible, duration, handleDismiss]);
if (!isVisible) return null;
return (<div role="alert" aria-live="polite" style={{ position: 'relative', maxWidth: 420, display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px', backgroundColor: bg, borderRadius: 8, boxShadow: '0 4px 12px rgba(0,47,72,0.15), 0 0 0 1px rgba(0,47,72,0.05)', fontFamily: FONT, color: clr, opacity: isExiting ? 0 : 1, transition: 'opacity 200ms ease' }}>
<div style={{ flex: 1, minWidth: 0 }}>
<div style={{ fontSize: 14, fontWeight: 600, lineHeight: '20px', color: clr }}>{message}</div>
{description && <div style={{ fontSize: 13, fontWeight: 400, lineHeight: '18px', color: clr, opacity: 0.85, marginTop: 2 }}>{description}</div>}
</div>
<button onClick={handleDismiss} aria-label="Dismiss notification" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: 24, height: 24, padding: 0, background: 'none', border: 'none', borderRadius: 4, cursor: 'pointer', color: clr, opacity: 0.7, transition: 'opacity 150ms ease', marginTop: -2, marginRight: -4 }}>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
</button>
</div>);
};
Toast.displayName = 'Toast';
export default Toast;
