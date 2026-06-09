#!/usr/bin/env python3
"""Generate all current/future color-scheme components into the repo."""
import os, textwrap

BASE = 'src/components'

FILES = {}

# ─── CHECKBOX ────────────────────────────────────────────────────────────────
FILES[f'{BASE}/checkbox/checkbox.tsx'] = r"""import React from 'react';
export type CheckboxColorScheme = 'current' | 'future';
export interface CheckboxProps {
  /** current=orange#005BA6 ADA-FAIL(2.9:1) | future=blue#005BA6 ADA-PASS(4.8:1) @default 'future' */
  colorScheme?: CheckboxColorScheme;
  checked?: boolean; indeterminate?: boolean; disabled?: boolean;
  label?: string; id?: string; onChange?: (v: boolean) => void; className?: string;
}
const C={current:{fill:'#005BA6',focus:'rgba(0,91,166,0.35)'},future:{fill:'#005BA6',focus:'rgba(0,91,166,0.5)'}};
export const Checkbox: React.FC<CheckboxProps> = ({colorScheme='future',checked=false,indeterminate=false,disabled=false,label,id,onChange,className=''}) => {
  const c=C[colorScheme];
  const bg=disabled?'#F1F1F1':checked||indeterminate?c.fill:'#FFF';
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
"""

FILES[f'{BASE}/checkbox/checkbox.stories.tsx'] = r"""import type{Meta,StoryObj}from'@storybook/react';
import{Checkbox}from'./checkbox';
const meta:Meta<typeof Checkbox>={title:'Components/Checkbox',component:Checkbox,tags:['autodocs'],
  parameters:{docs:{description:{component:'`current`=Orange#005BA6 ADA-FAIL(2.9:1) legacy-only | `future`=Blue#005BA6 ADA-PASS(4.8:1) approved'}}},
  argTypes:{colorScheme:{control:'radio',options:['current','future']}}};
export default meta;type Story=StoryObj<typeof Checkbox>;
const Banner=({s}:{s:'current'|'future'})=>s==='future'
  ?<div style={{padding:'8px 12px',background:'#E2F5EE',borderRadius:4,fontSize:12,color:'#0E7C55',fontFamily:'sans-serif',marginBottom:8}}>✅ ADA COMPLIANT — PS Blue #005BA6 — 4.8:1 — Production approved</div>
  :<div style={{padding:'8px 12px',background:'#FACBCB',borderRadius:4,fontSize:12,color:'#C00',fontFamily:'sans-serif',marginBottom:8}}>⚠️ LEGACY — Orange #005BA6 — 2.9:1 — ADA NON-COMPLIANT — DO NOT USE IN PRODUCTION</div>;
export const Future_AllStates:Story={name:'✅ Future · All States (PS Blue)',render:()=><div style={{display:'flex',flexDirection:'column',gap:12}}><Banner s="future"/><Checkbox colorScheme="future" label="Unchecked"/><Checkbox colorScheme="future" checked label="Checked"/><Checkbox colorScheme="future" indeterminate label="Indeterminate"/><Checkbox colorScheme="future" disabled label="Disabled"/><Checkbox colorScheme="future" checked disabled label="Disabled Checked"/></div>};
export const Current_AllStates:Story={name:'⚠️ Current · All States (Legacy Orange)',render:()=><div style={{display:'flex',flexDirection:'column',gap:12}}><Banner s="current"/><Checkbox colorScheme="current" label="Unchecked"/><Checkbox colorScheme="current" checked label="Checked"/><Checkbox colorScheme="current" indeterminate label="Indeterminate"/><Checkbox colorScheme="current" disabled label="Disabled"/><Checkbox colorScheme="current" checked disabled label="Disabled Checked"/></div>};
export const SideBySide:Story={name:'🔄 Side-by-Side: Current vs Future',render:()=>(
  <div style={{display:'flex',gap:40,fontFamily:"'Source Sans Pro',sans-serif"}}>
    <div><div style={{fontSize:11,fontWeight:700,color:'#C00',marginBottom:8}}>⚠️ CURRENT (LEGACY)</div><Banner s="current"/><Checkbox colorScheme="current" label="Unchecked"/><div style={{marginTop:8}}/><Checkbox colorScheme="current" checked label="Checked"/><div style={{marginTop:8}}/><Checkbox colorScheme="current" indeterminate label="Indeterminate"/></div>
    <div style={{width:1,background:'#DCDCDC'}}/>
    <div><div style={{fontSize:11,fontWeight:700,color:'#0E7C55',marginBottom:8}}>✅ FUTURE (APPROVED)</div><Banner s="future"/><Checkbox colorScheme="future" label="Unchecked"/><div style={{marginTop:8}}/><Checkbox colorScheme="future" checked label="Checked"/><div style={{marginTop:8}}/><Checkbox colorScheme="future" indeterminate label="Indeterminate"/></div>
  </div>)};
"""

