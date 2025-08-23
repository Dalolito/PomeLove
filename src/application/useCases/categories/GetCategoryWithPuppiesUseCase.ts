import { CategoryRepository } from '@/domain/repositories/CategoryRepository';
import { Category } from '@/domain/entities/Category';

export interface GetCategoryWithPuppiesResult {
  success: boolean;
  category?: Category;
  puppiesCount?: number;
  error?: string;
}

export class GetCategoryWithPuppiesUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(id: string): Promise<GetCategoryWithPuppiesResult> {
    try {
      const result = await this.categoryRepository.findByIdWithPuppies(id);

      if (!result) {
        return {
          success: false,
          error: 'Category not found',
        };
      }

      return {
        success: true,
        category: result.category,
        puppiesCount: result.puppiesCount,
      };
    } catch (error) {
      console.error('Error getting category with puppies:', error);

      return {
        success: false,
        error: 'Failed to fetch category information',
      };
    }
  }
}
