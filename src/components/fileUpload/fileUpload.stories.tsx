import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import FileUpload from './fileUpload';

const meta = {
  title: 'Components/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'File upload drop-zone with sub-state stories for uploading progress, complete, error, multiple files, and large file scenarios.',
      },
    },
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

const FF = "'Source Sans Pro','Source Sans 3',sans-serif";

const ProgressBar = ({ pct, color = '#005BA6' }: { pct: number; color?: string }) => (
  <div style={{ height: 4, background: '#F1F1F1', borderRadius: 2, overflow: 'hidden', marginTop: 4 }}>
    <div style={{ height: '100%', width: pct + '%', background: color, borderRadius: 2, transition: 'width 300ms ease' }} />
  </div>
);

const FileRow = ({ name, size, status, pct }: { name: string; size: string; status: 'uploading' | 'complete' | 'error'; pct?: number }) => {
  const FileIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 2H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6L9 2z"/>
      <polyline points="9 2 9 6 13 6"/>
    </svg>
  );
  const CheckIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#17AB78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 8 6.5 11.5 13 5"/>
    </svg>
  );
  const ErrIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#E00000" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6"/><line x1="8" y1="5" x2="8" y2="9"/><circle cx="8" cy="11" r=".5" fill="#E00000"/>
    </svg>
  );
  return (
    <div style={{ padding: '10px 12px', border: '1px solid #DCDCDC', borderRadius: 4, background: '#fff', fontFamily: FF }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: '#005BA6', flexShrink: 0 }}><FileIcon /></span>
        <span style={{ flex: 1, fontSize: 13, color: '#4A4A4A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
        <span style={{ fontSize: 12, color: '#777', flexShrink: 0 }}>{size}</span>
        <span style={{ flexShrink: 0 }}>
          {status === 'complete' && <CheckIcon />}
          {status === 'error' && <ErrIcon />}
        </span>
      </div>
      {status === 'uploading' && <ProgressBar pct={pct ?? 45} />}
      {status === 'error' && <div style={{ fontSize: 12, color: '#E00000', marginTop: 4 }}>Upload failed. File exceeds size limit or is unsupported.</div>}
    </div>
  );
};

export const Default: Story = {
  name: 'Default Drop Zone',
  args: { accept: '.pdf, .docx, .xlsx', multiple: true },
};

export const Uploading: Story = {
  name: 'Uploading — with Progress Bar',
  render: () => (
    <div style={{ width: 480, fontFamily: FF }}>
      <FileUpload accept=".pdf" multiple={false} />
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <FileRow name="PO-Invoice-June2026.pdf" size="1.2 MB" status="uploading" pct={62} />
      </div>
    </div>
  ),
};

export const UploadComplete: Story = {
  name: 'Upload Complete — Green Checkmark',
  render: () => (
    <div style={{ width: 480, fontFamily: FF }}>
      <FileUpload accept=".pdf" multiple={false} />
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <FileRow name="signed-contract-2026.pdf" size="0.8 MB" status="complete" />
      </div>
    </div>
  ),
};

export const UploadError: Story = {
  name: 'Upload Error — Red Error Message',
  render: () => (
    <div style={{ width: 480, fontFamily: FF }}>
      <FileUpload accept=".pdf" multiple={false} error="One or more files could not be uploaded." />
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <FileRow name="huge-catalog-scan.pdf" size="52.4 MB" status="error" />
      </div>
    </div>
  ),
};

export const MultipleFiles: Story = {
  name: 'Multiple Files — Queued and Uploading',
  render: () => (
    <div style={{ width: 480, fontFamily: FF }}>
      <FileUpload accept=".pdf,.docx" multiple />
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <FileRow name="invoice-001.pdf" size="0.4 MB" status="complete" />
        <FileRow name="specs-v2.docx" size="1.1 MB" status="uploading" pct={38} />
        <FileRow name="addendum.pdf" size="0.2 MB" status="uploading" pct={5} />
      </div>
    </div>
  ),
};

export const LargeFile: Story = {
  name: 'Large File — MB Progress',
  render: () => (
    <div style={{ width: 480, fontFamily: FF }}>
      <FileUpload accept=".zip" maxSize={104857600} multiple={false} />
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <FileRow name="parts-catalog-2026-full.zip" size="87.3 MB" status="uploading" pct={24} />
      </div>
      <div style={{ marginTop: 6, fontSize: 12, color: '#777', fontFamily: FF }}>Uploading 87.3 MB — 24% complete (approx. 2 min remaining)</div>
    </div>
  ),
};
