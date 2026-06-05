import React from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = '',
}) => (
  <div
    className={className}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: '48px 24px',
      fontFamily,
    }}
  >
    {icon && (
      <div
        style={{
          width: 64,
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          background: '#F1F1F1',
          color: '#949494',
          marginBottom: 16,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
    )}
    {title && (
      <div style={{ fontSize: 18, fontWeight: 600, color: '#4A4A4A', marginBottom: 8, fontFamily }}>
        {title}
      </div>
    )}
    {description && (
      <div style={{ fontSize: 14, color: '#777777', maxWidth: 400, marginBottom: 24, lineHeight: 1.5, fontFamily }}>
        {description}
      </div>
    )}
    {action}
  </div>
);

export default EmptyState;
