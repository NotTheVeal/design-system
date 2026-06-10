import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
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
<div style={{width:40,height:40,background:'#DCEAED',borderRadius:4,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}><ImageIcon size={20} strokeWidth={1.5} color="#94a3b8" /></div>
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
