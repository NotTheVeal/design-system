import React,{useState}from'react';
const FONT="'Source Sans 3',-apple-system,sans-serif";
export interface TableColumn{key:string;label:string;sortable?:boolean;align?:'left'|'center'|'right';width?:number;}
export interface TableProps{columns:TableColumn[];data:Record<string,React.ReactNode>[];selectable?:boolean;onRowSelect?:(keys:string[])=>void;rowKey?:string;className?:string;}
export const Table:React.FC<TableProps>=({columns,data,selectable=false,onRowSelect,rowKey='id',className=''})=>{
  const[sortKey,setSortKey]=useState<string|null>(null);
  const[sortDir,setSortDir]=useState<'asc'|'desc'>('asc');
  const[selected,setSelected]=useState<string[]>([]);
  const handleSort=(key:string)=>{
    if(sortKey===key)setSortDir(d=>d==='asc'?'desc':'asc');
    else{setSortKey(key);setSortDir('asc');}
  };
  const handleSelect=(key:string)=>{
    const next=selected.includes(key)?selected.filter(k=>k!==key):[...selected,key];
    setSelected(next);onRowSelect?.(next);
  };
  return(
    <div className={className}style={{width:'100%',overflowX:'auto',fontFamily:FONT}}>
      <table style={{width:'100%',borderCollapse:'collapse',fontSize:14}}>
        <thead>
          <tr style={{backgroundColor:'#005BA6'}}>
            {selectable&&<th style={{width:40,padding:'10px 12px',textAlign:'center',color:'#FFFFFF',fontWeight:700,fontSize:12}}><input type="checkbox" onChange={e=>{const all=data.map(r=>String(r[rowKey]));const next=e.target.checked?all:[];setSelected(next);onRowSelect?.(next);}} checked={selected.length===data.length&&data.length>0}/></th>}
            {columns.map(col=>(
              <th key={col.key} style={{padding:'10px 16px',textAlign:col.align||'left',color:'#FFFFFF',fontWeight:700,fontSize:12,textTransform:'uppercase',letterSpacing:'1.5px',cursor:col.sortable?'pointer':'default',userSelect:'none',whiteSpace:'nowrap'}} onClick={()=>col.sortable&&handleSort(col.key)}>
                {col.label}{col.sortable&&sortKey===col.key&&(sortDir==='asc'?' ↑':' ↓')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row,i)=>{
            const key=String(row[rowKey]||i);
            const isSel=selected.includes(key);
            return(
              <tr key={key} style={{backgroundColor:isSel?'#EFF9FE':i%2===0?'#FFFFFF':'#FAFAFA',borderBottom:'1px solid #DCDCDC',cursor:selectable?'pointer':'default',transition:'background 120ms ease'}}
                onMouseEnter={e=>{if(!isSel)(e.currentTarget as HTMLElement).style.backgroundColor='#F1F1F1';}}
                onMouseLeave={e=>{if(!isSel)(e.currentTarget as HTMLElement).style.backgroundColor=i%2===0?'#FFFFFF':'#FAFAFA';}}
                onClick={()=>selectable&&handleSelect(key)}>
                {selectable&&<td style={{width:40,padding:'10px 12px',textAlign:'center'}}><input type="checkbox" checked={isSel} onChange={()=>handleSelect(key)} onClick={e=>e.stopPropagation()}/></td>}
                {columns.map(col=>(
                  <td key={col.key} style={{padding:'10px 16px',textAlign:col.align||'left',color:'#4A4A4A',verticalAlign:'middle'}}>{row[col.key]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
