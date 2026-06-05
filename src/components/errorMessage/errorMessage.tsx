import React from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  children?: React.ReactNode;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title,
  message,
  children,
  className = '',
}) => (
  <div
    className={className}
    role="alert"
    style={{
      display: 'flex',
      gap: 12,
      padding: '12px 16px',
      background: '#FACBCB',
      borderRadius: 4,
      fontFamily,
    }}
  >
    <span
      style={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: '#E00000',
        color: '#FFFFFF',
        marginTop: 2,
      }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="6" y1="4" x2="6" y2="6.5" />
        <circle cx="6" cy="9" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    </span>
    <div>
      {title && (
        <div style={{ fontSize: 14, fontWeight: 600, color: '#E00000', marginBottom: 2, fontFamily }}>
          {title}
        </div>
      )}
      <div style={{ fontSize: 14, color: '#E00000', fontFamily }}>
        {message ?? children}
      </div>
    </div>
  </div>
);

export default ErrorMessage;
