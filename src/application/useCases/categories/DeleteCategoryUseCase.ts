import { CategoryRepository } from '@/domain/repositories/CategoryRepository';

export interface DeleteCategoryRequest {
  id: string;
}

export class DeleteCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(request: DeleteCategoryRequest): Promise<void> {
    const existingCategory = await this.categoryRepository.findById(request.id);
    if (!existingCategory) {
      throw new Error('Category not found');
    }

    await this.categoryRepository.delete(request.id);
  }
}
