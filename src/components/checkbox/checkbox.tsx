import React from 'react';
export type CheckboxColorScheme = 'current' | 'future';
export interface CheckboxProps {
  /** current=orange#005BA6 ADA-FAIL(2.9:1) | future=blue#005BA6 ADA-PASS(4.8:1) @default 'future' */
  colorScheme?: CheckboxColorScheme;
  checked?: boolean; indeterminate?: boolean; disabled?: boolean;
  label?: string; id?: string; onChange?: (v: boolean) => void; className?: string;
}
const C={current:{fill:'#005BA6',focus:'rgba(255,149,5,0.35)'},future:{fill:'#005BA6',focus:'rgba(0,91,166,0.5)'}};
export const Checkbox: React.FC<CheckboxProps> = ({colorScheme='future',checked=false,indeterminate=false,disabled=false,label,id,onChange,className=''}) => {
  const c=C[colorScheme];
  const bg=disabled?'#DCEAED':checked||indeterminate?c.fill:'#FFF';
  const border=disabled?'1.5px solid #DCDCDC':checked||indeterminate?`1.5px solid ${c.fill}`:'1.5px solid #949494';
  const onKD=(e:React.KeyboardEvent)=>{if((e.key===' '||e.key==='Enter')&&!disabled){e.preventDefault();onChange?.(!checked);}};
  return(
    <div style={{display:'inline-flex',alignItems:'center',gap:8,cursor:disabled?'not-allowed':'pointer',opacity:disabled?.5:1,fontFamily:"'Source Sans Pro',sans-serif"}} className={className}>
      <div role="checkbox" aria-checked={indeterminate?'mixed':checked} aria-disabled={disabled} tabIndex={disabled?-1:0} id={id}
        style={{width:24,height:24,borderRadius:2,border,background:bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,transition:'all 150ms ease',outline:'none'}}
        onClick={()=>!disabled&&onChange?.(!checked)} onKeyDown={onKD}
        onFocus={e=>{(e.currentTarget as HTMLElement).style.boxShadow=`0 0 0 3px ${c.focus}`;}}
        onBlur={e=>{(e.currentTarget as HTMLElement).style.boxShadow='none';}}>
        {indeterminate&&!checked&&<svg width="12" height="2" viewBox="0 0 12 2"><rect width="12" height="2" rx="1" fill="white"/></svg>}
        {checked&&!indeterminate&&<svg width="14" height="11" viewBox="0 0 14 11" fill="none"><path d="M1 5L5.5 9.5L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </div>
      {label&&<span style={{fontSize:14,color:disabled?'#949494':'#4A4A4A',userSelect:'none'}}>{label}</span>}
    </div>
  );
};
export default Checkbox;
