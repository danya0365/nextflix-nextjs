"use client";

import type { BrowseViewModel, SortOption } from "@/src/domain/entities/types";
import { useCallback, useEffect, useState, useTransition } from "react";
import { BrowsePresenterFactory } from "./BrowsePresenter";

const presenter = BrowsePresenterFactory.createClient();

export interface BrowsePresenterState {
  viewModel: BrowseViewModel | null;
  loading: boolean;
  error: string | null;
}

export interface BrowsePresenterActions {
  loadData: (genreSlug?: string, sortBy?: SortOption, page?: number) => Promise<void>;
  setGenre: (genreSlug?: string) => void;
  setSortBy: (sortBy: SortOption) => void;
  setPage: (page: number) => void;
}

/**
 * Custom hook for browse page presenter
 */
export function useBrowsePresenter(
  initialGenre?: string,
  initialSortBy: SortOption = "popular",
  initialViewModel?: BrowseViewModel
): [BrowsePresenterState, BrowsePresenterActions] {
  const [viewModel, setViewModel] = useState<BrowseViewModel | null>(initialViewModel || null);
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [currentGenre, setCurrentGenre] = useState<string | undefined>(initialGenre);
  const [currentSortBy, setCurrentSortBy] = useState<SortOption>(initialSortBy);
  const [currentPage, setCurrentPage] = useState(1);

  const loadData = useCallback(async (
    genreSlug?: string,
    sortBy: SortOption = "popular",
    page: number = 1
  ) => {
    setLoading(true);
    setError(null);

    try {
      const data = await presenter.getViewModel(genreSlug, sortBy, page);
      setViewModel(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error loading browse data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const setGenre = useCallback((genreSlug?: string) => {
    setCurrentGenre(genreSlug);
    setCurrentPage(1);
    startTransition(() => {
      loadData(genreSlug, currentSortBy, 1);
    });
  }, [currentSortBy, loadData]);

  const setSortBy = useCallback((sortBy: SortOption) => {
    setCurrentSortBy(sortBy);
    setCurrentPage(1);
    startTransition(() => {
      loadData(currentGenre, sortBy, 1);
    });
  }, [currentGenre, loadData]);

  const setPage = useCallback((page: number) => {
    setCurrentPage(page);
    startTransition(() => {
      loadData(currentGenre, currentSortBy, page);
    });
  }, [currentGenre, currentSortBy, loadData]);

  useEffect(() => {
    if (!initialViewModel) {
      loadData(initialGenre, initialSortBy, 1);
    }
  }, [initialViewModel, initialGenre, initialSortBy, loadData]);

  return [
    { viewModel, loading: loading || isPending, error },
    { loadData, setGenre, setSortBy, setPage },
  ];
}
