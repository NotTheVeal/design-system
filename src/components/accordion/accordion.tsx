import React,{useState}from'react';
const FONT="'Source Sans 3',-apple-system,sans-serif";
export interface AccordionItem{id:string;title:string;content:React.ReactNode;disabled?:boolean;defaultOpen?:boolean;}
export interface AccordionProps{items:AccordionItem[];multiple?:boolean;className?:string;style?:React.CSSProperties;}
export const Accordion:React.FC<AccordionProps>=({items,multiple=false,className='',style})=>{
  const[openIds,setOpenIds]=useState<string[]>(items.filter(i=>i.defaultOpen).map(i=>i.id));
  const toggle=(id:string)=>{
    if(multiple)setOpenIds(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
    else setOpenIds(p=>p.includes(id)?[]:[id]);
  };
  return(
    <div className={className}style={{fontFamily:FONT,width:'100%',...style}}>
      {items.map((item,idx)=>{
        const isOpen=openIds.includes(item.id);
        const isLast=idx===items.length-1;
        return(
          <div key={item.id}style={{borderTop:'1px solid #DCDCDC',...(isLast?{borderBottom:'1px solid #DCDCDC'}:{})}}>
            <button onClick={()=>!item.disabled&&toggle(item.id)} disabled={item.disabled}
              aria-expanded={isOpen}
              style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',padding:'16px 0',fontFamily:FONT,fontSize:16,fontWeight:400,color:item.disabled?'#AAAAAA':'#4A4A4A',background:'transparent',border:'none',cursor:item.disabled?'not-allowed':'pointer',textAlign:'left',outline:'none',gap:12,lineHeight:1.4}}>
              <span style={{flex:1}}>{item.title}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isOpen?'#005BA6':'#777777'} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,transform:isOpen?'rotate(180deg)':'rotate(0deg)',transition:'transform 200ms ease'}}><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            {isOpen&&(
              <div style={{padding:'0 0 16px 0',fontFamily:FONT,fontSize:14,lineHeight:1.6,color:'#4A4A4A'}}>
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default Accordion;
