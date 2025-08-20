'use client';

import { useState, useRef } from 'react';
import { MediaUploadUseCase, MediaFile } from '@/application/useCases/admin/MediaUploadUseCase';
import { uploadImageAction } from '@/actions/uploadActions';

interface SingleImageUploadProps {
  label: string;
  description: string;
  value: MediaFile | null;
  onChange: (file: MediaFile | null) => void;
  dict: any;
  maxFileSize?: number;
  className?: string;
  uploadType?: 'puppies' | 'parents';
}

export default function AdminFormSingleImageUploadComponent({
  label,
  description,
  value,
  onChange,
  dict,
  maxFileSize = 5,
  className = '',
  uploadType = 'puppies'
}: SingleImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const uploadUseCase = new MediaUploadUseCase();
  const config = {
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

  const handleFileSelect = async (file: File) => {
    setError('');
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', uploadType);
      
      const result = await uploadImageAction(formData);
      
      if (result.success && result.url) {
        const mediaFile: MediaFile = {
          id: Math.random().toString(36).substr(2, 9),
          url: result.url,
          type: 'image',
          name: file.name,
          size: file.size,
          isUploaded: true
        };
        
        onChange(mediaFile);
      } else {
        const errorKey = result.error as keyof typeof dict.admin.media.upload.errors;
        setError(dict.admin.media.upload.errors[errorKey] || dict.admin.media.upload.errors.uploadFailed);
      }
    } catch (error) {
      setError(dict.admin.media.upload.errors.uploadFailed);
    } finally {
      setIsUploading(false);
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
      if (!value.isUploaded && value.file) {
        URL.revokeObjectURL(value.url);
      }
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
            disabled={isUploading}
            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 disabled:opacity-50"
            title={dict.admin.media.upload.removeFile || 'Remove image'}
          >
            <span className="text-xs">✕</span>
          </button>
          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-white text-xs">{dict.admin.media.upload.uploading}</div>
            </div>
          )}
        </div>
      ) : (
        <div
          className={`
            w-32 h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors
            ${isUploading 
              ? 'border-gray-300 bg-gray-50 cursor-not-allowed' 
              : isDragOver 
                ? 'border-red-500 bg-red-50 cursor-pointer' 
                : 'border-gray-300 hover:border-red-400 hover:bg-gray-50 cursor-pointer'
            }
          `}
          onDragOver={(e) => {
            e.preventDefault();
            if (!isUploading) setIsDragOver(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragOver(false);
          }}
          onDrop={handleDrop}
          onClick={isUploading ? undefined : openFilePicker}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            disabled={isUploading}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileSelect(e.target.files[0]);
              }
            }}
            className="hidden"
          />
          {isUploading ? (
            <>
              <span className="text-2xl text-gray-400 mb-1">⏳</span>
              <span className="text-xs text-gray-500 text-center px-2">
                {dict.admin.media.upload.uploading}
              </span>
            </>
          ) : (
            <>
              <span className="text-2xl text-gray-400 mb-1">📷</span>
              <span className="text-xs text-gray-500 text-center px-2">
                {dict.admin.media.upload.dropText || 'Click or drag image'}
              </span>
            </>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}
