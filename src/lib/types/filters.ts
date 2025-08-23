export interface PuppyFilters {
  categoryId?: string;
  gender?: 'male' | 'female' | 'all';
  available?: boolean | 'all';
  search?: string;
}

export interface CategoryFilters {
  search?: string;
  sortBy?: 'name' | 'minPrice';
  sortOrder?: 'asc' | 'desc';
}

export interface FilterState {
  filters: PuppyFilters;
  isLoading: boolean;
  hasActiveFilters: boolean;
}

export interface CategoryFilterState {
  filters: CategoryFilters;
  isLoading: boolean;
  hasActiveFilters: boolean;
}

import { Category } from '@/domain/entities/Category';

export interface FilterOption {
  value: string;
  label: string;
}

export interface CatalogFilters {
  categoryId?: string;
  gender?: 'male' | 'female' | 'all';
  available?: boolean | 'all';
}

export interface CatalogFilterState {
  filters: CatalogFilters;
  selectedCategory: Category | null;
  isLoading: boolean;
  hasActiveFilters: boolean;
}
