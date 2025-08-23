import { CategoryRepository } from '@/domain/repositories/CategoryRepository';
import { Category } from '@/domain/entities/Category';
import { CategoryFilters } from '@/lib/types/filters';

export interface GetFilteredCategoriesResult {
  success: boolean;
  categories?: Category[];
  error?: string;
}

export class GetFilteredCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(
    filters: CategoryFilters
  ): Promise<GetFilteredCategoriesResult> {
    try {
      const categories = await this.categoryRepository.findFiltered(filters);

      return {
        success: true,
        categories,
      };
    } catch (error) {
      console.error('Error getting filtered categories:', error);

      return {
        success: false,
        error: 'Failed to fetch filtered categories',
      };
    }
  }
}
