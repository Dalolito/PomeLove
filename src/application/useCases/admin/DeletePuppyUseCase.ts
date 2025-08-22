import { PuppyRepository } from '@/domain/repositories/PuppyRepository';

export interface DeletePuppyRequest {
  id: string;
}

export class DeletePuppyUseCase {
  constructor(private puppyRepository: PuppyRepository) {}

  async execute(request: DeletePuppyRequest): Promise<void> {
    const existingPuppy = await this.puppyRepository.findById(request.id);
    if (!existingPuppy) {
      throw new Error('Puppy not found');
    }

    await this.puppyRepository.delete(request.id);
  }
}
