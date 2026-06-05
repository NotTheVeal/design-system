import React from 'react';

const STYLE_ID = 'ps-skeleton-styles';
const injectSkeletonStyles = () => {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes ps-skeleton-shimmer {
      0%   { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    .ps-skeleton {
      display: block;
      overflow: hidden;
      position: relative;
      border-radius: 4px;
      background: linear-gradient(90deg, #DCDCDC 25%, #F1F1F1 50%, #DCDCDC 75%);
      background-size: 200% 100%;
    }
    .ps-skeleton--animate {
      animation: ps-skeleton-shimmer 1400ms ease-in-out infinite;
    }
  `;
  document.head.appendChild(style);
};

interface SkeletonProps {
  height?: number;
  width?: number | string;
  borderRadius?: number;
  animate?: boolean;
  circle?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Skeleton: React.FC<SkeletonProps> = ({
  height = 20,
  width = '100%',
  borderRadius,
  animate = true,
  circle = false,
  className = '',
  style,
}) => {
  if (typeof document !== 'undefined') injectSkeletonStyles();

  const radius = circle ? '50%' : borderRadius !== undefined ? `${borderRadius}px` : '4px';
  const w = circle ? height : (typeof width === 'number' ? `${width}px` : width);

  return (
    <span
      role="status"
      aria-label="Loading"
      className={`ps-skeleton${animate ? ' ps-skeleton--animate' : ''} ${className}`}
      style={{
        display: 'block',
        height: `${height}px`,
        width: typeof w === 'number' ? `${w}px` : w,
        borderRadius: radius,
        ...style,
      }}
    />
  );
};

export default Skeleton;
