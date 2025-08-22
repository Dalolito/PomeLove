import { PrismaClient } from '@prisma/client';

interface CategoryData {
  name: string;
  minPrice: number;
}

const categoriesData: CategoryData[] = [
  { name: 'Golden Retriever', minPrice: 1200.0 },
  { name: 'Labrador Retriever', minPrice: 1000.0 },
  { name: 'German Shepherd', minPrice: 1500.0 },
  { name: 'French Bulldog', minPrice: 3000.0 },
  { name: 'Poodle', minPrice: 1800.0 },
  { name: 'Beagle', minPrice: 800.0 },
  { name: 'Rottweiler', minPrice: 2000.0 },
  { name: 'Yorkshire Terrier', minPrice: 2500.0 },
  { name: 'Boxer', minPrice: 1600.0 },
  { name: 'Dachshund', minPrice: 900.0 },
];

export async function seedCategories(prisma: PrismaClient) {
  let categoriesCreated = 0;

  for (const categoryData of categoriesData) {
    const existingCategory = await prisma.category.findFirst({
      where: { name: categoryData.name },
    });

    if (!existingCategory) {
      await prisma.category.create({
        data: {
          name: categoryData.name,
          minPrice: categoryData.minPrice,
        },
      });
      categoriesCreated++;
      console.log(`  Category created: ${categoryData.name}`);
    } else {
      console.log(`  Category already exists: ${categoryData.name}`);
    }
  }

  return { categoriesCreated };
}
