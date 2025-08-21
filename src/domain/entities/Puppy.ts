import { MediaFile } from '@/application/useCases/admin/MediaUploadUseCase';
import { Category } from './Category';

/**
 * @interface Puppy
 * @property {string} [id] - Primary key identifier (auto-generated)
 * @property {string} name - Name of the puppy (required)
 * @property {string} description - Detailed description of the puppy (required)
 * @property {Date} birthDate - Date when the puppy was born (required)
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
  description: string;
  birthDate: Date;
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
  description: string;
  birthDate: string;
  categoryId: string;
  media: MediaFile[];
  fatherImage: string | null;
  motherImage: string | null;
  available?: boolean;
}

export interface UpdatePuppyData {
  name?: string;
  description?: string;
  birthDate?: string;
  categoryId?: string;
  media?: MediaFile[];
  fatherImage?: string | null;
  motherImage?: string | null;
  available?: boolean;
}
