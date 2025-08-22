import { CategoryRepository } from '@/domain/repositories/CategoryRepository';
import { PuppyRepository } from '@/domain/repositories/PuppyRepository';
import { CategoryRepository as CategoryRepositoryImpl } from '@/infrastructure/repositories/CategoryRepository';
import { PuppyRepository as PuppyRepositoryImpl } from '@/infrastructure/repositories/PuppyRepository';
import { CreatePuppyUseCase } from '@/application/useCases/puppies/CreatePuppyUseCase';
import { GetAllPuppiesUseCase } from '@/application/useCases/puppies/GetAllPuppiesUseCase';
import { GetPuppyByIdUseCase } from '@/application/useCases/puppies/GetPuppyByIdUseCase';
import { UpdatePuppyUseCase } from '@/application/useCases/puppies/UpdatePuppyUseCase';
import { DeletePuppyUseCase } from '@/application/useCases/puppies/DeletePuppyUseCase';
import { GetCategoryByIdUseCase } from '@/application/useCases/categories/GetCategoryByIdUseCase';
import { GetCategoryWithPuppiesUseCase } from '@/application/useCases/categories/GetCategoryWithPuppiesUseCase';
import { GetAllCategoriesUseCase } from '@/application/useCases/categories/GetAllCategoriesUseCase';
import { CreateCategoryUseCase } from '@/application/useCases/categories/CreateCategoryUseCase';
import { UpdateCategoryUseCase } from '@/application/useCases/categories/UpdateCategoryUseCase';
import { DeleteCategoryUseCase } from '@/application/useCases/categories/DeleteCategoryUseCase';

export const categoryRepository: CategoryRepository =
  new CategoryRepositoryImpl();
export const puppyRepository: PuppyRepository = new PuppyRepositoryImpl();

export const createPuppyUseCase = new CreatePuppyUseCase(puppyRepository);
export const getAllPuppiesUseCase = new GetAllPuppiesUseCase(puppyRepository);
export const getPuppyByIdUseCase = new GetPuppyByIdUseCase(puppyRepository);
export const updatePuppyUseCase = new UpdatePuppyUseCase(puppyRepository);
export const deletePuppyUseCase = new DeletePuppyUseCase(puppyRepository);

export const getCategoryByIdUseCase = new GetCategoryByIdUseCase(categoryRepository);
export const getCategoryWithPuppiesUseCase = new GetCategoryWithPuppiesUseCase(categoryRepository);
export const getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoryRepository);
export const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
export const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);
export const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);
