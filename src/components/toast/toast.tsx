import React, { useState, useEffect, useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export interface ToastMessage { id: string; type: ToastType; title: string; message?: string; duration?: number; }
export interface ToastProps { toasts?: ToastMessage[]; position?: string; onDismiss?: (id: string) => void; className?: string; }

const COLORS: Record<ToastType, { border: string; icon: string; bar: string }> = {
  success: { border: '#17AB78', icon: '#0E7C55', bar: '#17AB78' },
  error:   { border: '#D32F2F', icon: '#D32F2F', bar: '#D32F2F' },
  warning: { border: '#E3A92D', icon: '#B45309', bar: '#E3A92D' },
  info:    { border: '#005BA6', icon: '#005BA6', bar: '#005BA6' },
};

const SuccessIcon = () => (<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="9" fill="#0E7C55"/><path d="M5 9l3 3 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const ErrorIcon = () => (<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="9" fill="#D32F2F"/><path d="M6 6l6 6M12 6l-6 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>);
const WarningIcon = () => (<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 1L1 16h16L9 1z" fill="#E3A92D"/><path d="M9 7v4M9 13h.01" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>);
const InfoIcon = () => (<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="9" fill="#005BA6"/><path d="M9 8v5M9 6h.01" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>);
const CloseIcon = () => (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="#949494" strokeWidth="1.5" strokeLinecap="round"/></svg>);

const ICONS: Record<ToastType, React.ReactNode> = { success: <SuccessIcon />, error: <ErrorIcon />, warning: <WarningIcon />, info: <InfoIcon /> };

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({ toast, onDismiss }) => {
  const [progress, setProgress] = useState(100);
  const [visible, setVisible] = useState(false);
  const dur = toast.duration ?? 4000;
  const c = COLORS[toast.type];
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  useEffect(() => { const t = setTimeout(() => setVisible(true), 10); return () => clearTimeout(t); }, []);
  useEffect(() => {
    if (!dur) return;
    const start = Date.now();
    const iv = setInterval(() => {
      const p = Math.max(0, 100 - ((Date.now() - start) / dur) * 100);
      setProgress(p);
      if (p <= 0) { clearInterval(iv); dismiss(); }
    }, 50);
    return () => clearInterval(iv);
  }, []);
  const dismiss = useCallback(() => { setVisible(false); setTimeout(() => onDismiss(toast.id), 250); }, [toast.id]);
  const isError = toast.type === 'error';
  return (
    <div role={isError ? 'alert' : 'status'} aria-live={isError ? 'assertive' : 'polite'} aria-atomic="true"
      style={{ background:'#FFFFFF', border:'1px solid #DCDCDC', borderLeft:`4px solid ${c.border}`, borderRadius:4, boxShadow:'0 4px 16px rgba(0,47,72,.12)', minWidth:300, maxWidth:400, overflow:'hidden', fontFamily:font, transform:visible?'translateX(0)':'opacity', opacity:visible?1:0, transition:'all 250ms ease' }}>
      <div style={{ padding:'12px 14px', display:'flex', gap:10, alignItems:'flex-start' }}>
        <span style={{ flexShrink:0, display:'flex', alignItems:'center', marginTop:1 }}>{ICOMStoast.type]}</span>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:14, fontWeight:600, color:'#002F48', lineHeight:'20px' }}>{toast.title}</div>
          {toast.message && <div style={{ fontSize:13, color:'#777777', lineHeight:'18px', marginTop:2 }}>{toast.message}</div>}
        </div>
        <button onClick={dismiss} style={{ background:'none', border:'none', cursor:'pointer', padding:0, display:'flex', alignItems:'center', flexShrink:0, marginTop:2 }} aria-label="Dismiss"><CloseIcon /></button>
      </div>
      {!!dur && (<div style={{ height:3, background:'#F1F1F1' }}><div style={{ height:'100%', background:c.bar, width:progress+'%', transition:'width 50ms linear' }} /></div>)}
    </div>
  );
};

const POSITIONS: Record<string, React.CSSProperties> = { 'top-right': { top:16, right:16 }, 'top-left': {* top:16, left:16 }, 'bottom-right': { bottom:16, right:16 }, 'bottom-left': { bottom:16, left:16 } };

export const Toast: React.FC<ToastProps> = ({ toasts = [], position = 'top-right', onDismiss, className = '' }) => (
  <div className={className} style={{ position:'fixed', zIndex:9999, display:'flex', flexDirection:'column', gap:8, ...POSITIONS[position||'top-right'] }}>
    {toasts.map(t => <ToastItem key={t.id} toast={t} onDismiss={onDismiss || (() => {})} />)}
  </div>
);

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const add = useCallback((t: Omit<ToastMessage, 'id'>) => { const id = Date.now().toString(); setToasts(p => [...p, { ...t, id }]); return id; }, []);
  const dismiss = useCallback((id: string) => setToasts(p => p.filter(t => t.id !== id)), []);
  return { toasts, dismiss, success: (title: string, message?: string) => add({ type:'success', title, message }), error: (title: string, message?: string) => add({ type:'error', title, message }), warning: (title: string, message?: string) => add({ type:'warning', title, message }), info: (title: string, message?: string) => add({ type:'info', title, message }) };
}

export default Toast;
