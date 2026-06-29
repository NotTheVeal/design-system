import React from 'react';

export interface ErrorMessageProps {
  message: string;
  className?: string;
}

// PS Design System inline error:
// 12px Source Sans Pro, #E00000 (Figma error color), with X-circle icon
// Used below input/select fields for validation errors

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className = '' }) => {
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  return (
    <div
      className={className}
      role="alert"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 4,
        fontSize: 12,
        color: '#E00000',
        fontFamily: font,
        fontWeight: 400,
        lineHeight: 1.4,
        marginTop: 4,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
