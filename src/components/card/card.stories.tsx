import type {Meta,StoryObj} from '@storybook/react';
import React from 'react';
import { Card } from './card';
const meta: Meta<typeof Card> = { title: 'Components/Card', component: Card, parameters: { layout: 'padded' } };
export default meta;
type Story = StoryObj<typeof Card>;
export const Default: Story = { args: { title: 'GE Healthcare Probe', description: 'High-frequency transducer for ultrasound imaging.', footer: '$1,249.00' } };
export const WithBadge: Story = { args: { title: 'Siemens CT Filter', description: 'CT scanner maintenance filter.', badge: 'In Stock', footer: '$89.50' } };
export const CardGrid: Story = {
  render: () => (<div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, fontFamily:'Source Sans Pro, sans-serif' }}>
    {[['GE Probe','$1,249','In Stock'],['CT Filter','$89.50','Low Stock'],['Monitor Lead','$34.99','In Stock'],['Stryker Drill','$3,450','In Stock'],['Infusion Tubing','$24.99','Out of Stock'],['Vacutainer','$12.75','In Stock']].map(([t,p,s])=><Card key={t} title={t} badge={s} footer={p}/>)}
  </div>),
};
