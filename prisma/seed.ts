import { PrismaClient } from '@prisma/client';
import { seedCategories } from './seeders/categorySeeder';
import { seedPuppies } from './seeders/puppySeeder';
import { seedPuppyMedia } from './seeders/puppyMediaSeeder';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seeding process...\n');

  try {
    console.log('Seeding categories...');
    const categoriesResult = await seedCategories(prisma);
    console.log(`${categoriesResult.categoriesCreated} categories created\n`);

    console.log('Seeding puppies...');
    const puppiesResult = await seedPuppies(prisma);
    console.log(`${puppiesResult.puppiesCreated} puppies created\n`);

    console.log('Seeding puppy media...');
    const mediaResult = await seedPuppyMedia(prisma);
    console.log(`${mediaResult.mediaCreated} media files created\n`);

    console.log('Seeding completed successfully!');
    console.log('Summary:');
    console.log(`   - Categories: ${categoriesResult.categoriesCreated}`);
    console.log(`   - Puppies: ${puppiesResult.puppiesCreated}`);
    console.log(`   - Media: ${mediaResult.mediaCreated}`);

  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
