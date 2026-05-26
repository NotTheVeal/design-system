import React from 'react';

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
    return (
        <nav className={`breadcrumb ${className}`} aria-label="Breadcrumb">
            <ol>
                {items.map((item, index) => (
                    <li key={index} className="breadcrumb-item">
                        {item.isCurrent ? (
                            <span className="current">{item.label}</span>
                        ) : (
                            <>
                                <a href={item.href} className="link">
                                    {item.label}
                                </a>
                                {index < items.length - 1 && (
                                    <span className="separator">/</span>
                                )}
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

interface BreadcrumbItem {
    label: string;
    href?: string;
    isCurrent?: boolean;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

export default Breadcrumb;

// Styles (in a corresponding CSS file or styled-components)
// :root {
//     --ps-primary-color: #005BA6;
//     --ps-link-color: #009CF4;
//     --ps-link-hover-color: #005BA6;
//     --ps-current-color: #777777;
//     --ps-separator-color: #949494;
//     --ps-font-size: 16px;
//     --ps-line-height: 24px;
//     --ps-item-spacing: 8px;
// }

// .breadcrumb {
//     font-family: 'Source Sans Pro', sans-serif;
//     font-size: var(--ps-font-size);
//     line-height: var(--ps-line-height);
// }

// .breadcrumb-item {
//     display: inline-block;
//     margin-right: var(--ps-item-spacing);
// }

// .link {
//     color: var(--ps-link-color);
//     text-decoration: none;
// }

// .link:hover {
//     color: var(--ps-link-hover-color);
// }

// .current {
//     color: var(--ps-current-color);
// }

// .separator {
//     color: var(--ps-separator-color);
//     margin-left: 4px;
//     margin-right: 4px;
// }
