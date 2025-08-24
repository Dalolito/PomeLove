import { PrismaClient } from '@prisma/client';

interface PuppyData {
  name: string;
  description_es: string;
  description_en: string;
  birthDate: Date;
  gender: 'male' | 'female';
  categoryId: number;
  fatherImage?: string;
  motherImage?: string;
  available: boolean;
}

const puppyNames = [
  'Max',
  'Bella',
  'Charlie',
  'Luna',
  'Cooper',
  'Lucy',
  'Buddy',
  'Daisy',
  'Rocky',
  'Molly',
  'Bear',
  'Sadie',
  'Duke',
  'Sophie',
  'Teddy',
  'Chloe',
  'Tucker',
  'Bailey',
  'Oliver',
  'Lola',
  'Jack',
  'Zoe',
  'Winston',
  'Ruby',
  'Bentley',
  'Penny',
  'Murphy',
  'Nova',
  'Finn',
  'Stella',
  'Milo',
  'Rosie',
];

const puppyDescriptionsES = [
  'Un cachorro adorable y juguetón, perfecto para familias activas. Su personalidad enérgica y cariñosa lo convierte en el compañero ideal para hogares con niños.',
  'Cachorro tranquilo y cariñoso, ideal para hogares con niños. Su temperamento gentil y paciencia natural lo hacen perfecto para familias primerizas.',
  'Perrito energético y sociable, ama jugar al aire libre. Su amor por la aventura y la exploración lo convierte en el compañero perfecto para actividades al aire libre.',
  'Cachorro inteligente y obediente, fácil de entrenar. Su capacidad de aprendizaje rápido y disposición para complacer lo hacen ideal para entrenamiento avanzado.',
  'Perrito dulce y leal, se adapta perfectamente a cualquier familia. Su naturaleza adaptable y cariñosa lo convierte en el compañero perfecto para cualquier hogar.',
  'Cachorro curioso y aventurero, siempre listo para explorar. Su espíritu intrépido y curiosidad natural lo hacen ideal para familias que aman las aventuras.',
  'Perrito gentil y paciente, excelente compañero para niños. Su temperamento calmado y naturaleza protectora lo convierten en el guardián perfecto de la familia.',
  'Cachorro activo y atlético, perfecto para deportistas. Su energía ilimitada y amor por el ejercicio lo hacen ideal para personas activas y deportistas.',
  'Perrito cariñoso y protector, ideal para familias. Su instinto protector y lealtad inquebrantable lo convierten en el guardián perfecto del hogar.',
  'Cachorro alegre y sociable, ama hacer nuevos amigos. Su personalidad extrovertida y amor por la socialización lo hacen perfecto para hogares con múltiples mascotas.',
  'Perrito inteligente y juguetón, siempre listo para aprender nuevos trucos. Su mente ágil y disposición para el juego lo convierten en el compañero perfecto para entrenamiento.',
  'Cachorro tranquilo y observador, perfecto para hogares serenos. Su naturaleza contemplativa y calma natural lo hacen ideal para personas que buscan un compañero relajado.',
  'Perrito enérgico y atrevido, ama los desafíos y la aventura. Su valentía y espíritu aventurero lo convierten en el compañero perfecto para exploradores.',
  'Cachorro cariñoso y dependiente, busca constantemente el afecto de su familia. Su amor incondicional y necesidad de compañía lo hacen perfecto para hogares amorosos.',
  'Perrito independiente y confiado, perfecto para personas ocupadas. Su autonomía y confianza en sí mismo lo convierten en el compañero ideal para estilos de vida activos.',
  'Cachorro juguetón y travieso, siempre inventando nuevas formas de divertirse. Su creatividad y sentido del humor lo hacen el alma de la fiesta en cualquier hogar.',
  'Perrito sereno y sabio, con una personalidad madura para su edad. Su calma y sabiduría natural lo convierten en el consejero perfecto para momentos de estrés.',
  'Cachorro atlético y competitivo, ama los juegos y desafíos físicos. Su espíritu competitivo y energía deportiva lo hacen ideal para familias deportivas.',
  'Perrito sociable y diplomático, se lleva bien con todos. Su capacidad de adaptación social lo convierte en el embajador perfecto de la familia.',
  'Cachorro curioso y científico, siempre investigando su entorno. Su mente inquisitiva y amor por el descubrimiento lo hacen perfecto para familias intelectuales.',
  'Perrito artístico y sensible, con una apreciación natural por la belleza. Su sensibilidad y creatividad lo convierten en el compañero perfecto para artistas.',
  'Cachorro valiente y protector, instintivamente cuida de su familia. Su coraje y sentido del deber lo hacen el guardián perfecto del hogar.',
  'Perrito alegre y optimista, siempre ve el lado positivo de la vida. Su actitud positiva y energía contagiosa lo convierten en el terapeuta perfecto.',
  'Cachorro trabajador y dedicado, ama tener responsabilidades. Su ética de trabajo y lealtad lo hacen ideal para familias que valoran la dedicación.',
  'Perrito filosófico y contemplativo, disfruta de momentos de reflexión. Su profundidad de pensamiento lo convierte en el compañero perfecto para momentos de introspección.',
  'Cachorro aventurero y explorador, siempre buscando nuevos horizontes. Su espíritu pionero y amor por lo desconocido lo hacen perfecto para viajeros.',
  'Perrito cariñoso y terapéutico, tiene un don natural para consolar. Su empatía y capacidad de sanación lo convierten en el compañero perfecto para momentos difíciles.',
  'Cachorro deportivo y enérgico, ama la competencia y el ejercicio. Su pasión por el deporte y energía ilimitada lo hacen ideal para atletas.',
  'Perrito intelectual y estudioso, siempre aprendiendo algo nuevo. Su sed de conocimiento y mente brillante lo convierten en el compañero perfecto para académicos.',
  'Cachorro artístico y expresivo, comunica sus emociones de manera única. Su creatividad y capacidad de expresión lo hacen perfecto para familias artísticas.',
  'Perrito zen y equilibrado, trae paz y armonía a su entorno. Su naturaleza pacífica y capacidad de meditación lo convierten en el compañero perfecto para momentos de calma.',
];

