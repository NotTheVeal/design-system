/**
 * Alert — PS Design System 2.0
 *
 * 4 variants:
 *   core        — Basic inline alert (success/danger/warning/info)
 *   dismissable — Same as core + X close button
 *   multiline   — Long text wraps; icon aligns to top
 *   toast       — Fixed position bottom-right, auto-dismiss with countdown bar
 *
 * Colors (Figma Alerts page — exact match):
 *   success: bg #E2F5EE / text+icon #0E7C55  icon: lucide/circle-check-big
 *   danger:  bg #FDEBEB / text+icon #E00000  icon: lucide/circle-x (XCircle)
 *   warning: bg #FFF4E5 / text+icon #B45309  icon: lucide/triangle-alert
 *   info:    bg #EFF9FE / text+icon #005BA6  icon: lucide/info
 */

import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────

export type AlertType = 'success' | 'danger' | 'warning' | 'info';
export type AlertVariant = 'core' | 'dismissable' | 'multiline' | 'toast';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type: AlertType;
  variant?: AlertVariant;
  title: string;
  message?: string;
  onDismiss?: () => void;
  actions?: React.ReactNode;
  /** Auto-dismiss delay in ms. Only applies to `toast` variant. */
  autoDismiss?: number;
}

// ── Config — verified against Figma Alerts page ───────────────────────────────
// success: bg #E2F5EE / text+icon #0E7C55  (lucide/circle-check-big)
// danger:  bg #FDEBEB / text+icon #E00000  (lucide/circle-x = XCircle)
// warning: bg #FFF4E5 / text+icon #B45309  (lucide/triangle-alert)
// info:    bg #EFF9FE / text+icon #005BA6  (lucide/info)

const ALERT_CONFIG = {
  success: { bg: '#E2F5EE', color: '#0E7C55', Icon: CheckCircle2 },
  danger:  { bg: '#FDEBEB', color: '#E00000', Icon: XCircle      },
  warning: { bg: '#FFF4E5', color: '#B45309', Icon: AlertTriangle },
  info:    { bg: '#EFF9FE', color: '#005BA6', Icon: Info          },
} as const;

const fontFamily = "'Source Sans 3', -apple-system, sans-serif";

// ── Toast keyframe injection ───────────────────────────────────────────────────

const TOAST_CSS = `
@keyframes ps-toast-slide-in {
  from { transform: translateX(110%); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}
@keyframes ps-toast-slide-out {
  from { transform: translateX(0);    opacity: 1; }
  to   { transform: translateX(110%); opacity: 0; }
}
@keyframes ps-toast-progress {
  from { width: 100%; }
  to   { width: 0%; }
}
`;

let toastCssInjected = false;
function injectToastCss() {
  if (toastCssInjected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.textContent = TOAST_CSS;
  document.head.appendChild(el);
  toastCssInjected = true;
}

// ── Alert component ───────────────────────────────────────────────────────────

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      type,
      variant = 'core',
      title,
      message,
      onDismiss,
      actions,
      autoDismiss,
      className = '',
      style,
      ...rest
    },
    ref
  ) => {
    const { bg, color, Icon } = ALERT_CONFIG[type];
    const [exiting, setExiting] = useState(false);
    const [visible, setVisible] = useState(true);

    // Toast auto-dismiss
    useEffect(() => {
      if (variant !== 'toast' || !autoDismiss) return;
      const timer = setTimeout(() => {
        setExiting(true);
        setTimeout(() => {
          setVisible(false);
          onDismiss?.();
        }, 300);
      }, autoDismiss);
      return () => clearTimeout(timer);
    }, [variant, autoDismiss, onDismiss]);

    injectToastCss();

    const handleDismiss = () => {
      if (variant === 'toast') {
        setExiting(true);
        setTimeout(() => {
          setVisible(false);
          onDismiss?.();
        }, 300);
      } else {
        onDismiss?.();
      }
    };

    if (!visible) return null;

    // ── Shared inner content ───────────────────────────────────────────────────

    const isMultiline = variant === 'multiline';
    const showDismiss = variant === 'dismissable' || variant === 'toast' || !!onDismiss;

    const iconAlignSelf: React.CSSProperties['alignSelf'] = isMultiline ? 'flex-start' : 'center';

    const innerContent = (
      <>
        <Icon
          size={20}
          strokeWidth={1.75}
          aria-hidden="true"
          style={{ flexShrink: 0, alignSelf: iconAlignSelf, marginTop: isMultiline ? 1 : 0 }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <span
            style={{
              fontFamily,
              fontSize: 14,
              fontWeight: 600,
              lineHeight: 1.4,
              display: 'block',
              color,
            }}
          >
            {title}
          </span>
          {message && (
            <p
              style={{
                fontFamily,
                fontSize: 14,
                fontWeight: 400,
                marginTop: 4,
                marginBottom: 0,
                lineHeight: 1.5,
                color,
                opacity: 0.9,
              }}
            >
              {message}
            </p>
          )}
          {actions && (
            <div style={{ marginTop: 10 }}>{actions}</div>
          )}
        </div>
        {showDismiss && (
          <button
            onClick={handleDismiss}
            aria-label="Dismiss alert"
            style={{
              flexShrink: 0,
              alignSelf: 'flex-start',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 2,
              color,
              display: 'flex',
              alignItems: 'center',
              borderRadius: 2,
              transition: 'opacity 150ms ease',
              outline: 'none',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.6'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
            onFocus={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 0 2px ${color}`; }}
            onBlur={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'; }}
          >
            <X size={18} strokeWidth={1.75} />
          </button>
        )}
      </>
    );

    // ── Toast variant ──────────────────────────────────────────────────────────

    if (variant === 'toast') {
      return (
        <div
          ref={ref}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          className={className}
          {...rest}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 9999,
            minWidth: 320,
            maxWidth: 420,
            backgroundColor: bg,
            borderRadius: 6,
            boxShadow: '0 6px 20px rgba(0,47,72,0.18)',
            overflow: 'hidden',
            animation: exiting
              ? 'ps-toast-slide-out 300ms ease forwards'
              : 'ps-toast-slide-in 300ms ease forwards',
            ...style,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              padding: '14px 16px',
              color,
              fontFamily,
            }}
          >
            {innerContent}
          </div>
          {/* Auto-dismiss progress bar */}
          {autoDismiss && (
            <div
              style={{
                height: 3,
                backgroundColor: color,
                opacity: 0.35,
                animation: `ps-toast-progress ${autoDismiss}ms linear forwards`,
                transformOrigin: 'left',
              }}
            />
          )}
        </div>
      );
    }

    // ── Core / Dismissable / Multiline variants ────────────────────────────────

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        className={className}
        {...rest}
        style={{
          display: 'flex',
          alignItems: isMultiline ? 'flex-start' : 'center',
          gap: 12,
          padding: '12px 16px',
          borderRadius: 4,
          width: '100%',
          backgroundColor: bg,
          color,
          boxSizing: 'border-box',
          fontFamily,
          ...style,
        }}
      >
        {innerContent}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
export { Alert };
