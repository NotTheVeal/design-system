import React, { useEffect, useRef } from 'react';

type Placement = 'top' | 'bottom' | 'left' | 'right';

interface PopoverProps {
  title?: string;
  content: React.ReactNode;
  onClose?: () => void;
  placement?: Placement;
  className?: string;
}

const placementClasses: Record<Placement, string> = {
  top:    'bottom-full mb-2',
  bottom: 'top-full mt-2',
  left:   'right-full mr-2',
  right:  'left-full ml-2',
};

const Popover: React.FC<PopoverProps> = ({
  title,
  content,
  onClose,
  placement = 'bottom',
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="false"
      className={`absolute z-50 bg-white border border-[#DCDCDC] rounded-[4px] shadow-[0_2px_10px_rgba(0,47,72,0.10)] p-4 min-w-[200px] max-w-[320px] ${placementClasses[placement]} ${className}`}
    >
      {(title || onClose) && (
        <div className="flex items-center justify-between mb-2">
          {title && <h3 className="text-[14px] font-semibold text-[#4A4A4A]">{title}</h3>}
          {onClose && (
            <button
              onClick={onClose}
              aria-label="Close popover"
              className="ml-auto text-[#777777] hover:text-[#4A4A4A] transition-colors leading-none"
            >
              ×
            </button>
          )}
        </div>
      )}
      <div className="text-[14px] text-[#4A4A4A] leading-relaxed">{content}</div>
    </div>
  );
};

export default Popover;
