import type {Meta,StoryObj} from '@storybook/react';
import React from 'react';
import {ProductCard} from './productCard';
const meta:Meta<typeof ProductCard>={title:'Components/ProductCard',component:ProductCard,parameters:{layout:'padded'}};
export default meta;
type Story=StoryObj<typeof ProductCard>;
export const Default:Story={args:{name:'GE Healthcare Ultrasound Probe',sku:'4542-0012',manufacturer:'GE Healthcare',price:'$1,249.00',status:'In Stock',colorScheme:'future'}};
export const LowStock:Story={args:{name:'Siemens CT Filter',sku:'CT-7821',manufacturer:'Siemens Healthineers',price:'$89.50',status:'Low Stock',colorScheme:'future'}};
export const OutOfStock:Story={args:{name:'Philips Monitor Lead',sku:'PM-4401',manufacturer:'Philips Healthcare',price:'$34.99',status:'Out of Stock',colorScheme:'future'}};
export const LegacyOrange:Story={args:{name:'Medtronic Tubing',sku:'INF-2280',manufacturer:'Medtronic',price:'$24.99',status:'In Stock',colorScheme:'current'}};
export const SearchResultsPage:Story={render:()=>(<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
  {[{name:'GE Probe',sku:'4542',manufacturer:'GE Healthcare',price:'$1,249',status:'In Stock'},{name:'CT Filter',sku:'CT-78',manufacturer:'Siemens',price:'$89.50',status:'Low Stock'},{name:'Monitor Lead',sku:'PM-44',manufacturer:'Philips',price:'$34.99',status:'Out of Stock'},{name:'Surgical Drill',sku:'STR-99',manufacturer:'Stryker',price:'$3,450',status:'In Stock'},{name:'Infusion Tubing',sku:'INF-22',manufacturer:'Medtronic',price:'$24.99',status:'In Stock'},{name:'Vacutainer',sku:'BD-55',manufacturer:'BD',price:'$12.75',status:'Low Stock'}].map(p=><ProductCard key={p.sku} {...p as any} colorScheme="future"/>)}
</div>)};
