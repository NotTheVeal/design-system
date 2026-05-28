import React, { useState, useRef } from 'react';

interface FileUploadProps {
  onUpload?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  disabled?: boolean;
  className?: string;
  label?: string;
  hint?: string;
}

const UploadIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M16 20V12M12 15l4-4 4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 22a6 6 0 1 1 2-11.66A8 8 0 1 1 26 18h-2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  accept,
  multiple = false,
  maxSize,
  disabled = false,
  className = '',
  label = 'Drop files here or click to upload',
  hint,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const fileArr = Array.from(files);
    const invalid = maxSize ? fileArr.filter(f => f.size > maxSize) : [];
    if (invalid.length) {
      setError(`File too large. Max size: ${Math.round(maxSize! / 1024 / 1024)}MB`);
      return;
    }
    setError('');
    setUploadedFiles(prev => multiple ? [...prev, ...fileArr] : fileArr);
    onUpload?.(fileArr);
  };

  const removeFile = (i: number) => {
    setUploadedFiles(prev => prev.filter((_, idx) => idx !== i));
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div
        className={`relative flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-[8px] text-center transition-all duration-150 cursor-pointer
          ${isDragging ? 'border-[#005BA6] bg-[#EFF9FE]' : 'border-[#DCDCDC] bg-[#FAFAFA] hover:border-[#005BA6] hover:bg-[#EFF9FE]'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); if (!disabled) setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={e => { e.preventDefault(); setIsDragging(false); if (!disabled) handleFiles(e.dataTransfer.files); }}
        aria-label="File upload area"
      >
        <div className="text-[#005BA6]"><UploadIcon /></div>
        <div>
          <p className="text-[14px] font-semibold text-[#4A4A4A]">{label}</p>
          {hint && <p className="text-[12px] text-[#777777] mt-1">{hint}</p>}
        </div>
        <button type="button" className="h-[36px] px-4 bg-white border border-[#005BA6] text-[#005BA6] text-[14px] font-semibold rounded-[4px] hover:bg-[#EFF9FE] transition-colors">
          Browse Files
        </button>
        <input ref={inputRef} type="file" accept={accept} multiple={multiple} disabled={disabled} className="sr-only"
          onChange={e => handleFiles(e.target.files)} />
      </div>

      {error && <p className="text-[12px] text-[#D32F2F]">{error}</p>}

      {uploadedFiles.length > 0 && (
        <div className="flex flex-col gap-2">
          {uploadedFiles.map((file, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2 bg-white border border-[#DCDCDC] rounded-[4px]">
              <span className="text-[14px] text-[#005BA6]">📄</span>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[#4A4A4A] truncate">{file.name}</p>
                <p className="text-[11px] text-[#777777]">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
              <button onClick={() => removeFile(i)} aria-label="Remove file" className="text-[#777777] hover:text-[#E00000] transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
