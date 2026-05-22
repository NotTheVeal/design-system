import React from 'react';

interface SkeletonProps {
  className?: string;
  height?: number;
  width?: number;
  style?: React.CSSProperties;
  animate?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({ className, height = 24, width = '100%', style, animate = true }) => {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        ...style,
        height: `${height}px`,
        width: typeof width === 'number' ? `${width}px` : width,
        backgroundColor: 'var(--ps-skeleton-background)',
        borderRadius: 'var(--ps-skeleton-radius.text)',
        animation: animate ? `skeleton-loading var(--ps-skeleton-animation-duration) var(--ps-skeleton-animation-easing) infinite` : undefined,
      }}
      role="status"
      aria-label="Loading content"
      tabIndex={0}
    >
      <style>
        {`
          :root {
            --ps-skeleton-background: #f0f0f0;
            --ps-skeleton-radius: 4px;
            --ps-skeleton-animation-duration: 1400ms;
            --ps-skeleton-animation-easing: ease-in-out;
          }
          .skeleton {
            display: inline-block;
            overflow: hidden;
            position: relative;
            background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
            background-size: 200% 100%;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          @keyframes skeleton-loading {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: 0 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Skeleton;
