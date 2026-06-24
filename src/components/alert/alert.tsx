import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';
export type AlertType = 'success' | 'danger' | 'warning' | 'info';
export type AlertVariant = 'core' | 'dismissible' | 'multiline' | 'toast';
export interface AlertProps { type: AlertType; variant?: AlertVariant; title: string; message?: string; onDismiss?: () => void; actions?: React.ReactNode; autoDismiss?: number; className?: string; }
const ALERT_CONFIG = {
  success: { bg: '#E2F5EE', color: '#17AB78', Icon: CheckCircle2 },
  danger:  { bg: '#FEF0F0', color: '#FF0000', Icon: XCircle },
  warning: { bg: '#FFF4E5', color: '#E3A92D', Icon: AlertTriangle },
  info:    { bg: '#EFF9FE', color: '#009CF4', Icon: Info },
} as const;
const fontFamily = "'Source Sans 3', -apple-system, sans-serif";
const Alert: React.FC<AlertProps> = ({ type, variant = 'core', title, message, onDismiss, actions, autoDismiss, className = '' }) => {
  const { bg, color, Icon } = ALERT_CONFIG[type];
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (variant !== 'toast' || !autoDismiss) return;
    const timer = setTimeout(() => { setExiting(true); setTimeout(() => { setVisible(false); onDismiss?.(); }, 300); }, autoDismiss);
    return () => clearTimeout(timer);
  }, [variant, autoDismiss, onDismiss]);
  if (!visible) return null;
  const showDismiss = variant === 'dismissible' || variant === 'toast' || !!onDismiss;
  const isMultiline = variant === 'multiline';
  const innerContent = (<>
    <Icon size={20} strokeWidth={1.75} aria-hidden="true" style={{ flexShrink: 0, alignSelf: isMultiline ? 'flex-start' : 'center', marginTop: isMultiline ? 1 : 0 }} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <span style={{ fontFamily, fontSize: 14, fontWeight: 600, lineHeight: 1.4, display: 'block', color }}>{title}</span>
      {message && <p style={{ fontFamily, fontSize: 14, fontWeight: 400, marginTop: 4, marginBottom: 0, lineHeight: 1.5, color, opacity: 0.9 }}>{message}</p>}
      {actions && <div style={{ marginTop: 10 }}>{actions}</div>}
    </div>
    {showDismiss && <button onClick={onDismiss} aria-label="Dismiss alert" style={{ flexShrink: 0, alignSelf: 'flex-start', background: 'none', border: 'none', cursor: 'pointer', padding: 2, color, display: 'flex', alignItems: 'center', borderRadius: 2, transition: 'opacity 150ms ease', outline: 'none' }}><X size={18} strokeWidth={1.75} /></button>}
  </>);
  if (variant === 'toast') {
    return (<div role="alert" aria-live="assertive" aria-atomic="true" className={className} style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, minWidth: 320, maxWidth: 420, backgroundColor: bg, borderRadius: 8, boxShadow: '0 6px 20px rgba(0,47,72,0.18)', overflow: 'hidden', animation: exiting ? 'ps-toast-slide-out 300ms ease forwards' : 'ps-toast-slide-in 300ms ease forwards' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px', color, fontFamily }}>{innerContent}</div>
    </div>);
  }
  return (<div role="alert" aria-live="polite" className={className} style={{ display: 'flex', alignItems: isMultiline ? 'flex-start' : 'center', gap: 12, padding: '12px 16px', borderRadius: 4, width: '100%', backgroundColor: bg, color, boxSizing: 'border-box', fontFamily }}>{innerContent}</div>);
};
export default Alert;
export { Alert };
