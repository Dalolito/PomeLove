import { CategoryRepository } from '@/domain/repositories/CategoryRepository';
import { UpdateCategoryData, Category } from '@/domain/entities/Category';

export interface UpdateCategoryRequest extends UpdateCategoryData {
  id: string;
}

export class UpdateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(request: UpdateCategoryRequest): Promise<Category> {
    const existingCategory = await this.categoryRepository.findById(request.id);
    if (!existingCategory) {
      throw new Error('Category not found');
    }

    const { id, ...updateData } = request;
    const updatedCategory = await this.categoryRepository.update(
      id,
      updateData
    );

    return updatedCategory;
  }
}
