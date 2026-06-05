import React from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

type StatusType = 'active' | 'inactive' | 'busy' | 'away' | 'offline' | 'online' | 'error' | 'warning' | 'info';

interface StatusColors { dot: string; text: string; }

const STATUS_COLORS: Record<StatusType, StatusColors> = {
  active:   { dot: '#17AB78', text: '#0E7C55' },
  online:   { dot: '#17AB78', text: '#0E7C55' },
  inactive: { dot: '#949494', text: '#4A4A4A' },
  offline:  { dot: '#949494', text: '#4A4A4A' },
  busy:     { dot: '#E00000', text: '#E00000' },
  error:    { dot: '#E00000', text: '#E00000' },
  away:     { dot: '#E3A92D', text: '#B45309' },
  warning:  { dot: '#E3A92D', text: '#B45309' },
  info:     { dot: '#009CF4', text: '#005BA6' },
};

interface StatusProps {
  type?: StatusType;
  label?: string;
  children?: React.ReactNode;
  className?: string;
  dotSize?: number;
}

const Status: React.FC<StatusProps> = ({
  type = 'inactive',
  label,
  children,
  className = '',
  dotSize = 8,
}) => {
  const colors = STATUS_COLORS[type] ?? STATUS_COLORS.inactive;
  const text = label ?? children ?? type;

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontFamily,
      }}
    >
      <span
        style={{
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          backgroundColor: colors.dot,
          flexShrink: 0,
          display: 'inline-block',
        }}
      />
      {text && (
        <span
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: colors.text,
            textTransform: 'capitalize',
            fontFamily,
          }}
        >
          {text}
        </span>
      )}
    </span>
  );
};

export default Status;
