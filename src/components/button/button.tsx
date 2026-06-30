import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
  size?: 'lg' | 'sm';
}

// Fix: 'Source Sans 3' is the correct font name (Source Sans Pro is deprecated)
const FONT = "'Source Sans 3', -apple-system, sans-serif";

// Unique class prefix used for CSS :hover selectors injected below
const CLS = 'ps-btn';

const BUTTON_CSS = `
.${CLS}-primary {
  background-color: #FFFFFF;
  border-color: #005BA6;
  color: #005BA6;
}
.${CLS}-primary:hover:not(:disabled) {
  background-color: #005BA6;
  border-color: #009CF4;
  color: #FFFFFF;
}
.${CLS}-primary:active:not(:disabled) {
  background-color: #004A84;
  border-color: #004A84;
  color: #FFFFFF;
}
.${CLS}-secondary {
  background-color: #FFFFFF;
  border-color: #DCDCDC;
  color: #4A4A4A;
}
.${CLS}-secondary:hover:not(:disabled) {
  background-color: #005BA6;
  border-color: #005BA6;
  color: #FFFFFF;
}
.${CLS}-secondary:active:not(:disabled) {
  background-color: #004A84;
  border-color: #004A84;
  color: #FFFFFF;
}
.${CLS}-tertiary {
  background-color: #F1F1F1;
  border-color: transparent;
  color: #4A4A4A;
  border-radius: 100px !important;
}
.${CLS}-tertiary:hover:not(:disabled) {
  background-color: #DCDCDC;
}
.${CLS}-tertiary:active:not(:disabled) {
  background-color: #CCCCCC;
}
.${CLS}-ghost {
  background-color: transparent;
  border-color: transparent;
  color: #005BA6;
}
.${CLS}-ghost:hover:not(:disabled) {
  background-color: #EFF9FE;
}
.${CLS}-ghost:active:not(:disabled) {
  background-color: #D9F0FC;
}
.${CLS}-danger {
  background-color: #FFFFFF;
  border-color: #E00000;
  color: #E00000;
}
.${CLS}-danger:hover:not(:disabled) {
  background-color: #E00000;
  color: #FFFFFF;
}
.${CLS}-danger:active:not(:disabled) {
  background-color: #B30000;
  border-color: #B30000;
  color: #FFFFFF;
}
`;

let buttonCssInjected = false;
function injectButtonCss() {
  if (buttonCssInjected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.textContent = BUTTON_CSS;
  document.head.appendChild(el);
  buttonCssInjected = true;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'lg',
      children,
      className = '',
      style,
      ...rest
    },
    ref
  ) => {
    injectButtonCss();

    const base: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderStyle: 'solid',
      borderRadius: rest.disabled ? '4px' : variant === 'tertiary' ? '100px' : '4px',
      fontFamily: FONT,
      fontWeight: 600,
      cursor: rest.disabled ? 'not-allowed' : 'pointer',
      transition: 'all 200ms ease',
      outline: 'none',
      userSelect: 'none',
    };

    const sizeSm: React.CSSProperties = { height: '32px', padding: '0 16px', fontSize: '14px' };
    const sizeLg: React.CSSProperties = {
      height: '50px',
      padding: '0 24px',
      fontSize: '15px',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
    };

    const sz = size === 'sm' ? sizeSm : sizeLg;

    if (rest.disabled) {
      return (
        <button
          ref={ref}
          className={className}
          {...rest}
          style={{
            ...base,
            ...sz,
            borderWidth: '1px',
            borderColor: '#777777',
            backgroundColor: '#DCDCDC',
            color: '#777777',
            ...style,
          }}
        >
          {children}
        </button>
      );
    }

    const borderWidth = variant === 'primary' || variant === 'danger' ? '2px' : '1px';

    return (
      <button
        ref={ref}
        className={`${CLS}-${variant}${className ? ` ${className}` : ''}`}
        {...rest}
        style={{
          ...base,
          ...sz,
          borderWidth,
          ...style,
        }}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export default Button;
