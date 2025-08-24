'use client';

import { Puppy } from '@/domain/entities/Puppy';
import { Category } from '@/domain/entities/Category';
import { usePuppyFilters } from '@/hooks/usePuppyFilters';
import AdminPuppiesFiltersComponent from '@/components/admin/puppies/AdminPuppiesFiltersComponent';
import AdminPuppiesTableComponent from '@/components/admin/table/AdminPuppiesTableComponent';
import ImageDebugComponent from '@/components/debug/ImageDebugComponent';

interface AdminPuppiesContentProps {
  initialPuppies: Puppy[];
  categories: Category[];
  dict: any;
  locale: string;
}

export default function AdminPuppiesContent({
  initialPuppies,
  categories,
  dict,
  locale,
}: AdminPuppiesContentProps) {
  const {
    filters,
    isLoading: isFiltering,
    hasActiveFilters,
    filteredPuppies,
    updateFilter,
    updateSearch,
    clearFilters,
  } = usePuppyFilters({
    initialPuppies,
  });

  return (
    <div className="space-y-6">
      <AdminPuppiesFiltersComponent
        categories={categories}
        filters={filters}
        onFilterChange={updateFilter}
        onSearchChange={updateSearch}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        dict={dict}
      />

      <AdminPuppiesTableComponent
        puppies={filteredPuppies}
        dict={dict}
        locale={locale}
        isFiltering={isFiltering}
        hasActiveFilters={hasActiveFilters}
      />

      <ImageDebugComponent puppies={filteredPuppies} />
    </div>
  );
}
