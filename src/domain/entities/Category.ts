/**
 * @interface Category
 * @property {string} id - Primary key identifier
 * @property {string} name - Name of the category/breed (required)
 * @property {number} minPrice - Minimum price for this category (required)
 */
export interface Category {
  id: string;
  name: string;
  minPrice: number;
}

export interface CreateCategoryData {
  name: string;
  minPrice: number;
}

export interface UpdateCategoryData {
  name?: string;
  minPrice?: number;
}
