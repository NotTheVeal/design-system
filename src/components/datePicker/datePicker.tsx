import React,{useState}from'react';
export type DatePickerColorScheme='current'|'future';
export interface DatePickerProps{colorScheme?:DatePickerColorScheme;value?:Date|null;onChange?:(d:Date)=>void;label?:string;placeholder?:string;disabled?:boolean;id?:string;className?:string;}
const C={current:{icon:'#005BA6',sel:'#005BA6',selTxt:'#FFF',hover:'#FFF8EC',focus:'rgba(255,149,5,0.25)',label:'#005BA6',border:'#005BA6'},future:{icon:'#005BA6',sel:'#005BA6',selTxt:'#FFF',hover:'#EFF9FE',focus:'rgba(0,91,166,0.25)',label:'#005BA6',border:'#005BA6'}};
const DAYS=['Su','Mo','Tu','We','Th','Fr','Sa'];
const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
const fmt=(d:Date)=>`${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getDate().toString().padStart(2,'0')}/${d.getFullYear()}`;
export const DatePicker:React.FC<DatePickerProps>=({colorScheme='future',value=null,onChange,label='Select Date',placeholder='MM/DD/YYYY',disabled=false,id,className=''})=>{
  const c=C[colorScheme];const[open,setOpen]=useState(false);const[view,setView]=useState(value??new Date());const[focused,setFocused]=useState(false);
  const has=value!==null;const float=focused||has||open;
  const yr=view.getFullYear();const mo=view.getMonth();
  const days=new Date(yr,mo+1,0).getDate();const first=new Date(yr,mo,1).getDay();
  const same=(a:Date,b:Date)=>a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate();
  const today=new Date();
  const cells=[...Array(first).fill(null),...Array.from({length:days},(_,i)=>i+1)];
  const bc=open||focused?c.border:'#DCDCDC';
  return(<div style={{position:'relative',display:'inline-block',fontFamily:"'Source Sans Pro',sans-serif"}} className={className}>
    <div style={{width:280,height:48,border:`1px solid ${bc}`,borderRadius:4,background:disabled?'#DCEAED':'#FFF',display:'flex',alignItems:'center',padding:'0 12px',cursor:disabled?'not-allowed':'pointer',position:'relative',outline:'none',boxShadow:focused&&!disabled?`0 0 0 2px ${c.focus}`:'none'}}
      tabIndex={disabled?-1:0} role="button" aria-expanded={open} aria-haspopup="dialog" id={id}
      onClick={()=>!disabled&&setOpen(o=>!o)} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
      onKeyDown={e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();!disabled&&setOpen(o=>!o);}if(e.key==='Escape')setOpen(false);}}>
      <span style={{position:'absolute',left:12,top:float?6:'50%',transform:float?'none':'translateY(-50%)',fontSize:float?11:14,fontWeight:float?700:400,color:float?c.label:'#777',transition:'all 150ms ease',pointerEvents:'none',background:disabled?'#DCEAED':'#FFF',padding:'0 2px'}}>{label}</span>
      <span style={{fontSize:14,color:'#4A4A4A',marginTop:float?10:0,opacity:has?1:0}}>{has?fmt(value!):placeholder}</span>
      <span style={{marginLeft:'auto',color:disabled?'#949494':c.icon}}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      </span>
    </div>
    {open&&!disabled&&<div style={{position:'absolute',top:52,left:0,zIndex:100,background:'#FFF',border:'1px solid #DCDCDC',borderRadius:4,boxShadow:'0 4px 12px rgba(0,0,0,0.12)',padding:16,minWidth:280}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
        <button onClick={()=>setView(new Date(yr,mo-1,1))} style={{background:'none',border:'none',cursor:'pointer',color:'#4A4A4A',padding:4}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><polyline points="15 18 9 12 15 6"/></svg></button>
        <span style={{fontSize:14,fontWeight:700,color:'#002F48'}}>{MONTHS[mo]} {yr}</span>
        <button onClick={()=>setView(new Date(yr,mo+1,1))} style={{background:'none',border:'none',cursor:'pointer',color:'#4A4A4A',padding:4}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><polyline points="9 18 15 12 9 6"/></svg></button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:2,marginBottom:4}}>{DAYS.map(d=><div key={d} style={{textAlign:'center',fontSize:11,fontWeight:700,color:'#949494',padding:'4px 0'}}>{d}</div>)}</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:2}}>
        {cells.map((day,i)=>!day?<div key={`e${i}`}/>:<button key={day} onClick={()=>{onChange?.(new Date(yr,mo,day));setOpen(false);}}
          style={{width:'100%',aspectRatio:'1',borderRadius:'50%',border:same(new Date(yr,mo,day),today)&&!(value&&same(new Date(yr,mo,day),value))?`1px solid ${c.sel}`:'none',background:value&&same(new Date(yr,mo,day),value)?c.sel:'transparent',color:value&&same(new Date(yr,mo,day),value)?c.selTxt:same(new Date(yr,mo,day),today)?c.sel:'#4A4A4A',fontSize:13,fontWeight:(value&&same(new Date(yr,mo,day),value))||same(new Date(yr,mo,day),today)?700:400,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'inherit'}}
          onMouseEnter={e=>{if(!(value&&same(new Date(yr,mo,day),value)))(e.currentTarget as HTMLButtonElement).style.background=c.hover;}}
          onMouseLeave={e=>{if(!(value&&same(new Date(yr,mo,day),value)))(e.currentTarget as HTMLButtonElement).style.background='transparent';}}>{day}</button>)}
      </div>
    </div>}
  </div>);
};
export default DatePicker;
