'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { MediaFile } from '@/application/useCases/utils/MediaUploadUseCase';
import { uploadMediaAction } from '@/actions/uploadActions';

interface UseFileUploadProps {
  maxFiles: number;
  onMediaChange?: (files: MediaFile[]) => void;
}

export function useFileUpload({
  maxFiles,
  onMediaChange,
}: UseFileUploadProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());
  const onMediaChangeRef = useRef(onMediaChange);

  useEffect(() => {
    onMediaChangeRef.current = onMediaChange;
  }, [onMediaChange]);

  const notifyParent = useCallback((newFiles: MediaFile[]) => {
    if (onMediaChangeRef.current) {
      onMediaChangeRef.current(newFiles);
    }
  }, []);

  const setInitialFiles = useCallback((initialFiles: MediaFile[]) => {
    setFiles(initialFiles);
  }, []);

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
        return updated;
      });
    },
    []
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
          return updated;
        });
      }
    },
    [files]
  );

  const uploadFile = useCallback(
    async (file: File, fileId: string) => {
      setUploadingFiles(prev => new Set(prev).add(fileId));

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', 'puppies');

        const result = await uploadMediaAction(formData);

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
          return updated;
        });

        await uploadFile(file, mediaFile.id);
      }
    },
    [files.length, maxFiles, addFile, uploadFile]
  );

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  useEffect(() => {
    notifyParent(files);
  }, [files, notifyParent]);

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
