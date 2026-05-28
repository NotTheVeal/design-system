import React, { useEffect } from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  position?: 'left' | 'right';
  width?: string;
  className?: string;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  position = 'right',
  width = '400px',
  className = '',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-[#002F48] bg-opacity-60 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
        className={`fixed top-0 ${position === 'right' ? 'right-0' : 'left-0'} h-full z-50 bg-white shadow-[0_6px_20px_rgba(0,47,72,0.18)] flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : position === 'right' ? 'translate-x-full' : '-translate-x-full'} ${className}`}
        style={{ width }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#DCDCDC]">
          {title && <h2 id="drawer-title" className="text-[18px] font-semibold text-[#002F48]">{title}</h2>}
          <button onClick={onClose} aria-label="Close drawer" className="ml-auto text-[#777777] hover:text-[#4A4A4A] transition-colors text-[24px] leading-none w-[32px] h-[32px] flex items-center justify-center">
            ×
          </button>
        </div>
        <div className="flex-1 overflow-auto px-6 py-4">{children}</div>
      </div>
    </>
  );
};

export default Drawer;
