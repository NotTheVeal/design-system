import type {Meta,StoryObj} from '@storybook/react';
import React from 'react';
import {ProductCard} from './productCard';

const meta:Meta<typeof ProductCard>={title:'Components/ProductCard',component:ProductCard,parameters:{layout:'padded'}};
export default meta;
type Story=StoryObj<typeof ProductCard>;

export const Default:Story={args:{
  productName:'GE Healthcare Ultrasound Probe',
  partNumber:'4542-0012',
  oem:'GE Healthcare',
  price:'$1,249.00',
  availability:'In Stock',
  imageSrc:'https://via.placeholder.com/300x200',
  colorScheme:'future'
}};

export const LowStock:Story={args:{
  productName:'Siemens CT Filter',
  partNumber:'CT-7821',
  oem:'Siemens Healthineers',
  price:'$89.50',
  availability:'Low Stock',
  imageSrc:'https://via.placeholder.com/300x200',
  colorScheme:'future'
}};

export const OutOfStock:Story={args:{
  productName:'Philips Monitor Lead',
  partNumber:'PM-4401',
  oem:'Philips Healthcare',
  price:'$34.99',
  availability:'Out of Stock',
  imageSrc:'https://via.placeholder.com/300x200',
  colorScheme:'future'
}};

export const ListVariant:Story={args:{
  variant:'list',
  productName:'Medtronic Infusion Tubing',
  partNumber:'INF-2280',
  oem:'Medtronic',
  price:'$24.99',
  availability:'In Stock',
  imageSrc:'https://via.placeholder.com/300x200',
  colorScheme:'future'
}};

export const SearchResultsPage:Story={render:()=>(
  <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
    {[
      {productName:'GE Probe',partNumber:'4542',oem:'GE Healthcare',price:'$1,249',availability:'In Stock',imageSrc:'https://via.placeholder.com/300x200'},
      {productName:'CT Filter',partNumber:'CT-78',oem:'Siemens',price:'$89.50',availability:'Low Stock',imageSrc:'https://via.placeholder.com/300x200'},
      {productName:'Monitor Lead',partNumber:'PM-44',oem:'Philips',price:'$34.99',availability:'Out of Stock',imageSrc:'https://via.placeholder.com/300x200'},
      {productName:'Surgical Drill',partNumber:'STR-99',oem:'Stryker',price:'$3,450',availability:'In Stock',imageSrc:'https://via.placeholder.com/300x200'},
      {productName:'Infusion Tubing',partNumber:'INF-22',oem:'Medtronic',price:'$24.99',availability:'In Stock',imageSrc:'https://via.placeholder.com/300x200'},
      {productName:'Vacutainer',partNumber:'BD-55',oem:'BD',price:'$12.75',availability:'Low Stock',imageSrc:'https://via.placeholder.com/300x200'},
    ].map(p=><ProductCard key={p.partNumber} {...p} colorScheme="future"/>)}
  </div>
)};
