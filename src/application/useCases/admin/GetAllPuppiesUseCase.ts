import { PuppyRepository } from '@/domain/repositories/PuppyRepository';
import { Puppy } from '@/domain/entities/Puppy';

export interface GetAllPuppiesResult {
  success: boolean;
  puppies?: Puppy[];
  error?: string;
}

export class GetAllPuppiesUseCase {
  constructor(private puppyRepository: PuppyRepository) {}

  async execute(): Promise<GetAllPuppiesResult> {
    try {
      const puppies = await this.puppyRepository.findAll();
      
      return {
        success: true,
        puppies,
      };
    } catch (error) {
      console.error('Error getting all puppies:', error);
      
      return {
        success: false,
        error: 'Failed to fetch puppies',
      };
    }
  }
}
