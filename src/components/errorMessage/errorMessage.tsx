import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  title?: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, title, className = '' }) => (
  <div
    role="alert"
    className={`flex items-start gap-3 p-4 bg-[#FACBCB] border border-[#FF0000] rounded-[4px] ${className}`}
  >
    <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-[#FF0000] text-white mt-0.5">
      <AlertCircle size={12} strokeWidth={2.5} />
    </span>
    <div>
      {title && (
        <p className="text-[14px] font-semibold text-[#E00000] mb-0.5">{title}</p>
      )}
      <p className="text-[14px] text-[#E00000]">{message}</p>
    </div>
  </div>
);

export default ErrorMessage;
