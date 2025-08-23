import { PuppyRepository } from '@/domain/repositories/PuppyRepository';
import { Puppy } from '@/domain/entities/Puppy';
import { PuppyFilters } from '@/lib/types/filters';

export interface GetFilteredPuppiesResult {
  success: boolean;
  puppies?: Puppy[];
  error?: string;
}

export class GetFilteredPuppiesUseCase {
  constructor(private puppyRepository: PuppyRepository) {}

  async execute(filters: PuppyFilters): Promise<GetFilteredPuppiesResult> {
    try {
      const puppies = await this.puppyRepository.findFiltered(filters);

      return {
        success: true,
        puppies,
      };
    } catch (error) {
      console.error('Error getting filtered puppies:', error);

      return {
        success: false,
        error: 'Failed to fetch filtered puppies',
      };
    }
  }
}
