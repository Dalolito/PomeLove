import { prisma } from '@/lib/databaseConnection';
import { CategoryRepository as ICategoryRepository } from '@/domain/repositories/CategoryRepository';
import {
  Category,
  CreateCategoryData,
  UpdateCategoryData,
} from '@/domain/entities/Category';

export class CategoryRepository implements ICategoryRepository {
  async create(data: CreateCategoryData): Promise<Category> {
    const category = await prisma.category.create({
      data: {
        name: data.name,
        minPrice: data.minPrice,
      },
    });

    return {
      id: category.id.toString(),
      name: category.name,
      minPrice: category.minPrice,
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
      minPrice: category.minPrice,
    };
  }

  async findAll(): Promise<Category[]> {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });

    return categories.map(category => ({
      id: category.id.toString(),
      name: category.name,
      minPrice: category.minPrice,
    }));
  }

  async update(id: string, data: UpdateCategoryData): Promise<Category> {
    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: {
        name: data.name,
        minPrice: data.minPrice,
      },
    });

    return {
      id: category.id.toString(),
      name: category.name,
      minPrice: category.minPrice,
    };
  }

  async findByIdWithPuppies(id: string): Promise<{ category: Category; puppiesCount: number } | null> {
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
        minPrice: categoryWithPuppies.minPrice,
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
