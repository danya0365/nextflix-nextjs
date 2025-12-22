"use client";

import type { HomeViewModel } from "@/src/domain/entities/types";
import { useCallback, useEffect, useState } from "react";
import { HomePresenterFactory } from "./HomePresenter";

const presenter = HomePresenterFactory.createClient();

export interface HomePresenterState {
  viewModel: HomeViewModel | null;
  loading: boolean;
  error: string | null;
}

export interface HomePresenterActions {
  loadData: () => Promise<void>;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for home page presenter
 */
export function useHomePresenter(
  initialViewModel?: HomeViewModel
): [HomePresenterState, HomePresenterActions] {
  const [viewModel, setViewModel] = useState<HomeViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await presenter.getViewModel();
      setViewModel(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error loading home data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialViewModel) {
      loadData();
    }
  }, [initialViewModel, loadData]);

  return [
    { viewModel, loading, error },
    { loadData, setError },
  ];
}
