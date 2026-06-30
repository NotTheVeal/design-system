import React, { useState } from 'react';

// ── Shared tokens ──────────────────────────────────────────────────────────────

const FONT = "'Source Sans 3', -apple-system, sans-serif";
const PS_BLUE = '#005BA6';
const PS_BLUE_HOVER = '#004A8F';
const BORDER_DEFAULT = '1px solid #DCDCDC';
const BORDER_HOVER = `2px solid ${PS_BLUE}`;

// ── Types ──────────────────────────────────────────────────────────────────────

export type TakeActionStatus =
  | 'available'
  | 'low-stock'
  | 'out-of-stock'
  | 'pending'
  | 'approved'
  | 'on-order';

export interface TakeActionProps {
  /** Part / product name — displayed Bold 16px #2B2B2B */
  partName: string;
  /** Part number — displayed 12px #777777 */
  partNumber?: string;
  /** URL or data URI for the part image */
  imageSrc?: string;
  /** Accessible alt text for the image */
  imageAlt?: string;
  /** Custom icon node rendered in the image area when no imageSrc is provided */
  icon?: React.ReactNode;
  /** Optional status badge */
  status?: TakeActionStatus;
  /** Override the status badge label */
  statusLabel?: string;
  /** Label for the primary CTA button (defaults to "Take Action") */
  primaryLabel?: string;
  /** onClick for the primary CTA button */
  onPrimaryClick?: () => void;
  /** Label for the optional secondary ghost button */
  secondaryLabel?: string;
  /** onClick for the secondary ghost button */
  onSecondaryClick?: () => void;
  /** Disable both buttons */
  disabled?: boolean;
  /** Additional inline styles for the card wrapper */
  style?: React.CSSProperties;
  /** className forwarded to the card wrapper */
  className?: string;
}

// ── Status badge helpers ───────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  TakeActionStatus,
  { label: string; bg: string; color: string; dot: string }
> = {
  available:     { label: 'Available',     bg: '#E6F7EF', color: '#0E7D4B', dot: '#17AB78' },
  'low-stock':   { label: 'Low Stock',     bg: '#FEF5E6', color: '#92621A', dot: '#E3A92D' },
  'out-of-stock':{ label: 'Out of Stock',  bg: '#FEF0F0', color: '#B00000', dot: '#E00000' },
  pending:       { label: 'Pending',       bg: '#EFF9FE', color: '#005BA6', dot: '#009CF4' },
  approved:      { label: 'Approved',      bg: '#E6F7EF', color: '#0E7D4B', dot: '#17AB78' },
  'on-order':    { label: 'On Order',      bg: '#F3F0FF', color: '#5B21B6', dot: '#7C3AED' },
};

// ── Image / icon placeholder ───────────────────────────────────────────────────

const PlaceholderIcon: React.FC = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke={PS_BLUE}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

// ── Inline button components ───────────────────────────────────────────────────

interface PrimaryButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, onClick, disabled = false }) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const bg = disabled
    ? '#DCDCDC'
    : pressed
    ? '#003D73'
    : hovered
    ? PS_BLUE_HOVER
    : PS_BLUE;
  const color = disabled ? '#777777' : '#FFFFFF';
  const cursor = disabled ? 'not-allowed' : 'pointer';

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        padding: '0 20px',
        backgroundColor: bg,
        color,
        border: 'none',
        borderRadius: 4,
        fontFamily: FONT,
        fontSize: 14,
        fontWeight: 700,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.06em',
        cursor,
        transition: 'background-color 0.18s ease',
        outline: 'none',
        width: '100%',
        boxSizing: 'border-box' as const,
      }}
    >
      {label}
    </button>
  );
};

interface SecondaryButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ label, onClick, disabled = false }) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const bg = disabled ? 'transparent' : pressed ? '#DCEAED' : hovered ? '#EFF9FE' : 'transparent';
  const borderColor = disabled ? '#DCDCDC' : pressed ? PS_BLUE : hovered ? PS_BLUE : '#DCDCDC';
  const color = disabled ? '#AAAAAA' : PS_BLUE;
  const cursor = disabled ? 'not-allowed' : 'pointer';

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 36,
        padding: '0 20px',
        backgroundColor: bg,
        color,
        border: `1px solid ${borderColor}`,
        borderRadius: 4,
        fontFamily: FONT,
        fontSize: 13,
        fontWeight: 600,
        cursor,
        transition: 'background-color 0.18s ease, border-color 0.18s ease',
        outline: 'none',
        width: '100%',
        boxSizing: 'border-box' as const,
      }}
    >
      {label}
    </button>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
// TakeAction component
// ════════════════════════════════════════════════════════════════════════════════

export const TakeAction: React.FC<TakeActionProps> = ({
  partName,
  partNumber,
  imageSrc,
  imageAlt,
  icon,
  status,
  statusLabel,
  primaryLabel = 'Take Action',
  onPrimaryClick,
  secondaryLabel,
  onSecondaryClick,
  disabled = false,
  style,
  className = '',
}) => {
  const [cardHovered, setCardHovered] = useState(false);

  const border = cardHovered ? BORDER_HOVER : BORDER_DEFAULT;
  // Compensate for 1px→2px border shift so content doesn't jump
  const padding = cardHovered ? 19 : 20;

  const statusCfg = status ? STATUS_CONFIG[status] : null;
  const resolvedStatusLabel = statusLabel ?? statusCfg?.label;

  return (
    <div
      className={className}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
      style={{
        fontFamily: FONT,
        backgroundColor: '#FFFFFF',
        border,
        borderRadius: 4,
        padding,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        transition: 'border-color 0.18s ease, padding 0.01s',
        width: 280,
        ...style,
      }}
    >
      {/* Image / icon area */}
      <div
        style={{
          width: '100%',
          height: 140,
          backgroundColor: '#DCEAED',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt ?? partName}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : icon ? (
          icon
        ) : (
          <PlaceholderIcon />
        )}
      </div>

      {/* Part info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: '#2B2B2B',
            lineHeight: 1.3,
          }}
        >
          {partName}
        </div>
        {partNumber && (
          <div style={{ fontSize: 12, color: '#777777' }}>
            Part #: {partNumber}
          </div>
        )}
      </div>

      {/* Status badge */}
      {statusCfg && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            alignSelf: 'flex-start',
            backgroundColor: statusCfg.bg,
            borderRadius: 4,
            padding: '3px 8px',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: 7,
              height: 7,
              borderRadius: '50%',
              backgroundColor: statusCfg.dot,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: statusCfg.color,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            {resolvedStatusLabel}
          </span>
        </div>
      )}

      {/* Action buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
        <PrimaryButton label={primaryLabel} onClick={onPrimaryClick} disabled={disabled} />
        {secondaryLabel && (
          <SecondaryButton
            label={secondaryLabel}
            onClick={onSecondaryClick}
            disabled={disabled}
          />
        )}
      </div>
    </div>
  );
};

export default TakeAction;
