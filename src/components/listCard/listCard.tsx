import React from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

interface ListCardProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  meta?: string;
  action?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const ListCard: React.FC<ListCardProps> = ({
  icon,
  title,
  subtitle,
  meta,
  action,
  onClick,
  className = '',
}) => (
  <div
    className={className}
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 16px',
      background: '#FFFFFF',
      border: '1px solid #DCDCDC',
      borderRadius: 4,
      boxShadow: '0 1px 4px rgba(0,47,72,0.08)',
      cursor: onClick ? 'pointer' : 'default',
      fontFamily,
    }}
  >
    {icon && (
      <span
        style={{
          flexShrink: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: '#DCEAED',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#005BA6',
        }}
      >
        {icon}
      </span>
    )}
    <div style={{ flex: 1, minWidth: 0 }}>
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: '#4A4A4A',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontFamily,
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: 12,
            color: '#777777',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontFamily,
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
    {meta && (
      <span style={{ flexShrink: 0, fontSize: 12, color: '#949494', fontFamily }}>
        {meta}
      </span>
    )}
    {action && <span style={{ flexShrink: 0 }}>{action}</span>}
  </div>
);

export default ListCard;
