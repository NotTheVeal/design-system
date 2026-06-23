import React,{useState}from'react';
const FONT="'Source Sans 3',-apple-system,sans-serif";
export type CardVariant='default'|'elevated'|'outlined';
export interface CardProps{variant?:CardVariant;children?:React.ReactNode;header?:React.ReactNode;footer?:React.ReactNode;onClick?:()=>void;href?:string;className?:string;style?:React.CSSProperties;}
export const Card:React.FC<CardProps>=({variant='default',children,header,footer,onClick,href,className='',style})=>{
  const[hovered,setHovered]=useState(false);
  const isClickable=!!(onClick||href);
  const baseStyle:React.CSSProperties={
    display:'flex',flexDirection:'column',borderRadius:4,fontFamily:FONT,boxSizing:'border-box',overflow:'hidden',
    backgroundColor:'#FFFFFF',
    border:variant==='outlined'?'1px solid #DCDCDC':hovered&&isClickable?'2px solid #005BA6':'1px solid #DCDCDC',
    boxShadow:variant==='elevated'?'0 2px 10px rgba(0,47,72,0.10)':hovered&&isClickable?'0 4px 12px rgba(0,47,72,0.10)':'none',
    cursor:isClickable?'pointer':'default',
    transition:'box-shadow 200ms ease,border 200ms ease',
    ...style,
  };
  const content=(
    <div style={baseStyle}className={className}
      onMouseEnter={()=>isClickable&&setHovered(true)}
      onMouseLeave={()=>setHovered(false)}
      onClick={onClick}
    >
      {header&&<div style={{padding:'16px 20px 0',borderBottom:'none'}}>{header}</div>}
      {children&&<div style={{padding:'20px',flex:1}}>{children}</div>}
      {footer&&<div style={{padding:'0 20px 16px',borderTop:'1px solid #DCDCDC',marginTop:'auto'}}>{footer}</div>}
    </div>
  );
  if(href)return<a href={href}style={{textDecoration:'none',color:'inherit',display:'block'}}>{content}</a>;
  return content;
};
export interface CardHeaderProps{title:string;subtitle?:string;action?:React.ReactNode;avatar?:React.ReactNode;}
export const CardHeader:React.FC<CardHeaderProps>=({title,subtitle,action,avatar})=>(
  <div style={{display:'flex',alignItems:'flex-start',gap:12,padding:'16px 20px',borderBottom:'1px solid #DCDCDC'}}>
    {avatar&&<div style={{flexShrink:0}}>{avatar}</div>}
    <div style={{flex:1,minWidth:0}}>
      <div style={{fontSize:16,fontWeight:700,color:'#002F48',fontFamily:FONT,lineHeight:1.3,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{title}</div>
      {subtitle&&<div style={{fontSize:13,color:'#777777',marginTop:2,fontFamily:FONT}}>{subtitle}</div>}
    </div>
    {action&&<div style={{flexShrink:0}}>{action}</div>}
  </div>
);
export interface CardBodyProps{children:React.ReactNode;padding?:number;}
export const CardBody:React.FC<CardBodyProps>=({children,padding=20})=>(
  <div style={{padding,fontFamily:FONT,flex:1}}>{children}</div>
);
export interface CardFooterProps{children:React.ReactNode;align?:'left'|'right'|'between';}
export const CardFooter:React.FC<CardFooterProps>=({children,align='left'})=>(
  <div style={{padding:'12px 20px',borderTop:'1px solid #DCDCDC',display:'flex',alignItems:'center',justifyContent:align==='right'?'flex-end':align==='between'?'space-between':'flex-start',gap:8,fontFamily:FONT}}>{children}</div>
);
export default Card;
