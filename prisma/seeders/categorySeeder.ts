import { PrismaClient } from '@prisma/client';

interface CategoryData {
  name: string;
  minPrice: number;
}

const categoriesData: CategoryData[] = [
  { name: 'Golden Retriever', minPrice: 1200.00 },
  { name: 'Labrador Retriever', minPrice: 1000.00 },
  { name: 'German Shepherd', minPrice: 1500.00 },
  { name: 'French Bulldog', minPrice: 3000.00 },
  { name: 'Poodle', minPrice: 1800.00 },
  { name: 'Beagle', minPrice: 800.00 },
  { name: 'Rottweiler', minPrice: 2000.00 },
  { name: 'Yorkshire Terrier', minPrice: 2500.00 },
  { name: 'Boxer', minPrice: 1600.00 },
  { name: 'Dachshund', minPrice: 900.00 }
];

export async function seedCategories(prisma: PrismaClient) {
  let categoriesCreated = 0;

  for (const categoryData of categoriesData) {
    const existingCategory = await prisma.category.findFirst({
      where: { name: categoryData.name }
    });

    if (!existingCategory) {
      await prisma.category.create({
        data: {
          name: categoryData.name,
          minPrice: categoryData.minPrice
        }
      });
      categoriesCreated++;
      console.log(`  Category created: ${categoryData.name}`);
    } else {
      console.log(`  Category already exists: ${categoryData.name}`);
    }
  }

  return { categoriesCreated };
}
