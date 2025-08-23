'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { PuppyFilters, FilterState } from '@/lib/types/filters';
import { Puppy } from '@/domain/entities/Puppy';
import { getFilteredPuppiesAction } from '@/actions/puppyActions';

interface UsePuppyFiltersProps {
  initialPuppies: Puppy[];
  onFilteredResults?: (puppies: Puppy[]) => void;
}

export function usePuppyFilters({
  initialPuppies,
  onFilteredResults,
}: UsePuppyFiltersProps) {
  const [filterState, setFilterState] = useState<FilterState>({
    filters: {},
    isLoading: false,
    hasActiveFilters: false,
  });

  const [filteredPuppies, setFilteredPuppies] =
    useState<Puppy[]>(initialPuppies);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const lastAppliedFiltersRef = useRef<string>('');

  const checkHasActiveFilters = useCallback(
    (filters: PuppyFilters): boolean => {
      return !!(
        filters.categoryId ||
        (filters.gender && filters.gender !== 'all') ||
        (filters.available !== undefined && filters.available !== 'all') ||
        filters.search
      );
    },
    []
  );

  const applyFilters = useCallback(
    async (filters: PuppyFilters) => {
      const filtersKey = JSON.stringify(filters);

      if (lastAppliedFiltersRef.current === filtersKey) {
        return;
      }

      lastAppliedFiltersRef.current = filtersKey;
      setFilterState(prev => ({ ...prev, isLoading: true }));

      try {
        if (!checkHasActiveFilters(filters)) {
          setFilteredPuppies(initialPuppies);
          onFilteredResults?.(initialPuppies);
        } else {
          const result = await getFilteredPuppiesAction(filters);

          if (result.success && result.puppies) {
            setFilteredPuppies(result.puppies);
            onFilteredResults?.(result.puppies);
          }
        }
      } catch (error) {
        console.error('Error applying filters:', error);
      } finally {
        setFilterState(prev => ({
          ...prev,
          isLoading: false,
          hasActiveFilters: checkHasActiveFilters(filters),
        }));
      }
    },
    [initialPuppies, onFilteredResults, checkHasActiveFilters]
  );

  const updateFilter = useCallback(
    (key: keyof PuppyFilters, value: any) => {
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
      filters: {},
      isLoading: false,
      hasActiveFilters: false,
    });

    setFilteredPuppies(initialPuppies);
    onFilteredResults?.(initialPuppies);
  }, [initialPuppies, onFilteredResults]);

  const updateSearch = useCallback(
    (searchTerm: string) => {
      updateFilter('search', searchTerm || undefined);
    },
    [updateFilter]
  );

  useEffect(() => {
    setFilteredPuppies(initialPuppies);
    lastAppliedFiltersRef.current = '';
  }, [initialPuppies]);

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
    filteredPuppies,
    updateFilter,
    updateSearch,
    clearFilters,
  };
}
