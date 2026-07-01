import React, { useState, useCallback } from 'react';

const FONT = "'Source Sans 3', -apple-system, sans-serif";

export interface PartReferenceProps extends React.HTMLAttributes<HTMLDivElement> {
  sku: string;
  label?: string;
  showCopy?: boolean;
  onCopy?: (sku: string) => void;
}

const PartReference = React.forwardRef<HTMLDivElement, PartReferenceProps>(function PartReference(
  { sku, label = 'SKU', showCopy = true, onCopy, className = '', style, ...rest },
  ref,
) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(sku);
      setCopied(true);
      onCopy?.(sku);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [sku, onCopy]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '5px 6px 5px 10px',
        background: '#F1F1F1',
        borderRadius: 4,
        fontFamily: FONT,
        ...style,
      }}
      {...rest}
    >
      <span style={{ fontSize: 13, color: '#777777' }}>{label}:</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: '#002F48' }}>{sku}</span>
      {showCopy && (
        <button
          onClick={handleCopy}
          aria-label={copied ? 'Copied' : `Copy ${label} ${sku}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '3px 8px',
            background: copied ? '#0E7C55' : '#005BA6',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 3,
            fontSize: 11,
            fontWeight: 600,
            fontFamily: FONT,
            cursor: 'pointer',
            transition: 'background 200ms ease',
          }}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      )}
    </div>
  );
});

PartReference.displayName = 'PartReference';
export { PartReference };
export default PartReference;
