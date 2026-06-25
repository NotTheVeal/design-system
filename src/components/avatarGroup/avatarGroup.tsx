import React from 'react';

const FONT = "'Source Sans 3', -apple-system, sans-serif";

const SIZES = { sm: 24, md: 32, lg: 40 };
const FONT_SIZES = { sm: 10, md: 12, lg: 14 };

export interface AvatarItem {
  src?: string;
  initials?: string;
  name: string;
}

export interface AvatarGroupProps {
  avatars: AvatarItem[];
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const getInitialsBg = (name: string): string => {
  const colors = ['#005BA6', '#009CF4', '#0E7C55', '#002F48', '#B45309'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

const Avatar: React.FC<{ item: AvatarItem; size: 'sm' | 'md' | 'lg'; zIndex: number }> = ({ item, size, zIndex }) => {
  const px = SIZES[size];
  const fs = FONT_SIZES[size];
  const initials = item.initials || item.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div
      title={item.name}
      style={{
        width: px,
        height: px,
        borderRadius: '50%',
        border: '2px solid #FFFFFF',
        overflow: 'hidden',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: item.src ? 'transparent' : getInitialsBg(item.name),
        marginLeft: zIndex === 0 ? 0 : -8,
        zIndex,
        position: 'relative',
        flexShrink: 0,
        fontFamily: FONT,
        fontSize: fs,
        fontWeight: 600,
        color: '#FFFFFF',
        userSelect: 'none',
      }}
    >
      {item.src ? (
        <img src={item.src} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        initials
      )}
    </div>
  );
};

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 4,
  size = 'md',
  className = '',
}) => {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;
  const px = SIZES[size];
  const fs = FONT_SIZES[size];

  return (
    <div
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', fontFamily: FONT }}
      aria-label={`${avatars.length} members`}
    >
      {visible.map((av, i) => (
        <Avatar key={av.name + i} item={av} size={size} zIndex={visible.length - i} />
      ))}
      {overflow > 0 && (
        <div
          style={{
            width: px,
            height: px,
            borderRadius: '50%',
            border: '2px solid #FFFFFF',
            background: '#DCDCDC',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: -8,
            zIndex: 0,
            position: 'relative',
            fontFamily: FONT,
            fontSize: fs,
            fontWeight: 600,
            color: '#4A4A4A',
            userSelect: 'none',
          }}
          title={`+${overflow} more`}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
