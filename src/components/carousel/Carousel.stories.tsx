import type { Meta, StoryObj } from '@storybook/react';
import Carousel from './carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    showDots: { control: 'boolean' },
    showArrows: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  args: {
    items: [
      { content: 'Patient Monitoring Cable — Mindray 12-Lead ECG, 10ft' },
      { content: 'Blood Pressure Cuff — Adult Large, Latex-Free Reusable' },
      { content: 'Pulse Oximeter Probe — Finger Clip, SpO2 Sensor' },
    ],
    showDots: true,
    showArrows: true,
  },
};

export const NoControls: Story = {
  args: {
    items: [
      { content: 'Defibrillator Pad — Adult Anterior, Single-Use' },
      { content: 'Ventilator Circuit — Adult Disposable, 22mm' },
      { content: 'IV Pump Cassette — ALARIS 8100 Compatible' },
    ],
    showDots: false,
    showArrows: false,
  },
};

export const SingleSlide: Story = {
  args: {
    items: [
      { content: 'Ultrasound Transducer — Convex Array 3.5 MHz' },
    ],
    showDots: true,
    showArrows: true,
  },
};
