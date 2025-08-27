'use server';

import {
  createPuppyUseCase,
  getAllPuppiesUseCase,
  getPuppyByIdUseCase,
  updatePuppyUseCase,
  deletePuppyUseCase,
  getFilteredPuppiesUseCase,
  getPuppyDetailUseCase,
} from '@/infrastructure/config/dependencies';
import { CreatePuppyData, UpdatePuppyData } from '@/domain/entities/Puppy';
import { PuppyFilters } from '@/lib/types/filters';
import { revalidatePath } from 'next/cache';

export async function createPuppyAction(data: CreatePuppyData) {
  try {
    if (data.description_es && data.description_es.length > 1000) {
      return { success: false, error: 'DESCRIPTION_ES_TOO_LONG' };
    }
    if (data.description_en && data.description_en.length > 1000) {
      return { success: false, error: 'DESCRIPTION_EN_TOO_LONG' };
    }

    const uploadedMedia = data.media.filter(file => file.isUploaded);
    const puppyData = { ...data, media: uploadedMedia };

    const puppy = await createPuppyUseCase.execute(puppyData);

    revalidatePath('/[locale]/admin/puppys', 'page');

    return { success: true, data: puppy };
  } catch (error) {
    console.error('Error creating puppy:', error);
    return { success: false, error: 'CREATE_PUPPY_FAILED' };
  }
}

export async function updatePuppyAction(id: string, data: UpdatePuppyData) {
  try {
    if (data.description_es && data.description_es.length > 1000) {
      return { success: false, error: 'DESCRIPTION_ES_TOO_LONG' };
    }
    if (data.description_en && data.description_en.length > 1000) {
      return { success: false, error: 'DESCRIPTION_EN_TOO_LONG' };
    }

    let processedData = { ...data };

    if (data.media) {
      const uploadedMedia = data.media.filter(file => file.isUploaded);
      processedData = { ...processedData, media: uploadedMedia };
    }

    const puppy = await updatePuppyUseCase.execute({
      id,
      ...processedData,
    });

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

export async function getFilteredPuppiesAction(filters: PuppyFilters) {
  try {
    const result = await getFilteredPuppiesUseCase.execute(filters);
    return result;
  } catch (error) {
    console.error('Error getting filtered puppies:', error);
    return { success: false, error: 'GET_FILTERED_PUPPIES_FAILED' };
  }
}

export async function getPuppyDetailAction(id: string) {
  try {
    const result = await getPuppyDetailUseCase.execute(id);
    return result;
  } catch (error) {
    console.error('Error getting puppy detail:', error);
    return { success: false, error: 'GET_PUPPY_DETAIL_FAILED' };
  }
}
