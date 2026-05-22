import React from 'react';

interface CmsProps {
  className?: string;
}

const Cms: React.FC<CmsProps> = ({ className }) => {
  return (
    <div className={`cms ${className}`}>
      <style jsx>{`
        :root {
          --ps-font: 'Source Sans Pro', sans-serif;
          --ps-primary-color: #005BA6;
          --ps-midnight-color: #002F48;
          --ps-banner-height: 93px;
          --ps-banner-gradient-start: #005BA6;
          --ps-banner-gradient-end: #009CF4;
          --ps-banner-overlay: rgba(0, 0, 0, 0.45);
          --ps-input-height: 48px;
          --ps-input-border: #DCDCDC;
          --ps-input-focus: #005BA6;
          --ps-card-hover-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          --ps-focus-ring: 0 0 0 3px rgba(0, 147, 244, 0.3);
          --ps-border-radius: 4px;
          --ps-modal-border-radius: 8px;
          --ps-pill-border-radius: 100px;
        }
        .cms {
          font-family: var(--ps-font);
        }
        .banner {
          height: var(--ps-banner-height);
          background: linear-gradient(to right, var(--ps-banner-gradient-start), var(--ps-banner-gradient-end));
          border-radius: var(--ps-border-radius);
          position: relative;
        }
        .banner::after {
          content: '';
          background: var(--ps-banner-overlay);
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: var(--ps-border-radius);
        }
        .image-block {
          display: flex;
          gap: 24px;
        }
        .image-block img {
          height: 200px;
          border-radius: var(--ps-border-radius);
          object-fit: cover;
        }
        .text-block {
          max-width: 860px;
          padding: 32px;
          color: var(--ps-midnight-color);
        }
        .text-block h1 {
          font-size: 20px;
          font-weight: 600;
          color: var(--ps-midnight-color);
        }
        .text-block p {
          font-size: 14px;
          line-height: 1.6;
          color: #4A4A4A;
        }
        .cta-button {
          height: 40px;
          padding: 0 24px;
          font-size: 14px;
          font-weight: 600;
          border: 1px solid var(--ps-primary-color);
          background-color: white;
          color: var(--ps-primary-color);
          border-radius: var(--ps-border-radius);
          transition: background-color 0.3s;
        }
        .cta-button:hover {
          background-color: var(--ps-primary-color);
          color: white;
        }
        input {
          height: var(--ps-input-height);
          border: 1px solid var(--ps-input-border);
          outline: none;
          transition: border-color 0.3s;
        }
        input:focus {
          border-color: var(--ps-input-focus);
          box-shadow: var(--ps-focus-ring);
        }
      `}</style>
      <div className="banner" role="banner" aria-label="CMS Banner"></div>
      <div className="image-block" role="region" aria-label="Image Block">
        {/* Example image blocks can be added here */}
        <img src="#" alt="Example" />
      </div>
      <div className="text-block">
        <h1>Title goes here</h1>
        <p>Description goes here</p>
        <button className="cta-button" aria-label="Call to Action">Click Me</button>
      </div>
    </div>
  );
};

export default Cms;
