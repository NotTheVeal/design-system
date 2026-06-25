import type{Meta,StoryObj}from'@storybook/react';
import React,{useState}from'react';
import{DatePicker}from'./datePicker';
const meta:Meta<typeof DatePicker>={title:'Components/DatePicker',component:DatePicker,tags:['autodocs'],parameters:{docs:{description:{component:'PS Design System DatePicker. Blue #005BA6 ADA-compliant. Supports single date, range selection, and quick-select presets.'}}}};
export default meta;type Story=StoryObj<typeof DatePicker>;
const B=({s}:{s:'current'|'future'})=>s==='future'
?<div style={{padding:'8px 12px',background:'#E2F5EE',borderRadius:4,fontSize:12,color:'#0E7C55',marginBottom:8}}>ADA COMPLIANT — PS Blue #005BA6 — 4.8:1</div>
:<div style={{padding:'8px 12px',background:'#FACBCB',borderRadius:4,fontSize:12,color:'#C00',marginBottom:8}}>LEGACY — DO NOT USE IN PRODUCTION</div>;
const Demo=({s}:{s:'current'|'future'})=>{const[d,setD]=useState<Date|null>(null);return(<div style={{padding:24}}><B s={s}/><DatePicker colorScheme={s} label="Event Date" value={d} onChange={setD}/>{d&&<p style={{marginTop:12,fontSize:13,color:'#777'}}>Selected: {d.toLocaleDateString()}</p>}</div>);};
export const Future_Default:Story={name:'Future · Date Picker (PS Blue)',render:()=><Demo s="future"/>};
export const Future_WithValue:Story={name:'Future · With Selected Date',args:{colorScheme:'future',value:new Date(2026,5,15),label:'Service Date'}};
export const Future_Disabled:Story={name:'Future · Disabled',args:{colorScheme:'future',disabled:true,label:'Locked Date'}};
export const Current_Default:Story={name:'Current · Date Picker (Legacy)',render:()=><Demo s="current"/>};
export const SideBySide:Story={name:'Side-by-Side: Current vs Future',render:()=>(
<div style={{display:'flex',gap:48,padding:24,fontFamily:"'Source Sans Pro',sans-serif"}}>
<div><div style={{fontSize:11,fontWeight:700,color:'#C00',marginBottom:8}}>CURRENT — Legacy</div><DatePicker colorScheme="future" label="Event Date" value={new Date(2026,5,15)}/></div>
<div><div style={{fontSize:11,fontWeight:700,color:'#0E7C55',marginBottom:8}}>FUTURE — PS Blue #005BA6</div><DatePicker colorScheme="future" label="Event Date" value={new Date(2026,5,15)}/></div>
</div>)};

export const DateRangeSelection:Story={
  name:'Date Range Selection',
  render:()=>{
    const[start,setStart]=useState<Date|null>(null);
    const[end,setEnd]=useState<Date|null>(null);
    const FF="'Source Sans Pro','Source Sans 3',sans-serif";
    return(
      <div style={{padding:24,fontFamily:FF}}>
        <div style={{fontSize:13,fontWeight:600,color:'#4A4A4A',marginBottom:16,fontFamily:FF}}>Select Date Range</div>
        <div style={{display:'flex',gap:16,alignItems:'flex-start',flexWrap:'wrap'}}>
          <div>
            <div style={{fontSize:12,color:'#777',marginBottom:4,fontFamily:FF}}>Start Date</div>
            <DatePicker colorScheme="future" label="Start Date" value={start} onChange={setStart}/>
          </div>
          <div style={{display:'flex',alignItems:'center',paddingTop:28,color:'#949494',fontSize:14,fontFamily:FF}}>to</div>
          <div>
            <div style={{fontSize:12,color:'#777',marginBottom:4,fontFamily:FF}}>End Date</div>
            <DatePicker colorScheme="future" label="End Date" value={end} onChange={setEnd}/>
          </div>
        </div>
        {start&&end&&(
          <div style={{marginTop:16,padding:'10px 14px',background:'#EFF9FE',borderRadius:4,fontSize:13,color:'#005BA6',fontFamily:FF}}>
            Range: {start.toLocaleDateString()} — {end.toLocaleDateString()}
            {' '}({Math.round((end.getTime()-start.getTime())/(1000*60*60*24))} days)
          </div>
        )}
      </div>
    );
  },
};

export const WithPresets:Story={
  name:'With Quick-Select Presets',
  render:()=>{
    const[value,setValue]=useState<Date|null>(null);
    const FF="'Source Sans Pro','Source Sans 3',sans-serif";
    const presets=[
      {label:'Today',fn:()=>new Date()},
      {label:'Last 7 days',fn:()=>{const d=new Date();d.setDate(d.getDate()-7);return d;}},
      {label:'Last 30 days',fn:()=>{const d=new Date();d.setDate(d.getDate()-30);return d;}},
      {label:'Last 90 days',fn:()=>{const d=new Date();d.setDate(d.getDate()-90);return d;}},
    ];
    return(
      <div style={{padding:24,fontFamily:FF}}>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:16}}>
          {presets.map(p=>(
            <button key={p.label} onClick={()=>setValue(p.fn())}
              style={{padding:'6px 12px',border:'1px solid #005BA6',borderRadius:4,background:'#fff',color:'#005BA6',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:FF}}>
              {p.label}
            </button>
          ))}
        </div>
        <DatePicker colorScheme="future" label="Selected Date" value={value} onChange={setValue}/>
        {value&&<p style={{marginTop:12,fontSize:13,color:'#777',fontFamily:FF}}>Selected: {value.toLocaleDateString()}</p>}
      </div>
    );
  },
};
