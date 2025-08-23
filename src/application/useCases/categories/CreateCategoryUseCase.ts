import { CategoryRepository } from '@/domain/repositories/CategoryRepository';
import { CreateCategoryData, Category } from '@/domain/entities/Category';

export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(request: CreateCategoryData): Promise<Category> {
    const category = await this.categoryRepository.create(request);
    return category;
  }
}
