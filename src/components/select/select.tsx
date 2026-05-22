import React from 'react';

const Select: React.FC<SelectProps> = ({ 
    options, 
    value, 
    onChange, 
    className, 
    disabled = false, 
    placeholder = "Select an option" 
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleSelect = (option: string) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className={`select-container ${className}`} onClick={handleToggle} role="combobox" aria-haspopup="listbox" aria-expanded={isOpen} aria-label={placeholder}>
            <div className={`select-value ${disabled ? 'disabled' : ''}`} tabIndex={0} aria-disabled={disabled}>
                {value || placeholder}
            </div>
            {isOpen && (
                <ul className="select-dropdown" role="listbox" aria-label="Select options">
                    {options.map(option => (
                        <li 
                            key={option} 
                            className="select-dropdown-item" 
                            onClick={() => handleSelect(option)} 
                            role="option" 
                            aria-selected={value === option}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

interface SelectProps {
    options: string[];
    value?: string;
    onChange: (value: string) => void;
    className?: string;
    disabled?: boolean;
    placeholder?: string;
}

export default Select;

const styles = `
:root {
    --ps-color-background-default: #FFFFFF;
    --ps-color-background-hover: #F5F5F5;
    --ps-color-background-disabled: #E0E0E0;
    --ps-color-border-default: #DCDCDC;
    --ps-color-border-focus: #005BA6;
    --ps-color-border-error: #FF0000;
    --ps-color-text-placeholder: #A0A0A0;
    --ps-color-text-value: #000000;
    --ps-color-text-disabled: #B0B0B0;
    --ps-color-icon: #7D7D7D;
    --ps-border-radius: 4px;
    --ps-border-width: 1px;
    --ps-spacing-paddingX: 12px;
    --ps-spacing-paddingY: 8px;
    --ps-sizing-height: 48px;
    --ps-sizing-minWidth: 160px;
    --ps-dropdown-background: #FFFFFF;
    --ps-dropdown-shadow: 0 4px 12px rgba(0,0,0,0.1);
    --ps-dropdown-maxHeight: 240px;
    --ps-dropdown-item-paddingX: 12px;
    --ps-dropdown-item-paddingY: 8px;
    --ps-dropdown-item-background-hover: #F5F5F5;
    --ps-dropdown-item-background-selected: #E0E0E0;
}

.select-container {
    position: relative;
    min-width: var(--ps-sizing-minWidth);
}

.select-value {
    height: var(--ps-sizing-height);
    border: var(--ps-border-width) solid var(--ps-color-border-default);
    border-radius: var(--ps-border-radius);
    padding: var(--ps-spacing-paddingY) var(--ps-spacing-paddingX);
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: border-color 0.2s;
}

.select-value.disabled {
    color: var(--ps-color-text-disabled);
    background-color: var(--ps-color-background-disabled);
    cursor: not-allowed;
}

.select-value:focus {
    outline: none;
    border-color: var(--ps-color-border-focus);
    box-shadow: 0 0 0 3px rgba(0, 147, 244, 0.3);
}

.select-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    background: var(--ps-dropdown-background);
    box-shadow: var(--ps-dropdown-shadow);
    max-height: var(--ps-dropdown-maxHeight);
    overflow-y: auto;
    z-index: 1000;
}

.select-dropdown-item {
    padding: var(--ps-dropdown-item-paddingY) var(--ps-dropdown-item-paddingX);
    cursor: pointer;
}

.select-dropdown-item:hover {
    background-color: var(--ps-dropdown-item-background-hover);
}

.select-dropdown-item[aria-selected="true"] {
    background-color: var(--ps-dropdown-item-background-selected);
}
`;
