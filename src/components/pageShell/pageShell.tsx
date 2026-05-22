import React from 'react';

interface PageShellProps {
    children: React.ReactNode;
    className?: string;
}

const PageShell: React.FC<PageShellProps> = ({ children, className }) => {
    return (
        <div className={`page-shell ${className}`} role="main" aria-label="Page Shell">
            <style>
                {`
                    :root {
                        --ps-font-family: 'Source Sans Pro', sans-serif;
                        --ps-primary-color: #005BA6;
                        --ps-midnight-color: #002F48;
                        --ps-background: /* value from tokens */;
                        --ps-content-padding-desktop1920: 48px;
                        --ps-content-padding-desktop1440: 32px;
                        --ps-content-padding-tablet: 24px;
                        --ps-content-padding-mobile: 16px;
                        --ps-max-content-width: 1440px;
                    }
                    .page-shell {
                        font-family: var(--ps-font-family);
                        background-color: var(--ps-background);
                        max-width: var(--ps-max-content-width);
                        padding: var(--ps-content-padding-desktop1920);
                        margin: 0 auto;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    }
                    @media (max-width: 1920px) {
                        .page-shell {
                            padding: var(--ps-content-padding-desktop1440);
                        }
                    }
                    @media (max-width: 1440px) {
                        .page-shell {
                            padding: var(--ps-content-padding-tablet);
                        }
                    }
                    @media (max-width: 768px) {
                        .page-shell {
                            padding: var(--ps-content-padding-mobile);
                        }
                    }
                `}
            </style>
            {children}
        </div>
    );
};

export default PageShell;
