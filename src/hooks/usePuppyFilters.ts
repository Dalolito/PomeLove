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
  // Filter state management
  const [filterState, setFilterState] = useState<FilterState>({
    filters: {},
    isLoading: false,
    hasActiveFilters: false,
  });

  const [filteredPuppies, setFilteredPuppies] =
    useState<Puppy[]>(initialPuppies);

  // Refs for debouncing and preventing duplicate calls
  const debounceTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const lastAppliedFiltersRef = useRef<string>('');

  // Check if any filters are currently active
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

  // Apply filters with server-side filtering
  const applyFilters = useCallback(
    async (filters: PuppyFilters) => {
      const filtersKey = JSON.stringify(filters);

      // Prevent duplicate filter applications
      if (lastAppliedFiltersRef.current === filtersKey) {
        return;
      }

      lastAppliedFiltersRef.current = filtersKey;
      setFilterState(prev => ({ ...prev, isLoading: true }));

      try {
        if (!checkHasActiveFilters(filters)) {
          // No active filters, show all initial puppies
          setFilteredPuppies(initialPuppies);
          onFilteredResults?.(initialPuppies);
        } else {
          // Apply server-side filtering
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

  // Update individual filter with debouncing
  const updateFilter = useCallback(
    (key: keyof PuppyFilters, value: any) => {
      setFilterState(prev => {
        const newFilters = { ...prev.filters, [key]: value };

        // Clear existing timeout
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
        }

        // Different debounce delays for search vs other filters
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

  // Clear all filters and reset to initial state
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
