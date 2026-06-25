import React from 'react';

export interface ListCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  status?: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Active' | 'Inactive';
  badge?: string;
  price?: string;
  sku?: string;
  manufacturer?: string;
  onAction?: () => void;
  actionLabel?: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  'In Stock':       { bg: '#E2F5EE', text: '#0E7C55', border: '#0E7C55' },
  'Low Stock':      { bg: '#FFF4D0', text: '#B45309', border: '#B45309' },
  'Out of Stock':   { bg: '#FACBCB', text: '#D32F2F', border: '#D32F2F' },
  'Active':         { bg: '#E2F5EE', text: '#0E7C55', border: '#0E7C55' },
  'Inactive':       { bg: '#F1F1F1', text: '#777777', border: '#949494' },
};

export const ListCard: React.FC<ListCardProps> = ({
  title,
  subtitle,
  description,
  image,
  imageAlt,
  status,
  badge,
  price,
  sku,
  manufacturer,
  onAction,
  actionLabel = 'View Details',
  selected = false,
  onClick,
  className = '',
}) => {
  const st = status ? statusColors[status] : null;

  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        display: 'flex',
        alignItems: 'stretch',
        border: selected ? '2px solid #005BA6' : '1px solid #DCDCDC',
        borderRadius: '4px',
        background: '#FFFFFF',
        cursor: onClick ? 'pointer' : 'default',
        fontFamily: "'Source Sans Pro', -apple-system, sans-serif",
        transition: 'box-shadow 200ms ease, border-color 200ms ease',
        overflow: 'hidden',
        minHeight: '96px',
      }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.10)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
    >
      {/* Image column */}
      <div
        style={{
          width: 96,
          minWidth: 96,
          background: '#F1F1F1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRight: '1px solid #DCDCDC',
          padding: 8,
        }}
      >
        {image ? (
          <img
            src={image}
            alt={imageAlt || title}
            style={{ width: '100%', height: '100%', objectFit: 'contain', maxHeight: 80 }}
          />
        ) : (
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: '#DCEAED',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#005BA6',
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            {title.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Content column */}
      <div style={{ flex: 1, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h4 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#002F48', lineHeight: '20px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {title}
            </h4>
            {subtitle && (
              <p style={{ margin: 0, fontSize: 13, color: '#777777', lineHeight: '18px' }}>
                {subtitle}
              </p>
            )}
          </div>
          {st && (
            <span style={{
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: 12,
              fontWeight: 700,
              border: `1px solid ${st.border}`,
              background: st.bg,
              color: st.text,
              lineHeight: '16px',
            }}>
              {status}
            </span>
          )}
        </div>

        {(sku || manufacturer) && (
          <div style={{ display: 'flex', gap: 16, marginTop: 2 }}>
            {sku && <span style={{ fontSize: 12, color: '#949494' }}>SKU: {sku}</span>}
            {manufacturer && <span style={{ fontSize: 12, color: '#949494' }}>{manufacturer}</span>}
          </div>
        )}

        {description && (
          <p style={{ margin: 0, fontSize: 13, color: '#4A4A4A', lineHeight: '18px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
            {description}
          </p>
        )}
      </div>

      {/* Right action column */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: '12px 16px',
        borderLeft: '1px solid #DCDCDC',
        minWidth: 120,
        flexShrink: 0,
      }}>
        {price && (
          <span style={{ fontSize: 16, fontWeight: 700, color: '#002F48', lineHeight: '24px' }}>
            {price}
          </span>
        )}
        {badge && !price && (
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#005BA6',
            background: '#DCEAED',
            borderRadius: '100px',
            padding: '2px 10px',
            letterSpacing: '0.5px',
            textTransform: 'uppercase' as const,
          }}>
            {badge}
          </span>
        )}
        <button
          onClick={e => { e.stopPropagation(); onAction?.(); }}
          style={{
            padding: '6px 14px',
            fontSize: 13,
            fontWeight: 600,
            color: '#005BA6',
            border: '2px solid #005BA6',
            borderRadius: '4px',
            background: '#FFFFFF',
            cursor: 'pointer',
            fontFamily: 'inherit',
            whiteSpace: 'nowrap',
            transition: 'all 200ms ease',
          }}
          onMouseEnter={e => { (e.target as HTMLElement).style.background = '#005BA6'; (e.target as HTMLElement).style.color = '#FFFFFF'; }}
          onMouseLeave={e => { (e.target as HTMLElement).style.background = '#FFFFFF'; (e.target as HTMLElement).style.color = '#005BA6'; }}
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
};

export default ListCard;
