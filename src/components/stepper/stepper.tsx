import React from 'react';

export type StepStatus = 'completed' | 'active' | 'upcoming' | 'error';

export interface Step {
  id: string;
  label: string;
  description?: string;
  status?: StepStatus;
}

export interface StepperProps {
  steps: Step[];
  currentStep?: number;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

// PS Design System Stepper:
// Circle: 32×32px, 50% radius
// Completed: #17AB78 green fill, white checkmark
// Active: #005BA6 fill, white Bold number
// Upcoming: white bg, 1px #DCDCDC border, #777777 number
// Error: #E00000 fill, white ✕
// Connector: 1px line, #17AB78 if completed, #DCDCDC if not

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export const Stepper: React.FC<StepperProps> = ({
  steps, currentStep, orientation = 'horizontal', className = '',
}) => {
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const isHorizontal = orientation === 'horizontal';

  const getStatus = (step: Step, idx: number): StepStatus => {
    if (step.status) return step.status;
    if (currentStep === undefined) return 'upcoming';
    if (idx < currentStep) return 'completed';
    if (idx === currentStep) return 'active';
    return 'upcoming';
  };

  const getCircleStyle = (status: StepStatus): React.CSSProperties => {
    const base: React.CSSProperties = {
      width: 32, height: 32, borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, fontWeight: 700, fontSize: 14, fontFamily: font,
      transition: 'all 200ms ease',
    };
    switch (status) {
      case 'completed': return { ...base, background: '#17AB78', color: '#FFFFFF', border: 'none' };
      case 'active':    return { ...base, background: '#005BA6', color: '#FFFFFF', border: 'none' };
      case 'error':     return { ...base, background: '#E00000', color: '#FFFFFF', border: 'none' };
      default:          return { ...base, background: '#FFFFFF', color: '#777777', border: '1px solid #DCDCDC' };
    }
  };

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: isHorizontal ? 'row' : 'column',
        alignItems: isHorizontal ? 'flex-start' : 'flex-start',
        fontFamily: font,
      }}
    >
      {steps.map((step, idx) => {
        const status = getStatus(step, idx);
        const isLast = idx === steps.length - 1;
        const connectorDone = getStatus(step, idx) === 'completed';

        return (
          <React.Fragment key={step.id}>
            <div style={{
              display: 'flex',
              flexDirection: isHorizontal ? 'column' : 'row',
              alignItems: isHorizontal ? 'center' : 'flex-start',
              gap: isHorizontal ? 8 : 12,
              flex: isHorizontal && !isLast ? 1 : undefined,
            }}>
              {/* Circle + connector row for horizontal */}
              <div style={{ display: 'flex', alignItems: 'center', width: isHorizontal ? '100%' : undefined }}>
                <div style={getCircleStyle(status)}>
                  {status === 'completed' && <CheckIcon />}
                  {status !== 'completed' && (
                    <span>{status === 'error' ? '✕' : idx + 1}</span>
                  )}
                </div>
                {/* Connector line — horizontal only, between circles */}
                {isHorizontal && !isLast && (
                  <div style={{ flex: 1, height: 1, background: connectorDone ? '#17AB78' : '#DCDCDC', margin: '0 4px' }} />
                )}
              </div>
              {/* Label */}
              <div style={{ paddingLeft: isHorizontal ? 0 : 4, textAlign: isHorizontal ? 'center' : 'left' }}>
                <div style={{ fontSize: 13, fontWeight: status === 'active' ? 600 : 400, color: status === 'active' ? '#002F48' : status === 'upcoming' ? '#777777' : '#4A4A4A' }}>
                  {step.label}
                </div>
                {step.description && (
                  <div style={{ fontSize: 12, color: '#949494', marginTop: 2 }}>{step.description}</div>
                )}
              </div>
            </div>
            {/* Connector for vertical */}
            {!isHorizontal && !isLast && (
              <div style={{ width: 1, height: 20, background: connectorDone ? '#17AB78' : '#DCDCDC', marginLeft: 16 }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;
