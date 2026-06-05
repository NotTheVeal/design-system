import React, { useState } from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

const BreadcrumbLink: React.FC<{ item: BreadcrumbItem }> = ({ item }) => {
  const [hovered, setHovered] = useState(false);

  if (!item.href && !item.onClick) {
    return (
      <span
        aria-current="page"
        style={{ fontSize: 14, fontWeight: 600, color: '#4A4A4A', fontFamily }}
      >
        {item.label}
      </span>
    );
  }

  return (
    <a
      href={item.href}
      onClick={item.onClick ? (e) => { e.preventDefault(); item.onClick!(); } : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: 14,
        color: hovered ? '#004A84' : '#005BA6',
        textDecoration: hovered ? 'underline' : 'none',
        transition: 'color 150ms ease',
        cursor: 'pointer',
        fontFamily,
      }}
    >
      {item.label}
    </a>
  );
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  className = '',
}) => (
  <nav aria-label="breadcrumb" className={className}>
    <ol style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4, listStyle: 'none', margin: 0, padding: 0, fontFamily }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <BreadcrumbLink item={item} />
          {i < items.length - 1 && (
            <span aria-hidden="true" style={{ fontSize: 14, color: '#949494', userSelect: 'none', fontFamily }}>
              {separator}
            </span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumb;
