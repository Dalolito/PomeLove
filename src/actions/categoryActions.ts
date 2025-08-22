'use server';

import { categoryRepository } from '@/infrastructure/config/dependencies';

export async function getAllCategoriesAction() {
  try {
    const categories = await categoryRepository.findAll();
    return { success: true, data: categories };
  } catch (error) {
    console.error('Error getting all categories:', error);
    return { success: false, error: 'GET_CATEGORIES_FAILED' };
  }
}
