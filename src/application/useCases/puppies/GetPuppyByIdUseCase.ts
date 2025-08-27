import { PuppyRepository } from '@/domain/repositories/PuppyRepository';
import { Puppy } from '@/domain/entities/Puppy';

export interface GetPuppyByIdResult {
  success: boolean;
  puppy?: Puppy;
  error?: string;
}

export class GetPuppyByIdUseCase {
  constructor(private puppyRepository: PuppyRepository) {}

  async execute(id: string): Promise<GetPuppyByIdResult> {
    try {
      const puppy = await this.puppyRepository.findById(id);

      if (!puppy) {
        return {
          success: false,
          error: 'Puppy not found',
        };
      }

      return {
        success: true,
        puppy,
      };
    } catch (error) {
      console.error('Error getting puppy by ID:', error);

      return {
        success: false,
        error: 'Failed to fetch puppy',
      };
    }
  }
}
