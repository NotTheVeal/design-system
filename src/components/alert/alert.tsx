import React from 'react';
export type AlertType = 'success'|'error'|'warning'|'info';
export interface AlertProps { type?: AlertType; title?: string; message: string; onClose?: () => void; action?: { label: string; onClick: () => void }; className?: string; }

const successIcon = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="9" fill="#0E7C55"/><path d="M5 9l3 3 5-5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const errorIcon = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="9" fill="#D32F2F"/><path d="M6 6l6 6M12 6l-6 6" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>';
const warningIcon = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L1 16h16L9 1z" fill="#B45309"/><path d="M9 7v4M9 13h.01" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>';
const infoIcon = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="9" fill="#005BA6"/><path d="M9 8v5M9 6h.01" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>';

const icons: Record<AlertType, string> = { success: successIcon, error: errorIcon, warning: warningIcon, info: infoIcon };

const styles: Record<AlertType,{bg:string;border:string;title:string;msg:string}> = {
  success:{bg:'#E2F5EE',border:'#17AB78',title:'#0E7C55',msg:'#1A5C40'},
  error:{bg:'#FEF0F0',border:'#D32F2F',title:'#D32F2F',msg:'#9B1C1C'},
  warning:{bg:'#FFF4E5',border:'#E3A92D',title:'#B45309',msg:'#7C3D12'},
  info:{bg:'#EFF9FE',border:'#005BA6',title:'#005BA6',msg:'#1E4D7B'},
};
export const Alert: React.FC<AlertProps> = ({type='info',title,message,onClose,action,className=''}) => {
  const s=styles[type]; const font="'Source Sans Pro',-apple-system,sans-serif";
  return (<div role="alert" className={className} style={{display:'flex',alignItems:'flex-start',gap:12,padding:'14px 16px',background:s.bg,borderRadius:4,border:'1px solid '+s.border,fontFamily:font}}>
    <span style={{flexShrink:0,lineHeight:1,marginTop:1}} dangerouslySetInnerHTML={{__html:icons[type]}} />
    <div style={{flex:1,minWidth:0}}>
      {title&&<div style={{fontSize:14,fontWeight:600,color:s.title,lineHeight:'20px',marginBottom:4}}>{title}</div>}
      <div style={{fontSize:13,color:s.msg,lineHeight:'20px'}}>{message}</div>
      {action&&<button onClick={action.onClick} style={{marginTop:8,background:'none',border:'none',cursor:'pointer',color:s.title,fontSize:13,fontWeight:600,padding:0,fontFamily:font,textDecoration:'underline'}}>{action.label}</button>}
    </div>
    {onClose&&<button onClick={onClose} style={{background:'none',border:'none',cursor:'pointer',color:s.title,padding:0,flexShrink:0,fontSize:20,lineHeight:1,opacity:.7}} onMouseEnter={e=>((e.currentTarget as HTMLElement).style.opacity='1')} onMouseLeave={e=>((e.currentTarget as HTMLElement).style.opacity='.7')}>×</button>}
  </div>);
};
export default Alert;
