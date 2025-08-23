'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { CategoryFilters, CategoryFilterState } from '@/lib/types/filters';
import { Category } from '@/domain/entities/Category';
import { getFilteredCategoriesAction } from '@/actions/categoryActions';

interface UseCategoryFiltersProps {
  initialCategories: Category[];
  onFilteredResults?: (categories: Category[]) => void;
}

export function useCategoryFilters({
  initialCategories,
  onFilteredResults,
}: UseCategoryFiltersProps) {
  const [filterState, setFilterState] = useState<CategoryFilterState>({
    filters: { sortBy: 'name', sortOrder: 'asc' },
    isLoading: false,
    hasActiveFilters: false,
  });

  const [filteredCategories, setFilteredCategories] =
    useState<Category[]>(initialCategories);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const lastAppliedFiltersRef = useRef<string>('');

  const checkHasActiveFilters = useCallback(
    (filters: CategoryFilters): boolean => {
      return !!(
        filters.search ||
        (filters.sortBy && filters.sortBy !== 'name') ||
        (filters.sortOrder && filters.sortOrder !== 'asc')
      );
    },
    []
  );

  const applyFilters = useCallback(
    async (filters: CategoryFilters) => {
      const filtersKey = JSON.stringify(filters);

      if (lastAppliedFiltersRef.current === filtersKey) {
        return;
      }

      lastAppliedFiltersRef.current = filtersKey;
      setFilterState(prev => ({ ...prev, isLoading: true }));

      try {
        if (!checkHasActiveFilters(filters)) {
          setFilteredCategories(initialCategories);
          onFilteredResults?.(initialCategories);
        } else {
          const result = await getFilteredCategoriesAction(filters);

          if (result.success && result.categories) {
            setFilteredCategories(result.categories);
            onFilteredResults?.(result.categories);
          }
        }
      } catch (error) {
        console.error('Error applying category filters:', error);
      } finally {
        setFilterState(prev => ({
          ...prev,
          isLoading: false,
          hasActiveFilters: checkHasActiveFilters(filters),
        }));
      }
    },
    [initialCategories, onFilteredResults, checkHasActiveFilters]
  );

  const updateFilter = useCallback(
    (key: keyof CategoryFilters, value: any) => {
      setFilterState(prev => {
        const newFilters = { ...prev.filters, [key]: value };

        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
        }

        const delay = key === 'search' ? 300 : 100;

        debounceTimeoutRef.current = setTimeout(() => {
          applyFilters(newFilters);
        }, delay);

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
      filters: { sortBy: 'name', sortOrder: 'asc' },
      isLoading: false,
      hasActiveFilters: false,
    });

    setFilteredCategories(initialCategories);
    onFilteredResults?.(initialCategories);
  }, [initialCategories, onFilteredResults]);

  const updateSearch = useCallback(
    (searchTerm: string) => {
      updateFilter('search', searchTerm || undefined);
    },
    [updateFilter]
  );

  useEffect(() => {
    setFilteredCategories(initialCategories);
    lastAppliedFiltersRef.current = '';
  }, [initialCategories]);

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  const memoizedFilters = useMemo(
    () => filterState.filters,
    [filterState.filters]
  );

  return {
    filters: memoizedFilters,
    isLoading: filterState.isLoading,
    hasActiveFilters: filterState.hasActiveFilters,
    filteredCategories,
    updateFilter,
    updateSearch,
    clearFilters,
  };
}
