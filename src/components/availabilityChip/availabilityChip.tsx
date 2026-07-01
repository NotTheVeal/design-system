import React from 'react';

export type AvailabilityStatus = 'available' | 'unavailable' | 'on-order' | 'discontinued';

export interface AvailabilityChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: AvailabilityStatus;
  label?: string;
}

const STATUS_CONFIG: Record<AvailabilityStatus, { dot: string; bg: string; text: string; defaultLabel: string }> = {
  'available':    { dot: '#0E7C55', bg: '#E2F5EE', text: '#0E7C55', defaultLabel: 'Available'    },
  'unavailable':  { dot: '#E00000', bg: '#FEF0F0', text: '#E00000', defaultLabel: 'Unavailable'  },
  'on-order':     { dot: '#B45309', bg: '#FFF4E5', text: '#B45309', defaultLabel: 'On Order'     },
  'discontinued': { dot: '#777777', bg: '#F1F1F1', text: '#777777', defaultLabel: 'Discontinued' },
};

const AvailabilityChip = React.forwardRef<HTMLSpanElement, AvailabilityChipProps>(
  function AvailabilityChip({ status, label, className = '', style, ...rest }, ref) {
    const config = STATUS_CONFIG[status];
    const displayLabel = label ?? config.defaultLabel;

    return (
      <span
        ref={ref}
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '5px 12px 5px 10px',
          borderRadius: 100,
          background: config.bg,
          fontFamily: "'Source Sans 3', -apple-system, sans-serif",
          fontSize: 12,
          fontWeight: 600,
          color: config.text,
          lineHeight: 1,
          whiteSpace: 'nowrap',
          ...style,
        }}
        aria-label={`Status: ${displayLabel}`}
        {...rest}
      >
        <span
          aria-hidden="true"
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: config.dot,
            flexShrink: 0,
          }}
        />
        {displayLabel}
      </span>
    );
  }
);

AvailabilityChip.displayName = 'AvailabilityChip';

export { AvailabilityChip };
export default AvailabilityChip;
