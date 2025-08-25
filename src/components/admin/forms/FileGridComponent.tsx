'use client';

import { MediaFile } from '@/application/useCases/utils/MediaUploadUseCase';
import { replaceText, formatFileSize } from '@/lib/utils/textUtils';
import PuppyImageComponent from '@/components/ui/PuppyImageComponent';
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
            <div className="relative aspect-square bg-gray-100">
              {file.type === 'image' ? (
                <PuppyImageComponent
                  src={file.url}
                  alt={file.name}
                  className="h-full w-full"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-900">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                </div>
              )}

              {uploadingFiles.has(file.id) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="text-xs text-white">
                    {dict.admin.media.upload.uploading}
                  </div>
                </div>
              )}
            </div>

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
