"use client";

import type { MyListViewModel } from "@/src/domain/entities/types";
import { mockUserRepository } from "@/src/infrastructure/repositories/mockUserRepository";
import { useCallback, useState, useTransition } from "react";
import { MyListPresenterFactory } from "./MyListPresenter";

const presenter = MyListPresenterFactory.createClient();

export interface MyListState {
  viewModel: MyListViewModel;
  loading: boolean;
}

export interface MyListActions {
  removeFromList: (contentId: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useMyListPresenter(
  initialViewModel: MyListViewModel
): [MyListState, MyListActions] {
  const [viewModel, setViewModel] = useState(initialViewModel);
  const [isPending, startTransition] = useTransition();

  const removeFromList = useCallback(async (contentId: string) => {
    try {
      await mockUserRepository.removeFromWatchlist(contentId);
      setViewModel(prev => ({
        ...prev,
        items: prev.items.filter(item => item.contentId !== contentId),
        totalCount: prev.totalCount - 1,
      }));
    } catch (error) {
      console.error("Error removing from list:", error);
    }
  }, []);

  const refresh = useCallback(async () => {
    startTransition(async () => {
      const newViewModel = await presenter.getViewModel();
      setViewModel(newViewModel);
    });
  }, []);

  return [
    { viewModel, loading: isPending },
    { removeFromList, refresh },
  ];
}
