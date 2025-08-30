'use client';

import { useMemo, useEffect, useState } from 'react';
import { Puppy } from '@/domain/entities/Puppy';
import { Category } from '@/domain/entities/Category';
import { Dictionary } from '@/lib/types/dictionary';
import { useCatalogFilters } from '@/hooks/useCatalogFilters';
import CatalogHeaderComponent from '@/components/catalog/CatalogHeaderComponent';
import CatalogFiltersComponent from '@/components/catalog/CatalogFiltersComponent';
import PuppyGridComponent from '@/components/puppy/PuppyGridComponent';

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
  const [forceUpdate, setForceUpdate] = useState(0);

  const cleanedPuppies = useMemo(() => {
    if (!initialPuppies || !Array.isArray(initialPuppies)) {
      return [];
    }

    return initialPuppies.filter(puppy => puppy && puppy.id);
  }, [initialPuppies]);

  const {
    filters,
    selectedCategory,
    isLoading,
    hasActiveFilters,
    filteredPuppies,
    updateFilter,
    clearFilters,
  } = useCatalogFilters({
    initialPuppies: cleanedPuppies,
    categories,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setForceUpdate(prev => prev + 1);
    }, 100);

    return () => clearTimeout(timer);
  }, [cleanedPuppies]);

  return (
    <div className={`container mx-auto px-4 py-8 ${className}`}>
      <CatalogHeaderComponent
        selectedCategory={selectedCategory}
        totalPuppies={
          (filteredPuppies?.filter(puppy => puppy.available) || []).length
        }
        hasActiveFilters={hasActiveFilters}
        dict={dict}
        locale={locale}
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
        key={`puppy-grid-${forceUpdate}`}
        puppies={filteredPuppies || []}
        dict={dict}
        locale={locale}
        loading={isLoading}
        className="mt-8"
        isPublic={true}
      />
    </div>
  );
}
