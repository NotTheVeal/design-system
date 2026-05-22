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

const styles = `
:root {
    --ps-primary-color: #005BA6;
    --ps-midnight: #002F48;
    --ps-border-radius: 4px;
    --ps-dot-size: 6px;
    --ps-spacing-padding-x: 8px;
    --ps-spacing-padding-y: 3px;
    --ps-spacing-gap: 4px;
}

.status {
    display: flex;
    align-items: center;
    padding: var(--ps-spacing-padding-y) var(--ps-spacing-padding-x);
    border-radius: var(--ps-border-radius);
}

.status-dot {
    width: var(--ps-dot-size);
    height: var(--ps-dot-size);
    border-radius: 100px;
    margin-right: var(--ps-spacing-gap);
}

.active {
    background-color: var(--status-color-active-background);
    color: var(--status-color-active-text);
}

.inactive {
    background-color: var(--status-color-inactive-background);
    color: var(--status-color-inactive-text);
}

.warning {
    background-color: var(--status-color-warning-background);
    color: var(--status-color-warning-text);
}

.error {
    background-color: var(--status-color-error-background);
    color: var(--status-color-error-text);
}

.info {
    background-color: var(--status-color-info-background);
    color: var(--status-color-info-text);
}

.status :focus {
    outline: none;
    box-shadow: var(--ps-focus-ring);
}

.status:hover {
    box-shadow: var(--ps-card-hover);
}
`;
