import React from 'react';

export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  circle?: boolean;
  rounded?: boolean;
  lines?: number;
  className?: string;
  style?: React.CSSProperties;
}

// PS Design System Skeleton:
// #F1F1F1 bg with shimmer wave animation
// 4px radius (rectangle), 50% (circle)
// Shimmer: gradient sweep left to right

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%', height = 16, circle = false, rounded = false, lines, className = '', style,
}) => {
  const shimmerStyle: React.CSSProperties = {
    display: 'block',
    background: 'linear-gradient(90deg, #F1F1F1 25%, #E0E0E0 50%, #F1F1F1 75%)',
    backgroundSize: '200% 100%',
    animation: 'ps-skeleton-shimmer 1.5s infinite',
    borderRadius: circle ? '50%' : rounded ? 100 : 4,
    width,
    height,
    ...style,
  };

  if (lines && lines > 1) {
    return (
      <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 8, width }}>
        {Array.from({ length: lines }).map((_, i) => (
          <span
            key={i}
            style={{
              ...shimmerStyle,
              width: i === lines - 1 ? '70%' : '100%',
              height,
              display: 'block',
            }}
          />
        ))}
        <style>{`@keyframes ps-skeleton-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
      </div>
    );
  }

  return (
    <>
      <span className={className} style={shimmerStyle} aria-hidden="true" />
      <style>{`@keyframes ps-skeleton-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
    </>
  );
};

export default Skeleton;
