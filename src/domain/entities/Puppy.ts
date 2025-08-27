import { MediaFile } from '@/application/useCases/utils/MediaUploadUseCase';
import { Category } from './Category';

/**
 * @interface Puppy
 * @property {string} [id] - Primary key identifier (auto-generated)
 * @property {string} name - Name of the puppy (required)
 * @property {string} description_es - Spanish description of the puppy
 * @property {string} description_en - English description of the puppy
 * @property {number} ageYears - Age in years (required)
 * @property {number} ageMonths - Age in months (required)
 * @property {string} gender - Gender of the puppy: 'male' or 'female' (required)
 * @property {MediaFile[]} media - Array of media files (images/videos) of the puppy
 * @property {string | null} fatherImage - URL/path to the father's image (optional)
 * @property {string | null} motherImage - URL/path to the mother's image (optional)
 * @property {boolean} available - Availability status of the puppy (default: true)
 * @property {Category} category - Associated category/breed information
 * @property {Date} [createdAt] - Record creation timestamp (auto-generated)
 * @property {Date} [updatedAt] - Record last update timestamp (auto-generated)
 */
export interface Puppy {
  id?: string;
  name: string;
  description_es: string;
  description_en: string;
  ageYears: number;
  ageMonths: number;
  gender: 'male' | 'female';
  media: MediaFile[];
  fatherImage: string | null;
  motherImage: string | null;
  available: boolean;
  category: Category;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreatePuppyData {
  name: string;
  description_es: string;
  description_en: string;
  ageYears: number;
  ageMonths: number;
  gender: 'male' | 'female';
  categoryId: number;
  media: MediaFile[];
  fatherImage: string | null;
  motherImage: string | null;
  available?: boolean;
}

export interface UpdatePuppyData {
  name?: string;
  description_es?: string;
  description_en?: string;
  ageYears?: number;
  ageMonths?: number;
  gender?: 'male' | 'female';
  categoryId?: number;
  media?: MediaFile[];
  fatherImage?: string | null;
  motherImage?: string | null;
  available?: boolean;
}
