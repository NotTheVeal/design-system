import React from 'react';

export type LoadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface LoadingProps {
  size?: LoadingSize;
  color?: string;
  label?: string;
  overlay?: boolean;
  className?: string;
}

// PS Design System Loading spinner:
// #005BA6 blue ring, transparent track
// Sizes: xs=16, sm=24, md=40, lg=56, xl=72px
// Centered in its container

const SIZES: Record<LoadingSize, number> = { xs: 16, sm: 24, md: 40, lg: 56, xl: 72 };
const THICKNESS: Record<LoadingSize, number> = { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 };

export const Loading: React.FC<LoadingProps> = ({
  size = 'md', color = '#005BA6', label, overlay = false, className = '',
}) => {
  const px = SIZES[size];
  const stroke = THICKNESS[size];
  const font = "'Source Sans Pro', -apple-system, sans-serif";

  const spinner = (
    <div
      className={className}
      role="status"
      aria-label={label || 'Loading'}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 12,
      }}
    >
      <svg
        width={px} height={px}
        viewBox="0 0 50 50"
        style={{ animation: 'ps-spin 0.8s linear infinite', flexShrink: 0 }}
      >
        {/* Track */}
        <circle cx="25" cy="25" r="20" fill="none" stroke={color} strokeWidth={stroke * (50 / px)} opacity={0.15} />
        {/* Active arc */}
        <circle
          cx="25" cy="25" r="20"
          fill="none"
          stroke={color}
          strokeWidth={stroke * (50 / px)}
          strokeDasharray="80 45"
          strokeLinecap="round"
        />
        <style>{`@keyframes ps-spin { to { transform: rotate(360deg); } }`}</style>
      </svg>
      {label && (
        <span style={{ fontSize: 14, color: '#777777', fontFamily: font }}>{label}</span>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'rgba(255,255,255,0.8)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default Loading;
