'use server';

import {
  createPuppyUseCase,
  getAllPuppiesUseCase,
  getPuppyByIdUseCase,
  updatePuppyUseCase,
  deletePuppyUseCase,
} from '@/infrastructure/config/dependencies';
import { CreatePuppyData, UpdatePuppyData } from '@/domain/entities/Puppy';
import { revalidatePath } from 'next/cache';

export async function createPuppyAction(data: CreatePuppyData) {
  try {
    const uploadedMedia = data.media.filter(file => file.isUploaded);
    const puppyData = { ...data, media: uploadedMedia };

    const puppy = await createPuppyUseCase.execute(puppyData);

    // Revalidar las páginas afectadas
    revalidatePath('/[locale]/admin/puppys', 'page');

    return { success: true, data: puppy };
  } catch (error) {
    console.error('Error creating puppy:', error);
    return { success: false, error: 'CREATE_PUPPY_FAILED' };
  }
}

export async function updatePuppyAction(id: string, data: UpdatePuppyData) {
  try {
    let processedData = { ...data };

    // Procesar media si existe
    if (data.media) {
      const uploadedMedia = data.media.filter(file => file.isUploaded);
      processedData = { ...processedData, media: uploadedMedia };
    }

    const puppy = await updatePuppyUseCase.execute({
      id,
      ...processedData,
    });

    // Revalidar las páginas afectadas
    revalidatePath('/[locale]/admin/puppys', 'page');
    revalidatePath(`/[locale]/admin/puppys/${id}`, 'page');
    revalidatePath(`/[locale]/admin/puppys/${id}/edit`, 'page');

    return { success: true, data: puppy };
  } catch (error) {
    console.error('Error updating puppy:', error);
    return { success: false, error: 'UPDATE_PUPPY_FAILED' };
  }
}

export async function getPuppyByIdAction(id: string) {
  try {
    const result = await getPuppyByIdUseCase.execute(id);
    return result;
  } catch (error) {
    console.error('Error getting puppy by ID:', error);
    return { success: false, error: 'GET_PUPPY_FAILED' };
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

export async function deletePuppyAction(id: string) {
  try {
    await deletePuppyUseCase.execute({ id });

    revalidatePath('/[locale]/admin/puppys', 'page');

    return { success: true };
  } catch (error) {
    console.error('Error deleting puppy:', error);
    return { success: false, error: 'DELETE_PUPPY_FAILED' };
  }
}
