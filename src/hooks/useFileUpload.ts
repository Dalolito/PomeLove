'use client';

import { useState, useCallback } from 'react';
import { MediaFile } from '@/application/useCases/admin/MediaUploadUseCase';
import { uploadImageAction } from '@/actions/uploadActions';

interface UseFileUploadProps {
  maxFiles: number;
  maxFileSize: number;
  onMediaChange?: (files: MediaFile[]) => void;
}

export function useFileUpload({
  maxFiles,
  maxFileSize: _maxFileSize,
  onMediaChange,
}: UseFileUploadProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());

  const notifyParent = useCallback(
    (newFiles: MediaFile[]) => {
      if (onMediaChange) {
        setTimeout(() => {
          onMediaChange(newFiles);
        }, 0);
      }
    },
    [onMediaChange]
  );

  const setInitialFiles = useCallback(
    (initialFiles: MediaFile[]) => {
      setFiles(initialFiles);
      notifyParent(initialFiles);
    },
    [notifyParent]
  );

  const addFile = useCallback((file: File): MediaFile => {
    const fileId = Math.random().toString(36).substr(2, 9);

    return {
      id: fileId,
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'video',
      name: file.name,
      size: file.size,
      isUploaded: false,
    };
  }, []);

  const updateFile = useCallback(
    (fileId: string, updates: Partial<MediaFile>) => {
      setFiles(prev => {
        const updated = prev.map(f =>
          f.id === fileId ? { ...f, ...updates } : f
        );
        notifyParent(updated);
        return updated;
      });
    },
    [notifyParent]
  );

  const removeFile = useCallback(
    (fileId: string) => {
      const fileToRemove = files.find(f => f.id === fileId);
      if (fileToRemove) {
        if (!fileToRemove.isUploaded && fileToRemove.file) {
          URL.revokeObjectURL(fileToRemove.url);
        }

        setFiles(prev => {
          const updated = prev.filter(f => f.id !== fileId);
          notifyParent(updated);
          return updated;
        });
      }
    },
    [files, notifyParent]
  );

  const uploadFile = useCallback(
    async (file: File, fileId: string) => {
      setUploadingFiles(prev => new Set(prev).add(fileId));

      try {
        if (file.type.startsWith('image/')) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('type', 'puppies');

          const result = await uploadImageAction(formData);

          if (result.success && result.url) {
            updateFile(fileId, {
              url: result.url,
              isUploaded: true,
              file: undefined,
            });
          } else {
            removeFile(fileId);
            const errorMessage = result.error || 'Upload failed';
            setErrors(prev => [...prev, `${file.name}: ${errorMessage}`]);
          }
        } else {
          updateFile(fileId, { isUploaded: false });
        }
      } catch {
        removeFile(fileId);
        setErrors(prev => [...prev, `${file.name}: Upload failed`]);
      } finally {
        setUploadingFiles(prev => {
          const newSet = new Set(prev);
          newSet.delete(fileId);
          return newSet;
        });
      }
    },
    [updateFile, removeFile]
  );

  const handleFiles = useCallback(
    async (fileList: FileList | File[]) => {
      const newFiles = Array.from(fileList);

      if (files.length + newFiles.length > maxFiles) {
        setErrors([`Maximum ${maxFiles} files allowed`]);
        return;
      }

      setErrors([]);

      for (const file of newFiles) {
        const mediaFile = addFile(file);

        setFiles(prev => {
          const updated = [...prev, mediaFile];
          notifyParent(updated);
          return updated;
        });

        await uploadFile(file, mediaFile.id);
      }
    },
    [files.length, maxFiles, addFile, uploadFile, notifyParent]
  );

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  return {
    files,
    errors,
    uploadingFiles,
    handleFiles,
    removeFile,
    clearErrors,
    setInitialFiles,
  };
}