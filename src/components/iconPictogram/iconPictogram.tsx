import React from 'react';

interface IconPictogramProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    background?: 'light' | 'subtle' | 'dark';
    className?: string;
    ariaLabel: string;
}

const sizeMap = {
    sm: '80px',
    md: '120px',
    lg: '160px',
    xl: '240px',
};

const backgroundMap = {
    light: '#FFFFFF',
    subtle: '#FAFAFA',
    dark: '#002F48',
};

const IconPictogram: React.FC<IconPictogramProps> = ({
    size = 'md',
    background = 'light',
    className,
    ariaLabel,
}) => {
    const containerStyle = {
        width: sizeMap[size],
        height: sizeMap[size],
        backgroundColor: backgroundMap[background],
        borderRadius: '8px',
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    };

    return (
        <div
            style={containerStyle}
            className={className}
            role="img"
            aria-label={ariaLabel}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    // handle activation logic here
                }
            }}
        >
            {/* Icon Content Goes Here */}
        </div>
    );
};

export default IconPictogram;
