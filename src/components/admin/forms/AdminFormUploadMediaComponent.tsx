'use client';

import { useState, useRef } from 'react';
import { MediaUploadUseCase, MediaFile } from '@/application/useCases/admin/MediaUploadUseCase';

interface UploadMediaComponentProps {
  dict: any;
  maxFiles?: number;
  maxFileSize?: number;
  onMediaChange?: (files: MediaFile[]) => void;
  className?: string;
}

export default function UploadMediaComponent({
  dict,
  maxFiles = 10,
  maxFileSize = 50,
  onMediaChange,
  className = ''
}: UploadMediaComponentProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const uploadUseCase = new MediaUploadUseCase();
  const config = {
    maxFiles,
    maxFileSize,
    acceptedTypes: ['image/*', 'video/*']
  };

  const replaceText = (text: string, replacements: Record<string, string | number>) => {
    let result = text;
    Object.entries(replacements).forEach(([key, value]) => {
      result = result.replace(`{${key}}`, value.toString());
    });
    return result;
  };

  const handleFiles = (fileList: FileList | File[]) => {
    const result = uploadUseCase.processFiles(fileList, files, config);
    setFiles(result.files);
    
    const translatedErrors = result.errors.map(error => {
      if (error.includes('File size must be less than')) {
        return replaceText(dict.admin.media.upload.errors.fileSize, { size: maxFileSize });
      }
      if (error.includes('File type not supported')) {
        return dict.admin.media.upload.errors.fileType;
      }
      if (error.includes('Maximum') && error.includes('files allowed')) {
        return replaceText(dict.admin.media.upload.errors.maxFiles, { count: maxFiles });
      }
      return error;
    });
    
    setErrors(translatedErrors);
    onMediaChange?.(result.files);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleFiles(event.target.files);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    handleFiles(event.dataTransfer.files);
  };

  const removeFile = (fileId: string) => {
    const updatedFiles = uploadUseCase.removeFile(fileId, files);
    setFiles(updatedFiles);
    onMediaChange?.(updatedFiles);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {dict.admin.media.upload.title}
        </h3>
        <p className="text-sm text-gray-600">
          {dict.admin.media.upload.description}
        </p>
      </div>

      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer
          ${isDragOver 
            ? 'border-red-500 bg-red-50' 
            : 'border-gray-300 hover:border-red-400 hover:bg-gray-50'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFilePicker}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="space-y-4">
          <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto flex items-center justify-center">
            <span className="text-3xl text-gray-400">📁</span>
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-700 mb-2">
              {dict.admin.media.upload.dropText}
            </p>
            <p className="text-sm text-gray-500">
              {replaceText(dict.admin.media.upload.supportText, { size: maxFileSize })}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {replaceText(dict.admin.media.upload.maxFilesText, { count: maxFiles })}
            </p>
          </div>
        </div>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          {errors.map((error, index) => (
            <p key={index} className="text-sm text-red-700">{error}</p>
          ))}
        </div>
      )}

      {/* File Grid */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-800">
            {replaceText(dict.admin.media.upload.uploadedFiles, { 
              current: files.length, 
              max: maxFiles 
            })}
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="relative bg-white border border-gray-200 rounded-lg overflow-hidden group"
              >
                {/* Preview */}
                <div className="aspect-square bg-gray-100">
                  {file.type === 'image' ? (
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-900">
                      <span className="text-4xl text-white">🎥</span>
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="p-3">
                  <p className="font-medium text-gray-900 text-sm truncate" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {dict.admin.media.upload.fileTypes[file.type]} • {formatFileSize(file.size)}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.id);
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  title={dict.admin.media.upload.removeFile}
                >
                  <span className="text-sm">✕</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}