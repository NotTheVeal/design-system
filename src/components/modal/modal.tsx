import React,{useEffect,useRef}from'react';
export type ModalColorScheme='current'|'future';
export type ModalSize='sm'|'md'|'lg';
export interface ModalProps{colorScheme?:ModalColorScheme;isOpen?:boolean;onClose?:()=>void;title?:string;children?:React.ReactNode;primaryLabel?:string;secondaryLabel?:string;onPrimary?:()=>void;onSecondary?:()=>void;size?:ModalSize;}
const C={current:{btn:'#005BA6',hover:'#E88800',text:'#FFF',border:'#005BA6'},future:{btn:'#005BA6',hover:'#004A84',text:'#FFF',border:'#005BA6'}};
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
