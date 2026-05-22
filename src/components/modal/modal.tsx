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

const styles = `
:root {
  --ps-font: 'Source Sans Pro', sans-serif;
  --ps-blue: #005BA6;
  --ps-midnight: #002F48;
  --ps-spacing-4: 4px;
  --ps-spacing-8: 8px;
  --ps-spacing-12: 12px;
  --ps-spacing-16: 16px;
  --ps-spacing-20: 20px;
  --ps-spacing-24: 24px;
  --ps-spacing-32: 32px;
  --ps-spacing-40: 40px;
  --ps-spacing-48: 48px;
  --ps-spacing-64: 64px;
  --ps-border-radius: 4px;
  --ps-modal-border-radius: 8px;
  --ps-pill-radius: 100px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: var(--ps-background-modal);
  border-radius: var(--ps-modal-border-radius);
  box-shadow: 0 6px 20px rgba(0, 47, 72, 0.18);
  min-width: var(--ps-min-width);
  max-width: var(--ps-max-width);
  margin: var(--ps-spacing-24);
  display: flex;
  flex-direction: column;
}

.modal-header {
  background-color: var(--ps-header-background-modal);
  padding: var(--ps-spacing-16) var(--ps-spacing-24);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-close {
  background: none;
  border: none;
  color: var(--ps-close-default-color);
  cursor: pointer;
}

.modal-close:hover {
  color: var(--ps-close-hover-color);
}

.modal-body {
  background-color: var(--ps-body-background-modal);
  padding: var(--ps-body-padding);
}

.modal-footer {
  background-color: var(--ps-footer-background-modal);
  padding: var(--ps-footer-padding-v) var(--ps-footer-padding-h);
  display: flex;
  justify-content: flex-end;
}

.modal-footer-button {
  background-color: var(--ps-blue);
  color: white;
  border: none;
  border-radius: var(--ps-pill-radius);
  cursor: pointer;
  padding: var(--ps-spacing-8) var(--ps-spacing-16);
}

.modal-footer-button:hover {
  background-color: darken(var(--ps-blue), 10%);
}
` 

document.head.appendChild(Object.assign(document.createElement('style'), {textContent: styles}));
