'use client';

import { Category } from '@/domain/entities/Category';
import { PuppyFilters } from '@/lib/types/filters';
import FilterSelectComponent from '@/components/ui/FilterSelectComponent';
import FilterSearchComponent from '@/components/ui/FilterSearchComponent';
import SecondaryButtonComponent from '@/components/ui/SecondaryButtonComponent';
import { Dictionary } from '@/lib/types/dictionary';

interface AdminPuppiesFiltersComponentProps {
  categories: Category[];
  filters: PuppyFilters;
  onFilterChange: (key: keyof PuppyFilters, value: any) => void;
  onSearchChange: (value: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  dict: Dictionary;
  className?: string;
}

export default function AdminPuppiesFiltersComponent({
  categories,
  filters,
  onFilterChange,
  onSearchChange,
  onClearFilters,
  hasActiveFilters,
  dict,
  className = '',
}: AdminPuppiesFiltersComponentProps) {
  const categoryOptions = [
    { value: '', label: dict.admin.filters?.allCategories || 'All categories' },
    ...categories.map(category => ({
      value: category.id,
      label: category.name,
    })),
  ];

  const genderOptions = [
    { value: 'all', label: dict.admin.filters?.allGenders || 'All genders' },
    { value: 'male', label: dict.admin.forms?.gender?.male || 'Male' },
    { value: 'female', label: dict.admin.forms?.gender?.female || 'Female' },
  ];

  const availabilityOptions = [
    { value: 'all', label: dict.admin.filters?.allStatuses || 'All statuses' },
    {
      value: 'true',
      label: dict.admin.table?.status?.available || 'Available',
    },
    {
      value: 'false',
      label: dict.admin.table?.status?.unavailable || 'Unavailable',
    },
  ];

  const handleAvailabilityChange = (value: string) => {
    if (value === 'all') {
      onFilterChange('available', undefined);
    } else {
      onFilterChange('available', value === 'true');
    }
  };

  const getAvailabilityValue = () => {
    if (filters.available === undefined || filters.available === 'all') {
      return 'all';
    }
    return filters.available ? 'true' : 'false';
  };

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-4 shadow-sm ${className}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800">
          {dict.admin.filters?.title || 'Search Filters'}
        </h3>
        {hasActiveFilters && (
          <SecondaryButtonComponent
            onClick={onClearFilters}
            size="sm"
            className="text-xs"
          >
            {dict.admin.filters?.clearFilters || 'Clear filters'}
          </SecondaryButtonComponent>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <FilterSearchComponent
          value={filters.search || ''}
          onChange={onSearchChange}
          placeholder={
            dict.admin.filters?.searchPlaceholder || 'Search by name...'
          }
          label={dict.admin.filters?.searchLabel || 'Search'}
        />
        <FilterSelectComponent
          value={filters.categoryId || ''}
          onChange={value => onFilterChange('categoryId', value || undefined)}
          label={dict.admin.filters?.category || 'Category'}
          options={categoryOptions}
        />
        <FilterSelectComponent
          value={filters.gender || 'all'}
          onChange={value => onFilterChange('gender', value)}
          label={dict.admin.filters?.gender || 'Gender'}
          options={genderOptions}
        />
        <FilterSelectComponent
          value={getAvailabilityValue()}
          onChange={handleAvailabilityChange}
          label={dict.admin.filters?.availability || 'Availability'}
          options={availabilityOptions}
        />
      </div>
    </div>
  );
}
