import React from 'react';
export type AlertType = 'success'|'error'|'warning'|'info';
export interface AlertProps { type?: AlertType; title?: string; message: string; onClose?: () => void; action?: { label: string; onClick: () => void }; className?: string; }
const icons: Record<AlertType,string> = { success:'✓', error:'✗', warning:'⚠', info:'ℹ' };
const styles: Record<AlertType,{bg:string;border:string;title:string;msg:string}> = {
  success:{bg:'#E2F5EE',border:'#17AB78',title:'#0E7C55',msg:'#1A5C40'},
  error:{bg:'#FEF0F0',border:'#FF0000',title:'#E00000',msg:'#9B1C1C'},
  warning:{bg:'#FFF4E5',border:'#E3A92D',title:'#B45309',msg:'#7C3D12'},
  info:{bg:'#EFF9FE',border:'#009CF4',title:'#005BA6',msg:'#1E4D7B'},
};
export const Alert: React.FC<AlertProps> = ({type='info',title,message,onClose,action,className=''}) => {
  const s=styles[type]; const font="'Source Sans Pro',-apple-system,sans-serif";
  return (<div role="alert" className={className} style={{display:'flex',alignItems:'flex-start',gap:12,padding:'14px 16px',background:s.bg,borderRadius:4,border:'1px solid '+s.border,fontFamily:font}}>
    <span style={{flexShrink:0,fontSize:18,fontWeight:700,color:s.title,lineHeight:1,marginTop:1}}>{icons[type]}</span>
    <div style={{flex:1,minWidth:0}}>
      {title&&<div style={{fontSize:14,fontWeight:600,color:s.title,lineHeight:'20px',marginBottom:4}}>{title}</div>}
      <div style={{fontSize:13,color:s.msg,lineHeight:'20px'}}>{message}</div>
      {action&&<button onClick={action.onClick} style={{marginTop:8,background:'none',border:'none',cursor:'pointer',color:s.title,fontSize:13,fontWeight:600,padding:0,fontFamily:font,textDecoration:'underline'}}>{action.label}</button>}
    </div>
    {onClose&&<button onClick={onClose} style={{background:'none',border:'none',cursor:'pointer',color:s.title,padding:0,flexShrink:0,fontSize:20,lineHeight:1,opacity:.7}} onMouseEnter={e=>((e.currentTarget as HTMLElement).style.opacity='1')} onMouseLeave={e=>((e.currentTarget as HTMLElement).style.opacity='.7')}>×</button>}
  </div>);
};
export default Alert;