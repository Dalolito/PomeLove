import { MediaFile } from '@/application/useCases/utils/MediaUploadUseCase';

export interface FormData {
  name: string;
  description: string;
  ageYears: number;
  ageMonths: number;
  categoryId: string;
  media: MediaFile[];
  fatherImage: MediaFile | null;
  motherImage: MediaFile | null;
}

export interface BasicInfoData {
  name: string;
  description: string;
  ageYears: number;
  ageMonths: number;
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