# ─── RADIO ───────────────────────────────────────────────────────────────────
FILES[f'{BASE}/radio/radio.tsx'] = r"""import React from 'react';
export type RadioColorScheme='current'|'future';
export interface RadioProps{colorScheme?:RadioColorScheme;selected?:boolean;disabled?:boolean;label?:string;value?:string;name?:string;id?:string;onChange?:(v:string)=>void;className?:string;}
const C={current:{fill:'#005BA6',focus:'rgba(0,91,166,0.35)'},future:{fill:'#005BA6',focus:'rgba(0,91,166,0.5)'}};
export const Radio:React.FC<RadioProps>=({colorScheme='future',selected=false,disabled=false,label,value='',name,id,onChange,className=''})=>{
  const c=C[colorScheme];
  const bc=disabled?'#DCDCDC':selected?c.fill:'#949494';
  const onKD=(e:React.KeyboardEvent)=>{if((e.key===' '||e.key==='Enter')&&!disabled){e.preventDefault();onChange?.(value);}};
  return(<div style={{display:'inline-flex',alignItems:'center',gap:8,cursor:disabled?'not-allowed':'pointer',opacity:disabled?.5:1,fontFamily:"'Source Sans Pro',sans-serif"}} className={className}>
    <div role="radio" aria-checked={selected} aria-disabled={disabled} tabIndex={disabled?-1:0} id={id}
      style={{width:24,height:24,borderRadius:'50%',border:`1.5px solid ${bc}`,background:disabled?'#F1F1F1':'#FFF',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,transition:'all 150ms ease',outline:'none'}}
      onClick={()=>!disabled&&onChange?.(value)} onKeyDown={onKD}
      onFocus={e=>{(e.currentTarget as HTMLElement).style.boxShadow=`0 0 0 3px ${c.focus}`;}}
      onBlur={e=>{(e.currentTarget as HTMLElement).style.boxShadow='none';}}>
      {selected&&<div style={{width:10,height:10,borderRadius:'50%',background:disabled?'#949494':c.fill,transition:'all 150ms ease'}}/>}
    </div>
    {label&&<span style={{fontSize:14,color:disabled?'#949494':'#4A4A4A',userSelect:'none'}}>{label}</span>}
  </div>);
};
export interface RadioGroupProps{colorScheme?:RadioColorScheme;options:Array<{label:string;value:string;disabled?:boolean}>;value?:string;name?:string;onChange?:(v:string)=>void;}
export const RadioGroup:React.FC<RadioGroupProps>=({colorScheme='future',options,value,name,onChange})=>(
  <div role="radiogroup" style={{display:'flex',flexDirection:'column',gap:12}}>
    {options.map(o=><Radio key={o.value} colorScheme={colorScheme} label={o.label} value={o.value} name={name} selected={value===o.value} disabled={o.disabled} onChange={onChange}/>)}
  </div>);
export default Radio;
"""

FILES[f'{BASE}/radio/radio.stories.tsx'] = r"""import type{Meta,StoryObj}from'@storybook/react';
import{Radio,RadioGroup}from'./radio';
const meta:Meta<typeof Radio>={title:'Components/Radio',component:Radio,tags:['autodocs'],
  parameters:{docs:{description:{component:'`current`=Orange#005BA6 ADA-FAIL(2.9:1) | `future`=Blue#005BA6 ADA-PASS(4.8:1)'}}}};
export default meta;type Story=StoryObj<typeof Radio>;
const B=({s}:{s:'current'|'future'})=>s==='future'
  ?<div style={{padding:'8px 12px',background:'#E2F5EE',borderRadius:4,fontSize:12,color:'#0E7C55',marginBottom:8}}>✅ ADA COMPLIANT — PS Blue #005BA6 — 4.8:1</div>
  :<div style={{padding:'8px 12px',background:'#FACBCB',borderRadius:4,fontSize:12,color:'#C00',marginBottom:8}}>⚠️ LEGACY — Orange #005BA6 — 2.9:1 — DO NOT USE IN PRODUCTION</div>;
const OPTS=[{label:'Option A',value:'a'},{label:'Option B',value:'b'},{label:'Option C (disabled)',value:'c',disabled:true}];
export const Future_Group:Story={name:'✅ Future · Radio Group (PS Blue)',render:()=><div><B s="future"/><RadioGroup colorScheme="future" value="b" options={OPTS}/></div>};
export const Current_Group:Story={name:'⚠️ Current · Radio Group (Legacy Orange)',render:()=><div><B s="current"/><RadioGroup colorScheme="current" value="b" options={OPTS}/></div>};
export const SideBySide:Story={name:'🔄 Side-by-Side: Current vs Future',render:()=>(
  <div style={{display:'flex',gap:40,fontFamily:"'Source Sans Pro',sans-serif"}}>
    <div><div style={{fontSize:11,fontWeight:700,color:'#C00',marginBottom:8}}>⚠️ CURRENT — Orange #005BA6 · 2.9:1</div><RadioGroup colorScheme="current" value="b" options={OPTS}/></div>
    <div style={{width:1,background:'#DCDCDC'}}/>
    <div><div style={{fontSize:11,fontWeight:700,color:'#0E7C55',marginBottom:8}}>✅ FUTURE — PS Blue #005BA6 · 4.8:1</div><RadioGroup colorScheme="future" value="b" options={OPTS}/></div>
  </div>)};
"""

