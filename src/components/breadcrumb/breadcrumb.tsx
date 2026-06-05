import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string;
  className?: string;
}

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '>',
  className = '',
}) => {
  return (
    <nav aria-label="Breadcrumb" className={className} style={{ fontFamily }}>
      <ol className="flex items-center flex-wrap gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1">
              {index > 0 && (
                <span
                  className="text-[14px] text-[#949494] select-none"
                  aria-hidden="true"
                  style={{ fontFamily }}
                >
                  {separator}
                </span>
              )}
              {isLast ? (
                <span
                  className="text-[14px] font-semibold text-[#4A4A4A]"
                  aria-current="page"
                  style={{ fontFamily }}
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  onClick={item.onClick}
                  className="text-[14px] text-[#005BA6] hover:text-[#004A84] hover:underline transition-colors"
                  style={{ fontFamily }}
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
