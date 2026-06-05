import React, { useState } from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

interface GridItem {
  icon?: React.ReactNode;
  title: string;
  body?: string;
}

interface CmsBlockProps {
  type: 'hero' | 'text' | 'image' | 'cta' | 'grid' | 'divider';
  title?: string;
  subtitle?: string;
  body?: string;
  image?: { src: string; alt: string };
  items?: GridItem[];
  label?: string;
  onClick?: () => void;
  className?: string;
}

const CtaButton: React.FC<{ label: string; onClick?: () => void }> = ({ label, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 50,
        padding: '0 32px',
        background: hovered ? '#004A84' : '#005BA6',
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 600,
        borderRadius: 4,
        border: '2px solid #005BA6',
        cursor: 'pointer',
        fontFamily,
        transition: 'background 150ms ease',
      }}
    >
      {label}
    </button>
  );
};

const CmsBlock: React.FC<CmsBlockProps> = ({
  type,
  title,
  subtitle,
  body,
  image,
  items = [],
  label,
  onClick,
  className = '',
}) => {
  if (type === 'divider') {
    return (
      <hr
        className={className}
        style={{
          width: '100%',
          border: 'none',
          borderTop: '1px solid #DCDCDC',
          margin: '0',
        }}
      />
    );
  }

  if (type === 'hero') {
    return (
      <div
        className={className}
        style={{
          width: '100%',
          padding: '80px 24px',
          textAlign: 'center',
          background: '#002F48',
          color: '#FFFFFF',
          fontFamily,
          boxSizing: 'border-box',
        }}
      >
        {subtitle && (
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#009CF4',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 16,
              fontFamily,
            }}
          >
            {subtitle}
          </div>
        )}
        {title && (
          <h1
            style={{
              fontSize: 48,
              fontWeight: 300,
              color: '#FFFFFF',
              lineHeight: 1.2,
              maxWidth: 800,
              margin: '0 auto 24px',
              fontFamily,
            }}
          >
            {title}
          </h1>
        )}
        {body && (
          <p
            style={{
              fontSize: 18,
              color: '#FFFFFF',
              opacity: 0.8,
              maxWidth: 600,
              margin: '0 auto 32px',
              fontFamily,
              lineHeight: 1.6,
            }}
          >
            {body}
          </p>
        )}
        {label && <CtaButton label={label} onClick={onClick} />}
      </div>
    );
  }

  if (type === 'image') {
    return (
      <div
        className={className}
        style={{
          width: '100%',
          overflow: 'hidden',
          borderRadius: 4,
          boxSizing: 'border-box',
        }}
      >
        {image && (
          <>
            <img
              src={image.src}
              alt={image.alt}
              style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block' }}
            />
            {image.alt && (
              <div
                style={{
                  marginTop: 8,
                  fontSize: 12,
                  color: '#777777',
                  textAlign: 'center',
                  fontFamily,
                }}
              >
                {image.alt}
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  if (type === 'cta') {
    return (
      <div
        className={className}
        style={{
          width: '100%',
          padding: '64px 24px',
          textAlign: 'center',
          background: '#EFF9FE',
          borderRadius: 8,
          fontFamily,
          boxSizing: 'border-box',
        }}
      >
        {title && (
          <h2
            style={{
              fontSize: 32,
              fontWeight: 300,
              color: '#002F48',
              marginBottom: 16,
              fontFamily,
            }}
          >
            {title}
          </h2>
        )}
        {subtitle && (
          <p
            style={{
              fontSize: 16,
              color: '#777777',
              maxWidth: 500,
              margin: '0 auto 32px',
              fontFamily,
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </p>
        )}
        {label && <CtaButton label={label} onClick={onClick} />}
      </div>
    );
  }

  if (type === 'grid') {
    return (
      <div
        className={className}
        style={{
          width: '100%',
          padding: '48px 24px',
          fontFamily,
          boxSizing: 'border-box',
        }}
      >
        {title && (
          <h2
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: '#002F48',
              marginBottom: 32,
              textAlign: 'center',
              fontFamily,
            }}
          >
            {title}
          </h2>
        )}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                padding: 24,
                background: '#FFFFFF',
                border: '1px solid #DCDCDC',
                borderRadius: 8,
                boxShadow: '0 1px 4px rgba(0,47,72,0.08)',
              }}
            >
              {item.icon && (
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: '#EFF9FE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#005BA6',
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
              )}
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#4A4A4A',
                  fontFamily,
                }}
              >
                {item.title}
              </div>
              {item.body && (
                <div
                  style={{
                    fontSize: 14,
                    color: '#777777',
                    lineHeight: 1.6,
                    fontFamily,
                  }}
                >
                  {item.body}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // type === 'text'
  return (
    <div
      className={className}
      style={{
        width: '100%',
        padding: '48px 24px',
        fontFamily,
        boxSizing: 'border-box',
      }}
    >
      {subtitle && (
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: '#005BA6',
            marginBottom: 12,
            fontFamily,
          }}
        >
          {subtitle}
        </div>
      )}
      {title && (
        <h2
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: '#002F48',
            marginBottom: 16,
            fontFamily,
          }}
        >
          {title}
        </h2>
      )}
      {body && (
        <p
          style={{
            fontSize: 16,
            color: '#4A4A4A',
            lineHeight: 1.6,
            marginBottom: 24,
            fontFamily,
          }}
        >
          {body}
        </p>
      )}
      {label && <CtaButton label={label} onClick={onClick} />}
    </div>
  );
};

export default CmsBlock;
