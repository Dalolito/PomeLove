/**
 * @interface Category
 * @property {string} id - Primary key identifier
 * @property {string} name - Name of the category/breed (required)
 * @property {number} minPriceCOP - Minimum price in COP for this category (required)
 * @property {number} minPriceUSD - Minimum price in USD for this category (required)
 */
export interface Category {
  id: string;
  name: string;
  minPriceCOP: number;
  minPriceUSD: number;
}

export interface CreateCategoryData {
  name: string;
  minPriceCOP: number;
  minPriceUSD: number;
}

export interface UpdateCategoryData {
  name?: string;
  minPriceCOP?: number;
  minPriceUSD?: number;
}
