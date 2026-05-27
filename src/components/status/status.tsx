import React from 'react';

const Status: React.FC<StatusProps> = ({ type, className }) => {
    const statusClasses = `status ${type} ${className || ''}`;

    return (
        <div className={statusClasses} role="status" aria-live="polite" tabIndex={0}>
            <span className="status-dot" />
            <span className="status-text">{type}</span>
        </div>
    );
};

interface StatusProps {
    type: 'active' | 'inactive' | 'warning' | 'error' | 'info';
    className?: string;
}

export default Status;
