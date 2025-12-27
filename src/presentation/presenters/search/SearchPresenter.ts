/**
 * Search page presenter
 * Handles business logic for the search page
 */

import type { SearchFilters, SearchViewModel } from "@/src/domain/entities/types";
import { mockContentRepository } from "@/src/infrastructure/repositories/mockContentRepository";
import type { Metadata } from "next";

export class SearchPresenter {
  /**
   * Get view model for search page
   */
  async getViewModel(
    filters: SearchFilters,
    page: number = 1
  ): Promise<SearchViewModel> {
    return await mockContentRepository.getSearchViewModel(filters, page, 24);
  }

  /**
   * Generate metadata for search page
   */
  generateMetadata(query?: string): Metadata {
    const title = query 
      ? `Search results for "${query}" - Nextflix`
      : "Search - Nextflix";
    
    return {
      title,
      description: query
        ? `Search results for "${query}" on Nextflix. Find movies and TV shows.`
        : "Search for your favorite movies and TV shows on Nextflix.",
      keywords: ["search", "movies", "tv shows", query].filter(Boolean) as string[],
    };
  }
}

/**
 * Factory for creating SearchPresenter instances
 */
export class SearchPresenterFactory {
  static createServer(): SearchPresenter {
    return new SearchPresenter();
  }

  static createClient(): SearchPresenter {
    return new SearchPresenter();
  }
}
