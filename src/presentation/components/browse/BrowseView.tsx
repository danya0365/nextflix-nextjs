"use client";

import type { BrowseViewModel, SortOption } from "@/src/domain/entities/types";
import { useBrowsePresenter } from "@/src/presentation/presenters/browse/useBrowsePresenter";
import { MainLayout } from "../layouts/MainLayout";
import { ContentGrid } from "./ContentGrid";
import { GenreFilter } from "./GenreFilter";
import { Pagination } from "./Pagination";
import { SortSelect } from "./SortSelect";

interface BrowseViewProps {
  initialGenre?: string;
  initialSortBy?: SortOption;
  initialViewModel?: BrowseViewModel;
}

/**
 * Browse page view component
 * Displays content grid with genre filter and sorting
 */
export function BrowseView({ 
  initialGenre, 
  initialSortBy = "popular",
  initialViewModel 
}: BrowseViewProps) {
  const [state, actions] = useBrowsePresenter(initialGenre, initialSortBy, initialViewModel);
  const { viewModel, loading, error } = state;

  if (error) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
          <h2 className="text-2xl font-bold text-white mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => actions.loadData(initialGenre, initialSortBy)}
            className="btn-play"
          >
            Try Again
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="h-full overflow-y-auto scrollbar-hide">
        {/* Header */}
        <div className="pt-20 px-4 md:px-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {viewModel?.selectedGenre?.name || "Browse All"}
            </h1>
            
            <div className="flex items-center gap-4">
              <SortSelect 
                value={viewModel?.sortBy || "popular"}
                onChange={actions.setSortBy}
              />
            </div>
          </div>

          {/* Genre Filter */}
          <GenreFilter
            genres={viewModel?.genres || []}
            selectedGenre={viewModel?.selectedGenre?.slug}
            onSelectGenre={actions.setGenre}
          />
        </div>

        {/* Content Grid */}
        <div className="px-4 md:px-12 py-8">
          {loading && !viewModel ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-netflix-red"></div>
            </div>
          ) : (
            <>
              <ContentGrid 
                contents={viewModel?.contents.items || []}
                loading={loading}
              />

              {/* Pagination */}
              {viewModel?.contents && viewModel.contents.totalPages > 1 && (
                <Pagination
                  currentPage={viewModel.contents.page}
                  totalPages={viewModel.contents.totalPages}
                  onPageChange={actions.setPage}
                />
              )}
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
