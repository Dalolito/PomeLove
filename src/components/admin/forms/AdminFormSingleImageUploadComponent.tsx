'use client';

import { useState, useRef } from 'react';
import { MediaFile } from '@/application/useCases/utils/MediaUploadUseCase';
import { uploadImageAction } from '@/actions/uploadActions';
import PuppyImageComponent from '@/components/ui/PuppyImageComponent';
import { Dictionary } from '@/lib/types/dictionary';

interface SingleImageUploadProps {
  label: string;
  description: string;
  value: MediaFile | null;
  onChange: (file: MediaFile | null) => void;
  dict: Dictionary;
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
  maxFileSize: _maxFileSize = 5,
  className = '',
  uploadType = 'puppies',
}: SingleImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
          isUploaded: true,
        };

        onChange(mediaFile);
      } else {
        const errorKey =
          result.error as keyof typeof dict.admin.media.upload.errors;
        setError(
          dict.admin.media.upload.errors[errorKey] ||
            dict.admin.media.upload.errors.uploadFailed ||
            dict.utils.errors.unexpectedImageUpload
        );
      }
    } catch {
      setError(
        dict.admin.media.upload.errors.uploadFailed ||
          dict.utils.errors.unexpectedImageUpload
      );
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
    <div className={`space-y-3 ${className}`}>
      <div className="text-center">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
        <p className="text-xs text-gray-500">{description}</p>
      </div>

      {value ? (
        <div className="group relative mx-auto h-40 w-40 overflow-hidden rounded-lg border border-gray-200">
          <PuppyImageComponent
            src={value.url}
            alt={label}
            className="h-full w-full"
          />
          <button
            type="button"
            onClick={handleRemove}
            disabled={isUploading}
            className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity hover:bg-red-600 disabled:opacity-50 group-hover:opacity-100"
            title={dict.admin.media.upload.removeFile || 'Remove image'}
          >
            <span className="text-xs">✕</span>
          </button>
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="text-xs text-white">
                {dict.admin.media.upload.uploading}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          className={`mx-auto flex h-40 w-40 flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
            isUploading
              ? 'cursor-not-allowed border-gray-300 bg-gray-50'
              : isDragOver
                ? 'cursor-pointer border-red-500 bg-red-50'
                : 'cursor-pointer border-gray-300 hover:border-red-400 hover:bg-gray-50'
          } `}
          onDragOver={e => {
            e.preventDefault();
            if (!isUploading) setIsDragOver(true);
          }}
          onDragLeave={e => {
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
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                handleFileSelect(e.target.files[0]);
              }
            }}
            className="hidden"
          />
          {isUploading ? (
            <>
              <span className="mb-1 text-2xl text-gray-400">⏳</span>
              <span className="px-2 text-center text-xs text-gray-500">
                {dict.admin.media.upload.uploading}
              </span>
            </>
          ) : (
            <>
              <svg
                className="mb-1 h-8 w-8 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="px-2 text-center text-xs text-gray-500">
                {dict.admin.media.upload.dropText || 'Click or drag image'}
              </span>
            </>
          )}
        </div>
      )}

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
