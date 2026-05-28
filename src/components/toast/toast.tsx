import React, { useEffect } from 'react';

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  title?: string;
  onDismiss?: () => void;
  duration?: number;
  className?: string;
}

const VARIANT_STYLES: Record<ToastVariant, { container: string; icon: string }> = {
  success: { container: 'bg-[#E2F5EE] border-[#0E7C55] text-[#0E7C55]', icon: '✓' },
  error:   { container: 'bg-[#FEF0F0] border-[#E00000] text-[#E00000]', icon: '✕' },
  warning: { container: 'bg-[#FFF4E5] border-[#B45309] text-[#B45309]', icon: '!' },
  info:    { container: 'bg-[#EFF9FE] border-[#005BA6] text-[#005BA6]', icon: 'i' },
};

const Toast: React.FC<ToastProps> = ({
  message,
  variant = 'info',
  title,
  onDismiss,
  duration = 5000,
  className = '',
}) => {
  useEffect(() => {
    if (duration > 0 && onDismiss) {
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);

  const styles = VARIANT_STYLES[variant];

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`flex items-start gap-3 min-w-[320px] max-w-[480px] p-4 rounded-[8px] border-l-4 shadow-[0_6px_20px_rgba(0,47,72,0.18)] ${styles.container} ${className}`}
    >
      <span className="flex-shrink-0 w-[20px] h-[20px] flex items-center justify-center rounded-full bg-current text-white text-[12px] font-bold">
        {styles.icon}
      </span>
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold text-[14px] mb-0.5">{title}</p>}
        <p className="text-[14px]">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="flex-shrink-0 text-current opacity-60 hover:opacity-100 transition-opacity text-[18px] leading-none mt-0.5"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Toast;