const puppyDescriptionsEN = [
  'An adorable and playful puppy, perfect for active families. His energetic and loving personality makes him the ideal companion for homes with children.',
  'A calm and affectionate puppy, ideal for homes with children. His gentle temperament and natural patience make him perfect for first-time families.',
  'An energetic and sociable puppy who loves playing outdoors. His love for adventure and exploration makes him the perfect companion for outdoor activities.',
  'An intelligent and obedient puppy, easy to train. His quick learning ability and eagerness to please make him ideal for advanced training.',
  'A sweet and loyal puppy who adapts perfectly to any family. His adaptable and loving nature makes him the perfect companion for any home.',
  'A curious and adventurous puppy, always ready to explore. His fearless spirit and natural curiosity make him ideal for families who love adventures.',
  'A gentle and patient puppy, excellent companion for children. His calm temperament and protective nature make him the perfect family guardian.',
  'An active and athletic puppy, perfect for sports enthusiasts. His unlimited energy and love for exercise make him ideal for active people and athletes.',
  'A loving and protective puppy, ideal for families. His protective instinct and unwavering loyalty make him the perfect home guardian.',
  'A cheerful and sociable puppy who loves making new friends. His outgoing personality and love for socialization make him perfect for homes with multiple pets.',
  'An intelligent and playful puppy, always ready to learn new tricks. His agile mind and playful disposition make him the perfect companion for training.',
  'A calm and observant puppy, perfect for serene homes. His contemplative nature and natural calm make him ideal for people seeking a relaxed companion.',
  'An energetic and bold puppy who loves challenges and adventure. His bravery and adventurous spirit make him the perfect companion for explorers.',
  "A loving and dependent puppy who constantly seeks his family's affection. His unconditional love and need for companionship make him perfect for loving homes.",
  'An independent and confident puppy, perfect for busy people. His autonomy and self-confidence make him the ideal companion for active lifestyles.',
  'A playful and mischievous puppy, always inventing new ways to have fun. His creativity and sense of humor make him the life of the party in any home.',
  'A serene and wise puppy with a mature personality for his age. His calm and natural wisdom make him the perfect counselor for stressful moments.',
  'An athletic and competitive puppy who loves games and physical challenges. His competitive spirit and sports energy make him ideal for sports families.',
  'A sociable and diplomatic puppy who gets along with everyone. His social adaptability makes him the perfect family ambassador.',
  'A curious and scientific puppy, always investigating his environment. His inquisitive mind and love for discovery make him perfect for intellectual families.',
  'An artistic and sensitive puppy with a natural appreciation for beauty. His sensitivity and creativity make him the perfect companion for artists.',
  'A brave and protective puppy who instinctively cares for his family. His courage and sense of duty make him the perfect home guardian.',
  'A cheerful and optimistic puppy who always sees the positive side of life. His positive attitude and contagious energy make him the perfect therapist.',
  'A hardworking and dedicated puppy who loves having responsibilities. His work ethic and loyalty make him ideal for families who value dedication.',
  'A philosophical and contemplative puppy who enjoys moments of reflection. His depth of thought makes him the perfect companion for introspective moments.',
  'An adventurous and exploratory puppy, always seeking new horizons. His pioneering spirit and love for the unknown make him perfect for travelers.',
  'A loving and therapeutic puppy with a natural gift for comforting. His empathy and healing ability make him the perfect companion for difficult moments.',
  'A sports-loving and energetic puppy who loves competition and exercise. His passion for sports and unlimited energy make him ideal for athletes.',
  'An intellectual and studious puppy, always learning something new. His thirst for knowledge and brilliant mind make him the perfect companion for academics.',
  'An artistic and expressive puppy who communicates his emotions in unique ways. His creativity and ability to express himself make him perfect for artistic families.',
  'A zen and balanced puppy who brings peace and harmony to his environment. His peaceful nature and meditation ability make him the perfect companion for calm moments.',
];

