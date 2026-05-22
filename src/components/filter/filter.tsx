import React, { FC, useState } from 'react';

interface FilterProps {
  className?: string;
  onSearch: (value: string) => void;
  onClear: () => void;
}

const Filter: FC<FilterProps> = ({ className, onSearch, onClear }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  return (
    <div className={`filter ${className}`} style={{ 
      backgroundColor: 'var(--ps-filter-bar-background)', 
      border: '1px solid var(--ps-filter-bar-border)', 
      height: 'var(--ps-filter-bar-height)', 
      padding: 'var(--ps-filter-bar-paddingV) var(--ps-filter-bar-paddingH)', 
      display: 'flex', 
      alignItems: 'center', 
      gap: 'var(--ps-filter-bar-gap)', 
      borderRadius: 'var(--ps-border-radius-default)' 
    }}>
      <label htmlFor="filter-input" style={{ position: 'relative', flex: 1 }}>
        <input 
          id="filter-input" 
          type="text" 
          placeholder="Search..." 
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          style={{ 
            width: '100%', 
            height: '48px', 
            border: '1px solid #DCDCDC', 
            borderRadius: '4px', 
            padding: '0 12px', 
            fontFamily: 'Source Sans Pro', 
            fontSize: '16px', 
            outline: 'none' 
          }} 
          onFocus={(e) => e.target.style.borderColor = '#005BA6'} 
          onBlur={(e) => e.target.style.borderColor = '#DCDCDC'} 
          aria-label="Filter search input"
        />
        <span style={{ 
          position: 'absolute', 
          top: '-8px', 
          left: '12px', 
          fontSize: '12px', 
          backgroundColor: '#fff', 
          padding: '0 4px' 
        }}>Search</span>
      </label>
      <button 
        onClick={() => {
          setSearchTerm('');
          onClear();
        }} 
        style={{ 
          padding: '12px 16px', 
          backgroundColor: 'white', 
          border: '1px solid #005BA6', 
          color: '#005BA6', 
          borderRadius: '4px', 
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }} 
        aria-label="Clear filter"
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#005BA6', e.currentTarget.style.color = 'white')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white', e.currentTarget.style.color = '#005BA6')}
      >
        Clear
      </button>
    </div>
  );
};

export default Filter;
