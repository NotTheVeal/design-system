import React from 'react';

export type StatusState =
  | 'active' | 'inactive'
  | 'success' | 'error' | 'warning' | 'info'
  | 'pending' | 'processing' | 'completed' | 'cancelled'
  | 'online' | 'offline' | 'away' | 'busy';

export interface StatusProps {
  state: StatusState;
  label?: string;
  size?: 'sm' | 'md';
  showDot?: boolean;
  className?: string;
}

// PS Design System Status indicator
// Dot: 8px circle with semantic color
// Label: 13-14px Source Sans Pro

const STATE_COLORS: Record<StatusState, { dot: string; text: string }> = {
  active:      { dot: '#17AB78', text: '#0E7C55' },
  success:     { dot: '#17AB78', text: '#0E7C55' },
  completed:   { dot: '#17AB78', text: '#0E7C55' },
  online:      { dot: '#17AB78', text: '#0E7C55' },
  pending:     { dot: '#E3A92D', text: '#B45309' },
  processing:  { dot: '#E3A92D', text: '#B45309' },
  warning:     { dot: '#E3A92D', text: '#B45309' },
  away:        { dot: '#E3A92D', text: '#B45309' },
  error:       { dot: '#E00000', text: '#E00000' },
  cancelled:   { dot: '#E00000', text: '#E00000' },
  busy:        { dot: '#E00000', text: '#E00000' },
  info:        { dot: '#005BA6', text: '#005BA6' },
  processing2: { dot: '#005BA6', text: '#005BA6' },
  inactive:    { dot: '#949494', text: '#777777' },
  offline:     { dot: '#949494', text: '#777777' },
};

export const Status: React.FC<StatusProps> = ({
  state, label, size = 'md', showDot = true, className = '',
}) => {
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const colors = STATE_COLORS[state] || STATE_COLORS.inactive;
  const dotSize = size === 'sm' ? 6 : 8;
  const fontSize = size === 'sm' ? 12 : 14;

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontFamily: font, fontSize, fontWeight: 600, color: colors.text,
      }}
    >
      {showDot && (
        <span style={{
          width: dotSize, height: dotSize,
          borderRadius: '50%',
          background: colors.dot,
          flexShrink: 0,
        }} />
      )}
      {label || state}
    </span>
  );
};

export default Status;
