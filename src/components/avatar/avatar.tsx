import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  status?: 'online' | 'offline' | 'away';
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  className = '',
  status,
}) => {
  const sizeClasses: Record<string, string> = {
    xs: 'w-[24px] h-[24px] text-[10px]',
    sm: 'w-[32px] h-[32px] text-[12px]',
    md: 'w-[40px] h-[40px] text-[14px]',
    lg: 'w-[48px] h-[48px] text-[18px]',
    xl: 'w-[64px] h-[64px] text-[24px]',
  };
  const statusSizeClasses: Record<string, string> = {
    xs: 'w-[8px] h-[8px] border',
    sm: 'w-[10px] h-[10px] border',
    md: 'w-[12px] h-[12px] border-2',
    lg: 'w-[14px] h-[14px] border-2',
    xl: 'w-[18px] h-[18px] border-2',
  };
  const statusColorClasses: Record<string, string> = {
    online: 'bg-[#17AB78]',
    offline: 'bg-[#CCCCCC]',
    away: 'bg-[#E3A92D]',
  };
  const initials = name
    ? name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : '?';

  return (
    <div className={`relative inline-flex flex-shrink-0 ${className}`}>
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-[#DCEAED] text-[#005BA6] font-semibold flex items-center justify-center select-none`}>
        {src ? <img src={src} alt={alt || name || 'Avatar'} className="w-full h-full object-cover" /> : <span>{initials}</span>}
      </div>
      {status && (
        <span className={`absolute bottom-0 right-0 rounded-full border-white ${statusSizeClasses[size]} ${statusColorClasses[status]}`} aria-label={status} />
      )}
    </div>
  );
};

export default Avatar;
