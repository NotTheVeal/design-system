import React from 'react';

interface CardProps {
  title: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, content, footer, className, onClick }) => {
  return (
    <div
      className={`card ${className}`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
      aria-label={title}
      style={{
        backgroundColor: 'var(--ps-card-base-background)',
        border: '1px solid var(--ps-card-base-border)',
        borderRadius: 'var(--ps-card-base-radius)',
        boxShadow: 'var(--ps-card-base-shadow)',
        padding: '16px',
        transition: 'box-shadow 0.2s',
      }}
      onMouseEnter={() => {
        // hover effect
        document.documentElement.style.setProperty('--ps-card-base-shadow', 'var(--ps-card-base-hoverShadow)');
      }}
      onMouseLeave={() => {
        // reset shadow on mouse leave
        document.documentElement.style.setProperty('--ps-card-base-shadow', 'var(--ps-card-base-shadow)');
      }}
    >
      <h2>{title}</h2>
      <div>{content}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;
