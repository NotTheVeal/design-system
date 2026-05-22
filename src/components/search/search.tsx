import React from 'react';

interface SearchProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}

const Search: React.FC<SearchProps> = ({ placeholder = "Search...", onSearch, className }) => {
  const [query, setQuery] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className={`search-form ${className}`}>
      <label htmlFor="search-input" className="sr-only">Search</label>
      <input
        id="search-input"
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="search-input"
        aria-label="Search"
      />
      <button type="submit" className="search-submit" aria-label="Submit search">
        <span>🔍</span>
      </button>
      <style jsx>{`
        :root {
          --ps-primary-color: #005BA6;
          --ps-border-color-default: #DCDCDC;
          --ps-border-color-hover: #005BA6;
          --ps-radius: 4px;
          --ps-spacing: 4px;
        }
        .search-form {
          display: flex;
          align-items: center;
        }
        .search-input {
          height: 48px;
          border: 1px solid var(--ps-border-color-default);
          border-radius: var(--ps-radius);
          padding: var(--ps-spacing) 12px;
          flex: 1;
          outline: none;
          transition: border-color 0.2s;
        }
        .search-input:focus {
          border-color: var(--ps-border-color-hover);
          box-shadow: 0 0 0 3px rgba(0,147,244,0.3);
        }
        .search-input::placeholder {
          color: var(--ps-border-color-default);
        }
        .search-submit {
          width: 48px;
          height: 48px;
          background: var(--ps-primary-color);
          color: white;
          border: none;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
          transition: background 0.2s;
        }
        .search-submit:hover {
          background: darken(var(--ps-primary-color), 10%);
        }
      `}</style>
    </form>
  );
};

export default Search;
