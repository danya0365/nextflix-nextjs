/**
 * Browse page presenter
 * Handles business logic for the browse/categories page
 */

import type { BrowseViewModel, SortOption } from "@/src/domain/entities/types";
import { mockContentRepository } from "@/src/infrastructure/repositories/mockContentRepository";
import type { Metadata } from "next";

export class BrowsePresenter {
  /**
   * Get view model for browse page
   */
  async getViewModel(
    genreSlug?: string,
    sortBy: SortOption = "popular",
    page: number = 1
  ): Promise<BrowseViewModel> {
    return await mockContentRepository.getBrowseViewModel(genreSlug, sortBy, page, 24);
  }

  /**
   * Generate metadata for browse page
   */
  generateMetadata(genreName?: string): Metadata {
    const title = genreName 
      ? `${genreName} Movies & TV Shows - Nextflix`
      : "Browse Movies & TV Shows - Nextflix";
    
    return {
      title,
      description: genreName
        ? `Browse the best ${genreName.toLowerCase()} movies and TV shows on Nextflix.`
        : "Browse our complete collection of movies and TV shows. Find your next favorite.",
      keywords: ["browse", "movies", "tv shows", genreName?.toLowerCase()].filter(Boolean) as string[],
    };
  }
}

/**
 * Factory for creating BrowsePresenter instances
 */
export class BrowsePresenterFactory {
  static createServer(): BrowsePresenter {
    return new BrowsePresenter();
  }

  static createClient(): BrowsePresenter {
    return new BrowsePresenter();
  }
}
