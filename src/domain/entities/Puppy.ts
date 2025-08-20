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
  category: Category;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * CREATE PUPPY DATA TRANSFER OBJECT
 * 
 * Data structure used for creating new puppies. Contains only the required fields
 * without auto-generated properties like id, createdAt, updatedAt.
 * 
 * @interface CreatePuppyData
 * @property {string} name - Name of the puppy (required)
 * @property {string} description - Detailed description of the puppy (required)
 * @property {string} birthDate - Date when the puppy was born in ISO string format (required)
 * @property {string} categoryId - ID of the associated category/breed (required)
 * @property {MediaFile[]} media - Array of media files to upload (required)
 * @property {string | null} fatherImage - URL/path to the father's image (optional)
 * @property {string | null} motherImage - URL/path to the mother's image (optional)
 * 
 * @example
 * ```typescript
 * const createData: CreatePuppyData = {
 *   name: "Max",
 *   description: "Beautiful golden retriever puppy",
 *   birthDate: "2024-01-15",
 *   categoryId: "1",
 *   media: [...],
 *   fatherImage: "/uploads/father.jpg",
 *   motherImage: "/uploads/mother.jpg"
 * };
 * ```
 */
export interface CreatePuppyData {
  name: string;
  description: string;
  birthDate: string;
  categoryId: string;
  media: MediaFile[];
  fatherImage: string | null;
  motherImage: string | null;
}

/**
 * UPDATE PUPPY DATA TRANSFER OBJECT
 * 
 * Data structure used for updating existing puppies. All fields are optional
 * to allow partial updates.
 * 
 * @interface UpdatePuppyData
 * @property {string} [name] - New name for the puppy (optional)
 * @property {string} [description] - New description for the puppy (optional)
 * @property {string} [birthDate] - New birth date in ISO string format (optional)
 * @property {string} [categoryId] - New category/breed ID (optional)
 * @property {MediaFile[]} [media] - New array of media files (optional)
 * @property {string | null} [fatherImage] - New father's image URL (optional)
 * @property {string | null} [motherImage] - New mother's image URL (optional)
 * 
 * @example
 * ```typescript
 * const updateData: UpdatePuppyData = {
 *   name: "Max Updated",
 *   description: "Updated description"
 *   // Only update the fields you want to change
 * };
 * ```
 */
export interface UpdatePuppyData {
  name?: string;
  description?: string;
  birthDate?: string;
  categoryId?: string;
  media?: MediaFile[];
  fatherImage?: string | null;
  motherImage?: string | null;
}
