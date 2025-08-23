'use server';

import {
  categoryRepository,
  getCategoryByIdUseCase,
  getCategoryWithPuppiesUseCase,
  getAllCategoriesUseCase,
  createCategoryUseCase,
  updateCategoryUseCase,
  deleteCategoryUseCase,
  getFilteredCategoriesUseCase,
} from '@/infrastructure/config/dependencies';
import {
  CreateCategoryData,
  UpdateCategoryData,
} from '@/domain/entities/Category';
import { CategoryFilters } from '@/lib/types/filters';
import { revalidatePath } from 'next/cache';

export async function getAllCategoriesAction() {
  try {
    const categories = await getAllCategoriesUseCase.execute();
    return { success: true, data: categories };
  } catch (error) {
    console.error('Error getting all categories:', error);
    return { success: false, error: 'GET_CATEGORIES_FAILED' };
  }
}

export async function getFilteredCategoriesAction(filters: CategoryFilters) {
  try {
    const result = await getFilteredCategoriesUseCase.execute(filters);
    return result;
  } catch (error) {
    console.error('Error getting filtered categories:', error);
    return { success: false, error: 'GET_FILTERED_CATEGORIES_FAILED' };
  }
}

export async function getCategoryByIdAction(id: string) {
  try {
    const result = await getCategoryByIdUseCase.execute(id);
    return result;
  } catch (error) {
    console.error('Error getting category by ID:', error);
    return { success: false, error: 'GET_CATEGORY_FAILED' };
  }
}

export async function getCategoryWithPuppiesAction(id: string) {
  try {
    const result = await getCategoryWithPuppiesUseCase.execute(id);
    return result;
  } catch (error) {
    console.error('Error getting category with puppies:', error);
    return { success: false, error: 'GET_CATEGORY_WITH_PUPPIES_FAILED' };
  }
}

export async function createCategoryAction(data: CreateCategoryData) {
  try {
    const category = await createCategoryUseCase.execute(data);

    revalidatePath('/[locale]/admin/categories', 'page');

    return { success: true, data: category };
  } catch (error) {
    console.error('Error creating category:', error);
    return { success: false, error: 'CREATE_CATEGORY_FAILED' };
  }
}

export async function updateCategoryAction(
  id: string,
  data: UpdateCategoryData
) {
  try {
    const category = await updateCategoryUseCase.execute({
      id,
      ...data,
    });

    revalidatePath('/[locale]/admin/categories', 'page');
    revalidatePath(`/[locale]/admin/categories/${id}/edit`, 'page');

    return { success: true, data: category };
  } catch (error) {
    console.error('Error updating category:', error);
    return { success: false, error: 'UPDATE_CATEGORY_FAILED' };
  }
}

export async function deleteCategoryAction(id: string) {
  try {
    await deleteCategoryUseCase.execute({ id });

    revalidatePath('/[locale]/admin/categories', 'page');

    return { success: true };
  } catch (error) {
    console.error('Error deleting category:', error);
    return { success: false, error: 'DELETE_CATEGORY_FAILED' };
  }
}
