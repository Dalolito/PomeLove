import {
  Puppy,
  CreatePuppyData,
  UpdatePuppyData,
} from '@/domain/entities/Puppy';

export interface PuppyRepository {
  create(data: CreatePuppyData): Promise<Puppy>;
  findById(id: string): Promise<Puppy | null>;
  findAll(): Promise<Puppy[]>;
  findByCategory(categoryId: string): Promise<Puppy[]>;
  update(id: string, data: UpdatePuppyData): Promise<Puppy>;
  delete(id: string): Promise<void>;
}
