"use client";

import type { SearchViewModel } from "@/src/domain/entities/types";
import { useSearchPresenter } from "@/src/presentation/presenters/search/useSearchPresenter";
import { ContentGrid } from "../browse/ContentGrid";
import { MainLayout } from "../layouts/MainLayout";
import { SearchInput } from "./SearchInput";

interface SearchViewProps {
  initialQuery?: string;
  initialViewModel?: SearchViewModel;
}

/**
 * Search page view component
 */
export function SearchView({ initialQuery, initialViewModel }: SearchViewProps) {
  const [state, actions] = useSearchPresenter(initialQuery, initialViewModel);
  const { viewModel, loading, query } = state;

  return (
    <MainLayout>
      <div className="h-full overflow-y-auto scrollbar-hide">
        {/* Search Header */}
        <div className="pt-20 px-4 md:px-12">
          <SearchInput 
            value={query}
            onChange={actions.search}
            loading={loading}
          />

          {/* Type Filters */}
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => actions.setTypeFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !viewModel?.filters.type
                  ? "bg-white text-black"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              All
            </button>
            <button
              onClick={() => actions.setTypeFilter("movie")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                viewModel?.filters.type === "movie"
                  ? "bg-white text-black"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              Movies
            </button>
            <button
              onClick={() => actions.setTypeFilter("series")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                viewModel?.filters.type === "series"
                  ? "bg-white text-black"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              TV Shows
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="px-4 md:px-12 py-8">
          {!query && !viewModel ? (
            // Empty state - no search yet
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <svg className="w-20 h-20 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-white mb-2">Search for Movies & TV Shows</h3>
              <p className="text-gray-400">
                Start typing to search for your favorite content
              </p>
            </div>
          ) : (
            <>
              {/* Results Count */}
              {viewModel && (
                <p className="text-gray-400 mb-6">
                  {viewModel.results.totalCount === 0 
                    ? `No results found for "${viewModel.query}"`
                    : `${viewModel.results.totalCount} results for "${viewModel.query}"`
                  }
                </p>
              )}

              {/* Content Grid */}
              <ContentGrid 
                contents={viewModel?.results.items || []}
                loading={loading}
              />
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
