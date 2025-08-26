'use client';

import { Category } from '@/domain/entities/Category';
import { CatalogFilters } from '@/lib/types/filters';
import { Dictionary } from '@/lib/types/dictionary';
import FilterSelectComponent from '@/components/ui/FilterSelectComponent';
import SecondaryButtonComponent from '@/components/ui/SecondaryButtonComponent';

interface CatalogFiltersComponentProps {
  categories: Category[];
  filters: CatalogFilters;
  onFilterChange: (key: keyof CatalogFilters, value: any) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  dict: Dictionary;
  className?: string;
}

export default function CatalogFiltersComponent({
  categories,
  filters,
  onFilterChange,
  onClearFilters,
  hasActiveFilters,
  dict,
  className = '',
}: CatalogFiltersComponentProps) {
  const categoryOptions = [
    {
      value: '',
      label: dict.catalog.filters.allCategories,
    },
    ...categories.map(category => ({
      value: category.id.toString(),
      label: category.name,
    })),
  ];

  const genderOptions = [
    {
      value: 'all',
      label: dict.catalog.filters.allGenders,
    },
    {
      value: 'male',
      label: dict.admin.forms.gender.male,
    },
    {
      value: 'female',
      label: dict.admin.forms.gender.female,
    },
  ];

  const availabilityOptions = [
    {
      value: 'all',
      label: dict.catalog.filters.allAvailability,
    },
    {
      value: 'true',
      label: dict.catalog.filters.available,
    },
    {
      value: 'false',
      label: dict.catalog.filters.unavailable,
    },
  ];

  const handleAvailabilityChange = (value: string) => {
    if (value === 'all') {
      onFilterChange('available', 'all');
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
      className={`rounded-lg border border-gray-200 bg-white p-6 shadow-sm ${className}`}
    >
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          {dict.catalog.filters.title}
        </h3>
        {hasActiveFilters && (
          <SecondaryButtonComponent
            onClick={onClearFilters}
            size="sm"
            className="text-xs"
          >
            {dict.catalog.filters.clearFilters}
          </SecondaryButtonComponent>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <FilterSelectComponent
          value={filters.categoryId || ''}
          onChange={value => onFilterChange('categoryId', value || undefined)}
          label={dict.catalog.filters.category}
          options={categoryOptions}
        />

        <FilterSelectComponent
          value={filters.gender || 'all'}
          onChange={value => onFilterChange('gender', value)}
          label={dict.catalog.filters.gender}
          options={genderOptions}
        />

        <FilterSelectComponent
          value={getAvailabilityValue()}
          onChange={handleAvailabilityChange}
          label={dict.catalog.filters.availability}
          options={availabilityOptions}
        />
      </div>
    </div>
  );
}
