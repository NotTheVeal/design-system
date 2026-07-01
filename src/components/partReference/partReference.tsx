import React, { useState } from 'react';
const FONT = "'Source Sans 3', -apple-system, sans-serif";
export interface PartReferenceProps extends React.HTMLAttributes<HTMLDivElement> {
  sku: string;
  label?: string;
  onCopy?: (sku: string) => void;
}
const PartReference = React.forwardRef<HTMLDivElement, PartReferenceProps>(function PartReference(
  { sku, label = 'SKU', onCopy, className = '', style, ...rest },
  ref,
) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(sku).catch(() => {});
    setCopied(true);
    onCopy?.(sku);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div ref={ref} className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: 0, background: '#F1F1F1', borderRadius: 4, overflow: 'hidden', fontFamily: FONT, ...style }} {...rest}>
      <div style={{ padding: '6px 10px' }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#777777', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', lineHeight: 1.2 }}>{label}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#002F48', letterSpacing: '0.3px', fontVariantNumeric: 'tabular-nums' }}>{sku}</span>
      </div>
      <button onClick={handleCopy} aria-label={copied ? 'Copied' : 'Copy SKU to clipboard'} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '0 12px', height: '100%', minHeight: 40, background: copied ? '#E2F5EE' : '#005BA6', color: copied ? '#0E7C55' : '#FFFFFF', border: 'none', borderLeft: '1px solid #DCDCDC', cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: FONT, transition: 'background 150ms ease, color 150ms ease', whiteSpace: 'nowrap' }}>
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
});
PartReference.displayName = 'PartReference';
export { PartReference };
export default PartReference;
