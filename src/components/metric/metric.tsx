import React from 'react';

interface MetricProps {
  value: string | number;
  label?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  prefix?: string;
  suffix?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const TrendUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 11l4-4 3 3 5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 5h4v4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const TrendDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 5l4 4 3-3 5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 11h4V7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Metric: React.FC<MetricProps> = ({
  value,
  label,
  trend,
  trendValue,
  prefix,
  suffix,
  size = 'md',
  className = '',
}) => {
  const valueSizes: Record<string, string> = { sm: 'text-[24px]', md: 'text-[32px]', lg: 'text-[48px]' };
  const trendColors: Record<string, string> = { up: 'text-[#0E7C55]', down: 'text-[#E00000]', neutral: 'text-[#777777]' };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <span className="text-[12px] font-semibold text-[#777777] uppercase tracking-wide">{label}</span>}
      <div className="flex items-baseline gap-1">
        {prefix && <span className="text-[16px] font-semibold text-[#4A4A4A]">{prefix}</span>}
        <span className={`${valueSizes[size]} font-bold text-[#002F48]`}>{value}</span>
        {suffix && <span className="text-[16px] font-semibold text-[#4A4A4A]">{suffix}</span>}
      </div>
      {trend && trendValue && (
        <div className={`flex items-center gap-1 ${trendColors[trend]}`}>
          {trend === 'up' ? <TrendUpIcon /> : trend === 'down' ? <TrendDownIcon /> : null}
          <span className="text-[14px] font-semibold">{trendValue}</span>
        </div>
      )}
    </div>
  );
};

export default Metric;