# ─── TOGGLE ──────────────────────────────────────────────────────────────────
FILES[f'{BASE}/toggle/toggle.tsx'] = r"""import React from 'react';
export type ToggleColorScheme='current'|'future';
export interface ToggleProps{colorScheme?:ToggleColorScheme;checked?:boolean;disabled?:boolean;label?:string;labelPosition?:'left'|'right';id?:string;onChange?:(v:boolean)=>void;className?:string;}
const C={current:{on:'#005BA6',focus:'rgba(0,91,166,0.35)'},future:{on:'#005BA6',focus:'rgba(0,91,166,0.5)'}};
export const Toggle:React.FC<ToggleProps>=({colorScheme='future',checked=false,disabled=false,label,labelPosition='right',id,onChange,className=''})=>{
  const c=C[colorScheme];
  const track=disabled?'#DCDCDC':checked?c.on:'#949494';
  const onKD=(e:React.KeyboardEvent)=>{if(e.key===' '&&!disabled){e.preventDefault();onChange?.(!checked);}};
  const lbl=label&&<span style={{fontSize:14,color:disabled?'#949494':'#4A4A4A',userSelect:'none',fontFamily:"'Source Sans Pro',sans-serif"}}>{label}</span>;
  return(<div style={{display:'inline-flex',alignItems:'center',gap:8,cursor:disabled?'not-allowed':'pointer',opacity:disabled?.6:1}} className={className}>
    {labelPosition==='left'&&lbl}
    <div role="switch" aria-checked={checked} aria-disabled={disabled} aria-label={label} tabIndex={disabled?-1:0} id={id}
      onClick={()=>!disabled&&onChange?.(!checked)} onKeyDown={onKD}
      onFocus={e=>{(e.currentTarget as HTMLElement).style.boxShadow=`0 0 0 3px ${c.focus}`;}}
      onBlur={e=>{(e.currentTarget as HTMLElement).style.boxShadow='none';}}
      style={{width:44,height:24,borderRadius:100,background:track,position:'relative',transition:'background 200ms ease',outline:'none',flexShrink:0}}>
      <div style={{width:18,height:18,borderRadius:'50%',background:'#FFF',position:'absolute',top:3,left:checked?23:3,transition:'left 200ms ease',boxShadow:'0 1px 3px rgba(0,0,0,0.2)'}}/>
    </div>
    {labelPosition==='right'&&lbl}
  </div>);
};
export default Toggle;
"""

FILES[f'{BASE}/toggle/toggle.stories.tsx'] = r"""import type{Meta,StoryObj}from'@storybook/react';
import{Toggle}from'./toggle';
const meta:Meta<typeof Toggle>={title:'Components/Toggle',component:Toggle,tags:['autodocs'],
  parameters:{docs:{description:{component:'`current`=Orange#005BA6 ADA-FAIL(2.9:1) | `future`=Blue#005BA6 ADA-PASS(4.8:1)'}}}};
export default meta;type Story=StoryObj<typeof Toggle>;
const B=({s}:{s:'current'|'future'})=>s==='future'
  ?<div style={{padding:'8px 12px',background:'#E2F5EE',borderRadius:4,fontSize:12,color:'#0E7C55',marginBottom:8}}>✅ ADA COMPLIANT — PS Blue #005BA6 — 4.8:1</div>
  :<div style={{padding:'8px 12px',background:'#FACBCB',borderRadius:4,fontSize:12,color:'#C00',marginBottom:8}}>⚠️ LEGACY — Orange #005BA6 — 2.9:1 — DO NOT USE IN PRODUCTION</div>;
export const Future_AllStates:Story={name:'✅ Future · All States (PS Blue)',render:()=><div style={{display:'flex',flexDirection:'column',gap:12}}><B s="future"/><Toggle colorScheme="future" label="Off"/><Toggle colorScheme="future" checked label="On"/><Toggle colorScheme="future" disabled label="Disabled Off"/><Toggle colorScheme="future" checked disabled label="Disabled On"/></div>};
export const Current_AllStates:Story={name:'⚠️ Current · All States (Legacy Orange)',render:()=><div style={{display:'flex',flexDirection:'column',gap:12}}><B s="current"/><Toggle colorScheme="current" label="Off"/><Toggle colorScheme="current" checked label="On"/><Toggle colorScheme="current" disabled label="Disabled Off"/><Toggle colorScheme="current" checked disabled label="Disabled On"/></div>};
export const SideBySide:Story={name:'🔄 Side-by-Side: Current vs Future',render:()=>(
  <div style={{display:'flex',gap:40,fontFamily:"'Source Sans Pro',sans-serif"}}>
    <div><div style={{fontSize:11,fontWeight:700,color:'#C00',marginBottom:8}}>⚠️ CURRENT — Orange #005BA6</div><Toggle colorScheme="current" label="Off"/><div style={{marginTop:12}}/><Toggle colorScheme="current" checked label="On"/></div>
    <div style={{width:1,background:'#DCDCDC'}}/>
    <div><div style={{fontSize:11,fontWeight:700,color:'#0E7C55',marginBottom:8}}>✅ FUTURE — PS Blue #005BA6</div><Toggle colorScheme="future" label="Off"/><div style={{marginTop:12}}/><Toggle colorScheme="future" checked label="On"/></div>
  </div>)};
"""

# ─── STEPPER ─────────────────────────────────────────────────────────────────
FILES[f'{BASE}/stepper/stepper.tsx'] = r"""import React from 'react';
export type StepperColorScheme='current'|'future';
export type StepStatus='not-started'|'in-progress'|'completed';
export interface Step{label:string;description?:string;}
export interface StepperProps{colorScheme?:StepperColorScheme;steps:Step[];currentStep?:number;orientation?:'horizontal'|'vertical';className?:string;}
const C={current:{active:'#005BA6',activeBg:'#FFF8EC'},future:{active:'#005BA6',activeBg:'#DCEAED'}};
export const Stepper:React.FC<StepperProps>=({colorScheme='future',steps,currentStep=0,orientation='horizontal',className=''})=>{
  const c=C[colorScheme];
  const getStatus=(i:number):StepStatus=>i<currentStep?'completed':i===currentStep?'in-progress':'not-started';
  const getCircle=(s:StepStatus):React.CSSProperties=>s==='completed'?{background:'#17AB78',border:'2px solid #17AB78',color:'#fff'}:s==='in-progress'?{background:c.activeBg,border:`2px solid ${c.active}`,color:c.active}:{background:'#FFF',border:'2px solid #DCDCDC',color:'#949494'};
  const isH=orientation==='horizontal';
  return(<div className={className} style={{display:'flex',flexDirection:isH?'row':'column',alignItems:isH?'flex-start':'stretch',fontFamily:"'Source Sans Pro',sans-serif"}}>
    {steps.map((step,i)=>{const s=getStatus(i);const cs=getCircle(s);const isLast=i===steps.length-1;return(
      <div key={i} style={{display:'flex',flexDirection:isH?'column':'row',alignItems:isH?'center':'flex-start',flex:isH&&!isLast?1:undefined,gap:isH?8:0}}>
        <div style={{display:'flex',flexDirection:isH?'row':'column',alignItems:'center',width:isH?'100%':undefined}}>
          <div style={{width:32,height:32,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:700,flexShrink:0,...cs}}>
            {s==='completed'?<svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 6L6 11L15 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>:<span>{i+1}</span>}
          </div>
          {!isLast&&<div style={{flex:isH?1:undefined,height:isH?2:32,width:isH?undefined:2,background:s==='completed'?'#17AB78':'#DCDCDC',minWidth:isH?24:undefined}}/>}
        </div>
        <div style={{textAlign:isH?'center':'left',paddingLeft:isH?0:12,maxWidth:isH?100:undefined}}>
          <div style={{fontSize:12,fontWeight:s==='in-progress'?700:400,color:s==='in-progress'?c.active:s==='completed'?'#17AB78':'#949494'}}>{step.label}</div>
          {step.description&&<div style={{fontSize:11,color:'#949494',marginTop:2}}>{step.description}</div>}
        </div>
      </div>);})}
  </div>);
};
export default Stepper;
"""

