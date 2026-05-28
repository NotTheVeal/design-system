import React from 'react';

interface CtaBarProps {
  title?: string;
  description?: string;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  variant?: 'default' | 'info' | 'success' | 'warning';
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const CtaBar: React.FC<CtaBarProps> = ({
  title,
  description,
  primaryAction,
  secondaryAction,
  variant = 'default',
  dismissible = false,
  onDismiss,
  className = '',
}) => {
  const variantStyles: Record<string, { bg: string; border: string; text: string }> = {
    default: { bg: 'bg-[#002F48]', border: 'border-[#004A84]', text: 'text-white' },
    info:    { bg: 'bg-[#EFF9FE]', border: 'border-[#009CF4]', text: 'text-[#005BA6]' },
    success: { bg: 'bg-[#E2F5EE]', border: 'border-[#0E7C55]', text: 'text-[#0E7C55]' },
    warning: { bg: 'bg-[#FFF4E5]', border: 'border-[#E3A92D]', text: 'text-[#B45309]' },
  };

  const styles = variantStyles[variant];

  return (
    <div className={`w-full px-6 py-3 border-b flex items-center gap-4 ${styles.bg} ${styles.border} ${className}`}>
      <div className="flex-1 min-w-0">
        {title && <p className={`text-[14px] font-semibold ${styles.text}`}>{title}</p>}
        {description && <p className={`text-[13px] ${styles.text} opacity-80`}>{description}</p>}
      </div>
      {(secondaryAction || primaryAction) && (
        <div className="flex items-center gap-3 flex-shrink-0">
          {secondaryAction}
          {primaryAction}
        </div>
      )}
      {dismissible && (
        <button onClick={onDismiss} aria-label="Dismiss" className={`flex-shrink-0 ${styles.text} opacity-60 hover:opacity-100 transition-opacity`}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  );
};

export default CtaBar;
