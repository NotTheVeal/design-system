import type{Meta,StoryObj}from'@storybook/react';
import React from'react';
import{ContextActions}from'./contextActions';
const meta:Meta<typeof ContextActions>={title:'Components/ContextActions',component:ContextActions,parameters:{layout:'padded'}};
export default meta;
type Story=StoryObj<typeof ContextActions>;
export const Default:Story={args:{actions:[{label:'Edit',onClick:()=>{}},{label:'Duplicate',onClick:()=>{}},{label:'Delete',onClick:()=>{},variant:'danger'}]}};
export const PartActions:Story={args:{actions:[{label:'Add to Cart',onClick:()=>{}},{label:'Add to Watchlist',onClick:()=>{}},{label:'Compare',onClick:()=>{}},{label:'View Details',onClick:()=>{}}]}};
export const OrderActions:Story={args:{actions:[{label:'Reorder',onClick:()=>{}},{label:'View Invoice',onClick:()=>{}},{label:'Contact Vendor',onClick:()=>{}},{label:'Return Items',onClick:()=>{},variant:'danger'}]}};
