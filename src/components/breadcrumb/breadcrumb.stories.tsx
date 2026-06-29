import type{Meta,StoryObj}from'@storybook/react';
import React from'react';
import Breadcrumb from'./breadcrumb';
const meta:Meta<typeof Breadcrumb>={title:'Components/Breadcrumb',component:Breadcrumb,parameters:{layout: 'centered'}};
export default meta;
type Story=StoryObj<typeof Breadcrumb>;
export const Default:Story={args:{items:[{label:'Home',href:'/'},{label:'Catalog',href:'/catalog'},{label:'Imaging',href:'/catalog/imaging'},{label:'Ultrasound Probes'}]}};
export const Short:Story={args:{items:[{label:'Home',href:'/'},{label:'Search Results'}]}};
export const ProductPage:Story={render:()=>(<div style={{fontFamily:'Source Sans Pro, sans-serif'}}>
  <Breadcrumb items={[{label:'Home',href:'/'},{label:'Parts Catalog',href:'/catalog'},{label:'Imaging',href:'/catalog/imaging'},{label:'GE Healthcare 4542-0012'}]}/>
  <h1 style={{margin:'16px 0 0',fontSize:24,fontWeight:300,color:'#002F48'}}>GE Healthcare Ultrasound Probe</h1>
</div>)};
