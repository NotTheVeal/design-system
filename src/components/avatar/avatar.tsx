import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  online?: boolean;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt = 'User avatar', size = 'md', fallback, online, className }) => {
  const sizes = {
    xs: 'var(--ps-avatar-size-xs)',
    sm: 'var(--ps-avatar-size-sm)',
    md: 'var(--ps-avatar-size-md)',
    lg: 'var(--ps-avatar-size-lg)',
    xl: 'var(--ps-avatar-size-xl)',
  };

  return (
    <div
      role="img"
      aria-label={alt}
      className={`avatar ${className}`}
      style={{
        width: sizes[size],
        height: sizes[size],
        borderRadius: 'var(--ps-avatar-radius)',
        backgroundColor: src ? 'transparent' : 'var(--ps-avatar-fallback-background)',
        border: 'var(--ps-avatar-border-width) solid var(--ps-avatar-border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 'inherit',
            objectFit: 'cover',
          }}
        />
      ) : (
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--ps-avatar-fallback-text)',
            fontWeight: 'var(--ps-avatar-fallback-fontWeight)',
            height: '100%',
            fontSize: `calc(${sizes[size]} * 0.5)`,
          }}
        >
          {fallback}
        </span>
      )}
      {online !== undefined && (
        <span
          className="status"
          style={{
            position: 'absolute',
            bottom: '-4px',
            right: '-4px',
            width: 'var(--ps-avatar-status-size)',
            height: 'var(--ps-avatar-status-size)',
            borderRadius: '50%',
            backgroundColor: online ? 'var(--ps-avatar-status-online)' : 'var(--ps-avatar-status-offline)',
            border: `${sizes[size]} solid var(--ps-avatar-status-border)`,
          }}
          aria-label={online ? 'Online' : 'Offline'}
        />
      )}
    </div>
  );
};

export default Avatar;
