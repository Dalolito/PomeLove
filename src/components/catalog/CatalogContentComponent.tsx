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

  useEffect(() => {
    // Force re-render after a short delay to ensure images load
    const timer = setTimeout(() => {
      setForceUpdate(prev => prev + 1);
    }, 100);

    return () => clearTimeout(timer);
  }, [initialPuppies]);

  console.log('CatalogContent - Initial puppies:', initialPuppies?.length);
  console.log('CatalogContent - Filtered puppies:', filteredPuppies?.length);
  console.log(
    'CatalogContent - Sample puppy media:',
    filteredPuppies?.[0]?.media
  );

  return (
    <div className={`container mx-auto px-4 py-8 ${className}`}>
      <CatalogHeaderComponent
        selectedCategory={selectedCategory}
        totalPuppies={filteredPuppies?.length || 0}
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
