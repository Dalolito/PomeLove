import { MetadataRoute } from 'next';
import { prisma } from '@/lib/databaseConnection';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pomeloves.com';

  // Get all puppies for dynamic routes
  const puppies = await prisma.puppy.findMany({
    where: { available: true },
    select: { id: true, updatedAt: true },
  });

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/es`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/es/catalog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/catalog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/es/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Dynamic puppy pages
  const puppyPages = puppies.map(puppy => ({
    url: `${baseUrl}/es/puppy/${puppy.id}`,
    lastModified: puppy.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const puppyPagesEn = puppies.map(puppy => ({
    url: `${baseUrl}/en/puppy/${puppy.id}`,
    lastModified: puppy.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...puppyPages, ...puppyPagesEn];
}
