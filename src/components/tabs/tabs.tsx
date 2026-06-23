import React,{useState}from'react';
const FONT="'Source Sans 3',-apple-system,sans-serif";
export interface TabItem{id:string;label:string;badge?:number|string;disabled?:boolean;}
export interface TabsProps{tabs:TabItem[];activeTab?:string;onChange?:(id:string)=>void;className?:string;}
export const Tabs:React.FC<TabsProps>=({tabs,activeTab:ext,onChange,className=''})=>{
  const[internal,setInternal]=useState(tabs[0]?.id??'');
  const active=ext!==undefined?ext:internal;
  const handleClick=(id:string,disabled?:boolean)=>{if(disabled)return;setInternal(id);onChange?.(id);};
  return(<div className={className}style={{fontFamily:FONT}}>
    <div role="tablist" style={{display:'flex',borderBottom:'1px solid #DCDCDC'}}>
      {tabs.map(tab=>{
        const isActive=tab.id===active;
        return(<button key={tab.id} role="tab" id={`tab-${tab.id}`} aria-selected={isActive} disabled={tab.disabled}
          onClick={()=>handleClick(tab.id,tab.disabled)}
          style={{display:'inline-flex',alignItems:'center',gap:6,padding:'12px 16px',fontFamily:FONT,fontSize:14,fontWeight:isActive?600:400,color:isActive?'#005BA6':tab.disabled?'#DCDCDC':'#777777',background:'none',border:'none',cursor:tab.disabled?'not-allowed':'pointer',borderBottom:isActive?'3px solid #005BA6':'3px solid transparent',marginBottom:-1,transition:'color 150ms ease,border-color 150ms ease',outline:'none'}}>
          {tab.label}
          {tab.badge!==undefined&&<span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',minWidth:18,height:18,borderRadius:9,background:isActive?'#005BA6':'#DCDCDC',color:isActive?'#FFFFFF':'#4A4A4A',fontSize:11,fontWeight:700,padding:'0 5px'}}>{tab.badge}</span>}
        </button>);
      })}
    </div>
  </div>);
};
export default Tabs;
