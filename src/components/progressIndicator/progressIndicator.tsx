import React from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

interface ProgressIndicatorProps {
  /** 0â100 for bar mode, or use steps */
  value?: number;
  /** Total steps for step mode */
  totalSteps?: number;
  /** Current step (1-based) for step mode */
  currentStep?: number;
  /** Labels for each step */
  labels?: string[];
  /** Height of the progress bar in px */
  height?: number;
  /** Show percentage label */
  showLabel?: boolean;
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  value,
  totalSteps,
  currentStep = 1,
  labels = [],
  height = 8,
  showLabel = false,
  className = '',
}) => {

  // Step mode
  if (totalSteps) {
    return (
      <div className={className} style={{ fontFamily, width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
          {Array.from({ length: totalSteps }, (_, i) => {
            const stepNum = i + 1;
            const isCompleted = stepNum < currentStep;
            const isActive = stepNum === currentStep;
            const label = labels[i];

            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                {/* Connector line */}
                {i > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 11,
                      left: '-50%',
                      width: '100%',
                      height: 2,
                      background: isCompleted || isActive ? '#005BA6' : '#DCDCDC',
                      zIndex: 0,
                    }}
                  />
                )}
                {/* Step circle */}
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: isCompleted || isActive ? '#005BA6' : '#FFFFFF',
                    border: `2px solid ${isCompleted || isActive ? '#005BA6' : '#DCDCDC'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 1,
                    flexShrink: 0,
                  }}
                >
                  {isCompleted ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="2 6 5 9 10 3" />
                    </svg>
                  ) : (
                    <span style={{ fontSize: 11, fontWeight: 600, color: isActive ? '#FFFFFF' : '#949494', fontFamily }}>
                      {stepNum}
                    </span>
                  )}
                </div>
                {/* Step label */}
                {label && (
                  <span style={{
                    marginTop: 6,
                    fontSize: 12,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#005BA6' : isCompleted ? '#4A4A4A' : '#777777',
                    textAlign: 'center',
                    fontFamily,
                  }}>
                    {label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Bar mode
  const pct = Math.min(100, Math.max(0, value ?? 0));
  return (
    <div className={className} style={{ fontFamily, width: '100%' }}>
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12, color: '#777777', fontFamily }}>
          <span>Progress</span>
          <span style={{ fontWeight: 600, color: '#4A4A4A' }}>{pct}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{
          width: '100%',
          height,
          background: '#DCDCDC',
          borderRadius: height / 2,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: '#005BA6',
            borderRadius: height / 2,
            transition: 'width 300ms ease',
          }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;
