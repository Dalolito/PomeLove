/**
 * @interface Category
 * @property {string} id - Primary key identifier
 * @property {string} name - Name of the category/breed (required)
 * @property {string} [description] - Optional description of the category
 * @property {Date} [createdAt] - Record creation timestamp (auto-generated)
 * @property {Date} [updatedAt] - Record last update timestamp (auto-generated)
 */

export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateCategoryData {
  name: string;
  description?: string;
}

export interface UpdateCategoryData {
  name?: string;
  description?: string;
}