FILES[f'{BASE}/stepper/stepper.stories.tsx'] = r"""import type{Meta,StoryObj}from'@storybook/react';
import{Stepper}from'./stepper';
const meta:Meta<typeof Stepper>={title:'Components/Stepper',component:Stepper,tags:['autodocs'],
  parameters:{docs:{description:{component:'`currentStep` (0-based) drives step states. `current`=Orange ADA-FAIL | `future`=Blue ADA-PASS'}}}};
export default meta;type Story=StoryObj<typeof Stepper>;
const STEPS=[{label:'Request'},{label:'Approval'},{label:'Order'},{label:'Delivery'}];
const B=({s}:{s:'current'|'future'})=>s==='future'
  ?<div style={{padding:'8px 12px',background:'#E2F5EE',borderRadius:4,fontSize:12,color:'#0E7C55',marginBottom:8}}>✅ ADA COMPLIANT — PS Blue #005BA6 — 4.8:1</div>
  :<div style={{padding:'8px 12px',background:'#FACBCB',borderRadius:4,fontSize:12,color:'#C00',marginBottom:8}}>⚠️ LEGACY — Orange #005BA6 — 2.9:1 — DO NOT USE IN PRODUCTION</div>;
export const Future_Step2:Story={name:'✅ Future · Step 2 Active (PS Blue)',render:()=><div style={{padding:24}}><B s="future"/><Stepper colorScheme="future" steps={STEPS} currentStep={1}/></div>};
export const Future_Step3:Story={name:'✅ Future · Step 3 Active',render:()=><div style={{padding:24}}><Stepper colorScheme="future" steps={STEPS} currentStep={2}/></div>};
export const Current_Step2:Story={name:'⚠️ Current · Step 2 Active (Legacy Orange)',render:()=><div style={{padding:24}}><B s="current"/><Stepper colorScheme="current" steps={STEPS} currentStep={1}/></div>};
export const SideBySide:Story={name:'🔄 Side-by-Side: Current vs Future',render:()=>(
  <div style={{display:'flex',flexDirection:'column',gap:32,padding:24,fontFamily:"'Source Sans Pro',sans-serif"}}>
    <div><div style={{fontSize:11,fontWeight:700,color:'#C00',marginBottom:8}}>⚠️ CURRENT — Orange #005BA6 · 2.9:1 · FAILS WCAG AA</div><Stepper colorScheme="current" steps={STEPS} currentStep={1}/></div>
    <div style={{height:1,background:'#DCDCDC'}}/>
    <div><div style={{fontSize:11,fontWeight:700,color:'#0E7C55',marginBottom:8}}>✅ FUTURE — PS Blue #005BA6 · 4.8:1 · PASSES WCAG AA</div><Stepper colorScheme="future" steps={STEPS} currentStep={1}/></div>
  </div>)};
"""

