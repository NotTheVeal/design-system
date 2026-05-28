import React from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center py-12 px-6 ${className}`}>
      {icon && (
        <div className="w-[64px] h-[64px] flex items-center justify-center rounded-full bg-[#F1F1F1] text-[#949494] mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-[18px] font-semibold text-[#4A4A4A] mb-2">{title}</h3>
      {description && <p className="text-[14px] text-[#777777] max-w-[400px] mb-6">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
