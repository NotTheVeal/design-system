import React from 'react';

interface PopoverProps {
  title: string;
  content: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const Popover: React.FC<PopoverProps> = ({ title, content, className, isOpen, onClose }) => {
  return (
    <div
      role="dialog"
      aria-labelledby="popover-title"
      aria-modal="true"
      className={`popover ${className} ${isOpen ? 'open' : 'closed'}`}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      }}
    >
      <div className="popover-header" id="popover-title">
        <h2>{title}</h2>
        <button onClick={onClose} aria-label="Close popover">×</button>
      </div>
      <div className="popover-body">{content}</div>
    </div>
  );
};

export default Popover;
