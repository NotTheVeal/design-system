import React from 'react';
import { Avatar, AvatarSize } from '../avatar/avatar';

export interface AvatarItem {
  name?: string;
  src?: string;
  status?: 'online' | 'away' | 'busy' | 'offline';
}

export interface AvatarGroupProps {
  avatars: AvatarItem[];
  size?: AvatarSize;
  max?: number;
  className?: string;
}

// Figma (node 4485:134):
// Overlap by 8px (marginLeft -8px after first)
// Each avatar has 2px white border
// Overflow chip: same size, #DCDCDC bg, #4A4A4A SemiBold 12px

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars, size = 'md', max = 4, className = '',
}) => {
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const px = { xs:24, sm:32, md:40, lg:48, xl:64 }[size] || 40;
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;
  const overflowFontSize = px <= 32 ? 10 : px <= 40 ? 12 : 14;

  return (
    <div
      className={className}
      style={{ display: 'flex', alignItems: 'center' }}
      role="group"
      aria-label={`${avatars.length} member${avatars.length !== 1 ? 's' : ''}`}
    >
      {visible.map((av, i) => (
        <div
          key={i}
          style={{
            marginLeft: i === 0 ? 0 : -8,
            zIndex: visible.length - i,
            borderRadius: '50%',
          }}
          title={av.name}
        >
          <Avatar name={av.name} src={av.src} size={size} status={av.status} />
        </div>
      ))}
      {overflow > 0 && (
        <div
          style={{
            marginLeft: -8,
            width: px, height: px,
            borderRadius: '50%',
            background: '#DCDCDC',
            border: '2px solid #FFFFFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: overflowFontSize,
            fontWeight: 600,
            color: '#4A4A4A',
            fontFamily: font,
            flexShrink: 0,
            zIndex: 0,
          }}
          aria-label={`${overflow} more member${overflow !== 1 ? 's' : ''}`}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
