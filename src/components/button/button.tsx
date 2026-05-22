import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'lg' | 'sm';
  disabled?: boolean;
  className?: string;
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
  const baseStyle = "border rounded transition-all focus:outline-none";
  const disabledStyle = disabled ? "cursor-not-allowed opacity-50" : "";
  
  const variantStyles = {
    primary: {
      normal: `bg-white border-2 border-transparent text-[#005BA6]`,
      hover: `hover:bg-[#005BA6] hover:text-white`,
      focus: `focus:bg-[#005BA6] focus:text-white focus:ring-0 focus:ring-[#0093F4]`,
    },
    secondary: {
      lg: {
        normal: `bg-white border-2 border-[#005BA6] text-[#005BA6]`,
        hover: `hover:bg-[#005BA6] hover:text-white`,
      },
      sm: {
        normal: `bg-white border border-[#DCDCDC] text-black`,
        hover: `hover:bg-[#005BA6] hover:text-white`,
      }
    },
    tertiary: {
      lg: {
        normal: `bg-[#F0F0F0] text-black border-transparent`,
        hover: `hover:bg-[#DCDCDC]`,
      }
    }
  };

  const style = variant === 'primary' ? variantStyles.primary :
                variant === 'secondary' && size === 'lg' ? variantStyles.secondary.lg :
                variant === 'secondary' && size === 'sm' ? variantStyles.secondary.sm :
                variantStyles.tertiary.lg;

  return (
    <button
      className={`${baseStyle} ${style.normal} ${disabledStyle} ${className}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...rest}
      aria-label={rest['aria-label']}
      tabIndex={disabled ? -1 : 0}
    >
      {children}
    </button>
  );
};

export default Button;
