import React from 'react';

interface ProductCardProps {
  title: string;
  subtitle?: string;
  price: string;
  imageSrc: string;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, subtitle, price, imageSrc, className }) => {
  return (
    <div className={`product-card ${className}`} role="article" aria-label={title}>
      <style jsx>{`
        :root {
          --ps-background: #ffffff;
          --ps-border-default: 1px solid #dcdcdc;
          --ps-border-hover: 1px solid #005ba6;
          --ps-text-title: #333333;
          --ps-text-subtitle: #666666;
          --ps-text-price: #333333;
          --ps-text-priceLabel: #666666;
          --ps-badge-background: rgba(0, 91, 166, 0.1);
          --ps-badge-text: #005ba6;
          --ps-image-background: rgba(238, 238, 238, 1);
          --ps-padding: 16px;
          --ps-gap: 8px;
          --ps-image-height: 140px;
          --ps-border-radius: 4px;
          --ps-shadow-default: 0 4px 12px rgba(0, 0, 0, 0.1);
          --ps-shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        .product-card {
          background: var(--ps-background);
          border: var(--ps-border-default);
          border-radius: var(--ps-border-radius);
          padding: var(--ps-padding);
          box-shadow: var(--ps-shadow-default);
          transition: box-shadow 0.2s ease-in-out;
        }
        .product-card:hover {
          box-shadow: var(--ps-shadow-hover);
          border: var(--ps-border-hover);
        }
        .product-image {
          background: var(--ps-image-background);
          height: var(--ps-image-height);
          width: 100%;
          border-radius: var(--ps-border-radius);
          background-image: url(${imageSrc});
          background-size: cover;
          background-position: center;
        }
        .product-title {
          font-family: 'Source Sans Pro', sans-serif;
          color: var(--ps-text-title);
          font-size: 1.5rem;
        }
        .product-subtitle {
          font-family: 'Source Sans Pro', sans-serif;
          color: var(--ps-text-subtitle);
          font-size: 1rem;
        }
        .product-price {
          font-family: 'Source Sans Pro', sans-serif;
          color: var(--ps-text-price);
          font-size: 1.25rem;
          margin-top: 8px;
        }
      `}</style>
      <div className="product-image" aria-hidden="true"></div>
      <div className="product-title">{title}</div>
      {subtitle && <div className="product-subtitle">{subtitle}</div>}
      <div className="product-price">{price}</div>
    </div>
  );
};

export default ProductCard;
