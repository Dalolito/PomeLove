import { CategoryRepository } from '@/domain/repositories/CategoryRepository';
import { Category } from '@/domain/entities/Category';

export class GetAllCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll();
    return categories;
  }
}
