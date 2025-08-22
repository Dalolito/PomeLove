import { CategoryRepository } from '@/domain/repositories/CategoryRepository';
import { Category } from '@/domain/entities/Category';

export interface GetCategoryByIdResult {
  success: boolean;
  category?: Category;
  error?: string;
}

export class GetCategoryByIdUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(id: string): Promise<GetCategoryByIdResult> {
    try {
      const category = await this.categoryRepository.findById(id);
      
      if (!category) {
        return {
          success: false,
          error: 'Category not found',
        };
      }

      return {
        success: true,
        category,
      };
    } catch (error) {
      console.error('Error getting category by ID:', error);
      
      return {
        success: false,
        error: 'Failed to fetch category',
      };
    }
  }
}
