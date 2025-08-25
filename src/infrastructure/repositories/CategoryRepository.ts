import { prisma } from '@/lib/databaseConnection';
import { CategoryRepository as ICategoryRepository } from '@/domain/repositories/CategoryRepository';
import {
  Category,
  CreateCategoryData,
  UpdateCategoryData,
} from '@/domain/entities/Category';
import { CategoryFilters } from '@/lib/types/filters';

export class CategoryRepository implements ICategoryRepository {
  async create(data: CreateCategoryData): Promise<Category> {
    const category = await prisma.category.create({
      data: {
        name: data.name,
        minPriceCOP: data.minPriceCOP,
        minPriceUSD: data.minPriceUSD,
      },
    });

    return {
      id: category.id.toString(),
      name: category.name,
      minPriceCOP: category.minPriceCOP,
      minPriceUSD: category.minPriceUSD,
    };
  }

  async findById(id: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    if (!category) return null;

    return {
      id: category.id.toString(),
      name: category.name,
      minPriceCOP: category.minPriceCOP,
      minPriceUSD: category.minPriceUSD,
    };
  }

  async findAll(): Promise<Category[]> {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });

    return categories.map(category => ({
      id: category.id.toString(),
      name: category.name,
      minPriceCOP: category.minPriceCOP,
      minPriceUSD: category.minPriceUSD,
    }));
  }

  async findFiltered(filters: CategoryFilters): Promise<Category[]> {
    const whereClause: any = {};
    const orderByClause: any = {};

    if (filters.search) {
      whereClause.name = {
        contains: filters.search,
      };
    }

    if (filters.sortBy) {
      orderByClause[filters.sortBy] = filters.sortOrder || 'asc';
    } else {
      orderByClause.name = 'asc';
    }

    const categories = await prisma.category.findMany({
      where: whereClause,
      orderBy: orderByClause,
    });

    return categories.map(category => ({
      id: category.id.toString(),
      name: category.name,
      minPriceCOP: category.minPriceCOP,
      minPriceUSD: category.minPriceUSD,
    }));
  }

  async update(id: string, data: UpdateCategoryData): Promise<Category> {
    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.minPriceCOP !== undefined)
      updateData.minPriceCOP = data.minPriceCOP;
    if (data.minPriceUSD !== undefined)
      updateData.minPriceUSD = data.minPriceUSD;

    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    return {
      id: category.id.toString(),
      name: category.name,
      minPriceCOP: category.minPriceCOP,
      minPriceUSD: category.minPriceUSD,
    };
  }

  async findByIdWithPuppies(
    id: string
  ): Promise<{ category: Category; puppiesCount: number } | null> {
    const categoryWithPuppies = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: {
        _count: {
          select: {
            puppies: true,
          },
        },
      },
    });

    if (!categoryWithPuppies) return null;

    return {
      category: {
        id: categoryWithPuppies.id.toString(),
        name: categoryWithPuppies.name,
        minPriceCOP: categoryWithPuppies.minPriceCOP,
        minPriceUSD: categoryWithPuppies.minPriceUSD,
      },
      puppiesCount: categoryWithPuppies._count.puppies,
    };
  }

  async delete(id: string): Promise<void> {
    await prisma.category.delete({
      where: { id: parseInt(id) },
    });
  }
}
