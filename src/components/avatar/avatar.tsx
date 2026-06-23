import React from 'react';
const FONT = "'Source Sans 3', -apple-system, sans-serif";
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';
export interface AvatarProps { src?: string; alt?: string; initials?: string; size?: AvatarSize; status?: AvatarStatus; className?: string; style?: React.CSSProperties; }
const SIZE_MAP = { xs: { px: 24, fontSize: 10, statusPx: 6 }, sm: { px: 32, fontSize: 12, statusPx: 8 }, md: { px: 40, fontSize: 15, statusPx: 10 }, lg: { px: 48, fontSize: 18, statusPx: 12 }, xl: { px: 64, fontSize: 24, statusPx: 14 } };
const STATUS_COLORS = { online: '#17AB78', busy: '#FF0000', away: '#E3A92D', offline: '#DCDCDC' };
export const Avatar: React.FC<AvatarProps> = ({ src, alt = '', initials, size = 'md', status, className = '', style }) => {
  const { px, fontSize, statusPx } = SIZE_MAP[size];
  return (
    <div className={className} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: px, height: px, borderRadius: '50%', overflow: status ? 'visible' : 'hidden', flexShrink: 0, ...style }}>
      {src ? <img src={src} alt={alt} style={{ width: px, height: px, borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
      : <div aria-label={alt || initials} style={{ width: px, height: px, borderRadius: '50%', background: '#005BA6', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontSize, fontWeight: 600, lineHeight: 1, userSelect: 'none' }}>{initials?.slice(0, 2).toUpperCase() ?? '??'}</div>}
      {status && <span aria-label={`Status: ${status}`} style={{ position: 'absolute', bottom: 0, right: 0, width: statusPx, height: statusPx, borderRadius: '50%', background: STATUS_COLORS[status], border: '2px solid #FFFFFF' }} />}
    </div>
  );
};
export default Avatar;
