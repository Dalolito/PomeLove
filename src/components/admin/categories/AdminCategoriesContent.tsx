'use client';

import { Category } from '@/domain/entities/Category';
import { useCategoryFilters } from '@/hooks/useCategoryFilters';
import AdminCategoriesFiltersComponent from '@/components/admin/categories/AdminCategoriesFiltersComponent';
import AdminCategoriesTableComponent from '@/components/admin/table/AdminCategoriesTableComponent';

interface AdminCategoriesContentProps {
  initialCategories: Category[];
  dict: any;
  locale: string;
}

export default function AdminCategoriesContent({
  initialCategories,
  dict,
  locale,
}: AdminCategoriesContentProps) {
  const {
    filters,
    isLoading: isFiltering,
    hasActiveFilters,
    filteredCategories,
    updateFilter,
    updateSearch,
    clearFilters,
  } = useCategoryFilters({
    initialCategories,
  });

  return (
    <div className="space-y-6">
      <AdminCategoriesFiltersComponent
        filters={filters}
        onFilterChange={updateFilter}
        onSearchChange={updateSearch}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        dict={dict}
        locale={locale}
      />

      <AdminCategoriesTableComponent
        categories={filteredCategories}
        dict={dict}
        locale={locale}
        loading={isFiltering}
      />
    </div>
  );
}
