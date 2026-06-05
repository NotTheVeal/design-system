import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'lg' | 'sm';
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'lg',
  disabled = false,
  className,
  children,
  onClick,
  ...rest
}) => {

  if (disabled) {
    const sizeStyle = size === 'lg'
      ? 'h-[50px] px-6 text-[15px] font-semibold uppercase tracking-wide'
      : size === 'sm'
      ? 'h-[32px] px-4 text-[14px] font-semibold'
      : 'h-[40px] px-6 text-[15px] font-semibold';
    return (
      <button
        className={`border rounded-[4px] transition-all cursor-not-allowed bg-[#DCDCDC] border-[#777777] text-[#777777] ${sizeStyle} ${className ?? ''}`}
        disabled
        tabIndex={-1}
        style={{ fontFamily: "'Source Sans Pro', 'Source Sans 3', sans-serif" }}
        {...rest}
      >
        {children}
      </button>
    );
  }

  const getStyles = () => {
    if (variant === 'secondary' && size === 'sm') {
      return {
        base: 'border rounded-[4px] transition-all duration-200 focus:outline-none',
        visual: 'bg-white border-[#DCDCDC] text-[#4A4A4A] hover:bg-[#005BA6] hover:border-[#005BA6] hover:text-white active:bg-[#004A84] active:border-[#004A84] focus:shadow-[0_0_0_3px_rgba(0,147,244,0.3)]',
        sizing: 'h-[32px] px-4 text-[14px] font-semibold',
      };
    }
    if (variant === 'tertiary') {
      return {
        base: 'rounded-full border-0 transition-all duration-200 focus:outline-none',
        visual: 'bg-[#F1F1F1] text-[#2B2B2B] hover:bg-[#DCDCDC] active:bg-[#CCCCCC] focus:shadow-[0_0_0_3px_rgba(0,147,244,0.3)]',
        sizing: 'h-[40px] px-6 text-[15px] font-semibold',
      };
    }
    // Primary (default) — outline → fills on hover, border stays brand blue
    return {
      base: 'border-2 rounded-[4px] transition-all duration-200 focus:outline-none',
      visual: 'bg-white border-[#005BA6] text-[#005BA6] hover:bg-[#005BA6] hover:border-[#005BA6] hover:text-white active:bg-[#004A84] active:border-[#004A84] focus:shadow-[0_0_0_3px_rgba(0,147,244,0.3)]',
      sizing: 'h-[50px] px-6 text-[15px] font-semibold uppercase tracking-wide',
    };
  };

  const { base, visual, sizing } = getStyles();

  return (
    <button
      className={`${base} ${visual} ${sizing} ${className ?? ''}`}
      onClick={onClick}
      style={{ fontFamily: "'Source Sans Pro', 'Source Sans 3', sans-serif" }}
      {...rest}
      tabIndex={0}
    >
      {children}
    </button>
  );
};

export default Button;
