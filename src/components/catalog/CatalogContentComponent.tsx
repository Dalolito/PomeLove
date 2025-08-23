'use client';

import { useMemo } from 'react';
import { Puppy } from '@/domain/entities/Puppy';
import { Category } from '@/domain/entities/Category';
import { Dictionary } from '@/lib/types/dictionary';
import { useCatalogFilters } from '@/hooks/useCatalogFilters';
import CatalogHeaderComponent from '@/components/catalog/CatalogHeaderComponent';
import CatalogFiltersComponent from '@/components/catalog/CatalogFiltersComponent';
import PuppyGridComponent from '@/components/puppy/PuppyGridComponent';
import ImagePreloaderComponent from '@/components/ui/ImagePreloaderComponent';

interface CatalogContentComponentProps {
  initialPuppies: Puppy[];
  categories: Category[];
  dict: Dictionary;
  locale: string;
  className?: string;
}

export default function CatalogContentComponent({
  initialPuppies,
  categories,
  dict,
  locale,
  className = '',
}: CatalogContentComponentProps) {
  const {
    filters,
    selectedCategory,
    isLoading,
    hasActiveFilters,
    filteredPuppies,
    updateFilter,
    clearFilters,
  } = useCatalogFilters({
    initialPuppies,
    categories,
  });

  const priorityImages = useMemo(() => {
    return filteredPuppies
      .slice(0, 6)
      .map(puppy => {
        if (puppy.media && puppy.media.length > 0) {
          const firstImage = puppy.media.find(media => media.type === 'image');
          return firstImage?.url;
        }
        return null;
      })
      .filter(Boolean) as string[];
  }, [filteredPuppies]);

  return (
    <div className={`container mx-auto px-4 py-8 ${className}`}>
      <ImagePreloaderComponent images={priorityImages} />
      
      <CatalogHeaderComponent
        selectedCategory={selectedCategory}
        totalPuppies={filteredPuppies.length}
        hasActiveFilters={hasActiveFilters}
        dict={dict}
        className="mb-8"
      />

      <CatalogFiltersComponent
        categories={categories}
        filters={filters}
        onFilterChange={updateFilter}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        dict={dict}
        className="mb-8"
      />

      <PuppyGridComponent
        puppies={filteredPuppies}
        dict={dict}
        locale={locale}
        loading={isLoading}
        className="mt-8"
      />
    </div>
  );
}
