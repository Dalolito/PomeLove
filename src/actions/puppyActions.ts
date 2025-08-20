'use server';

import { createPuppyUseCase } from '@/infrastructure/config/dependencies';
import { CreatePuppyData } from '@/domain/entities/Puppy';

export async function createPuppyAction(data: CreatePuppyData) {
  try {
    const puppy = await createPuppyUseCase.execute(data);
    
    return { 
      success: true, 
      data: puppy 
    };
  } catch (error) {
    console.error('Error creating puppy:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}
