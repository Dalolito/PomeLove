'use client';

import React, { useState, useEffect } from 'react';
import { MediaFile } from '@/application/useCases/utils/MediaUploadUseCase';
import { useFileUpload } from '@/hooks/useFileUpload';
import UploadAreaComponent from '@/components/admin/forms/UploadAreaComponent';
import FileGridComponent from '@/components/admin/forms/FileGridComponent';
import ErrorMessagesComponent from '@/components/admin/forms/ErrorMessagesComponent';
import { Dictionary } from '@/lib/types/dictionary';

interface UploadMediaComponentProps {
  dict: Dictionary;
  maxFiles?: number;
  maxFileSize?: number;
  initialFiles?: MediaFile[];
  onMediaChange?: (files: MediaFile[]) => void;
  className?: string;
}

export default function UploadMediaComponent({
  dict,
  maxFiles = 10,
  maxFileSize = 50,
  initialFiles = [],
  onMediaChange,
  className = '',
}: UploadMediaComponentProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const {
    files,
    errors,
    uploadingFiles,
    handleFiles,
    removeFile,
    setInitialFiles,
  } = useFileUpload({
    maxFiles,
    onMediaChange,
  });

  useEffect(() => {
    if (initialFiles.length > 0) {
      setInitialFiles(initialFiles);
    }
  }, [initialFiles, setInitialFiles]);

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

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <h3 className="mb-1 text-lg font-semibold text-gray-800">
          {dict.admin.media.upload.title}
        </h3>
        <p className="text-sm text-gray-600">
          {dict.admin.media.upload.description}
        </p>
      </div>

      <UploadAreaComponent
        dict={dict}
        maxFiles={maxFiles}
        maxFileSize={maxFileSize}
        isDragOver={isDragOver}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onFileSelect={handleFileChange}
      />

      <ErrorMessagesComponent errors={errors} />

      <FileGridComponent
        dict={dict}
        files={files}
        maxFiles={maxFiles}
        uploadingFiles={uploadingFiles}
        onRemoveFile={removeFile}
      />
    </div>
  );
}
