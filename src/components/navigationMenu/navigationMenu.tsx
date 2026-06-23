import React,{useState}from'react';
const FONT="'Source Sans 3',-apple-system,sans-serif";
export interface NavMenuItem{id:string;label:string;icon?:React.ReactNode;href?:string;badge?:number;children?:NavMenuItem[];}
export interface NavMenuProps{items:NavMenuItem[];activeId?:string;collapsed?:boolean;onNavigate?:(id:string,href?:string)=>void;className?:string;}
export const NavigationMenu:React.FC<NavMenuProps>=({items,activeId,collapsed=false,onNavigate,className=''})=>{
  const[active,setActive]=useState(activeId||items[0]?.id||'');
  const[expanded,setExpanded]=useState<string[]>([]);
  const toggleExpand=(id:string)=>setExpanded(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const renderItem=(item:NavMenuItem,depth=0):React.ReactNode=>{
    const isActive=active===item.id;
    const hasChildren=item.children&&item.children.length>0;
    const isExpanded=expanded.includes(item.id);
    return(<div key={item.id}>
      <button onClick={()=>{if(hasChildren)toggleExpand(item.id);setActive(item.id);onNavigate?.(item.id,item.href);}}
        title={collapsed?item.label:undefined}
        style={{display:'flex',alignItems:'center',gap:10,width:'100%',padding:collapsed?'10px 0':`10px ${depth>0?32:14}px`,justifyContent:collapsed?'center':'flex-start',background:isActive?'rgba(0,156,244,0.15)':'transparent',borderLeft:isActive?'3px solid #009CF4':'3px solid transparent',border:'none',borderRight:'none',cursor:'pointer',color:isActive?'#FAFAFA':'rgba(250,250,250,0.75)',fontSize:14,fontWeight:isActive?700:400,textAlign:'left',transition:'all 0.15s',fontFamily:FONT}}>
        {item.icon&&<span style={{fontSize:16,flexShrink:0}}>{item.icon}</span>}
        {!collapsed&&(<>
          <span style={{flex:1}}>{item.label}</span>
          {item.badge&&<span style={{background:'#009CF4',color:'#fff',fontSize:10,fontWeight:700,borderRadius:10,padding:'1px 6px',minWidth:18,textAlign:'center'}}>{item.badge}</span>}
          {hasChildren&&<span style={{fontSize:12,transform:isExpanded?'rotate(180deg)':'none',transition:'transform 0.2s',color:'rgba(250,250,250,0.7)'}}>&#x25BE;</span>}
        </>)}
      </button>
      {hasChildren&&isExpanded&&!collapsed&&<div style={{borderLeft:'2px solid rgba(255,255,255,0.15)',marginLeft:28}}>{item.children!.map(c=>renderItem(c,depth+1))}</div>}
    </div>);
  };
  return(
    <nav style={{width:collapsed?56:220,minHeight:400,background:'#002F48',borderRight:'1px solid rgba(255,255,255,0.1)',display:'flex',flexDirection:'column',transition:'width 0.2s',overflow:'hidden',flexShrink:0,fontFamily:FONT}}className={className}>
      <div style={{flex:1,overflowY:'auto',padding:'8px 0'}}>{items.map(item=>renderItem(item))}</div>
    </nav>
  );
};
export default NavigationMenu;
