import type {Meta,StoryObj} from '@storybook/react';
import React from 'react';
import {Breadcrumb} from './breadcrumb';
const meta:Meta<typeof Breadcrumb>={title:'Components/Breadcrumb',component:Breadcrumb,parameters:{layout:'padded'}};
export default meta;
type Story=StoryObj<typeof Breadcrumb>;
export const Default:Story={args:{items:[{label:'Home',href:'/'},{label:'Catalog',href:'/catalog'},{label:'Imaging',href:'/catalog/imaging'},{label:'Ultrasound Probes'}]}};
export const Short:Story={args:{items:[{label:'Home',href:'/'},{label:'Search Results'}]}};
export const Long:Story={args:{items:[{label:'Home',href:'/'},{label:'Procurement',href:'/procurement'},{label:'Purchase Orders',href:'/po'},{label:'Q2 2026',href:'/po/q2'},{label:'GE Healthcare',href:'/po/q2/ge'},{label:'PO #12847'}]}};
export const ProductPage:Story={render:()=>(<div style={{fontFamily:'Source Sans Pro, sans-serif'}}>
  <Breadcrumb items={[{label:'Home',href:'/'},{label:'Parts Catalog',href:'/catalog'},{label:'Imaging & Diagnostics',href:'/catalog/imaging'},{label:'Ultrasound Probes',href:'/catalog/imaging/ultrasound'},{label:'GE Healthcare 4542-0012'}]}/>
  <h1 style={{margin:'16px 0 0',fontSize:24,fontWeight:300,color:'#002F48'}}>GE Healthcare Ultrasound Probe</h1>
</div>)};
