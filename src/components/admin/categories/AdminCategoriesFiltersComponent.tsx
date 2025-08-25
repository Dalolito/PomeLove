'use client';

import { CategoryFilters } from '@/lib/types/filters';
import FilterSelectComponent from '@/components/ui/FilterSelectComponent';
import FilterSearchComponent from '@/components/ui/FilterSearchComponent';
import SecondaryButtonComponent from '@/components/ui/SecondaryButtonComponent';
import { Dictionary } from '@/lib/types/dictionary';

interface AdminCategoriesFiltersComponentProps {
  filters: CategoryFilters;
  onFilterChange: (key: keyof CategoryFilters, value: any) => void;
  onSearchChange: (value: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  dict: Dictionary;
  locale: string;
  className?: string;
}

export default function AdminCategoriesFiltersComponent({
  filters,
  onFilterChange,
  onSearchChange,
  onClearFilters,
  hasActiveFilters,
  dict,
  locale,
  className = '',
}: AdminCategoriesFiltersComponentProps) {
  const sortByOptions = [
    {
      value: 'name',
      label: dict.admin.categories.filters?.sortByName || 'Name',
    },
    {
      value: locale === 'es' ? 'minPriceCOP' : 'minPriceUSD',
      label: dict.admin.categories.filters?.sortByPrice || 'Price',
    },
  ];

  const sortOrderOptions = [
    {
      value: 'asc',
      label: dict.admin.categories.filters?.ascending || 'Ascending',
    },
    {
      value: 'desc',
      label: dict.admin.categories.filters?.descending || 'Descending',
    },
  ];

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-4 shadow-sm ${className}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800">
          {dict.admin.categories.filters?.title || 'Search Filters'}
        </h3>
        {hasActiveFilters && (
          <SecondaryButtonComponent
            onClick={onClearFilters}
            size="sm"
            className="text-xs"
          >
            {dict.admin.categories.filters?.clearFilters || 'Clear filters'}
          </SecondaryButtonComponent>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <FilterSearchComponent
          value={filters.search || ''}
          onChange={onSearchChange}
          placeholder={
            dict.admin.categories.filters?.searchPlaceholder ||
            'Search by name...'
          }
          label={dict.admin.categories.filters?.searchLabel || 'Search'}
        />
        <FilterSelectComponent
          value={filters.sortBy || 'name'}
          onChange={value => onFilterChange('sortBy', value)}
          label={dict.admin.categories.filters?.sortBy || 'Sort by'}
          options={sortByOptions}
        />
        <FilterSelectComponent
          value={filters.sortOrder || 'asc'}
          onChange={value => onFilterChange('sortOrder', value)}
          label={dict.admin.categories.filters?.sortOrder || 'Order'}
          options={sortOrderOptions}
        />
      </div>
    </div>
  );
}
