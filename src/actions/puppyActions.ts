'use server';

import { createPuppyUseCase, getAllPuppiesUseCase } from '@/infrastructure/config/dependencies';
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

export async function getAllPuppiesAction() {
  try {
    const result = await getAllPuppiesUseCase.execute();
    return result;
  } catch (error) {
    console.error('Error getting all puppies:', error);
    return { success: false, error: 'GET_PUPPIES_FAILED' };
  }
}
