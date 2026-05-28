import React, { useState } from 'react';

interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

interface NavTopProps {
  logo?: React.ReactNode;
  items?: NavItem[];
  actions?: React.ReactNode;
  className?: string;
}

const NavTop: React.FC<NavTopProps> = ({ logo, items = [], actions, className = '' }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className={`bg-white border-b border-gray-200 ${className}`} role="navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-8">
            {logo && <div className="flex-shrink-0">{logo}</div>}
            <div className="hidden md:flex items-center gap-1">
              {items.map((item, i) => (
                <a
                  key={i}
                  href={item.href || '#'}
                  onClick={item.onClick}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors
                    ${item.active
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {actions && <div className="hidden md:flex items-center gap-2">{actions}</div>}
            <button
              className="md:hidden p-2 rounded hover:bg-gray-100"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 px-4 py-2">
          {items.map((item, i) => (
            <a
              key={i}
              href={item.href || '#'}
              onClick={item.onClick}
              className={`block px-3 py-2 rounded text-sm font-medium
                ${item.active ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavTop;
