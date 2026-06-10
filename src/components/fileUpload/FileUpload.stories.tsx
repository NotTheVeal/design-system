import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import FileUpload from './fileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/FileUpload',
  component: FileUpload,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: {
    onFiles: (files) => console.log('Files selected:', files),
  },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
};

export const PDFOnly: Story = {
  args: {
    accept: '.pdf',
    onFiles: (files) => console.log('PDF selected:', files),
  },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
};

export const MultipleFiles: Story = {
  args: {
    multiple: true,
    accept: '.pdf,.xlsx,.docx',
    maxSize: 10 * 1024 * 1024,
    onFiles: (files) => console.log('Files:', files),
  },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
};

export const WithError: Story = {
  args: {
    accept: '.pdf',
    error: 'File size exceeds the 5MB limit. Please upload a smaller file.',
    onFiles: (files) => console.log('Files:', files),
  },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
};

export const InvoiceUpload: Story = {
  render: () => (
    <div style={{ width: 480, display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'Source Sans Pro, sans-serif' }}>
      <label style={{ fontSize: 14, fontWeight: 600, color: '#4A4A4A' }}>
        Attach Invoice <span style={{ color: '#E00000' }}>*</span>
      </label>
      <FileUpload
        accept=".pdf,.jpg,.png"
        maxSize={5 * 1024 * 1024}
        onFiles={(files) => console.log(files)}
      />
      <p style={{ margin: 0, fontSize: 12, color: '#777' }}>Accepted formats: PDF, JPG, PNG. Max file size: 5MB.</p>
    </div>
  ),
};
