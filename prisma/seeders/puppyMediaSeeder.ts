import { PrismaClient } from '@prisma/client';

interface PuppyMediaData {
  puppyId: number;
  mediaUrl: string;
  mediaType: 'image' | 'video';
}

const imageUrls = [
  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1547407139-3c921a66005c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1583511655826-05700d52be8d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1547407139-3c921a66005c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=600&fit=crop'
];

const videoUrls = [
  'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
  'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
  'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4'
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generatePuppyMediaData(totalPuppies: number, mediaPerPuppy: number): PuppyMediaData[] {
  const media: PuppyMediaData[] = [];
  
  for (let puppyId = 1; puppyId <= totalPuppies; puppyId++) {
    for (let i = 0; i < mediaPerPuppy; i++) {
      const isImage = Math.random() < 0.8;
      
      const mediaItem: PuppyMediaData = {
        puppyId: puppyId,
        mediaUrl: isImage ? getRandomElement(imageUrls) : getRandomElement(videoUrls),
        mediaType: isImage ? 'image' : 'video'
      };
      
      media.push(mediaItem);
    }
  }
  
  return media;
}

export async function seedPuppyMedia(prisma: PrismaClient) {
  let mediaCreated = 0;

  const puppies = await prisma.puppy.findMany({
    select: { id: true }
  });

  if (puppies.length === 0) {
    throw new Error('No puppies available. Run PuppySeeder first.');
  }

  const totalPuppies = puppies.length;
  const mediaPerPuppy = 4;
  const mediaData = generatePuppyMediaData(totalPuppies, mediaPerPuppy);

  for (const mediaItem of mediaData) {
    const existingMedia = await prisma.puppyMedia.findFirst({
      where: {
        puppyId: mediaItem.puppyId,
        mediaUrl: mediaItem.mediaUrl
      }
    });

    if (!existingMedia) {
      await prisma.puppyMedia.create({
        data: {
          puppyId: mediaItem.puppyId,
          mediaUrl: mediaItem.mediaUrl,
          mediaType: mediaItem.mediaType
        }
      });
      mediaCreated++;
      console.log(`  Media created: ${mediaItem.mediaType} for puppy ${mediaItem.puppyId}`);
    } else {
      console.log(`  Media already exists: ${mediaItem.mediaType} for puppy ${mediaItem.puppyId}`);
    }
  }

  return { mediaCreated };
}
