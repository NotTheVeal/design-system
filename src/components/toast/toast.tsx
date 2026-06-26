import React, { useState, useEffect, useCallback } from 'react';
export type ToastType = 'success' | 'error' | 'warning' | 'info';
export interface ToastMessage { id: string; type: ToastType; title: string; message?: string; duration?: number; }
export interface ToastProps { toasts?: ToastMessage[]; position?: string; onDismiss?: (id: string) => void; className?: string; }
const colors: Record<ToastType, {border:string;icon:string;bar:string}> = { success:{border:'#17AB78',icon:'#0E7C55',bar:'#17AB78'}, error:{border:'#D32F2F',icon:'#D32F2F',bar:'#D32F2F'}, warning:{border:'#E3A92D',icon:'#B45309',bar:'#E3A92D'}, info:{border:'#005BA6',icon:'#005BA6',bar:'#005BA6'} };
const icons: Record<ToastType, string> = { success:'â', error:'â', warning:'â ', info:'â¹' };
const ToastItem: React.FC<{toast: ToastMessage; onDismiss: (id:string)=>void}> = ({ toast, onDismiss }) => {
  const [progress, setProgress] = useState(100);
  const [visible, setVisible] = useState(false);
  const dur = toast.duration ?? 4000;
  const c = colors[toast.type];
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  useEffect(() => { const t = setTimeout(() => setVisible(true), 10); return () => clearTimeout(t); }, []);
  useEffect(() => { if (!dur) return; const start = Date.now(); const iv = setInterval(() => { const p = Math.max(0,100-((Date.now()-start)/dur)*100); setProgress(p); if(p<=0){clearInterval(iv);dismiss();} },50); return ()=>clearInterval(iv); }, []);
  const dismiss = useCallback(()=>{setVisible(false);setTimeout(()=>onDismiss(toast.id),250);},[toast.id]);
  return (<div style={{background:'#FFF',border:'1px solid #DCDCDC',borderLeft:`4px solid ${c.border}`,borderRadius:4,boxShadow:'0 4px 16px rgba(0,47,72,.12)',minWidth:300,maxWidth:400,overflow:'hidden',fontFamily:font,transform:visible?'translateX(0)':'translateX(20px)',opacity:visible?1:0,transition:'all 250ms ease'}}>
    <div style={{padding:'12px 14px',display:'flex',gap:10,alignItems:'flex-start'}}>
      <span style={{color:c.icon,fontWeight:700,fontSize:16,flexShrink:0}}>{icons[toast.type]}</span>
      <div style={{flex:1,minWidth:0}}><div style={{fontSize:14,fontWeight:600,color:'#002F48',lineHeight:'20px'}}>{toast.title}</div>{toast.message&&<div style={{fontSize:13,color:'#777',lineHeight:'18px',marginTop:2}}>{toast.message}</div>}</div>
      <button onClick={dismiss} style={{background:'none',border:'none',cursor:'pointer',color:'#949494',padding:0,fontSize:18,lineHeight:1}}>Ã</button>
    </div>
    {!!dur&&<div style={{height:3,background:'#F1F1F1'}}><div style={{height:'100%',background:c.bar,width:progress+'%',transition:'width 50ms linear'}}/></div>}
  </div>);
};
const pos: Record<string,React.CSSProperties> = { 'top-right':{top:16,right:16}, 'top-left':{top:16,left:16}, 'bottom-right':{bottom:16,right:16}, 'bottom-left':{bottom:16,left:16} };
export const Toast: React.FC<ToastProps> = ({toasts=[],position='top-right',onDismiss,className=''}) => (<div className={className} style={{position:'fixed',zIndex:9999,display:'flex',flexDirection:'column',gap:8,...pos[position||'top-right']}}>{toasts.map(t=><ToastItem key={t.id} toast={t} onDismiss={onDismiss||(() => {})}/>)}</div>);
export function useToast() { const [toasts,setToasts]=useState<ToastMessage[]>([]); const add=useCallback((t:Omit<ToastMessage,'id'>)=>{const id=Date.now().toString();setToasts(p=>[...p,{...t,id}]);return id;},[]);const dismiss=useCallback((id:string)=>setToasts(p=>p.filter(t=>t.id!==id)),[]);const success=(title:string,message?:string)=>add({type:'success',title,message});const error=(title:string,message?:string)=>add({type:'error',title,message});const warning=(title:string,message?:string)=>add({type:'warning',title,message});const info=(title:string,message?:string)=>add({type:'info',title,message});return{toasts,dismiss,success,error,warning,info}; }
export default Toast;