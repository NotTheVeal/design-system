import React from 'react';
export type ProductCardColorScheme='current'|'future';
export type ProductCardVariant='grid'|'list';
export interface ProductCardProps{colorScheme?:ProductCardColorScheme;variant?:ProductCardVariant;productName?:string;partNumber?:string;oem?:string;price?:string;availability?:string;optionsCount?:number;imageSrc?:string;onSeeBuyingOptions?:()=>void;onPrimary?:()=>void;className?:string;}
const C={current:{primary:'#FF9505',primaryHover:'#E88800',primaryTxt:'#FFF',primaryBorder:'#FF9505'},future:{primary:'#005BA6',primaryHover:'#004A84',primaryTxt:'#FFF',primaryBorder:'#005BA6'}};

/** Grid variant — vertical portrait card (300px wide) */
const GridCard:React.FC<ProductCardProps&{c:typeof C['future']}>=(props)=>{
  const{c,colorScheme='future',productName='Patient Cable, SpO2 Spot Check',partNumber='OEM-89400-01',oem='Nellcor',price='$42.50',availability='In Stock',optionsCount=2,imageSrc,onSeeBuyingOptions,onPrimary,className=''}=props;
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
      <button onClick={onSeeBuyingOptions} style={{...btnBase,background:colorScheme==='future'?'#FFF':c.primary,border:colorScheme==='future'?`2px solid #005BA6`:`2px solid ${c.primaryBorder}`,color:colorScheme==='future'?'#005BA6':c.primaryTxt}}
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

/** List variant — horizontal SRP row (full-width, matching Figma SRP Equivalents) */
const ListCard:React.FC<ProductCardProps&{c:typeof C['future']}>=(props)=>{
  const{c,colorScheme='future',productName='Patient Cable, SpO2 Spot Check',partNumber='OEM-89400-01',oem='Nellcor',price='$42.50',availability='In Stock',optionsCount=2,imageSrc,onSeeBuyingOptions,className=''}=props;
  const isInStock=availability==='In Stock';
  return(<div className={className} style={{width:'100%',background:'#FFF',border:'1px solid #DCDCDC',borderRadius:4,boxShadow:'0 1px 4px rgba(0,47,72,0.08)',fontFamily:"'Source Sans Pro',sans-serif",display:'flex',alignItems:'stretch',padding:'16px',gap:16}}>
    <div style={{width:80,height:80,background:'#F1F1F1',borderRadius:4,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
      {imageSrc?<img src={imageSrc} alt={productName} style={{maxHeight:'100%',maxWidth:'100%',objectFit:'contain'}}/>:<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#DCDCDC" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><polyline points="21 15 16 10 5 21"/></svg>}
    </div>
    <div style={{flex:1,minWidth:0,display:'flex',flexDirection:'column',justifyContent:'center',gap:4}}>
      <div style={{fontSize:14,fontWeight:700,color:'#002F48',lineHeight:1.3,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{productName}</div>
      <div style={{display:'flex',gap:16}}>
        <span style={{fontSize:12,color:'#777'}}>{oem}</span>
        <span style={{fontSize:12,color:'#949494'}}>Part #: {partNumber}</span>
      </div>
      <div style={{display:'flex',gap:8,marginTop:4,flexWrap:'wrap'}}>
        <span style={{fontSize:11,background:isInStock?'#E2F5EE':'#FFF4E5',color:isInStock?'#0E7C55':'#B45309',padding:'2px 8px',borderRadius:100,fontWeight:600}}>{availability}</span>
      </div>
    </div>
    <div style={{flexShrink:0,display:'flex',flexDirection:'column',alignItems:'flex-end',justifyContent:'center',gap:10,minWidth:160}}>
      <div style={{fontSize:20,fontWeight:700,color:'#002F48'}}>{price}</div>
      <button onClick={onSeeBuyingOptions}
        style={{background:colorScheme==='future'?'#FFF':c.primary,border:colorScheme==='future'?'2px solid #005BA6':`2px solid ${c.primaryBorder}`,borderRadius:4,padding:'8px 16px',fontSize:12,fontWeight:700,cursor:'pointer',letterSpacing:0.5,textTransform:'uppercase',fontFamily:'inherit',transition:'background 200ms ease',color:colorScheme==='future'?'#005BA6':c.primaryTxt,whiteSpace:'nowrap'}}
        onMouseEnter={e=>{if(colorScheme==='future'){(e.currentTarget as HTMLButtonElement).style.background='#005BA6';(e.currentTarget as HTMLButtonElement).style.color='#FFF';}else(e.currentTarget as HTMLButtonElement).style.background=c.primaryHover;}}
        onMouseLeave={e=>{if(colorScheme==='future'){(e.currentTarget as HTMLButtonElement).style.background='#FFF';(e.currentTarget as HTMLButtonElement).style.color='#005BA6';}else(e.currentTarget as HTMLButtonElement).style.background=c.primary;}}>
        View All Buying Options ({optionsCount})
      </button>
    </div>
  </div>);
};

export const ProductCard:React.FC<ProductCardProps>=({variant='grid',...props})=>{
  const c=C[props.colorScheme??'future'];
  return variant==='list'?<ListCard c={c} {...props}/>:<GridCard c={c} {...props}/>;
};
export default ProductCard;
