import React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

// PS Design System Breadcrumb (node 4386:28732):
// 14px Source Sans Pro, links #005BA6, current #4A4A4A Bold
// Separator "/" in #949494, 8px horizontal gap

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items, separator = '/', className = '',
}) => {
  const font = "'Source Sans Pro', -apple-system, sans-serif";

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 4,
        margin: 0, padding: 0,
        listStyle: 'none',
        fontFamily: font,
        fontSize: 14,
      }}>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <li style={{ display: 'flex', alignItems: 'center' }}>
                {isLast ? (
                  <span
                    aria-current="page"
                    style={{ fontWeight: 700, color: '#4A4A4A' }}
                  >
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href || '#'}
                    onClick={e => { if (item.onClick) { e.preventDefault(); item.onClick(); } }}
                    style={{ color: '#005BA6', textDecoration: 'none', fontWeight: 400 }}
                    onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                    onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                  >
                    {item.label}
                  </a>
                )}
              </li>
              {!isLast && (
                <li aria-hidden="true" style={{ color: '#949494', userSelect: 'none', padding: '0 4px' }}>
                  {separator}
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
