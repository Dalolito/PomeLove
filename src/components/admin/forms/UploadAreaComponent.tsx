'use client';

import { useRef } from 'react';
import { replaceText } from '@/lib/utils/textUtils';

import { Dictionary } from '@/lib/types/dictionary';

interface UploadAreaProps {
  dict: Dictionary;
  maxFiles: number;
  maxFileSize: number;
  isDragOver: boolean;
  onDragOver: (event: React.DragEvent) => void;
  onDragLeave: (event: React.DragEvent) => void;
  onDrop: (event: React.DragEvent) => void;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function UploadAreaComponent({
  dict,
  maxFiles,
  maxFileSize,
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
  className = '',
}: UploadAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`relative cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-all ${
        isDragOver
          ? 'border-red-500 bg-red-50'
          : 'border-gray-300 hover:border-red-400 hover:bg-gray-50'
      } ${className} `}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={openFilePicker}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={onFileSelect}
        className="hidden"
      />

      <div className="space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100">
          <span className="text-3xl text-gray-400">📁</span>
        </div>

        <div>
          <p className="mb-2 text-lg font-medium text-gray-700">
            {dict.admin.media.upload.dropText}
          </p>
          <p className="text-sm text-gray-500">
            {replaceText(dict.admin.media.upload.supportText, {
              size: maxFileSize,
            })}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            {replaceText(dict.admin.media.upload.maxFilesText, {
              count: maxFiles,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
