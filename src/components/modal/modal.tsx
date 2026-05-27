import React from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, children, className }) => {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay`} role="dialog" aria-modal="true" aria-labelledby="modal-title" onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}>
      <div className={`modal ${className}`}>
        <header className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        </header>
        <div className="modal-body">{children}</div>
        <footer className="modal-footer">
          <button className="modal-footer-button" onClick={onClose}>Close</button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
