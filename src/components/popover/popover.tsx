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

<style>
  :root {
    --ps-font: 'Source Sans Pro', sans-serif;
    --ps-blue: #005BA6;
    --ps-midnight: #002F48;
    --ps-popover-background: var(--semantic-color-surface-default);
    --ps-popover-border: var(--semantic-color-border-default);
    --ps-popover-border-width: 1px;
    --ps-popover-radius: 8px;
    --ps-popover-shadow: 0 4px 12px rgba(0,0,0,0.1);
    --ps-popover-z-index: 300;
    --ps-popover-min-width: 200px;
    --ps-popover-max-width: 320px;
    --ps-popover-padding-v: 16px;
    --ps-popover-padding-h: 16px;
    --ps-popover-header-font-size: 14px;
    --ps-popover-header-font-weight: 600;
    --ps-popover-header-color: var(--semantic-color-text-primary);
    --ps-popover-header-margin-b: 8px;
    --ps-popover-body-font-size: 13px;
    --ps-popover-body-color: var(--semantic-color-text-secondary);
    --ps-popover-arrow-size: 8px;
    --ps-popover-arrow-color: var(--semantic-color-surface-default);
    --ps-popover-arrow-border-color: var(--semantic-color-border-default);
    --ps-popover-animation-duration: 150ms;
    --ps-popover-animation-easing: ease;
  }

  .popover {
    display: none;
    position: absolute;
    background: var(--ps-popover-background);
    border: var(--ps-popover-border-width) solid var(--ps-popover-border);
    border-radius: var(--ps-popover-radius);
    box-shadow: var(--ps-popover-shadow);
    z-index: var(--ps-popover-z-index);
    min-width: var(--ps-popover-min-width);
    max-width: var(--ps-popover-max-width);
    padding: var(--ps-popover-padding-v) var(--ps-popover-padding-h);
    font-family: var(--ps-font);
    transition: opacity var(--ps-popover-animation-duration) var(--ps-popover-animation-easing);
  }

  .popover.open {
    display: block;
    opacity: 1;
  }

  .popover.closed {
    display: none;
    opacity: 0;
  }

  .popover-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--ps-popover-header-margin-b);
  }

  .popover-body {
    font-size: var(--ps-popover-body-font-size);
    color: var(--ps-popover-body-color);
  }

  button {
    background: white;
    border: none;
    color: var(--ps-blue);
    cursor: pointer;
  }

  button:hover {
    background: var(--ps-blue);
    color: white;
  }

  input {
    height: 48px;
    border: 1px solid #DCDCDC;
  }

  input:focus {
    border-color: var(--ps-blue);
    box-shadow: 0 0 0 3px rgba(0,147,244,0.3);
  }
</style>
