/**
 * Alert — PS Design System 2.0
 * Colors: success: #E2F5EE/#17AB78, danger: #FEF0F0/#FF0000, warning: #FFF4E5/#E3A92D, info: #EFF9FE/#005BA6
 */
import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';
export type AlertType = 'success' | 'danger' | 'warning' | 'info';
export interface AlertProps { type: AlertType; variant?: 'core' | 'dismissable' | 'multiline' | 'toast'; title: string; message?: string; onDismiss?: () => void; actions?: React.ReactNode; autoDismiss?: number; className?: string; }
const ALERT_CONFIG = { success: { bg: '#E2F5EE', color: '#17AB78', Icon: CheckCircle2 }, danger: { bg: '#FEF0F0', color: '#FF0000', Icon: XCircle }, warning: { bg: '#FFF4E5', color: '#E3A92D', Icon: AlertTriangle }, info: { bg: '#EFF9FE', color: '#005BA6', Icon: Info } } as const;
const fontFamily = "'Source Sans 3', -apple-system, sans-serif";
const Alert: React.FC<AlertProps> = ({ type, variant = 'core', title, message, onDismiss, actions, autoDismiss, className = '' }) => {
  const { bg, color, Icon } = ALERT_CONFIG[type];
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (variant !== 'toast' || !autoDismiss) return;
    const t = setTimeout(() => { setExiting(true); setTimeout(() => { setVisible(false); onDismiss?.(); }, 300); }, autoDismiss);
    return () => clearTimeout(t);
  }, [variant, autoDismiss, onDismiss]);
  if (!visible) return null;
  const showDismiss = variant === 'dismissable' || variant === 'toast' || !!onDismiss;
  const isMultiline = variant === 'multiline';
  const inner = (<>
    <Icon size={20} strokeWidth={1.75} aria-hidden="true" style={{ flexShrink: 0, alignSelf: isMultiline ? 'flex-start' : 'center' }} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <span style={{ fontFamily, fontSize: 14, fontWeight: 600, display: 'block', color }}>{title}</span>
      {message && <p style={{ fontFamily, fontSize: 14, marginTop: 4, marginBottom: 0, lineHeight: 1.5, color, opacity: 0.9 }}>{message}</p>}
      {actions && <div style={{ marginTop: 10 }}>{astions}</div>}
    </div>
    {showDismiss && <button onClick={onDismiss} aria-label="Dismiss" style={{ flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer', padding: 2, color, outline: 'none' }}><X size={18} strokeWidth={1.75} /></button>}
  </>);
  if (variant === 'toast') return <div role="alert" className={className} style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, minWidth: 320, maxWidth: 420, backgroundColor: bg, borderRadius: 6, boxShadow: '0 6px 20px rgba(0,47,72,0.18)', overflow: 'hidden' }}><div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px', color, fontFamily }}>{inner}</div></div>;
  return <div role="alert" className={className} style={{ display: 'flex', alignItems: isMultiline ? 'flex-start' : 'center', gap: 12, padding: '12px 16px', borderRadius: 4, width: '100%', backgroundColor: bg, color, fontFamily }}>{inner}</div>;
};
export default Alert;
export { Alert };
