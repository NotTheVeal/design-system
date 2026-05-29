import React from 'react';

interface StatusProps {
  type: 'active' | 'inactive' | 'warning' | 'error' | 'info';
  className?: string;
}

const dotColors: Record<string, string> = {
  active:   'bg-[#17AB78]',
  inactive: 'bg-[#949494]',
  warning:  'bg-[#E3A92D]',
  error:    'bg-[#FF0000]',
  info:     'bg-[#009CF4]',
};

const textColors: Record<string, string> = {
  active:   'text-[#0E7C55]',
  inactive: 'text-[#4A4A4A]',
  warning:  'text-[#B45309]',
  error:    'text-[#E00000]',
  info:     'text-[#005BA6]',
};

const Status: React.FC<StatusProps> = ({ type, className = '' }) => (
  <div
    className={`inline-flex items-center gap-2 ${className}`}
    role="status"
    aria-live="polite"
  >
    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColors[type] ?? 'bg-gray-400'}`} />
    <span className={`text-sm font-medium capitalize ${textColors[type] ?? 'text-gray-600'}`}>
      {type}
    </span>
  </div>
);

export default Status;
