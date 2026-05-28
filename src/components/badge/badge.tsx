import React from 'react';

type BadgeVariant = 'success' | 'error' | 'warning' | 'info' | 'neutral' | 'primary';
type BadgeType = 'status' | 'list';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  type?: BadgeType;
  className?: string;
}

const STATUS_STYLES: Record<BadgeVariant, string> = {
  success: 'bg-[#E2F5EE] text-[#0E7C55] border-[#0E7C55]',
  error:   'bg-[#FEF0F0] text-[#E00000] border-[#E00000]',
  warning: 'bg-[#FFF4E5] text-[#B45309] border-[#B45309]',
  info:    'bg-[#EFF9FE] text-[#005BA6] border-[#005BA6]',
  neutral: 'bg-[#F1F1F1] text-[#4A4A4A] border-[#DCDCDC]',
  primary: 'bg-[#005BA6] text-white border-[#005BA6]',
};

const LIST_STYLES: Record<BadgeVariant, string> = {
  success: 'bg-[#0E7C55] text-white',
  error:   'bg-[#E00000] text-white',
  warning: 'bg-[#B45309] text-white',
  info:    'bg-[#005BA6] text-white',
  neutral: 'bg-[#949494] text-white',
  primary: 'bg-[#005BA6] text-white',
};

const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'neutral',
  type = 'status',
  className = '',
}) => {
  if (type === 'list') {
    return (
      <span
        className={`inline-flex items-center px-3 h-[24px] rounded-full text-[12px] font-bold uppercase tracking-[0.5px] ${LIST_STYLES[variant]} ${className}`}
      >
        {label}
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-center px-2 h-[22px] rounded-[4px] text-[12px] font-bold border ${STATUS_STYLES[variant]} ${className}`}
    >
      {label}
    </span>
  );
};

export default Badge;
