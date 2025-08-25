import { PrismaClient } from '@prisma/client';

interface CategoryData {
  name: string;
  minPriceCOP: number;
  minPriceUSD: number;
}

const categoriesData: CategoryData[] = [
  { name: 'Golden Retriever', minPriceCOP: 4800000, minPriceUSD: 1200.0 },
  { name: 'Labrador Retriever', minPriceCOP: 4000000, minPriceUSD: 1000.0 },
  { name: 'German Shepherd', minPriceCOP: 6000000, minPriceUSD: 1500.0 },
  { name: 'French Bulldog', minPriceCOP: 12000000, minPriceUSD: 3000.0 },
  { name: 'Poodle', minPriceCOP: 7200000, minPriceUSD: 1800.0 },
  { name: 'Beagle', minPriceCOP: 3200000, minPriceUSD: 800.0 },
  { name: 'Rottweiler', minPriceCOP: 8000000, minPriceUSD: 2000.0 },
  { name: 'Yorkshire Terrier', minPriceCOP: 10000000, minPriceUSD: 2500.0 },
  { name: 'Boxer', minPriceCOP: 6400000, minPriceUSD: 1600.0 },
  { name: 'Dachshund', minPriceCOP: 3600000, minPriceUSD: 900.0 },
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
          minPriceCOP: categoryData.minPriceCOP,
          minPriceUSD: categoryData.minPriceUSD,
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
