import {
  Puppy,
  CreatePuppyData,
  UpdatePuppyData,
} from '@/domain/entities/Puppy';
import { PuppyFilters } from '@/lib/types/filters';

export interface PuppyRepository {
  create(data: CreatePuppyData): Promise<Puppy>;
  findById(id: string): Promise<Puppy | null>;
  findAll(): Promise<Puppy[]>;
  findByCategory(categoryId: string): Promise<Puppy[]>;
  findFiltered(filters: PuppyFilters): Promise<Puppy[]>;
  update(id: string, data: UpdatePuppyData): Promise<Puppy>;
  delete(id: string): Promise<void>;
}