# ─── MODAL ───────────────────────────────────────────────────────────────────
FILES[f'{BASE}/modal/modal.tsx'] = r"""import React,{useEffect,useRef}from'react';
export type ModalColorScheme='current'|'future';
export type ModalSize='sm'|'md'|'lg';
export interface ModalProps{colorScheme?:ModalColorScheme;isOpen?:boolean;onClose?:()=>void;title?:string;children?:React.ReactNode;primaryLabel?:string;secondaryLabel?:string;onPrimary?:()=>void;onSecondary?:()=>void;size?:ModalSize;}
const C={current:{btn:'#005BA6',hover:'#004A84',text:'#FFF',border:'#005BA6'},future:{btn:'#005BA6',hover:'#004A84',text:'#FFF',border:'#005BA6'}};
const W={sm:400,md:520,lg:680};
export const Modal:React.FC<ModalProps>=({colorScheme='future',isOpen=false,onClose,title='Dialog Title',children,primaryLabel='Confirm',secondaryLabel='Cancel',onPrimary,onSecondary,size='md'})=>{
  const c=C[colorScheme];const dialogRef=useRef<HTMLDivElement>(null);const closeRef=useRef<HTMLButtonElement>(null);
  useEffect(()=>{if(!isOpen)return;closeRef.current?.focus();
    const h=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose?.();if(e.key==='Tab'){const f=dialogRef.current?.querySelectorAll<HTMLElement>('button,[href],input,[tabindex]:not([tabindex="-1"])');if(!f||!f.length)return;if(e.shiftKey&&document.activeElement===f[0]){e.preventDefault();f[f.length-1].focus();}else if(!e.shiftKey&&document.activeElement===f[f.length-1]){e.preventDefault();f[0].focus();}}};
    document.addEventListener('keydown',h);return()=>document.removeEventListener('keydown',h);},[isOpen,onClose]);
  if(!isOpen)return null;
  return(<div style={{position:'fixed',inset:0,zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}} aria-modal="true" role="dialog" aria-labelledby="modal-title">
    <div style={{position:'absolute',inset:0,background:'rgba(0,47,72,0.5)'}} onClick={onClose} aria-hidden="true"/>
    <div ref={dialogRef} style={{position:'relative',width:W[size],maxWidth:'calc(100vw - 32px)',background:'#FFF',borderRadius:8,boxShadow:'0 6px 20px rgba(0,47,72,0.18)',fontFamily:"'Source Sans Pro',sans-serif",overflow:'hidden'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'20px 24px 16px',borderBottom:'1px solid #DCDCDC'}}>
        <h2 id="modal-title" style={{fontSize:18,fontWeight:700,color:'#002F48',margin:0}}>{title}</h2>
        <button ref={closeRef} onClick={onClose} aria-label="Close dialog" style={{background:'none',border:'none',cursor:'pointer',color:'#777',padding:4,display:'flex',alignItems:'center',borderRadius:4}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div style={{padding:'20px 24px',color:'#4A4A4A',fontSize:14,lineHeight:1.6}}>{children??<p>Your session has timed out. Please contact your representative or return to the home page.</p>}</div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end',gap:12,padding:'16px 24px',borderTop:'1px solid #DCDCDC',background:'#FAFAFA'}}>
        {secondaryLabel&&<button onClick={onSecondary??onClose} style={{background:'none',border:'2px solid #005BA6',borderRadius:4,padding:'10px 20px',fontSize:14,fontWeight:600,color:'#005BA6',cursor:'pointer',fontFamily:'inherit'}}>
          {secondaryLabel}
        </button>}
        {primaryLabel&&<button onClick={onPrimary} style={{background:c.btn,border:`2px solid ${c.border}`,borderRadius:4,padding:'10px 20px',fontSize:14,fontWeight:600,color:c.text,cursor:'pointer',fontFamily:'inherit',transition:'background 200ms ease'}}
          onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background=c.hover;}}
          onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background=c.btn;}}>
          {primaryLabel}
        </button>}
      </div>
    </div>
  </div>);
};
export default Modal;
"""

FILES[f'{BASE}/modal/modal.stories.tsx'] = r"""import type{Meta,StoryObj}from'@storybook/react';
import React,{useState}from'react';
import{Modal}from'./modal';
const meta:Meta<typeof Modal>={title:'Components/Modal',component:Modal,tags:['autodocs'],parameters:{layout:'fullscreen',docs:{description:{component:'`current`=Orange#005BA6 CTA ADA-FAIL | `future`=Blue#005BA6 CTA ADA-PASS. Has focus-trap, Escape key, aria-modal.'}}}};
export default meta;type Story=StoryObj<typeof Modal>;
const Demo=({s}:{s:'current'|'future'})=>{const[o,setO]=useState(false);const iF=s==='future';return(<div style={{padding:24}}>
  <div style={{padding:'8px 12px',borderRadius:4,fontSize:12,marginBottom:16,background:iF?'#E2F5EE':'#FACBCB',color:iF?'#0E7C55':'#C00'}}>
    {iF?'✅ ADA COMPLIANT — PS Blue #005BA6 — 4.8:1':'⚠️ LEGACY — Orange #005BA6 — 2.9:1 — DO NOT USE IN PRODUCTION'}</div>
  <button onClick={()=>setO(true)} style={{background:'#005BA6',color:'white',border:'none',borderRadius:4,padding:'10px 20px',fontSize:14,fontWeight:600,cursor:'pointer'}}>Open Modal</button>
  <Modal colorScheme={s} isOpen={o} onClose={()=>setO(false)} title="Your Session Has Timed Out" primaryLabel="Contact Rep" secondaryLabel="Continue to Home Page" onPrimary={()=>setO(false)}/>
</div>);};
export const Future_Modal:Story={name:'✅ Future · Modal (PS Blue CTA)',render:()=><Demo s="future"/>};
export const Future_Static:Story={name:'✅ Future · Open (static)',args:{colorScheme:'future',isOpen:true,title:'Session Timed Out',primaryLabel:'Contact Rep',secondaryLabel:'Go to Home'}};
export const Current_Modal:Story={name:'⚠️ Current · Modal (Legacy Orange CTA)',render:()=><Demo s="current"/>};
export const Current_Static:Story={name:'⚠️ Current · Open (static legacy)',args:{colorScheme:'current',isOpen:true,title:'Session Timed Out',primaryLabel:'Contact Rep',secondaryLabel:'Go to Home'}};
export const SideBySide:Story={name:'🔄 Side-by-Side: Current vs Future',parameters:{layout:'padded'},render:()=>(
  <div style={{display:'flex',gap:32}}>
    <div style={{flex:1}}><div style={{fontSize:11,fontWeight:700,color:'#C00',marginBottom:8}}>⚠️ CURRENT</div><Demo s="current"/></div>
    <div style={{flex:1}}><div style={{fontSize:11,fontWeight:700,color:'#0E7C55',marginBottom:8}}>✅ FUTURE</div><Demo s="future"/></div>
  </div>)};
"""

