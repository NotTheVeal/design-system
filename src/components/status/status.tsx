import React from 'react';
export type StatusValue = 'active'|'inactive'|'pending'|'error'|'warning'|'draft'|'archived';
export interface StatusProps { value: StatusValue; label?: string; showDot?: boolean; size?: 'sm'|'md'; className?: string; }
const cfg: Record<StatusValue,{color:string;bg:string;border:string;dot:string;label:string}> = {
  active:{color:'#0E7C55',bg:'#E2F5EE',border:'#0E7C55',dot:'#17AB78',label:'Active'},
  inactive:{color:'#777',bg:'#F1F1F1',border:'#949494',dot:'#949494',label:'Inactive'},
  pending:{color:'#B45309',bg:'#FFF4D0',border:'#B45309',dot:'#E3A92D',label:'Pending'},
  error:{color:'#D32F2F',bg:'#FACBCB',border:'#D32F2F',dot:'#FF0000',label:'Error'},
  warning:{color:'#B45309',bg:'#FFF4D0',border:'#E3A92D',dot:'#E3A92D',label:'Warning'},
  draft:{color:'#005BA6',bg:'#DCEAED',border:'#005BA6',dot:'#009CF4',label:'Draft'},
  archived:{color:'#777',bg:'#F1F1F1',border:'#DCDCDC',dot:'#DCDCDC',label:'Archived'},
};
export const Status: React.FC<StatusProps> = ({value,label,showDot=true,size='md',className=''}) => {
  const c = cfg[value]||cfg.inactive; const font = "'Source Sans Pro', -apple-system, sans-serif";
  const fs = size==='sm'?11:12; const ds = size==='sm'?6:8;
  return (<span className={className} style={{display:'inline-flex',alignItems:'center',gap:6,padding:size==='sm'?'2px 8px':'3px 10px',borderRadius:'100px',background:c.bg,border:`1px solid ${c.border}`,fontFamily:font,fontSize:fs,fontWeight:700,color:c.color,whiteSpace:'nowrap',lineHeight:'16px'}}>
    {showDot&&<span style={{width:ds,height:ds,borderRadius:'50%',background:c.dot,flexShrink:0,display:'inline-block',animation:value==='pending'?'statusPulse 1.5s ease-in-out infinite':'none'}}/>}
    {label||c.label}<style>{`@keyframes statusPulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
  </span>);
};
export default Status;