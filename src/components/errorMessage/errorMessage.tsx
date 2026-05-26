import React from 'react';

interface ErrorMessageProps {
  type: 'inline' | 'banner' | 'toast';
  title?: string;
  message: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ type, title, message, className }) => {
  const isInline = type === 'inline';
  const isBanner = type === 'banner';
  const isToast = type === 'toast';

  return (
    <div
      className={`${className} ${isInline ? 'inline-error' : isBanner ? 'banner-error' : 'toast-error'}`}
      role="alert"
      aria-label={isInline ? 'Inline error message' : isBanner ? 'Banner error message' : 'Toast error message'}
    >
      {isBanner && (
        <div className="banner-header">
          <span className="banner-icon" aria-hidden="true"></span>
          <span className="banner-title">{title}</span>
        </div>
      )}
      <p className="error-message">{message}</p>
    </div>
  );
};

export default ErrorMessage;

const styles = (
  <style>
    {`
      :root {
        --ps-font: 'Source Sans Pro', sans-serif;
        --ps-blue: #005BA6;
        --ps-midnight: #002F48;
        --error-inline-border-color: #D32F2F;
        --error-inline-text-color: #D32F2F;
        --error-banner-bg: #FEF0F0;
        --error-banner-border-color: #FACBCB;
        --error-banner-title-color: #E00000;
        --error-banner-body-color: #4A4A4A;
        --error-toast-bg: #FEF0F0;
        --error-toast-text-color: #4A4A4A;
        --error-field-label-error-color: #D32F2F;
      }
      .inline-error {
        color: var(--error-inline-text-color);
        border: 1px solid var(--error-inline-border-color);
        font-size: 12px;
        font-weight: 400;
        margin-top: 4px;
        padding: 8px;
      }
      .banner-error {
        background-color: var(--error-banner-bg);
        border: 1px solid var(--error-banner-border-color);
        border-radius: 4px;
        padding: 12px 16px;
        display: flex;
        align-items: center;
      }
      .banner-icon {
        color: var(--error-banner-icon-color);
        font-size: 20px;
        margin-right: 8px;
      }
      .banner-title {
        color: var(--error-banner-title-color);
        font-size: 14px;
        font-weight: 600;
      }
      .error-message {
        color: var(--error-banner-body-color);
        font-size: 14px;
      }
      .toast-error {
        background-color: var(--error-toast-bg);
        padding: 12px;
        color: var(--error-toast-text-color);
        border-radius: 4px;
      }
    `}
  </style>
);
