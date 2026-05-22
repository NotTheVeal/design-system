import React from 'react';

interface Step {
  label: string;
  completed: boolean;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, className }) => {
  return (
    <div className={`stepper ${className}`} style={{ padding: 'var(--ps-stepper-padding)', background: 'var(--ps-stepper-container-background)' }}>
      <style>
        {`
          :root {
            --ps-font-family: 'Source Sans Pro', sans-serif;
            --ps-primary-color: #005BA6;
            --ps-midnight-color: #002F48;
            --ps-spacing-4: 4px;
            --ps-spacing-8: 8px;
            --ps-spacing-12: 12px;
            --ps-spacing-16: 16px;
            --ps-spacing-20: 20px;
            --ps-spacing-24: 24px;
            --ps-spacing-32: 32px;
            --ps-spacing-40: 40px;
            --ps-spacing-48: 48px;
            --ps-spacing-64: 64px;
            --ps-border-radius: 4px;
            --ps-modal-border-radius: 8px;
            --ps-pill-border-radius: 100px;
          }
          .stepper {
            display: flex;
            align-items: center;
            padding: var(--ps-spacing-24);
            gap: var(--ps-spacing-8);
          }
          .step {
            position: relative;
            flex: 1;
            text-align: center;
          }
          .step-label {
            font-family: var(--ps-font-family);
            color: var(--ps-step-label-current);
          }
          .step-indicator {
            width: var(--ps-indicator-size);
            height: var(--ps-indicator-size);
            border-radius: var(--ps-indicator-radius);
            border: 2px solid transparent;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
          }
          .step-completed {
            background-color: var(--ps-step-indicator-finished-background);
            border-color: var(--ps-step-indicator-finished-border);
          }
          .step-current {
            background-color: var(--ps-step-indicator-current-background);
            border-color: var(--ps-step-indicator-current-border);
            box-shadow: var(--ps-step-indicator-current-shadow);
          }
          .connector {
            height: var(--ps-connector-height);
            background-color: var(--ps-step-connector-incomplete);
            flex: 1;
          }
          .connector-complete {
            background-color: var(--ps-step-connector-complete);
          }
        `}
      </style>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className={`step-indicator ${step.completed ? 'step-completed' : ''} ${currentStep === index ? 'step-current' : ''}`} role="step">
            {step.completed ? <span>✔</span> : index + 1}
          </div>
          <div className={`step`} aria-label={step.label} tabIndex={0}>
            <div className="step-label">{step.label}</div>
          </div>
          {index < steps.length - 1 && (
            <div className={`connector ${step.completed ? 'connector-complete' : ''}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
