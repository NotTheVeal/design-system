import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: 'var(--ps-spacing-gap)' }}>
        {items.map((item, index) => (
          <li key={index}>
            {item.href ? (
              <a
                href={item.href}
                aria-current={index === items.length - 1 ? 'page' : undefined}
                style={{
                  color: 'var(--ps-breadcrumb-color-text-default)',
                  fontSize: 'var(--ps-breadcrumb-typography-fontSize)',
                  fontWeight: index === items.length - 1 ? 'var(--ps-breadcrumb-typography-fontWeight-active)' : 'var(--ps-breadcrumb-typography-fontWeight-default)',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ps-breadcrumb-color-text-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ps-breadcrumb-color-text-default)'}
              >
                {item.label}
              </a>
            ) : (
              <span
                style={{
                  color: 'var(--ps-breadcrumb-color-text-active)',
                  fontWeight: 'var(--ps-breadcrumb-typography-fontWeight-active)',
                }}
              >
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <span
                aria-hidden="true"
                style={{
                  margin: '0 8px',
                  color: 'var(--ps-breadcrumb-color-separator)',
                }}
              >
                /
              </span>
            )}
          </li>
        ))}
      </ol>
      <style jsx>{`
        :root {
          --ps-breadcrumb-color-text-default: ${breadcrumb.color.text.default};
          --ps-breadcrumb-color-text-hover: ${breadcrumb.color.text.hover};
          --ps-breadcrumb-color-text-active: ${breadcrumb.color.text.active};
          --ps-breadcrumb-color-separator: ${breadcrumb.color.separator};
          --ps-breadcrumb-typography-fontSize: ${breadcrumb.typography.fontSize};
          --ps-breadcrumb-typography-fontWeight-default: ${breadcrumb.typography.fontWeight.default};
          --ps-breadcrumb-typography-fontWeight-active: ${breadcrumb.typography.fontWeight.active};
          --ps-spacing-gap: ${breadcrumb.spacing.gap};
        }
      `}</style>
    </nav>
  );
};

export default Breadcrumb;
