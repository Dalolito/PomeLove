'use client';

import { MediaFile } from '@/application/useCases/admin/MediaUploadUseCase';
import { replaceText, formatFileSize } from '@/lib/utils/textUtils';

import { Dictionary } from '@/lib/types/dictionary';

interface FileGridProps {
  dict: Dictionary;
  files: MediaFile[];
  maxFiles: number;
  uploadingFiles: Set<string>;
  onRemoveFile: (fileId: string) => void;
  className?: string;
}

export default function FileGridComponent({
  dict,
  files,
  maxFiles,
  uploadingFiles,
  onRemoveFile,
  className = '',
}: FileGridProps) {
  if (files.length === 0) return null;

  return (
    <div className={`space-y-3 ${className}`}>
      <h4 className="font-medium text-gray-800">
        {replaceText(dict.admin.media.upload.uploadedFiles, {
          current: files.length,
          max: maxFiles,
        })}
      </h4>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {files.map(file => (
          <div
            key={file.id}
            className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white"
          >
            {/* Preview */}
            <div className="relative aspect-square bg-gray-100">
              {file.type === 'image' ? (
                <img
                  src={file.url}
                  alt={file.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-900">
                  <span className="text-4xl text-white">🎥</span>
                </div>
              )}

              {/* Loading overlay */}
              {uploadingFiles.has(file.id) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="text-xs text-white">
                    {dict.admin.media.upload.uploading}
                  </div>
                </div>
              )}
            </div>

            {/* File Info */}
            <div className="p-3">
              <p
                className="truncate text-sm font-medium text-gray-900"
                title={file.name}
              >
                {file.name}
              </p>
              <p className="text-xs text-gray-500">
                {dict.admin.media.upload.fileTypes[file.type]} •{' '}
                {formatFileSize(file.size, dict)}
              </p>
            </div>

            {/* Remove Button */}
            <button
              onClick={e => {
                e.stopPropagation();
                onRemoveFile(file.id);
              }}
              className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100"
              title={dict.admin.media.upload.removeFile}
            >
              <span className="text-sm">✕</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
