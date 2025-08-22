import { CategoryRepository } from '@/domain/repositories/CategoryRepository';
import { PuppyRepository } from '@/domain/repositories/PuppyRepository';
import { CategoryRepository as CategoryRepositoryImpl } from '@/infrastructure/repositories/CategoryRepository';
import { PuppyRepository as PuppyRepositoryImpl } from '@/infrastructure/repositories/PuppyRepository';
import { CreatePuppyUseCase } from '@/application/useCases/admin/CreatePuppyUseCase';
import { GetAllPuppiesUseCase } from '@/application/useCases/admin/GetAllPuppiesUseCase';
import { GetPuppyByIdUseCase } from '@/application/useCases/admin/GetPuppyByIdUseCase';
import { UpdatePuppyUseCase } from '@/application/useCases/admin/UpdatePuppyUseCase';
import { DeletePuppyUseCase } from '@/application/useCases/admin/DeletePuppyUseCase';

export const categoryRepository: CategoryRepository =
  new CategoryRepositoryImpl();
export const puppyRepository: PuppyRepository = new PuppyRepositoryImpl();

export const createPuppyUseCase = new CreatePuppyUseCase(puppyRepository);
export const getAllPuppiesUseCase = new GetAllPuppiesUseCase(puppyRepository);
export const getPuppyByIdUseCase = new GetPuppyByIdUseCase(puppyRepository);
export const updatePuppyUseCase = new UpdatePuppyUseCase(puppyRepository);
export const deletePuppyUseCase = new DeletePuppyUseCase(puppyRepository);