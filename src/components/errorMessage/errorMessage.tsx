import React from 'react';

interface ErrorMessageProps {
  message: string;
  title?: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, title, className = '' }) => {
  return (
    <div role="alert" className={`flex items-start gap-3 p-4 bg-[#FEF0F0] border border-[#E00000] rounded-[4px] ${className}`}>
      <span className="flex-shrink-0 w-[20px] h-[20px] flex items-center justify-center rounded-full bg-[#E00000] text-white text-[12px] font-bold">
        !
      </span>
      <div>
        {title && <p className="text-[14px] font-semibold text-[#E00000] mb-0.5">{title}</p>}
        <p className="text-[14px] text-[#E00000]">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
