import React from 'react';

interface ProgressIndicatorProps {
  steps: { label: string; status: 'complete' | 'active' | 'inactive' }[];
  className?: string;
  currentStep: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ steps, className, currentStep }) => {
  return (
    <div className={`progress-indicator ${className}`}>
      <style jsx>{`
        :root {
          --ps-primary-color: #005BA6;
          --ps-background-color: #ffffff;
          --ps-border-color: #DCDCDC;
          --ps-text-secondary: #6B6B6B;
          --ps blue: #005BA6;
          --ps-font-family: 'Source Sans Pro', sans-serif;
          --ps-progress-height: 8px;
          --ps-progress-radius: 100px;
          --ps-label-color: var(--ps-text-secondary);
          --ps-label-font-size: 13px;
          --ps-label-font-weight: 400;
          --ps-label-gap: 8px;
        }

        .progress-indicator {
          font-family: var(--ps-font-family);
          width: 100%;
          display: flex;
          align-items: center;
        }

        .step {
          position: relative;
          flex: 1;
          text-align: center;
        }

        .step-label {
          color: var(--ps-label-color);
          font-size: var(--ps-label-font-size);
          font-weight: var(--ps-label-font-weight);
          margin-bottom: var(--ps-label-gap);
        }

        .step-node {
          width: var(--ps-progress-height);
          height: var(--ps-progress-height);
          border-radius: 100px;
          display: inline-block;
          transition: background 0.3s;
        }

        .connector {
          height: 2px;
          background-color: var(--ps-border-color);
          flex: 1;
          margin: auto 0;
        }

        .step.complete .step-node {
          background-color: var(--ps-primary-color);
        }

        .step.active .step-node {
          background-color: var(--ps-background-color);
          border: 2px solid var(--ps-primary-color);
        }

        .step.inactive .step-node {
          background-color: var(--ps-border-color);
        }
      `}</style>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className={`step ${step.status}`}>
            <div className="step-node" />
            <div className="step-label">{step.label}</div>
          </div>
          {index < steps.length - 1 && <div className="connector" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressIndicator;
