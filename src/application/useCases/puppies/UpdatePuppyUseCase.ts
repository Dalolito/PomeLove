import { PuppyRepository } from '@/domain/repositories/PuppyRepository';
import { UpdatePuppyData, Puppy } from '@/domain/entities/Puppy';

export interface UpdatePuppyRequest extends UpdatePuppyData {
  id: string;
}

export class UpdatePuppyUseCase {
  constructor(private puppyRepository: PuppyRepository) {}

  async execute(request: UpdatePuppyRequest): Promise<Puppy> {
    const existingPuppy = await this.puppyRepository.findById(request.id);
    if (!existingPuppy) {
      throw new Error('Puppy not found');
    }

    const { id, ...updateData } = request;
    const updatedPuppy = await this.puppyRepository.update(id, updateData);

    return updatedPuppy;
  }
}
