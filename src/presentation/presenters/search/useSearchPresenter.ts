"use client";

import type { ContentType, SearchFilters, SearchViewModel } from "@/src/domain/entities/types";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { SearchPresenterFactory } from "./SearchPresenter";

const presenter = SearchPresenterFactory.createClient();

export interface SearchPresenterState {
  viewModel: SearchViewModel | null;
  loading: boolean;
  error: string | null;
  query: string;
}

export interface SearchPresenterActions {
  search: (query: string) => void;
  setTypeFilter: (type: ContentType | "all") => void;
  setGenreFilter: (genreId?: string) => void;
  clearFilters: () => void;
}

/**
 * Custom hook for search page presenter with debounce
 */
export function useSearchPresenter(
  initialQuery?: string,
  initialViewModel?: SearchViewModel
): [SearchPresenterState, SearchPresenterActions] {
  const [viewModel, setViewModel] = useState<SearchViewModel | null>(initialViewModel || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState(initialQuery || "");
  const [filters, setFilters] = useState<SearchFilters>({ query: initialQuery });
  const [isPending, startTransition] = useTransition();
  
  const debounceTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  const performSearch = useCallback(async (searchFilters: SearchFilters) => {
    if (!searchFilters.query && searchFilters.type === undefined && searchFilters.genreId === undefined) {
      setViewModel(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await presenter.getViewModel(searchFilters);
      setViewModel(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error searching:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const search = useCallback((newQuery: string) => {
    setQuery(newQuery);
    
    // Clear previous debounce
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Debounce search
    debounceTimer.current = setTimeout(() => {
      const newFilters = { ...filters, query: newQuery };
      setFilters(newFilters);
      startTransition(() => {
        performSearch(newFilters);
      });
    }, 300);
  }, [filters, performSearch]);

  const setTypeFilter = useCallback((type: ContentType | "all") => {
    const newFilters = { 
      ...filters, 
      type: type === "all" ? undefined : type 
    };
    setFilters(newFilters);
    startTransition(() => {
      performSearch(newFilters);
    });
  }, [filters, performSearch]);

  const setGenreFilter = useCallback((genreId?: string) => {
    const newFilters = { ...filters, genreId };
    setFilters(newFilters);
    startTransition(() => {
      performSearch(newFilters);
    });
  }, [filters, performSearch]);

  const clearFilters = useCallback(() => {
    const newFilters: SearchFilters = { query: filters.query };
    setFilters(newFilters);
    startTransition(() => {
      performSearch(newFilters);
    });
  }, [filters.query, performSearch]);

  // Initial search if query provided
  useEffect(() => {
    if (initialQuery && !initialViewModel) {
      performSearch({ query: initialQuery });
    }
  }, [initialQuery, initialViewModel, performSearch]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return [
    { viewModel, loading: loading || isPending, error, query },
    { search, setTypeFilter, setGenreFilter, clearFilters },
  ];
}
