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
