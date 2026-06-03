import React from 'react';
export type ProductCardColorScheme='current'|'future';
export interface ProductCardProps{colorScheme?:ProductCardColorScheme;productName?:string;partNumber?:string;oem?:string;price?:string;availability?:string;optionsCount?:number;imageSrc?:string;onSeeBuyingOptions?:()=>void;onPrimary?:()=>void;className?:string;}
const C={current:{primary:'#005BA6',primaryHover:'#E88800',primaryTxt:'#FFF',primaryBorder:'#005BA6'},future:{primary:'#005BA6',primaryHover:'#004A84',primaryTxt:'#FFF',primaryBorder:'#005BA6'}};
export const ProductCard:React.FC<ProductCardProps>=({colorScheme='future',productName='Patient Cable, SpO2 Spot Check',partNumber='OEM-89400-01',oem='Nellcor',price='$42.50',availability='In Stock',optionsCount=2,imageSrc,onSeeBuyingOptions,onPrimary,className=''})=>{
  const c=C[colorScheme];
  const btnBase:React.CSSProperties={borderRadius:4,padding:'8px 16px',fontSize:12,fontWeight:700,cursor:'pointer',letterSpacing:0.5,textTransform:'uppercase',fontFamily:'inherit',transition:'background 200ms ease',flex:1};
  return(<div className={className} style={{width:300,background:'#FFF',border:'1px solid #DCDCDC',borderRadius:4,overflow:'hidden',boxShadow:'0 1px 4px rgba(0,47,72,0.08)',fontFamily:"'Source Sans Pro',sans-serif",display:'flex',flexDirection:'column'}}>
    <div style={{height:140,background:'#DCEAED',display:'flex',alignItems:'center',justifyContent:'center'}}>
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
        onMouseEnter={e=>{if(colorScheme==='future'){(e.currentTarget as HTMLButtonElement).style.background='#005BA6';(e.currentTarget as HTMLButtonElement).style.color='#FFF';}else(e.currentTarget as HTMLButtonElement).style.background='#E88800';}}
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
