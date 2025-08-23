import {
  Category,
  CreateCategoryData,
  UpdateCategoryData,
} from '@/domain/entities/Category';
import { CategoryFilters } from '@/lib/types/filters';

export interface CategoryRepository {
  create(data: CreateCategoryData): Promise<Category>;
  findById(id: string): Promise<Category | null>;
  findByIdWithPuppies(
    id: string
  ): Promise<{ category: Category; puppiesCount: number } | null>;
  findAll(): Promise<Category[]>;
  findFiltered(filters: CategoryFilters): Promise<Category[]>;
  update(id: string, data: UpdateCategoryData): Promise<Category>;
  delete(id: string): Promise<void>;
}
