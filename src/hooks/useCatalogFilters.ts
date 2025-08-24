'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { CatalogFilters, CatalogFilterState } from '@/lib/types/filters';
import { Puppy } from '@/domain/entities/Puppy';
import { Category } from '@/domain/entities/Category';
import { getFilteredPuppiesAction } from '@/actions/puppyActions';


interface UseCatalogFiltersProps {
  initialPuppies: Puppy[];
  categories: Category[];
  onFilteredResults?: (puppies: Puppy[]) => void;
}

const cleanPuppyData = (puppy: Puppy): Puppy => {
  return puppy;
};

export function useCatalogFilters({
  initialPuppies,
  categories,
  onFilteredResults,
}: UseCatalogFiltersProps) {
  const [filterState, setFilterState] = useState<CatalogFilterState>({
    filters: { gender: 'all', available: 'all' },
    selectedCategory: null,
    isLoading: false,
    hasActiveFilters: false,
  });

  const [filteredPuppies, setFilteredPuppies] =
    useState<Puppy[]>(initialPuppies);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const lastAppliedFiltersRef = useRef<string>('');

  const checkHasActiveFilters = useCallback(
    (filters: CatalogFilters): boolean => {
      return !!(
        filters.categoryId ||
        (filters.gender && filters.gender !== 'all') ||
        (filters.available !== undefined && filters.available !== 'all')
      );
    },
    []
  );

  const findSelectedCategory = useCallback(
    (categoryId: string | undefined): Category | null => {
      if (!categoryId) return null;
      return categories.find(cat => cat.id === categoryId) || null;
    },
    [categories]
  );

  const applyFilters = useCallback(
    async (filters: CatalogFilters) => {
      const filtersKey = JSON.stringify(filters);

      if (lastAppliedFiltersRef.current === filtersKey) {
        return;
      }

      lastAppliedFiltersRef.current = filtersKey;
      setFilterState(prev => ({ ...prev, isLoading: true }));

      try {
        const hasActiveFilters = checkHasActiveFilters(filters);
        const selectedCategory = findSelectedCategory(filters.categoryId);

        if (!hasActiveFilters) {
          const cleanedPuppies = initialPuppies.map(cleanPuppyData);
          setFilteredPuppies(cleanedPuppies);
          onFilteredResults?.(cleanedPuppies);
        } else {
          const apiFilters = {
            categoryId: filters.categoryId,
            gender: filters.gender === 'all' ? undefined : filters.gender,
            available:
              filters.available === 'all' ? undefined : filters.available,
          };

          const result = await getFilteredPuppiesAction(apiFilters);

          if (result.success && result.puppies) {
            const cleanedPuppies = result.puppies.map(cleanPuppyData);
            setFilteredPuppies(cleanedPuppies);
            onFilteredResults?.(cleanedPuppies);
          }
        }

        setFilterState(prev => ({
          ...prev,
          selectedCategory,
          hasActiveFilters,
          isLoading: false,
        }));
      } catch (error) {
        console.error('Error applying catalog filters:', error);
        setFilterState(prev => ({ ...prev, isLoading: false }));
      }
    },
    [
      initialPuppies,
      onFilteredResults,
      checkHasActiveFilters,
      findSelectedCategory,
    ]
  );

  const updateFilter = useCallback(
    (key: keyof CatalogFilters, value: any) => {
      setFilterState(prev => {
        const newFilters = { ...prev.filters, [key]: value };

        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
          applyFilters(newFilters);
        }, 100);

        return {
          ...prev,
          filters: newFilters,
        };
      });
    },
    [applyFilters]
  );

  const clearFilters = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    lastAppliedFiltersRef.current = '';

    setFilterState({
      filters: { gender: 'all', available: 'all' },
      selectedCategory: null,
      isLoading: false,
      hasActiveFilters: false,
    });

    const cleanedPuppies = initialPuppies.map(cleanPuppyData);
    setFilteredPuppies(cleanedPuppies);
    onFilteredResults?.(cleanedPuppies);
  }, [initialPuppies, onFilteredResults]);

  useEffect(() => {
    const cleanedPuppies = initialPuppies.map(cleanPuppyData);
    setFilteredPuppies(cleanedPuppies);
    lastAppliedFiltersRef.current = '';
  }, [initialPuppies]);

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  const memoizedReturn = useMemo(
    () => ({
      filters: filterState.filters,
      selectedCategory: filterState.selectedCategory,
      isLoading: filterState.isLoading,
      hasActiveFilters: filterState.hasActiveFilters,
      filteredPuppies,
      updateFilter,
      clearFilters,
    }),
    [filterState, filteredPuppies, updateFilter, clearFilters]
  );

  return memoizedReturn;
}
