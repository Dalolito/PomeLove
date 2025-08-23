export interface MediaFile {
  id: string;
  file?: File;
  url: string;
  type: 'image' | 'video';
  name: string;
  size: number;
  isUploaded?: boolean;
}

type UploadConfig = {
  maxFiles: number;
  maxFileSize: number;
  acceptedTypes: string[];
};

type ValidationResult = {
  isValid: boolean;
  error?: string;
};

type ProcessResult = {
  files: MediaFile[];
  errors: string[];
};

export class MediaUploadUseCase {
  validateFile(file: File, config: UploadConfig): ValidationResult {
    // Check file size
    if (file.size > config.maxFileSize * 1024 * 1024) {
      return {
        isValid: false,
        error: `File size must be less than ${config.maxFileSize}MB`,
      };
    }

    // Check file type
    const isValidType = config.acceptedTypes.some(type => {
      if (type === 'image/*') return file.type.startsWith('image/');
      if (type === 'video/*') return file.type.startsWith('video/');
      return file.type === type;
    });

    if (!isValidType) {
      return {
        isValid: false,
        error: 'File type not supported',
      };
    }

    return { isValid: true };
  }

  processFiles(
    fileList: FileList | File[],
    currentFiles: MediaFile[],
    config: UploadConfig
  ): ProcessResult {
    const newFiles: MediaFile[] = [];
    const errors: string[] = [];

    Array.from(fileList).forEach(file => {
      // Check max files limit
      if (currentFiles.length + newFiles.length >= config.maxFiles) {
        errors.push(`Maximum ${config.maxFiles} files allowed`);
        return;
      }

      // Validate file
      const validation = this.validateFile(file, config);
      if (!validation.isValid) {
        errors.push(`${file.name}: ${validation.error}`);
        return;
      }

      // Create media file
      const mediaFile = this.createMediaFile(file);
      newFiles.push(mediaFile);
    });

    return {
      files: [...currentFiles, ...newFiles],
      errors,
    };
  }

  createMediaFile(file: File): MediaFile {
    return {
      id: this.generateId(),
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'video',
      name: file.name,
      size: file.size,
    };
  }

  removeFile(fileId: string, files: MediaFile[]): MediaFile[] {
    return files.filter(file => {
      if (file.id === fileId) {
        URL.revokeObjectURL(file.url);
        return false;
      }
      return true;
    });
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
