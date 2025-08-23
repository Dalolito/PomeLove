import { PuppyRepository } from '@/domain/repositories/PuppyRepository';
import { Puppy } from '@/domain/entities/Puppy';

export interface GetPuppyDetailResult {
  success: boolean;
  puppy?: Puppy;
  error?: string;
}

export class GetPuppyDetailUseCase {
  constructor(private puppyRepository: PuppyRepository) {}

  async execute(id: string): Promise<GetPuppyDetailResult> {
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
      console.error('Error getting puppy detail:', error);
      return {
        success: false,
        error: 'Failed to fetch puppy details',
      };
    }
  }
}
