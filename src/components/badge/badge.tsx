import React from 'react';

interface BadgeProps {
  text: string;
  type?: 'assignmentStatus' | 'status' | 'list';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ text, type = 'status', className }) => {
  const baseStyles = 'inline-flex items-center font-source-sans-pro';
  const typeStyles = {
    assignmentStatus: 'bg-[#fffbf2] border-[#ffb000] rounded-[3px] text-[#1e1e1e] font-bold h-[26px] px-[8px]',
    status: 'rounded-[4px] text-[12px] font-[600]',
    list: 'rounded-[40px] text-[12px] font-[700] uppercase leading-[27px] px-[10px] text-[#0e72c7] bg-[#e0efff]',
  };
  
  const styles = `${baseStyles} ${typeStyles[type]} ${className || ''}`;

  return (
    <span className={styles} role="status" aria-label={text}>
      {text}
    </span>
  );
};

export default Badge;