# ─── DATEPICKER ──────────────────────────────────────────────────────────────
FILES[f'{BASE}/datePicker/datePicker.tsx'] = r"""import React,{useState}from'react';
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
    <div style={{width:280,height:48,border:`1px solid ${bc}`,borderRadius:4,background:disabled?'#F1F1F1':'#FFF',display:'flex',alignItems:'center',padding:'0 12px',cursor:disabled?'not-allowed':'pointer',position:'relative',outline:'none',boxShadow:focused&&!disabled?`0 0 0 2px ${c.focus}`:'none'}}
      tabIndex={disabled?-1:0} role="button" aria-expanded={open} aria-haspopup="dialog" id={id}
      onClick={()=>!disabled&&setOpen(o=>!o)} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
      onKeyDown={e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();!disabled&&setOpen(o=>!o);}if(e.key==='Escape')setOpen(false);}}>
      <span style={{position:'absolute',left:12,top:float?6:'50%',transform:float?'none':'translateY(-50%)',fontSize:float?11:14,fontWeight:float?700:400,color:float?c.label:'#777',transition:'all 150ms ease',pointerEvents:'none',background:disabled?'#F1F1F1':'#FFF',padding:'0 2px'}}>{label}</span>
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
"""

FILES[f'{BASE}/datePicker/datePicker.stories.tsx'] = r"""import type{Meta,StoryObj}from'@storybook/react';
import React,{useState}from'react';
import{DatePicker}from'./datePicker';
const meta:Meta<typeof DatePicker>={title:'Components/DatePicker',component:DatePicker,tags:['autodocs'],parameters:{docs:{description:{component:'`current`=Orange#005BA6 ADA-FAIL | `future`=Blue#005BA6 ADA-PASS'}}}};
export default meta;type Story=StoryObj<typeof DatePicker>;
const B=({s}:{s:'current'|'future'})=>s==='future'
  ?<div style={{padding:'8px 12px',background:'#E2F5EE',borderRadius:4,fontSize:12,color:'#0E7C55',marginBottom:8}}>✅ ADA COMPLIANT — PS Blue #005BA6 — 4.8:1</div>
  :<div style={{padding:'8px 12px',background:'#FACBCB',borderRadius:4,fontSize:12,color:'#C00',marginBottom:8}}>⚠️ LEGACY — Orange #005BA6 — 2.9:1 — DO NOT USE IN PRODUCTION</div>;
const Demo=({s}:{s:'current'|'future'})=>{const[d,setD]=useState<Date|null>(null);return(<div style={{padding:24}}><B s={s}/><DatePicker colorScheme={s} label="Event Date" value={d} onChange={setD}/>{d&&<p style={{marginTop:12,fontSize:13,color:'#777'}}>Selected: {d.toLocaleDateString()}</p>}</div>);};
export const Future_Default:Story={name:'✅ Future · Date Picker (PS Blue)',render:()=><Demo s="future"/>};
export const Future_WithValue:Story={name:'✅ Future · With Selected Date',args:{colorScheme:'future',value:new Date(2026,5,15),label:'kervice Date'}};
export const Future_Disabled:Story={name:'✅ Future · Disabled',args:{colorScheme:'future',disabled:true,label:'Locked Date'}};
export const Current_Default:Story={name:'⚠️ Current · Date Picker (Legacy Orange)',render:()=><Demo s="current"/>};
export const Current_WithValue:Story={name:'⚠️ Current · With Selected Date (Legacy)',args:{colorScheme:'current',value:new Date(2026,5,15),label:'Service Date'}};
export const SideBySide:Story={name:'🔄 Side-by-Side: Current vs Future',render:()=>(
  <div style={{display:'flex',gap:48,padding:24,fontFamily:"'Source Sans Pro',sans-serif"}}>
    <div><div style={{fontSize:11,fontWeight:700,color:'#C00',marginBottom:8}}>⚠️ CURRENT — Orange #005BA6</div><DatePicker colorScheme="current" label="Event Date" value={new Date(2026,5,15)}/></div>
    <div><div style={{fontSize:11,fontWeight:700,color:'#0E7C55',marginBottom:8}}>✅ FUTURE — PS Blue #005BA6</div><DatePicker colorScheme="future" label="Event Date" value={new Date(2026,5,15)}/></div>
  </div>)};
"""

# ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
FILES[f'{BASE}/productCard/productCard.tsx'] = r"""import React from 'react';
export type ProductCardColorScheme='current'|'future';
export interface ProductCardProps{colorScheme?:ProductCardColorScheme;productName?:string;partNumber?:string;oem?:string;price?:string;availability?:string;optionsCount?:number;imageSrc?:string;onSeeBuyingOptions?:()=>void;onPrimary?:()=>void;className?:string;}
const C={current:{primary:'#005BA6',primaryHover:'#004A84',primaryTxt:'#FFF',primaryBorder:'#005BA6'},future:{primary:'#005BA6',primaryHover:'#004A84',primaryTxt:'#FFF',primaryBorder:'#005BA6'}};
export const ProductCard:React.FC<ProductCardProps>=({colorScheme='future',productName='Patient Cable, SpO2 Spot Check',partNumber='OEM-89400-01',oem='Nellcor',price='$42.50',availability='In Stock',optionsCount=2,imageSrc,onSeeBuyingOptions,onPrimary,className=''})=>{
  const c=C[colorScheme];
  const btnBase:React.CSSProperties={borderRadius:4,padding:'8px 16px',fontSize:12,fontWeight:700,cursor:'pointer',letterSpacing:0.5,textTransform:'uppercase',fontFamily:'inherit',transition:'background 200ms ease',flex:1};
  return(<div className={className} style={{width:300,background:'#FFF',border:'1px solid #DCDCDC',borderRadius:4,overflow:'hidden',boxShadow:'0 1px 4px rgba(0,47,72,0.08)',fontFamily:"'Source Sans Pro',sans-serif",display:'flex',flexDirection:'column'}}>
    <div style={{height:140,background:'#F1F1F1',display:'flex',alignItems:'center',justifyContent:'center'}}>
      {imageSrc?<img src={imageSrc} alt={productName} style={{maxHeight:'100%',maxWidth:'100%',objectFit:'contain'}}/>:<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#DCDCDC" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><polyline points="21 15 16 10 5 21"/></svg>}
    </div>
    <div style={{padding:'12px 16px',flex:1,display:'flex',flexDirection:'column',gap:4}}>
      <div style={{fontSize:13,fontWeight:700,color:'#002F48',lineHeight:1.3}}>{productName}</div>
      <div style={{fontSize:12,color:'#777'}}>Part #: {partNumber}</div>
      <div style={{fontSize:12,color:'#777'}}>{oem}</div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:8}}>
        <span style={{fontSize:16,fontWeight:700,color:'#002F48'}}>{price}</span>
        <span style={{fontSize:11,color:availability==='In Stock'?'#17AB78':'#E3A92D',fontWeight:600}}>{availability}</span>
      </div>
    </div>
    <div style={{padding:'12px 16px',borderTop:'1px solid #F1F1F1',display:'flex',gap:8}}>
      <button onClick={onSeeBuyingOptions} style={{...btnBase,background:colorScheme==='future'?'#FFF':c.primary,border:colorScheme==='future'?'2px solid #005BA6':`2px solid ${c.primaryBorder}`,color:colorScheme==='future'?'#005BA6':c.primaryTxt}}
        onMouseEnter={e=>{if(colorScheme==='future'){(e.currentTarget as HTMLButtonElement).style.background='#005BA6';(e.currentTarget as HTMLButtonElement).style.color='#FFF';}else(e.currentTarget as HTMLButtonElement).style.background='#004A84';}}
        onMouseLeave={e=>{if(colorScheme==='future'){(e.currentTarget as HTMLButtonElement).style.background='#FFF';(e.currentTarget as HTMLButtonElement).style.color='#005BA6';}else(e.currentTarget as HTMLButtonElement).style.background=c.primary;}}>
        See Options ({optionsCount})
      </button>
      <button onClick={onPrimary} style={{...btnBase,background:c.primary,border:`2px solid ${c.primaryBorder}`,color:c.primaryTxt}}
        onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background=c.primaryHover;}}
        onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background=c.primary;}}>
        Add to Cart
      </button>
    </div>
  </div>);
};
export default ProductCard;
"""

FILES[f'{BASE}/productCard/productCard.stories.tsx'] = r"""import type{Meta,StoryObj}from'@storybook/react';
import{ProductCard}from'./productCard';
const meta:Meta<typeof ProductCard>={title:'Components/ProductCard',component:ProductCard,tags:['autodocs'],parameters:{docs:{description:{component:'`current`=Orange#005BA6 CTAs ADA-FAIL | `future`=Blue#005BA6 CTAs ADA-PASS'}}}};
export default meta;type Story=StoryObj<typeof ProductCard>;
const B=({s}:{s:'current'|'future'})=>s==='future'
  ?<div style={{padding:'8px 12px',background:'#E2F5EE',borderRadius:4,fontSize:12,color:'#0E7C55',marginBottom:8}}>✅ ADA COMPLIANT — PS Blue #005BA6 — 4.8:1</div>
  :<div style={{padding:'8px 12px',background:'#FACBCB',borderRadius:4,fontSize:12,color:'#C00',marginBottom:8}}>⚠️ LEGACY — Orange #005BA6 — 2.9:1 — DO NOT USE IN PRODUCTION</div>;
export const Future_Default:Story={name:'✅ Future · Product Card (PS Blue CTAs)',render:()=><div style={{padding:24}}><B s="future"/><ProductCard colorScheme="future"/></div>};
export const Current_Default:Story={name:'⚠️ Current · Product Card (Legacy Orange CTAs)',render:()=><div style={{padding:24}}><B s="current"/><ProductCard colorScheme="current"/></div>};
export const SideBySide:Story={name:'🔄 Side-by-Side: Current vs Future',render:()=>(
  <div style={{display:'flex',gap:32,padding:24,flexWrap:'wrap',fontFamily:"'Source Sans Pro',sans-serif"}}>
    <div><div style={{fontSize:11,fontWeight:700,color:'#C00',marginBottom:8}}>⚠️ CURRENT — Orange #005BA6</div><ProductCard colorScheme="current"/></div>
    <div><div style={{fontSize:11,fontWeight:700,color:'#0E7C55',marginBottom:8}}>✅ FUTURE — PS Blue #005BA6</div><ProductCard colorScheme="future"/></div>
  </div>)};
"""

