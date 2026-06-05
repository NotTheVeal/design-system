import React from 'react';

type BadgeVariant = 'success' | 'error' | 'warning' | 'info' | 'neutral' | 'primary';
type BadgeType = 'status' | 'list' | 'assignment';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  type?: BadgeType;
  filled?: boolean;
  className?: string;
}

// Status badges — small, colored-bg + border, 4px radius
const STATUS_STYLES: Record<BadgeVariant, string> = {
  success: 'bg-[#E2F5EE] text-[#0E7C55] border-[#0E7C55]',
  error:   'bg-[#FEF0F0] text-[#E00000] border-[#E00000]',
  warning: 'bg-[#FFF4E5] text-[#B45309] border-[#B45309]',
  info:    'bg-[#EFF9FE] text-[#005BA6] border-[#005BA6]',
  neutral: 'bg-[#F1F1F1] text-[#4A4A4A] border-[#DCDCDC]',
  primary: 'bg-[#E8F0FB] text-[#005BA6] border-[#005BA6]',
};

// List badges — large pill, outlined (colored border + colored text, white bg)
const LIST_STYLES: Record<BadgeVariant, string> = {
  success: 'border-[#0E7C55] text-[#0E7C55] bg-white',
  error:   'border-[#E00000] text-[#E00000] bg-white',
  warning: 'border-[#B45309] text-[#B45309] bg-white',
  info:    'border-[#005BA6] text-[#005BA6] bg-white',
  neutral: 'border-[#949494] text-[#777777] bg-white',
  primary: 'border-[#005BA6] text-[#005BA6] bg-white',
};

const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'neutral',
  type = 'status',
  filled = false,
  className = '',
}) => {
  const font = { fontFamily: "'Source Sans Pro', 'Source Sans 3', sans-serif" };

  // Assignment status — large, orange-outlined rectangle; filled=true for COMPLETED state
  if (type === 'assignment') {
    const base = 'border-2 border-[#FF9505] rounded-[4px] h-[40px] px-5 text-[13px] font-bold uppercase tracking-[0.5px] inline-flex items-center justify-center';
    const state = filled
      ? 'bg-[#1A1A1A] text-white'
      : 'bg-white text-[#2B2B2B]';
    return <span className={`${base} ${state} ${className}`} style={font}>{label}</span>;
  }

  if (type === 'list') {
    return (
      <span
        className={`inline-flex items-center px-4 h-[28px] rounded-full text-[12px] font-bold uppercase tracking-[0.5px] border ${LIST_STYLES[variant]} ${className}`}
        style={font}
      >
        {label}
      </span>
    );
  }

  // type === 'status' (default)
  return (
    <span
      className={`inline-flex items-center px-2 h-[22px] rounded-[4px] text-[12px] font-bold border ${STATUS_STYLES[variant]} ${className}`}
      style={font}
    >
      {label}
    </span>
  );
};

export default Badge;
