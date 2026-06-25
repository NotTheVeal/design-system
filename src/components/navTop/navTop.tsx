/**
 * NavTop — PS Design System 2.0
 * bg: #FFFFFF, height: 56px, active: border-bottom 3px solid #009CF4
 */
import React, { forwardRef, useState } from 'react';
const FONT = "'Source Sans 3', -apple-system, sans-serif";
export interface NavTopLink { id: string; label: string; href?: string; isActive?: boolean; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void; }
export interface NavTopProps extends React.HTMLAttributes<HTMLElement> { logo?: React.ReactNode; links?: NavTopLink[]; search?: React.ReactNode; actions?: React.ReactNode; }
export const NavTop = forwardRef<HTMLElement, NavTopProps>(function NavTop({ logo, links = [], search, actions, className, style, ...rest }, ref) {
const [hoveredId, setHoveredId] = useState<string | null>(null);
return (
<header ref={ref} role="banner" className={['ps-navtop', className].filter(Boolean).join(' ')} style={{ position: 'relative', display: 'flex', alignItems: 'center', borderBottom: '1px solid #DCDCDC', height: '56px', backgroundColor: '#FFFFFF', padding: '0 24px', boxSizing: 'border-box', width: '100%', fontFamily: FONT, flexShrink: 0, ...style }} {...rest}>
{logo && <div style={{ flexShrink: 0, zIndex: 1, display: 'flex', alignItems: 'center' }}>{logo}</div>}
{links.length > 0 && <nav role="navigation" style={{ display: 'flex', alignItems: 'stretch', height: '100%', gap: 0, zIndex: 1, marginLeft: logo ? 24 : 0 }}>{links.map((link) => <a key={link.id} href={link.href ?? '#'} aria-current={link.isActive ? 'page' : undefined} onClick={link.onClick} onMouseEnter={() => setHoveredId(link.id)} onMouseLeave={() => setHoveredId(null)} style={{ display: 'inline-flex', alignItems: 'center', padding: '0 16px', height: '100%', color: '#4A4A4A', textDecoration: 'none', fontSize: 14, fontWeight: 600, fontFamily: FONT, borderBottom: link.isActive ? '3px solid #009CF4' : hoveredId === link.id ? '3px solid rgba(0,156,244,0.4)' : '3px solid transparent', borderTop: '3px solid transparent', opacity: link.isActive || hoveredId === link.id ? 1 : 0.85, transition: 'opacity 150ms ease', cursor: 'pointer', boxSizing: 'border-box', whiteSpace: 'nowrap' }}>{link.label}</a>)}</nav>}
<div style={{ flex: 1 }} aria-hidden="true" />
{search && <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', alignItems: 'center' }}>{search}</div>}
{actions && <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, zIndex: 1 }}>{actions}</div>}
</header>
);
});

export default NavTop;
