'use client';

import { useState, useRef } from 'react';
import { MediaUploadUseCase, MediaFile, UploadConfig } from '@/application/useCases/admin/MediaUploadUseCase';

interface SingleImageUploadProps {
  label: string;
  description: string;
  value: MediaFile | null;
  onChange: (file: MediaFile | null) => void;
  dict: any;
  maxFileSize?: number;
  className?: string;
}

export default function AdminFormSingleImageUploadComponent({
  label,
  description,
  value,
  onChange,
  dict,
  maxFileSize = 5,
  className = ''
}: SingleImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const uploadUseCase = new MediaUploadUseCase();
  const config: UploadConfig = {
    maxFiles: 1,
    maxFileSize,
    acceptedTypes: ['image/*']
  };

  const replaceText = (text: string, replacements: Record<string, string | number>) => {
    let result = text;
    Object.entries(replacements).forEach(([key, value]) => {
      result = result.replace(`{${key}}`, value.toString());
    });
    return result;
  };

  const handleFileSelect = (file: File) => {
    setError('');
    
    const result = uploadUseCase.processFiles([file], [], config);
    
    if (result.errors.length > 0) {
      const translatedError = result.errors[0];
      if (translatedError.includes('File size must be less than')) {
        setError(replaceText(dict.admin.media.upload.errors.fileSize, { size: maxFileSize }));
      } else if (translatedError.includes('File type not supported')) {
        setError(dict.admin.media.upload.errors.fileType);
      } else {
        setError(translatedError);
      }
      return;
    }

    if (result.files.length > 0) {
      onChange(result.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleRemove = () => {
    if (value) {
      URL.revokeObjectURL(value.url);
      onChange(null);
    }
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <p className="text-xs text-gray-500 mb-2">{description}</p>
      
      {value ? (
        <div className="relative w-32 h-32 border border-gray-200 rounded-lg overflow-hidden group">
          <img
            src={value.url}
            alt={label}
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            title={dict.admin.media.upload.removeFile || 'Remove image'}
          >
            <span className="text-xs">✕</span>
          </button>
        </div>
      ) : (
        <div
          className={`
            w-32 h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors
            ${isDragOver 
              ? 'border-red-500 bg-red-50' 
              : 'border-gray-300 hover:border-red-400 hover:bg-gray-50'
            }
          `}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragOver(false);
          }}
          onDrop={handleDrop}
          onClick={openFilePicker}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileSelect(e.target.files[0]);
              }
            }}
            className="hidden"
          />
          <span className="text-2xl text-gray-400 mb-1">📷</span>
          <span className="text-xs text-gray-500 text-center px-2">
            {dict.admin.media.upload.dropText || 'Click or drag image'}
          </span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}
