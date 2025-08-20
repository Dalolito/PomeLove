'use server';

import { createPuppyUseCase } from '@/infrastructure/config/dependencies';
import { CreatePuppyData } from '@/domain/entities/Puppy';

export async function createPuppyAction(data: CreatePuppyData) {
  try {
    const uploadedMedia = data.media.filter(file => file.isUploaded);
    const puppyData = { ...data, media: uploadedMedia };
    
    const puppy = await createPuppyUseCase.execute(puppyData);
    return { success: true, data: puppy };
  } catch (error) {
    console.error('Error creating puppy:', error);
    return { success: false, error: 'CREATE_PUPPY_FAILED' };
  }
}
