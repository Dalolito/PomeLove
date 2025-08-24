'use client';

import { useState, useCallback } from 'react';
import { MediaFile } from '@/application/useCases/utils/MediaUploadUseCase';
import { Dictionary } from '@/lib/types/dictionary';
import { uploadImageAction } from '@/actions/uploadActions';

interface UseSingleImageUploadProps {
  dict: Dictionary;
  maxFileSize?: number;
  uploadType?: 'puppies' | 'parents';
  onUploadSuccess?: (file: MediaFile) => void;
  onUploadError?: (error: string) => void;
}

export function useSingleImageUpload({
  dict,
  maxFileSize = 5,
  uploadType = 'puppies',
  onUploadSuccess,
  onUploadError,
}: UseSingleImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);

  const validateFile = useCallback(
    (file: File): string | null => {
      // Validar tamaño
      if (file.size > maxFileSize * 1024 * 1024) {
        return dict.admin.media.upload.errors.fileSize.replace('{size}', maxFileSize.toString());
      }

      // Validar tipo
      if (!file.type.startsWith('image/')) {
        return dict.admin.media.upload.errors.fileType;
      }

      return null;
    },
    [maxFileSize]
  );

  const handleFileUpload = useCallback(
    async (file: File): Promise<MediaFile | null> => {
      // Validar archivo
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        onUploadError?.(validationError);
        return null;
      }

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

          onUploadSuccess?.(mediaFile);
          return mediaFile;
        } else {
          const errorMessage = result.error || dict.admin.media.upload.errors.uploadFailed || dict.utils.errors.unexpectedImageUpload;
          setError(errorMessage);
          onUploadError?.(errorMessage);
          return null;
        }
      } catch {
        const errorMessage = dict.utils.errors.unexpectedImageUpload;
        setError(errorMessage);
        onUploadError?.(errorMessage);
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [validateFile, uploadType, onUploadSuccess, onUploadError]
  );

  const handleDrop = useCallback(
    (files: FileList | File[]): Promise<MediaFile | null> => {
      const fileArray = Array.from(files);
      if (fileArray.length > 0) {
        return handleFileUpload(fileArray[0]);
      }
      return Promise.resolve(null);
    },
    [handleFileUpload]
  );

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDropEvent = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      setIsDragOver(false);
      return handleDrop(event.dataTransfer.files);
    },
    [handleDrop]
  );

  const clearError = useCallback(() => {
    setError('');
  }, []);

  const removeFile = useCallback(
    (file: MediaFile | null) => {
      if (file && !file.isUploaded && file.file) {
        URL.revokeObjectURL(file.url);
      }
      clearError();
    },
    [clearError]
  );

  return {
    isUploading,
    error,
    isDragOver,
    handleFileUpload,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleDropEvent,
    clearError,
    removeFile,
    validateFile,
  };
}
