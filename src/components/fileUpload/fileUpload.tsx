import React, { useState } from 'react';

interface FileUploadProps {
  className?: string;
  label: string;
  onFileChange: (files: FileList | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ className, label, onFileChange }) => {
  const [fileList, setFileList] = useState<FileList | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setFileList(files);
    onFileChange(files);
  };

  return (
    <div className={`file-upload ${className}`}>
      <label className="file-upload-label" htmlFor="file-upload">
        {label}
      </label>
      <div className="file-upload-zone" role="button" tabIndex={0} onClick={() => document.getElementById('file-upload')?.click()} onKeyDown={(e) => e.key === 'Enter' && document.getElementById('file-upload')?.click()}>
        <input type="file" id="file-upload" className="file-upload-input" onChange={handleFileChange} />
        <span className="file-upload-drag-text">Drag and drop files here or click to upload</span>
      </div>
      {fileList && Array.from(fileList).map((file, index) => (
        <div key={index} className="file-item">
          <span className="file-item-name">{file.name}</span>
          <button className="file-item-remove" onClick={() => setFileList(null)}>Remove</button>
        </div>
      ))}
      <style jsx>{`
        :root {
          --ps-font: 'Source Sans Pro', sans-serif;
          --ps-blue: #005BA6;
          --ps-midnight: #002F48;
          --ps-neutral-50: #f6f6f6;
          --ps-border-default: #dcdcdc;
          --ps-error: #fc3b3b;
          --ps-shadow-focused: 0 0 0 3px rgba(0, 147, 244, 0.3);
          --ps-shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .file-upload {
          font-family: var(--ps-font);
        }
        .file-upload-label {
          margin-bottom: 8px;
          display: block;
        }
        .file-upload-zone {
          background: var(--ps-neutral-50);
          border: 2px dashed var(--ps-border-default);
          border-radius: 8px;
          padding: 32px 24px;
          text-align: center;
          cursor: pointer;
          transition: border 0.3s;
        }
        .file-upload-zone:hover {
          border-color: var(--ps-blue);
        }
        .file-upload-input {
          display: none;
        }
        .file-upload-drag-text {
          color: var(--ps-blue);
          font-size: 16px;
        }
        .file-item {
          background: var(--ps-neutral-50);
          border: 1px solid var(--ps-border-default);
          border-radius: 4px;
          padding: 8px 12px;
          margin-top: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .file-item-name {
          color: var(--ps-blue);
        }
        .file-item-remove {
          background: none;
          border: none;
          color: var(--ps-error);
          cursor: pointer;
        }
        .file-item-remove:hover {
          color: var(--ps-error);
        }
      `}</style>
    </div>
  );
};

export default FileUpload;
