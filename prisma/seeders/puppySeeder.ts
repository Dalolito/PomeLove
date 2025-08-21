import { PrismaClient } from '@prisma/client';

interface PuppyData {
  name: string;
  description: string;
  birthDate: Date;
  gender: 'male' | 'female';
  categoryId: number;
  fatherImage?: string;
  motherImage?: string;
  available: boolean;
}

const puppyNames = [
  'Max', 'Bella', 'Charlie', 'Luna', 'Cooper', 'Lucy', 'Buddy', 'Daisy',
  'Rocky', 'Molly', 'Bear', 'Sadie', 'Duke', 'Sophie', 'Teddy', 'Chloe',
  'Tucker', 'Bailey', 'Oliver', 'Lola', 'Jack', 'Zoe', 'Winston', 'Ruby',
  'Bentley', 'Penny', 'Murphy', 'Nova', 'Finn', 'Stella', 'Milo', 'Rosie'
];

const puppyDescriptions = [
  'Un cachorro adorable y juguetón, perfecto para familias activas.',
  'Cachorro tranquilo y cariñoso, ideal para hogares con niños.',
  'Perrito energético y sociable, ama jugar al aire libre.',
  'Cachorro inteligente y obediente, fácil de entrenar.',
  'Perrito dulce y leal, se adapta perfectamente a cualquier familia.',
  'Cachorro curioso y aventurero, siempre listo para explorar.',
  'Perrito gentil y paciente, excelente compañero para niños.',
  'Cachorro activo y atlético, perfecto para deportistas.',
  'Perrito cariñoso y protector, ideal para familias.',
  'Cachorro alegre y sociable, ama hacer nuevos amigos.'
];

const fatherImages = [
  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=300&fit=crop'
];

const motherImages = [
  'https://images.unsplash.com/photo-1547407139-3c921a66005c?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1583511655826-05700d52be8d?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1547407139-3c921a66005c?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=300&fit=crop'
];

function getRandomBirthDate(): Date {
  const now = new Date();
  const threeMonthsAgo = new Date(now.getTime() - (90 * 24 * 60 * 60 * 1000));
  const randomTime = threeMonthsAgo.getTime() + Math.random() * (now.getTime() - threeMonthsAgo.getTime());
  return new Date(randomTime);
}

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generatePuppiesData(categoriesCount: number, puppiesPerCategory: number): PuppyData[] {
  const puppies: PuppyData[] = [];
  
  for (let categoryId = 1; categoryId <= categoriesCount; categoryId++) {
    for (let i = 0; i < puppiesPerCategory; i++) {
      const puppy: PuppyData = {
        name: getRandomElement(puppyNames),
        description: getRandomElement(puppyDescriptions),
        birthDate: getRandomBirthDate(),
        gender: Math.random() > 0.5 ? 'male' : 'female',
        categoryId: categoryId,
        fatherImage: getRandomElement(fatherImages),
        motherImage: getRandomElement(motherImages),
        available: Math.random() > 0.3
      };
      
      puppies.push(puppy);
    }
  }
  
  return puppies;
}

export async function seedPuppies(prisma: PrismaClient) {
  let puppiesCreated = 0;

  const categories = await prisma.category.findMany({
    select: { id: true }
  });

  if (categories.length === 0) {
    throw new Error('No categories available. Run CategorySeeder first.');
  }

  const categoriesCount = categories.length;
  const puppiesPerCategory = 3;
  const puppiesData = generatePuppiesData(categoriesCount, puppiesPerCategory);

  for (const puppyData of puppiesData) {
    const existingPuppy = await prisma.puppy.findFirst({
      where: {
        name: puppyData.name,
        categoryId: puppyData.categoryId
      }
    });

    if (!existingPuppy) {
      await prisma.puppy.create({
        data: {
          name: puppyData.name,
          description: puppyData.description,
          birthDate: puppyData.birthDate,
          gender: puppyData.gender,
          categoryId: puppyData.categoryId,
          fatherImage: puppyData.fatherImage,
          motherImage: puppyData.motherImage,
          available: puppyData.available
        }
      });
      puppiesCreated++;
      console.log(`  Puppy created: ${puppyData.name} (Category: ${puppyData.categoryId})`);
    } else {
      console.log(`  Puppy already exists: ${puppyData.name} in category ${puppyData.categoryId}`);
    }
  }

  return { puppiesCreated };
}
