import React from 'react';

export type IconCustomVariant = 'squareFilled' | 'squareOutline' | 'circFilled' | 'circOutline';
export type IconCustomSize = 'sm' | 'md' | 'lg' | 'xl';

export interface IconCustomProps {
  /** Badge shape and fill style */
  variant?: IconCustomVariant;
  /** Badge size */
  size?: IconCustomSize;
  /** Icon to render inside the badge */
  icon?: 'check' | 'tag' | 'wrench' | 'heart' | 'star' | 'alert' | 'info' | 'cart';
  /** Badge fill color (overrides default PS Blue) */
  color?: string;
  /** Accessible label */
  'aria-label'?: string;
  className?: string;
}

const SIZE_MAP: Record<IconCustomSize, number> = {
  sm: 24,
  md: 32,
  lg: 40,
  xl: 48,
};

const PS_BLUE = '#005BA6';

// Inner icon paths (centered at 0,0, scaled to fit ~12px canvas)
function IconPath({ icon, color }: { icon: NonNullable<IconCustomProps['icon']>; color: string }) {
  switch (icon) {
    case 'check':
      return (
        <polyline
          points="-4,0 -1,3 4,-3"
          fill="none"
          stroke={color}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case 'tag':
      return (
        <path
          d="M-4,-4 L1,-4 L5,0 L1,4 L-4,4 Z M-2,-2 A0.8,0.8 0 1,0 -2.01,-2 Z"
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case 'wrench':
      return (
        <path
          d="M3,-4 C5,-2 5,2 3,3 L-4,4 L-4,3 L2,2 C4,1 4,-1 3,-3 Z"
          fill={color}
          strokeWidth={0}
        />
      );
    case 'heart':
      return (
        <path
          d="M0,4 C-1,3 -5,1 -5,-2 C-5,-4 -3,-5 -1.5,-4 C-0.5,-3.5 0,-3 0,-3 C0,-3 0.5,-3.5 1.5,-4 C3,-5 5,-4 5,-2 C5,1 1,3 0,4 Z"
          fill={color}
          strokeWidth={0}
        />
      );
    case 'star':
      return (
        <polygon
          points="0,-5 1.2,-1.7 4.8,-1.7 2,-0.3 3,3 0,1.2 -3,3 -2,-0.3 -4.8,-1.7 -1.2,-1.7"
          fill={color}
          strokeWidth={0}
        />
      );
    case 'alert':
      return (
        <>
          <path
            d="M0,-5 L5,4 L-5,4 Z"
            fill="none"
            stroke={color}
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
          <line x1="0" y1="-1" x2="0" y2="1.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
          <circle cx="0" cy="3" r="0.6" fill={color} />
        </>
      );
    case 'info':
      return (
        <>
          <circle cx="0" cy="0" r="5" fill="none" stroke={color} strokeWidth={1.5} />
          <line x1="0" y1="-0.5" x2="0" y2="3" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
          <circle cx="0" cy="-2.5" r="0.8" fill={color} />
        </>
      );
    case 'cart':
    default:
      return (
        <>
          <path
            d="M-5,-3 L-3,-3 L-1,3 L4,3 L5,-1 L-1,-1"
            fill="none"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="0" cy="4.5" r="0.8" fill={color} />
          <circle cx="4" cy="4.5" r="0.8" fill={color} />
        </>
      );
  }
}

export const IconCustom: React.FC<IconCustomProps> = ({
  variant = 'squareFilled',
  size = 'md',
  icon = 'check',
  color = PS_BLUE,
  'aria-label': ariaLabel,
  className,
}) => {
  const px = SIZE_MAP[size];
  const cx = px / 2;
  const cy = px / 2;
  const iconScale = px / 32; // scale icon paths proportionally
  const r = px * 0.18; // corner radius for squares

  // Compute badge background / border params
  const isFilled = variant === 'squareFilled' || variant === 'circFilled';
  const isCircle = variant === 'circFilled' || variant === 'circOutline';
  const circR = px / 2 - 1;

  const bgFill = isFilled ? color : 'white';
  const strokeColor = isFilled ? 'none' : color;
  const strokeWidth = isFilled ? 0 : 1.5;
  const iconColor = isFilled ? 'white' : color;

  return (
    <svg
      width={px}
      height={px}
      viewBox={`0 0 ${px} ${px}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel || `${variant} ${icon} icon`}
      className={className}
      style={{ display: 'inline-block', flexShrink: 0 }}
    >
      {/* Badge background */}
      {isCircle ? (
        <circle
          cx={cx}
          cy={cy}
          r={circR}
          fill={bgFill}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      ) : (
        <rect
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={px - strokeWidth}
          height={px - strokeWidth}
          rx={r}
          ry={r}
          fill={bgFill}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      )}

      {/* Inner icon, scaled and centered */}
      <g transform={`translate(${cx}, ${cy}) scale(${iconScale})`}>
        <IconPath icon={icon} color={iconColor} />
      </g>
    </svg>
  );
};

export default IconCustom;
