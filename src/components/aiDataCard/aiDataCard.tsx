import React from 'react';

interface AiDataCardProps {
  title: string;
  value?: string | number;
  description?: string;
  insight?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  confidence?: number;
  isLoading?: boolean;
  className?: string;
}

const TrendUp = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 10l3-3 2 2 5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const TrendDown = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4l3 3 2-2 5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const SparkleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 1l1.5 4.5L14 7l-4.5 1.5L8 13l-1.5-4.5L2 7l4.5-1.5L8 1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

const AiDataCard: React.FC<AiDataCardProps> = ({
  title,
  value,
  description,
  insight,
  trend,
  trendValue,
  icon,
  actions,
  confidence,
  isLoading = false,
  className = '',
}) => {
  const trendColors: Record<string, string> = { up: 'text-[#0E7C55]', down: 'text-[#E00000]', neutral: 'text-[#777777]' };

  return (
    <div className={`bg-white border border-[#DCDCDC] rounded-[8px] shadow-[0_1px_4px_rgba(0,47,72,0.08)] p-4 flex flex-col gap-3 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          {icon && <div className="w-[36px] h-[36px] rounded-full bg-[#EFF9FE] flex items-center justify-center text-[#005BA6]">{icon}</div>}
          <span className="text-[12px] font-semibold text-[#777777] uppercase tracking-wide">{title}</span>
        </div>
        {actions && <div className="flex-shrink-0">{actions}</div>}
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-2">
          <div className="h-[32px] bg-[#F1F1F1] rounded-[4px] animate-pulse w-2/3" />
          <div className="h-[16px] bg-[#F1F1F1] rounded-[4px] animate-pulse w-full" />
        </div>
      ) : (
        <>
          {value !== undefined && (
            <div className="flex items-baseline gap-2">
              <span className="text-[32px] font-bold text-[#002F48]">{value}</span>
              {trend && trendValue && (
                <span className={`flex items-center gap-0.5 text-[13px] font-semibold ${trendColors[trend]}`}>
                  {trend === 'up' ? <TrendUp /> : trend === 'down' ? <TrendDown /> : null}
                  {trendValue}
                </span>
              )}
            </div>
          )}
          {description && <p className="text-[14px] text-[#777777]">{description}</p>}
          {insight && (
            <div className="flex items-start gap-2 px-3 py-2 bg-[#EFF9FE] rounded-[4px] border border-[#DCEAED]">
              <span className="flex-shrink-0 text-[#005BA6] mt-0.5"><SparkleIcon /></span>
              <p className="text-[13px] text-[#005BA6]">{insight}</p>
            </div>
          )}
          {confidence !== undefined && (
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#777777]">AI Confidence</span>
              <div className="flex-1 h-[4px] bg-[#DCDCDC] rounded-full overflow-hidden">
                <div className="h-full bg-[#005BA6] rounded-full" style={{ width: `${confidence}%` }} />
              </div>
              <span className="text-[11px] font-semibold text-[#4A4A4A]">{confidence}%</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AiDataCard;
