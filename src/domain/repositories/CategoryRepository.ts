import {
  Category,
  CreateCategoryData,
  UpdateCategoryData,
} from '@/domain/entities/Category';

export interface CategoryRepository {
  create(data: CreateCategoryData): Promise<Category>;
  findById(id: string): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  update(id: string, data: UpdateCategoryData): Promise<Category>;
  delete(id: string): Promise<void>;
}
