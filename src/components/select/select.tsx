import React, { useState, useRef, useEffect, useId } from 'react';
const FONT = "'Source Sans 3', -apple-system, sans-serif";
export interface SelectOption { value: string; label: string; disabled?: boolean; }
export interface SelectProps { options: SelectOption[]; value?: string | string[]; onChange?: (v: string | string[]) => void; multiple?: boolean; searchable?: boolean; label?: string; placeholder?: string; disabled?: boolean; error?: string; helperText?: string; className?: string; }
export const Select: React.FC<SelectProps> = ({ options, value, onChange, multiple = false, searchable = false, label, placeholder = 'Select...', disabled = false, error, helperText, className = '' }) => {
const id = useId();
const [open, setOpen] = useState(false);
const [search, setSearch] = useState('');
const [focused, setFocused] = useState(false);
const containerRef = useRef(null);
const selected = Array.isArray(value) ? value : value ? [value] : [];
const getLabel = (v) => options.find(o => o.value === v)?.label ?? v;
const filtered = searchable ? options.filter(o => o.label.toLowerCase().includes(search.toLowerCase())) : options;
useEffect(() => {
const handler = (e) => { if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false); };
document.addEventListener('mousedown', handler);
return () => document.removeEventListener('mousedown', handler);
}, []);
const toggle = (v) => {
if (multiple) {
const next = selected.includes(v) ? selected.filter(x => x !== v) : [...selected, v];
onChange?.(next);
} else {
onChange?.(v);
setOpen(false);
}
};
const getBorder = () => { if (disabled) return '1px solid #DCDCDC'; if (error) return '1px solid #E00000'; if (focused || open) return '1px solid #005BA6'; return '1px solid #949494'; };
const displayValue = selected.length === 0 ? '' : multiple ? selected.map(getLabel).join(', ') : getLabel(selected[0]);
return (
<div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: FONT, width: '100%', position: 'relative' }} className={className}>
{label && <label htmlFor={id} style={{ fontSize: 13, fontWeight: 600, color: disabled ? '#DCDCDC' : '#4A4A4A', fontFamily: FONT }}>{label}</label>}
<div id={id} role="combobox" aria-controls="select-listbox" aria-expanded={open} aria-haspopup="listbox" tabIndex={disabled ? -1 : 0} onClick={() => !disabled && setOpen(!open)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={{ display: 'flex', alignItems: 'center', height: 48, padding: '0 12px', borderRadius: 4, border: getBorder(), boxShadow: (focused || open) && !error && !disabled ? '0 0 0 3px rgba(0,147,244,0.3)' : 'none', background: disabled ? '#FAFAFA' : '#FFFFFF', cursor: disabled ? 'not-allowed' : 'pointer', transition: 'border 150ms ease, box-shadow 150ms ease', opacity: disabled ? 0.65 : 1 }}>
{searchable && open ? <input value={search} onChange={e => setSearch(e.target.value)} onClick={e => e.stopPropagation()} style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: FONT, fontSize: 15, color: '#4A4A4A' }} placeholder="Search..." /> : <span style={{ flex: 1, fontSize: 15, color: displayValue ? '#4A4A4A' : '#777777', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{displayValue || placeholder}</span>}
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: '#777777', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 150ms ease' }}><polyline points="6 9 12 15 18 9"/></svg>
</div>
{open && <ul id="select-listbox" role="listbox" style={{ position: 'absolute', top: label ? 70 : 52, left: 0, right: 0, zIndex: 200, background: '#FFFFFF', border: '1px solid #DCDCDC', borderRadius: 4, boxShadow: '0 4px 16px rgba(0,47,72,0.12)', maxHeight: 240, overflowY: 'auto', margin: 0, padding: '4px 0', listStyle: 'none' }}>
{filtered.length === 0 ? <li style={{ padding: '10px 12px', fontSize: 14, color: '#777779', fontFamily: FONT }}>No options</li> : filtered.map(o => <li key={o.value} role="option" aria-selected={selected.includes(o.value)} onClick={() => !o.disabled && toggle(o.value)} style={{ padding: '10px 12px', fontSize: 15, fontFamily: FONT, cursor: o.disabled ? 'not-allowed' : 'pointer', color: o.disabled ? '#DCDCDC' : selected.includes(o.value) ? '#005BA6' : '#4A4A4A', background: selected.includes(o.value) ? '#EFF9FE' : 'transparent', fontWeight: selected.includes(o.value) ? 600 : 400 }}>{o.label}</li>)}
</ul>}
{(helperText || error) && <span style={{ fontSize: 12, color: error ? '#E00000' : '#777778', fontFamily: FONT }}>{error ?? helperText}</span>}
</div>
);
};
export default Select;
