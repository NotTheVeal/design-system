import React from 'react';

// Fix: updated to 'Source Sans 3' (Source Sans Pro is deprecated)
const FONT = "'Source Sans 3', -apple-system, sans-serif";

// ── Types ──────────────────────────────────────────────────────────────────────

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars: Array<{ src?: string; name?: string; initials?: string; size?: AvatarSize; status?: AvatarStatus }>;
  max?: number;         // default 4 — shows "+N" after
  size?: AvatarSize;    // overrides per-avatar size
}

// ── Constants ──────────────────────────────────────────────────────────────────

const SIZE_MAP: Record<AvatarSize, { px: number; fontSize: number; statusPx: number }> = {
  sm: { px: 24, fontSize: 10, statusPx: 6  },
  md: { px: 32, fontSize: 12, statusPx: 8  },
  lg: { px: 40, fontSize: 15, statusPx: 10 },
  xl: { px: 56, fontSize: 20, statusPx: 12 },
};

// Figma spec: online=#17AB78, busy=#FF0000, away=#E3A92D, offline=#DCDCDC
const STATUS_COLORS: Record<AvatarStatus, string> = {
  online:  '#17AB78',  // PS Green (Figma spec exact)
  busy:    '#FF0000',  // Red (Figma spec exact)
  away:    '#E3A92D',  // Amber (Figma spec exact)
  offline: '#DCDCDC',  // Gray-200 (Figma spec exact)
};

// ── Avatar Component ───────────────────────────────────────────────────────────

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = '',
      initials,
      size = 'md',
      status,
      className = '',
      style,
      ...rest
    },
    ref
  ) => {
    const { px, fontSize, statusPx } = SIZE_MAP[size];

    return (
      <div
        ref={ref}
        className={className}
        {...rest}
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: px,
          height: px,
          borderRadius: '50%',
          overflow: status ? 'visible' : 'hidden',
          flexShrink: 0,
          ...style,
        }}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            style={{
              width: px,
              height: px,
              borderRadius: '50%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : (
          <div
            aria-label={alt || initials}
            style={{
              width: px,
              height: px,
              borderRadius: '50%',
              background: '#005BA6',   // PS Blue initials background
              color: '#FFFFFF',         // White text on blue
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: FONT,
              fontSize,
              fontWeight: 600,
              lineHeight: 1,
              userSelect: 'none',
              letterSpacing: '0.02em',
            }}
          >
            {initials?.slice(0, 2).toUpperCase() ?? '??'}
          </div>
        )}

        {status && (
          <span
            aria-label={`Status: ${status}`}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: statusPx,
              height: statusPx,
              borderRadius: '50%',
              background: STATUS_COLORS[status],
              border: '2px solid #FFFFFF',
            }}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

// ── Avatar Group Component ─────────────────────────────────────────────────────
// Shows 3-4 overlapping avatars. Overflow badge: "+N" in #DCDCDC bg, dark text.
// Overlap: -8px margin

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      avatars,
      max = 4,
      size = 'md',
      className = '',
      style,
      ...rest
    },
    ref
  ) => {
    const { px } = SIZE_MAP[size];
    const visible = avatars.slice(0, max);
    const overflow = avatars.length - max;

    return (
      <div
        ref={ref}
        className={className}
        {...rest}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          flexDirection: 'row',
          ...style,
        }}
        role="group"
        aria-label={`${avatars.length} team members`}
      >
        {visible.map((av, i) => {
          const initials = av.initials ?? (av.name ? av.name.split(' ').map(n => n[0]).join('').slice(0, 2) : '??');
          return (
            <div
              key={i}
              title={av.name}
              style={{
                marginLeft: i > 0 ? -8 : 0,
                zIndex: visible.length - i,
                position: 'relative',
                border: '2px solid #FFFFFF',
                borderRadius: '50%',
                flexShrink: 0,
              }}
            >
              <Avatar
                src={av.src}
                initials={initials}
                alt={av.name ?? initials}
                size={av.size ?? size}
                status={av.status}
              />
            </div>
          );
        })}

        {overflow > 0 && (
          <div
            aria-label={`${overflow} more`}
            style={{
              marginLeft: -8,
              zIndex: 0,
              position: 'relative',
              width: px,
              height: px,
              borderRadius: '50%',
              background: '#DCDCDC',      // Figma spec: #DCDCDC bg
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #FFFFFF',
              fontFamily: FONT,
              fontSize: px * 0.28,
              fontWeight: 700,
              color: '#4A4A4A',           // Dark text on gray
              flexShrink: 0,
              userSelect: 'none',
            }}
          >
            +{overflow}
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

export { Avatar, AvatarGroup };
export default Avatar;
