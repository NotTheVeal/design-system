import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Carousel from './carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const slide = (title: string, subtitle: string, bg: string) => ({
  content: (
    <div style={{
      height: 200,
      background: bg,
      borderRadius: 8,
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      padding: 24,
      fontFamily: 'Source Sans Pro, sans-serif',
    }}>
      <div style={{ fontSize: 20, fontWeight: 600, color: '#fff', textAlign: 'center' }}>{title}</div>
      <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', textAlign: 'center' }}>{subtitle}</div>
    </div>
  ),
});

export const Default: Story = {
  render: () => (
    <div style={{ width: 560 }}>
      <Carousel
        items={[
          slide('Siemens MAGNETOM Aera', 'MRI System · 1.5T · 70cm bore', '#005BA6'),
          slide('GE Revolution CT', 'CT Scanner · 256-slice · Wide bore', '#002F48'),
          slide('Philips EPIQ Elite', 'Ultrasound System · Cardiology', '#009CF4'),
          slide('Canon Aquilion ONE', 'CT System · 320-row detector', '#17AB78'),
        ]}
      />
    </div>
  ),
};

export const NoDots: Story = {
  render: () => (
    <div style={{ width: 560 }}>
      <Carousel
        showDots={false}
        items={[
          slide('Preventive Maintenance', 'Schedule PM visits for all imaging equipment', '#005BA6'),
          slide('Emergency Service', '24/7 on-site support with 4-hour response SLA', '#E3A92D'),
          slide('Parts On Demand', 'Same-day shipping on critical components', '#17AB78'),
        ]}
      />
    </div>
  ),
};

export const NoArrows: Story = {
  render: () => (
    <div style={{ width: 560 }}>
      <Carousel
        showArrows={false}
        items={[
          slide('Q1 Savings', '$48,200 saved vs list price', '#005BA6'),
          slide('Q2 Savings', '$61,800 saved vs list price', '#002F48'),
          slide('Q3 Savings', '$55,400 saved vs list price', '#009CF4'),
        ]}
      />
    </div>
  ),
};

export const SingleItem: Story = {
  render: () => (
    <div style={{ width: 560 }}>
      <Carousel
        items={[slide('MRI Suite Upgrade Complete', 'Siemens MAGNETOM Aera installed and operational', '#17AB78')]}
      />
    </div>
  ),
};

export const ProductCards: Story = {
  render: () => (
    <div style={{ width: 480 }}>
      <Carousel
        items={[
          {
            content: (
              <div style={{ border: '1px solid #DCDCDC', borderRadius: 8, padding: 24, background: '#fff', fontFamily: 'Source Sans Pro, sans-serif' }}>
                <div style={{ fontSize: 13, color: '#777', marginBottom: 4 }}>Part #MRI-7842</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#2B2B2B', marginBottom: 8 }}>Gradient Coil Assembly</div>
                <div style={{ fontSize: 14, color: '#4A4A4A', marginBottom: 16 }}>Compatible with Siemens MAGNETOM series. OEM replacement part.</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#005BA6' }}>$12,400.00</div>
              </div>
            ),
          },
          {
            content: (
              <div style={{ border: '1px solid #DCDCDC', borderRadius: 8, padding: 24, background: '#fff', fontFamily: 'Source Sans Pro, sans-serif' }}>
                <div style={{ fontSize: 13, color: '#777', marginBottom: 4 }}>Part #CT-4421</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#2B2B2B', marginBottom: 8 }}>CT Detector Array Module</div>
                <div style={{ fontSize: 14, color: '#4A4A4A', marginBottom: 16 }}>GE Revolution CT series. Includes installation guide.</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#005BA6' }}>$4,800.00</div>
              </div>
            ),
          },
        ]}
      />
    </div>
  ),
};
