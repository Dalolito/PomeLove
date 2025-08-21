import { MediaFile } from '@/application/useCases/admin/MediaUploadUseCase';

export interface FormData {
  name: string;
  description: string;
  birthDate: string;
  categoryId: string;
  media: MediaFile[];
  fatherImage: MediaFile | null;
  motherImage: MediaFile | null;
}

export interface BasicInfoData {
  name: string;
  description: string;
  birthDate: string;
  categoryId: string;
}

export interface ParentsData {
  fatherImage: MediaFile | null;
  motherImage: MediaFile | null;
}

export interface FormCategory {
  id: string;
  name: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface FormSubmissionResult {
  success: boolean;
  data?: unknown;
  error?: string;
}
