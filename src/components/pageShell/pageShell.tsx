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
                    .page-shell {
                        font-family: 'Source Sans Pro', sans-serif;
                        background-color: #FAFAFA;
                        max-width: 1440px;
                        padding: 48px;
                        margin: 0 auto;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    }
                    @media (max-width: 1920px) {
                        .page-shell {
                            padding: 32px;
                        }
                    }
                    @media (max-width: 1440px) {
                        .page-shell {
                            padding: 24px;
                        }
                    }
                    @media (max-width: 768px) {
                        .page-shell {
                            padding: 16px;
                        }
                    }
                `}
            </style>
            {children}
        </div>
    );
};

export default PageShell;
