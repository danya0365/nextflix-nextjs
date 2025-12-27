"use client";

import type { ContentDetailViewModel } from "@/src/domain/entities/types";
import { mockUserRepository } from "@/src/infrastructure/repositories/mockUserRepository";
import { useCallback, useState } from "react";

export interface ContentDetailState {
  viewModel: ContentDetailViewModel;
  loading: boolean;
}

export interface ContentDetailActions {
  toggleWatchlist: () => Promise<void>;
  playContent: () => void;
}

/**
 * Custom hook for content detail page interactions
 */
export function useContentDetailPresenter(
  initialViewModel: ContentDetailViewModel
): [ContentDetailState, ContentDetailActions] {
  const [viewModel, setViewModel] = useState(initialViewModel);
  const [loading, setLoading] = useState(false);

  const toggleWatchlist = useCallback(async () => {
    setLoading(true);
    try {
      const isNowInWatchlist = await mockUserRepository.toggleWatchlist(viewModel.content.id);
      setViewModel(prev => ({
        ...prev,
        isInWatchlist: isNowInWatchlist,
      }));
    } catch (error) {
      console.error("Error toggling watchlist:", error);
    } finally {
      setLoading(false);
    }
  }, [viewModel.content.id]);

  const playContent = useCallback(() => {
    // In real app, this would navigate to video player or start playback
    console.log("Playing content:", viewModel.content.id);
  }, [viewModel.content.id]);

  return [
    { viewModel, loading },
    { toggleWatchlist, playContent },
  ];
}