# ─── CART ────────────────────────────────────────────────────────────────────
FILES[f'{BASE}/cart/cart.tsx'] = r"""import React from 'react';
export type CartColorScheme='current'|'future';
export interface CartItem{id:string;name:string;partNumber?:string;quantity:number;price:string;}
export interface CartProps{colorScheme?:CartColorScheme;items?:CartItem[];title?:string;onAddToCart?:()=>void;onCheckout?:()=>void;className?:string;}
const C={current:{btn:'#005BA6',hover:'#004A84',txt:'#FFF',border:'#005BA6'},future:{btn:'#005BA6',hover:'#004A84',txt:'#FFF',border:'#005BA6'}};
const DEF:CartItem[]=[{id:'1',name:'Patient Cable, SpO2 Spot Check',partNumber:'OEM-89400-01',quantity:2,price:'$85.00'},{id:'2',name:'Blood Pressure Cuff, Adult Large',partNumber:'BP-5104-AL',quantity:1,price:'$34.50'},{id:'3',name:'ECG Electrode Snap, 10-pack',partNumber:'ECG-1001-10',quantity:5,price:'$62.00'}];
export const Cart:React.FC<CartProps>=({colorScheme='future',items=DEF,title='My Cart',onAddToCart,onCheckout,className=''})=>{
  const c=C[colorScheme];
  const total=items.reduce((s,i)=>s+parseFloat(i.price.replace('$',''))*i.quantity,0);
  const Btn=({onClick,children,style}:{onClick?:()=>void;children:React.ReactNode;style?:React.CSSProperties})=>(
    <button onClick={onClick} style={{width:'100%',padding:'10px',background:c.btn,border:`2px solid ${c.border}`,borderRadius:4,color:c.txt,fontSize:13,fontWeight:700,letterSpacing:0.5,textTransform:'uppercase',cursor:'pointer',fontFamily:'inherit',transition:'background 200ms ease',...style}}
      onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background=c.hover;}}
      onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background=c.btn;}}>{children}</button>);
  return(<div className={className} style={{width:420,background:'#FFF',border:'1px solid #DCDCDC',borderRadius:4,overflow:'hidden',boxShadow:'0 1px 4px rgba(0,47,72,0.08)',fontFamily:"'Source Sans Pro',sans-serif"}}>
    <div style={{padding:'14px 20px',borderBottom:'1px solid #F1F1F1',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <h3 style={{margin:0,fontSize:16,fontWeight:700,color:'#002F48'}}>{title}</h3>
      <span style={{fontSize:12,background:'#DCEAED',color:'#005BA6',padding:'2px 8px',borderRadius:100,fontWeight:700}}>{items.length} items</span>
    </div>
    <div style={{maxHeight:280,overflowY:'auto'}}>
      {items.map((item,i)=>(
        <div key={item.id} style={{display:'flex',alignItems:'center',padding:'12px 20px',borderBottom:i<items.length-1?'1px solid #F1F1F1':'none',gap:12}}>
          <div style={{width:40,height:40,background:'#F1F1F1',borderRadius:4,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DCDCDC" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><polyline points="21 15 16 10 5 21"/></svg></div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:13,fontWeight:600,color:'#4A4A4A',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{item.name}</div>
            {item.partNumber&&<div style={{fontSize:11,color:'#949494'}}>Part #: {item.partNumber}</div>}
          </div>
          <div style={{textAlign:'right',flexShrink:0}}>
            <div style={{fontSize:13,fontWeight:700,color:'#002F48'}}>{item.price}</div>
            <div style={{fontSize:11,color:'#777'}}>Qty: {item.quantity}</div>
          </div>
        </div>))}
    </div>
    <div style={{padding:'12px 20px',borderTop:'1px solid #F1F1F1'}}><Btn onClick={onAddToCart}>Add to Cart</Btn></div>
    <div style={{padding:'12px 20px',background:'#FAFAFA',borderTop:'1px solid #DCDCDC'}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
        <span style={{fontSize:13,color:'#777'}}>Subtotal ({items.length} items)</span>
        <span style={{fontSize:13,fontWeight:700,color:'#002F48'}}>${total.toFixed(2)}</span>
      </div>
      <Btn onClick={onCheckout}>Proceed to Checkout</Btn>
    </div>
  </div>);
};
export default Cart;
"""

FILES[f'{BASE}/cart/cart.stories.tsx'] = r"""import type{Meta,StoryObj}from'@storybook/react';
import{Cart}from'./cart';
const meta:Meta<typeof Cart>={title:'Components/Cart',component:Cart,tags:['autodocs'],parameters:{docs:{description:{component:'`current`=Orange#005BA6 CTAs ADA-FAIL | `future`=Blue#005BA6 CTAs ADA-PASS'}}}};
export default meta;type Story=StoryObj<typeof Cart>;
const B=({s}:{s:'current'|'future'})=>s==='future'
  ?<div style={{padding:'8px 12px',background:'#E2F5EE',borderRadius:4,fontSize:12,color:'#0E7C55',marginBottom:8}}>✅ ADA COMPLIANT — PS Blue #005BA6 — 4.8:1</div>
  :<div style={{padding:'8px 12px',background:'#FACBCB',borderRadius:4,fontSize:12,color:'#C00',marginBottom:8}}>⚠️ LEGACY — Orange #005BA6 — 2.9:1 — DO NOT USE IN PRODUCTION</div>;
export const Future_Default:Story={name:'✅ Future · Cart (PS Blue CTAs)',render:()=><div style={{padding:24}}><B s="future"/><Cart colorScheme="future"/></div>};
export const Current_Default:Story={name:'⚠️ Current · Cart (Legacy Orange CTAs)',render:()=><div style={{padding:24}}><B s="current"/><Cart colorScheme="current"/></div>};
export const SideBySide:Story={name:'🔄 Side-by-Side: Current vs Future',render:()=>(
  <div style={{display:'flex',gap:32,padding:24,flexWrap:'wrap',fontFamily:"'Source Sans Pro',sans-serif"}}>
    <div><div style={{fontSize:11,fontWeight:700,color:'#C00',marginBottom:8}}>⚠️ CURRENT — Orange #005BA6</div><Cart colorScheme="current"/></div>
    <div><div style={{fontSize:11,fontWeight:700,color:'#0E7C55',marginBottom:8}}>✅ FUTURE — PS Blue #005BA6</div><Cart colorScheme="future"/></div>
  </div>)};
"""

# ── WRITE ALL FILES ────────────────────────────────────────────────────────────
for path, content in FILES.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w') as f:
        f.write(content.lstrip('\n'))
    print(f'✓ {path}')

print(f'\nWrote {len(FILES)} files.')
