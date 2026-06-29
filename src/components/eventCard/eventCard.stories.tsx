import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { EventCard } from './eventCard';

const meta: Meta<typeof EventCard> = {
  title: 'Components/EventCard',
  component: EventCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    type: { control: 'select', options: ['service', 'maintenance', 'inspection', 'delivery'] },
    status: { control: 'select', options: ['upcoming', 'completed', 'cancelled'] },
  },
};

export default meta;
type Story = StoryObj<typeof EventCard>;

export const Default: Story = {
  args: {
    title: 'CT Scanner Preventive Maintenance',
    date: '14',
    month: 'Jun',
    type: 'maintenance',
    time: '9:00 AM  -  12:00 PM',
    location: 'Imaging Suite 2A',
    status: 'upcoming',
  },
};

export const ServiceEvent: Story = {
  args: {
    title: 'MRI Gradient Coil Replacement',
    date: '22',
    month: 'Jun',
    type: 'service',
    time: '8:00 AM',
    location: 'Radiology 4B',
    status: 'upcoming',
  },
};

export const InspectionEvent: Story = {
  args: {
    title: 'Annual Safety Inspection  -  Ventilators',
    date: '30',
    month: 'Jun',
    type: 'inspection',
    time: '2:00 PM',
    location: 'ICU Bay 3',
    status: 'upcoming',
  },
};

export const DeliveryEvent: Story = {
  args: {
    title: 'Part Delivery  -  PO-2025-0841',
    date: '5',
    month: 'Jul',
    type: 'delivery',
    location: 'Receiving Dock B',
    status: 'upcoming',
  },
};

export const Completed: Story = {
  args: {
    title: 'Patient Monitor Battery Replacement',
    date: '3',
    month: 'Jun',
    type: 'maintenance',
    time: '10:30 AM',
    location: 'PICU',
    status: 'completed',
  },
};

export const Cancelled: Story = {
  args: {
    title: 'X-Ray Tube Calibration',
    date: '10',
    month: 'Jun',
    type: 'service',
    time: '1:00 PM',
    location: 'Radiology ER',
    status: 'cancelled',
  },
};

export const EventList: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>
      <EventCard title="CT Scanner PM" date="14" month="Jun" type="maintenance" time="9:00 AM" location="Imaging 2A" status="upcoming" />
      <EventCard title="MRI Service Visit" date="18" month="Jun" type="service" time="8:00 AM" location="Radiology 4B" status="upcoming" />
      <EventCard title="Annual Safety Inspection" date="22" month="Jun" type="inspection" time="2:00 PM" location="ICU" status="upcoming" />
      <EventCard title="Part Delivery  -  GE Healthcare" date="25" month="Jun" type="delivery" location="Dock B" status="upcoming" />
      <EventCard title="Ultrasound Probe Calibration" date="3" month="Jun" type="service" time="10:00 AM" status="completed" />
    </div>
  ),
};
