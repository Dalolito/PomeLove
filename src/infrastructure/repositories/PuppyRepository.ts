import { prisma } from '@/lib/databaseConnection';
import { PuppyRepository as IPuppyRepository } from '@/domain/repositories/PuppyRepository';
import {
  Puppy,
  CreatePuppyData,
  UpdatePuppyData,
} from '@/domain/entities/Puppy';
import { Category } from '@/domain/entities/Category';
import { deleteMultipleFilesFromServer } from '@/lib/utils/fileUtils';

export class PuppyRepository implements IPuppyRepository {
  async create(data: CreatePuppyData): Promise<Puppy> {
    const puppy = await prisma.$transaction(async tx => {
      const createdPuppy = await tx.puppy.create({
        data: {
          name: data.name,
          description: data.description,
          birthDate: new Date(data.birthDate),
          gender: data.gender,
          categoryId: parseInt(data.categoryId),
          fatherImage: data.fatherImage,
          motherImage: data.motherImage,
          available: data.available ?? true,
        },
        include: {
          category: true,
        },
      });

      if (data.media && data.media.length > 0) {
        const uploadedMedia = data.media.filter(
          file => file.isUploaded && file.url
        );

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
    const puppy = await prisma.$transaction(async tx => {
      const existingPuppy = await tx.puppy.findUnique({
        where: { id: parseInt(id) },
        select: {
          fatherImage: true,
          motherImage: true,
        },
      });

      await tx.puppy.update({
        where: { id: parseInt(id) },
        data: {
          name: data.name,
          description: data.description,
          birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
          gender: data.gender,
          categoryId: data.categoryId ? parseInt(data.categoryId) : undefined,
          fatherImage: data.fatherImage,
          motherImage: data.motherImage,
          available: data.available,
        },
        include: {
          category: true,
          media: true,
        },
      });

      const urlsToDelete: string[] = [];

      if (existingPuppy?.fatherImage && !data.fatherImage) {
        urlsToDelete.push(existingPuppy.fatherImage);
      }

      if (existingPuppy?.motherImage && !data.motherImage) {
        urlsToDelete.push(existingPuppy.motherImage);
      }

      if (data.media !== undefined) {
        const existingMedia = await tx.puppyMedia.findMany({
          where: { puppyId: parseInt(id) },
          select: { mediaUrl: true },
        });

        await tx.puppyMedia.deleteMany({
          where: { puppyId: parseInt(id) },
        });

        const existingUrls = existingMedia.map(m => m.mediaUrl);
        const newUrls = data.media?.filter(f => f.isUploaded && f.url).map(f => f.url) || [];
        const mediaUrlsToDelete = existingUrls.filter(url => !newUrls.includes(url));
        urlsToDelete.push(...mediaUrlsToDelete);

        if (data.media && data.media.length > 0) {
          const uploadedMedia = data.media.filter(
            file => file.isUploaded && file.url
          );

          if (uploadedMedia.length > 0) {
            const mediaData = uploadedMedia.map(file => ({
              puppyId: parseInt(id),
              mediaUrl: file.url,
              mediaType: file.type,
            }));

            await tx.puppyMedia.createMany({
              data: mediaData,
            });
          }
        }
      }

      if (urlsToDelete.length > 0) {
        deleteMultipleFilesFromServer(urlsToDelete).catch(error => {
          console.error('Failed to delete some files:', error);
        });
      }

      return await tx.puppy.findUnique({
        where: { id: parseInt(id) },
        include: {
          category: true,
          media: true,
        },
      });
    });

    if (!puppy) {
      throw new Error('Failed to update puppy');
    }

    return this.mapToPuppyEntity(puppy);
  }

  async delete(id: string): Promise<void> {
    await prisma.$transaction(async tx => {
      const puppy = await tx.puppy.findUnique({
        where: { id: parseInt(id) },
        select: {
          fatherImage: true,
          motherImage: true,
        },
      });

      const media = await tx.puppyMedia.findMany({
        where: { puppyId: parseInt(id) },
        select: { mediaUrl: true },
      });

      await tx.puppy.delete({
        where: { id: parseInt(id) },
      });

      const urlsToDelete: string[] = [];

      if (puppy?.fatherImage) {
        urlsToDelete.push(puppy.fatherImage);
      }

      if (puppy?.motherImage) {
        urlsToDelete.push(puppy.motherImage);
      }

      urlsToDelete.push(...media.map(m => m.mediaUrl));

      if (urlsToDelete.length > 0) {
        deleteMultipleFilesFromServer(urlsToDelete).catch(error => {
          console.error('Failed to delete some files:', error);
        });
      }
    });
  }

  private mapToPuppyEntity(puppy: {
    id: number;
    name: string;
    description: string;
    birthDate: Date;
    gender: string;
    fatherImage: string | null;
    motherImage: string | null;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
    category: {
      id: number;
      name: string;
      minPrice: number;
    };
    media?: Array<{
      id: number;
      mediaUrl: string;
      mediaType: string;
    }>;
  }): Puppy {
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
      gender: puppy.gender as 'male' | 'female',
      fatherImage: puppy.fatherImage,
      motherImage: puppy.motherImage,
      available: puppy.available,
      category,
      media: puppy.media
        ? puppy.media.map((media: any) => ({
            id: media.id.toString(),
            url: media.mediaUrl,
            type: media.mediaType as 'image' | 'video',
            name: media.mediaUrl.split('/').pop() || 'Unknown',
            size: 0,
            isUploaded: true,
          }))
        : [],
      createdAt: puppy.createdAt,
      updatedAt: puppy.updatedAt,
    };
  }
}
