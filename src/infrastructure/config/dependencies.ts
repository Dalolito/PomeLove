import { CategoryRepository } from '@/domain/repositories/CategoryRepository';
import { PuppyRepository } from '@/domain/repositories/PuppyRepository';
import { CategoryRepository as CategoryRepositoryImpl } from '@/infrastructure/repositories/CategoryRepository';
import { PuppyRepository as PuppyRepositoryImpl } from '@/infrastructure/repositories/PuppyRepository';
import { CreatePuppyUseCase } from '@/application/useCases/admin/CreatePuppyUseCase';

// Repository instances
export const categoryRepository: CategoryRepository = new CategoryRepositoryImpl();
export const puppyRepository: PuppyRepository = new PuppyRepositoryImpl();

// Use Case instances
export const createPuppyUseCase = new CreatePuppyUseCase(puppyRepository);
