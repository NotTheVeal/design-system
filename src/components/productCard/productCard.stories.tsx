import type{Meta,StoryObj}from'@storybook/react';
import{ProductCard}from'./productCard';
const meta:Meta<typeof ProductCard>={title:'Components/ProductCard',component:ProductCard,tags:['autodocs'],parameters:{docs:{description:{component:'variant="grid" = vertical portrait card (default). variant="list" = horizontal SRP row (matches Figma SRP Equivalents).\n\ncurrent=Orange#FF9505 CTAs ADA-FAIL | future=Blue#005BA6 CTAs ADA-PASS'}}}};
export default meta;type Story=StoryObj<typeof ProductCard>;
const B=({s}:{s:'current'|'future'})=>s==='future'
  ?<div style={{padding:'8px 12px',background:'#E2F5EE',borderRadius:4,fontSize:12,color:'#0E7C55',marginBottom:8}}>ADA COMPLIANT - PS Blue #005BA6 - 4.8:1</div>
  :<div style={{padding:'8px 12px',background:'#FACBCB',borderRadius:4,fontSize:12,color:'#C00',marginBottom:8}}>LEGACY - Orange #FF9505 - 2.9:1 - DO NOT USE IN PRODUCTION</div>;
export const Future_Grid:Story={name:'Future Grid Card (PS Blue)',render:()=><div style={{padding:24}}><B s="future"/><ProductCard variant="grid" colorScheme="future"/></div>};
export const Current_Grid:Story={name:'Current Grid Card (Legacy Orange)',render:()=><div style={{padding:24}}><B s="current"/><ProductCard variant="grid" colorScheme="current"/></div>};
export const Future_List:Story={name:'Future List Row - Figma SRP match (PS Blue)',render:()=>(
  <div style={{padding:24,display:'flex',flexDirection:'column',gap:8}}>
    <B s="future"/>
    <ProductCard variant="list" colorScheme="future" productName="Patient Cable, SpO2 Spot Check" partNumber="OEM-89400-01" oem="Nellcor" price="$42.50" availability="In Stock" optionsCount={2}/>
    <ProductCard variant="list" colorScheme="future" productName="Blood Pressure Cuff, Adult Standard" partNumber="BP-5104-AS" oem="Welch Allyn" price="$31.00" availability="Low Stock" optionsCount={4}/>
    <ProductCard variant="list" colorScheme="future" productName="ECG Lead Set, 10-Wire Clip" partNumber="ECG-1001-10" oem="GE Healthcare" price="$88.75" availability="In Stock" optionsCount={6}/>
  </div>)};
export const Current_List:Story={name:'Current List Row (Legacy Orange)',render:()=>(
  <div style={{padding:24,display:'flex',flexDirection:'column',gap:8}}>
    <B s="current"/>
    <ProductCard variant="list" colorScheme="current" productName="Patient Cable, SpO2 Spot Check" partNumber="OEM-89400-01" oem="Nellcor" price="$42.50" availability="In Stock" optionsCount={2}/>
  </div>)};
export const Grid_SideBySide:Story={name:'Grid: Current vs Future',render:()=>(
  <div style={{display:'flex',gap:32,padding:24,flexWrap:'wrap',fontFamily:"'Source Sans Pro',sans-serif"}}>
    <div><div style={{fontSize:11,fontWeight:700,color:'#C00',marginBottom:8}}>CURRENT - Orange #FF9505</div><ProductCard variant="grid" colorScheme="current"/></div>
    <div><div style={{fontSize:11,fontWeight:700,color:'#0E7C55',marginBottom:8}}>FUTURE - PS Blue #005BA6</div><ProductCard variant="grid" colorScheme="future"/></div>
  </div>)};
