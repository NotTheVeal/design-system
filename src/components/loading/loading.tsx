import React from 'react';

const STYLE_ID = 'ps-loading-styles';
const injectStyles = () => {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes ps-spin { to { transform: rotate(360deg); } }
    .ps-loading-spinner { animation: ps-spin 0.8s linear infinite; transform-origin: center; }
  `;
  document.head.appendChild(style);
};

const SIZES: Record<string, number> = { sm: 24, md: 40, lg: 64 };

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | number;
  color?: string;
  trackColor?: string;
  className?: string;
  label?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  color = '#005BA6',
  trackColor = '#DCDCDC',
  className = '',
  label = 'Loadingâ¦',
}) => {
  if (typeof document !== 'undefined') injectStyles();

  const px = typeof size === 'number' ? size : SIZES[size];
  const stroke = px <= 24 ? 3 : px <= 40 ? 4 : 6;
  const r = (px - stroke * 2) / 2;
  const cx = px / 2;
  const circ = 2 * Math.PI * r;
  // Show 75% arc
  const dasharray = `${circ * 0.75} ${circ * 0.25}`;

  return (
    <span
      role="status"
      aria-label={label}
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <svg
        width={px}
        height={px}
        viewBox={`0 0 ${px} ${px}`}
        fill="none"
        className="ps-loading-spinner"
      >
        {/* Track */}
        <circle
          cx={cx}
          cy={cx}
          r={r}
          stroke={trackColor}
          strokeWidth={stroke}
        />
        {/* Active arc */}
        <circle
          cx={cx}
          cy={cx}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={dasharray}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cx})`}
        />
      </svg>
      <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
        {label}
      </span>
    </span>
  );
};

export default Loading;
