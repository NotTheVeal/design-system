import React from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'away' | 'busy' | 'offline';

export interface AvatarProps {
  name?: string;
  src?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  className?: string;
}

// Figma sizes: XS=24, SM=32, MD=40, LG=48, XL=64
const SIZES: Record<AvatarSize, number> = { xs:24, sm:32, md:40, lg:48, xl:64 };

// Generated palette — consistent color per name
const PALETTE = ['#005BA6','#17AB78','#E3A92D','#D32F2F','#6D28D9','#0E7C55','#B45309','#002F48','#009CF4','#FF9505'];
function getColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Status dot colors per Figma
const STATUS_COLORS: Record<AvatarStatus, string> = {
  online:  '#17AB78',
  away:    '#E3A92D',
  busy:    '#D32F2F',
  offline: '#777777',
};

export const Avatar: React.FC<AvatarProps> = ({
  name = '', src, size = 'md', status, className = '',
}) => {
  const px = SIZES[size];
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const initials = getInitials(name);
  const bg = src ? 'transparent' : getColor(name || '?');
  // Status dot sizing per Figma: 14px outer, 10px inner
  const dotOuter = Math.max(10, Math.round(px * 0.35));
  const dotInner = Math.max(7, Math.round(px * 0.25));
  const fontSize = px <= 24 ? 9 : px <= 32 ? 11 : px <= 40 ? 13 : px <= 48 ? 15 : 20;

  return (
    <div className={className} style={{ position: 'relative', width: px, height: px, flexShrink: 0 }}>
      <div style={{
        width: px, height: px,
        borderRadius: '50%',
        background: bg,
        border: '2px solid #FFFFFF',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: font, fontSize, fontWeight: 700, color: '#FFFFFF',
        userSelect: 'none',
      }}>
        {src ? (
          <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : name ? (
          initials
        ) : (
          // Icon fallback
          <svg width={px * 0.5} height={px * 0.5} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
        )}
      </div>
      {/* Status dot — bottom-right, white border ring */}
      {status && (
        <span style={{
          position: 'absolute', bottom: 0, right: 0,
          width: dotOuter, height: dotOuter,
          borderRadius: '50%',
          background: '#FFFFFF',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 0 1.5px #FFFFFF',
        }}>
          <span style={{
            width: dotInner, height: dotInner,
            borderRadius: '50%',
            background: STATUS_COLORS[status],
          }} />
        </span>
      )}
    </div>
  );
};

export default Avatar;
