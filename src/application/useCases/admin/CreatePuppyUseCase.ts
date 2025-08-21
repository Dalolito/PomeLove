import { PuppyRepository } from '@/domain/repositories/PuppyRepository';
import { CreatePuppyData, Puppy } from '@/domain/entities/Puppy';

export class CreatePuppyUseCase {
  constructor(private puppyRepository: PuppyRepository) {}

  async execute(request: CreatePuppyData): Promise<Puppy> {
    const puppy = await this.puppyRepository.create(request);

    return puppy;
  }
}
