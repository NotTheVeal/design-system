import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  style?: React.CSSProperties;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  style,
  status,
}) => {
  const sizeDims: Record<string, { width: string; height: string; fontSize: string }> = {
    xs: { width: '24px', height: '24px', fontSize: '10px' },
    sm: { width: '32px', height: '32px', fontSize: '12px' },
    md: { width: '40px', height: '40px', fontSize: '14px' },
    lg: { width: '48px', height: '48px', fontSize: '18px' },
    xl: { width: '64px', height: '64px', fontSize: '24px' },
  };

  const statusSizeDims: Record<string, { width: string; height: string; borderWidth: string }> = {
    xs: { width: '8px',  height: '8px',  borderWidth: '1px' },
    sm: { width: '10px', height: '10px', borderWidth: '1px' },
    md: { width: '12px', height: '12px', borderWidth: '2px' },
    lg: { width: '14px', height: '14px', borderWidth: '2px' },
    xl: { width: '18px', height: '18px', borderWidth: '2px' },
  };

  const statusColors: Record<string, string> = {
    online:  '#17AB78',
    offline: '#CCCCCC',
    away:    '#E3A92D',
    busy:    '#E00000',
  };

  const initials = name
    ? name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : '?';

  const dims = sizeDims[size];
  const sDims = statusSizeDims[size];

  return (
    <div style={{ position: 'relative', display: 'inline-flex', flexShrink: 0, ...style }}>
      <div
        style={{
          width: dims.width,
          height: dims.height,
          borderRadius: '50%',
          overflow: 'hidden',
          backgroundColor: '#005BA6',
          color: '#FFFFFF',
          fontWeight: 600,
          fontSize: dims.fontSize,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
          fontFamily: "'Source Sans Pro', 'Source Sans 3', sans-serif",
        }}
      >
        {src
          ? (<img src={src} alt={alt || initials} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />)
          : (<span>{initials}</span>)}
      </div>
      {status && (
        <span
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            borderRadius: '50%',
            borderStyle: 'solid',
            borderColor: '#FFFFFF',
            width: sDims.width,
            height: sDims.height,
            borderWidth: sDims.borderWidth,
            backgroundColor: statusColors[status],
          }}
          aria-label={status}
        />
      )}
    </div>
  );
};

export default Avatar;
