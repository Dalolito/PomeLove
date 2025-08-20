import { prisma } from '@/lib/databaseConnection';
import { PuppyRepository as IPuppyRepository } from '@/domain/repositories/PuppyRepository';
import { Puppy, CreatePuppyData, UpdatePuppyData } from '@/domain/entities/Puppy';
import { Category } from '@/domain/entities/Category';

export class PuppyRepository implements IPuppyRepository {
  async create(data: CreatePuppyData): Promise<Puppy> {
    const puppy = await prisma.$transaction(async (tx) => {
      const createdPuppy = await tx.puppy.create({
        data: {
          name: data.name,
          description: data.description,
          birthDate: new Date(data.birthDate),
          categoryId: parseInt(data.categoryId),
          fatherImage: data.fatherImage,
          motherImage: data.motherImage,
        },
        include: {
          category: true,
        },
      });

      if (data.media && data.media.length > 0) {
        const uploadedMedia = data.media.filter(file => file.isUploaded && file.url);
        
        if (uploadedMedia.length > 0) {
          const mediaData = uploadedMedia.map(file => ({
            puppyId: createdPuppy.id,
            mediaUrl: file.url,
            mediaType: file.type,
          }));
          
          await tx.puppyMedia.createMany({
            data: mediaData,
          });
        }
      }

      return await tx.puppy.findUnique({
        where: { id: createdPuppy.id },
        include: {
          category: true,
          media: true,
        },
      });
    });

    if (!puppy) {
      throw new Error('Failed to create puppy');
    }

    return this.mapToPuppyEntity(puppy);
  }

  async findById(id: string): Promise<Puppy | null> {
    const puppy = await prisma.puppy.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
        media: true,
      },
    });

    if (!puppy) return null;

    return this.mapToPuppyEntity(puppy);
  }

  async findAll(): Promise<Puppy[]> {
    const puppies = await prisma.puppy.findMany({
      include: {
        category: true,
        media: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return puppies.map(puppy => this.mapToPuppyEntity(puppy));
  }

  async findByCategory(categoryId: string): Promise<Puppy[]> {
    const puppies = await prisma.puppy.findMany({
      where: { categoryId: parseInt(categoryId) },
      include: {
        category: true,
        media: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return puppies.map(puppy => this.mapToPuppyEntity(puppy));
  }

  async update(id: string, data: UpdatePuppyData): Promise<Puppy> {
    const puppy = await prisma.puppy.update({
      where: { id: parseInt(id) },
      data: {
        name: data.name,
        description: data.description,
        birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
        categoryId: data.categoryId ? parseInt(data.categoryId) : undefined,
        fatherImage: data.fatherImage,
        motherImage: data.motherImage,
      },
      include: {
        category: true,
        media: true,
      },
    });

    return this.mapToPuppyEntity(puppy);
  }

  async delete(id: string): Promise<void> {
    await prisma.puppy.delete({
      where: { id: parseInt(id) },
    });
  }

  private mapToPuppyEntity(puppy: any): Puppy {
    const category: Category = {
      id: puppy.category.id.toString(),
      name: puppy.category.name,
      minPrice: puppy.category.minPrice,
    };

    return {
      id: puppy.id.toString(),
      name: puppy.name,
      description: puppy.description,
      birthDate: puppy.birthDate,
      fatherImage: puppy.fatherImage,
      motherImage: puppy.motherImage,
      category,
      media: puppy.media ? puppy.media.map((media: any) => ({
        id: media.id.toString(),
        url: media.mediaUrl,
        type: media.mediaType as 'image' | 'video',
        name: media.mediaUrl.split('/').pop() || 'Unknown',
        size: 0,
        isUploaded: true,
      })) : [],
      createdAt: puppy.createdAt,
      updatedAt: puppy.updatedAt,
    };
  }
}