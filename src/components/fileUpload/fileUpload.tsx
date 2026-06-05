import React, { useRef, useState } from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // bytes
  onFiles?: (files: File[]) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

const UploadIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15l-5-5-5 5" />
    <line x1="16" y1="10" x2="16" y2="22" />
    <path d="M6 26h20" />
  </svg>
);

const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 2H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6L9 2z" />
    <polyline points="9 2 9 6 13 6" />
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
    <line x1="3" y1="3" x2="11" y2="11" /><line x1="11" y1="3" x2="3" y2="11" />
  </svg>
);

const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  multiple = false,
  maxSize,
  onFiles,
  error,
  disabled = false,
  className = '',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files);
    setSelectedFiles(multiple ? [...selectedFiles, ...arr] : arr);
    onFiles?.(multiple ? [...selectedFiles, ...arr] : arr);
  };

  const removeFile = (index: number) => {
    const next = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(next);
    onFiles?.(next);
  };

  const borderColor = error ? '#D32F2F' : dragging ? '#005BA6' : '#DCDCDC';

  return (
    <div className={className} style={{ fontFamily }}>
      <div
        onDragOver={e => { e.preventDefault(); !disabled && setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); !disabled && handleFiles(e.dataTransfer.files); }}
        onClick={() => !disabled && inputRef.current?.click()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: '24px 16px',
          border: `2px dashed ${borderColor}`,
          borderRadius: 4,
          background: dragging ? '#EFF9FE' : '#FAFAFA',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'border-color 150ms ease, background 150ms ease',
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <span style={{ color: '#005BA6' }}>
          <UploadIcon />
        </span>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#4A4A4A', fontFamily }}>
            Drag & drop files here
          </span>
          <div style={{ fontSize: 12, color: '#777777', marginTop: 4, fontFamily }}>
            or{' '}
            <button
              type="button"
              onClick={e => { e.stopPropagation(); !disabled && inputRef.current?.click(); }}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: '#005BA6',
                fontWeight: 600,
                fontSize: 12,
                cursor: disabled ? 'not-allowed' : 'pointer',
                fontFamily,
                textDecoration: 'underline',
              }}
            >
              browse files
            </button>
            {accept && <span> ({accept})</span>}
            {maxSize && <span> â max {(maxSize / 1024 / 1024).toFixed(0)}MB</span>}
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={e => handleFiles(e.target.files)}
          style={{ display: 'none' }}
        />
      </div>

      {error && (
        <div style={{ fontSize: 12, color: '#E00000', marginTop: 4, fontFamily }}>
          {error}
        </div>
      )}

      {selectedFiles.length > 0 && (
        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {selectedFiles.map((file, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 12px',
                background: '#FFFFFF',
                border: '1px solid #DCDCDC',
                borderRadius: 4,
                fontFamily,
              }}
            >
              <span style={{ color: '#005BA6', flexShrink: 0 }}><FileIcon /></span>
              <span style={{ flex: 1, fontSize: 13, color: '#4A4A4A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily }}>
                {file.name}
              </span>
              <span style={{ fontSize: 12, color: '#777777', flexShrink: 0, fontFamily }}>
                {(file.size / 1024).toFixed(1)}KB
              </span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#949494', display: 'flex', alignItems: 'center', flexShrink: 0 }}
              >
                <CloseIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