const fatherImages = [
  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=300&fit=crop',
];

const motherImages = [
  'https://images.unsplash.com/photo-1547407139-3c921a66005c?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1583511655826-05700d52be8d?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1547407139-3c921a66005c?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=300&fit=crop',
];

function getRandomBirthDate(): Date {
  const now = new Date();
  const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  const randomTime =
    threeMonthsAgo.getTime() +
    Math.random() * (now.getTime() - threeMonthsAgo.getTime());
  return new Date(randomTime);
}

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generatePuppiesData(
  categoriesCount: number,
  puppiesPerCategory: number
): PuppyData[] {
  const puppies: PuppyData[] = [];

  for (let categoryId = 1; categoryId <= categoriesCount; categoryId++) {
    for (let i = 0; i < puppiesPerCategory; i++) {
      const puppy: PuppyData = {
        name: getRandomElement(puppyNames),
        description_es: getRandomElement(puppyDescriptionsES),
        description_en: getRandomElement(puppyDescriptionsEN),
        birthDate: getRandomBirthDate(),
        gender: Math.random() > 0.5 ? 'male' : 'female',
        categoryId: categoryId,
        fatherImage: getRandomElement(fatherImages),
        motherImage: getRandomElement(motherImages),
        available: Math.random() > 0.3,
      };

      puppies.push(puppy);
    }
  }

  return puppies;
}

export async function seedPuppies(prisma: PrismaClient) {
  let puppiesCreated = 0;

  const categories = await prisma.category.findMany({
    select: { id: true },
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
        categoryId: puppyData.categoryId,
      },
    });

    if (!existingPuppy) {
      await prisma.puppy.create({
        data: {
          name: puppyData.name,
          description_es: puppyData.description_es,
          description_en: puppyData.description_en,
          birthDate: puppyData.birthDate,
          gender: puppyData.gender,
          categoryId: puppyData.categoryId,
          fatherImage: puppyData.fatherImage,
          motherImage: puppyData.motherImage,
          available: puppyData.available,
        },
      });
      puppiesCreated++;
      console.log(
        `  Puppy created: ${puppyData.name} (Category: ${puppyData.categoryId})`
      );
    } else {
      console.log(
        `  Puppy already exists: ${puppyData.name} in category ${puppyData.categoryId}`
      );
    }
  }

  return { puppiesCreated };
}
