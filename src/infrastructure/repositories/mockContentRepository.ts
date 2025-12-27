/**
 * Mock content repository
 * Provides data access methods using mock data
 */

import type {
  BrowseViewModel,
  Content,
  ContentDetailViewModel,
  ContentRow,
  FeaturedContent,
  Genre,
  HomeViewModel,
  PaginatedResult,
  SearchFilters,
  SearchViewModel,
  Season,
  SortOption
} from "@/src/domain/entities/types";
import {
  contentRows,
  featuredContent,
  genres,
  mockContents,
  mockSeasons,
  recentSearches
} from "../data/mockData";
import { mockUserRepository } from "./mockUserRepository";

export class MockContentRepository {
  /**
   * Get home page view model
   */
  async getHomeViewModel(): Promise<HomeViewModel> {
    await this.delay(100);
    
    const continueWatching = await mockUserRepository.getContinueWatching();
    
    return {
      featured: featuredContent,
      rows: contentRows,
      continueWatching: continueWatching.length > 0 ? continueWatching : undefined,
    };
  }

  /**
   * Get featured content for hero section
   */
  async getFeatured(): Promise<FeaturedContent> {
    await this.delay(50);
    return featuredContent;
  }

  // ============================================
  // BROWSE
  // ============================================

  /**
   * Get browse page view model
   */
  async getBrowseViewModel(
    genreSlug?: string,
    sortBy: SortOption = "popular",
    page: number = 1,
    perPage: number = 20
  ): Promise<BrowseViewModel> {
    await this.delay(100);

    let filtered = [...mockContents];

    // Filter by genre
    if (genreSlug && genreSlug !== "all") {
      filtered = filtered.filter(c => 
        c.genres.some(g => g.slug === genreSlug)
      );
    }

    // Sort
    filtered = this.sortContents(filtered, sortBy);

    // Paginate
    const paginated = this.paginate(filtered, page, perPage);

    return {
      genres,
      contents: paginated,
      selectedGenre: genres.find(g => g.slug === genreSlug),
      sortBy,
    };
  }

  /**
   * Get contents by genre with pagination
   */
  async getByGenre(
    genreSlug: string,
    page: number = 1,
    perPage: number = 20
  ): Promise<PaginatedResult<Content>> {
    await this.delay(50);
    
    const filtered = mockContents.filter(c => 
      c.genres.some(g => g.slug === genreSlug)
    );
    
    return this.paginate(filtered, page, perPage);
  }

  // ============================================
  // SEARCH
  // ============================================

  /**
   * Get search view model
   */
  async getSearchViewModel(
    filters: SearchFilters,
    page: number = 1,
    perPage: number = 20
  ): Promise<SearchViewModel> {
    await this.delay(100);

    const results = await this.search(filters, page, perPage);

    return {
      query: filters.query || "",
      results,
      filters,
      recentSearches,
    };
  }

  /**
   * Search content with filters
   */
  async search(
    filters: SearchFilters,
    page: number = 1,
    perPage: number = 20
  ): Promise<PaginatedResult<Content>> {
    await this.delay(100);
    
    let filtered = [...mockContents];

    // Search by query
    if (filters.query) {
      const lowerQuery = filters.query.toLowerCase();
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(lowerQuery) ||
        c.description.toLowerCase().includes(lowerQuery) ||
        c.genres.some(g => g.name.toLowerCase().includes(lowerQuery)) ||
        c.cast.some(m => m.name.toLowerCase().includes(lowerQuery))
      );
    }

    // Filter by type
    if (filters.type && filters.type !== "all") {
      filtered = filtered.filter(c => c.type === filters.type);
    }

    // Filter by genre
    if (filters.genreId) {
      const genre = genres.find(g => g.id === filters.genreId);
      if (genre) {
        filtered = filtered.filter(c => 
          c.genres.some(g => g.id === filters.genreId)
        );
      }
    }

    // Filter by year
    if (filters.year) {
      filtered = filtered.filter(c => c.releaseYear === filters.year);
    }

    // Sort
    if (filters.sortBy) {
      filtered = this.sortContents(filtered, filters.sortBy);
    }

    return this.paginate(filtered, page, perPage);
  }

  // ============================================
  // CONTENT DETAIL
  // ============================================

  /**
   * Get content detail view model
   */
  async getContentDetailViewModel(contentId: string): Promise<ContentDetailViewModel | null> {
    await this.delay(100);

    const content = mockContents.find(c => c.id === contentId);
    if (!content) return null;

    const isInWatchlist = await mockUserRepository.isInWatchlist(contentId);
    const watchProgress = await mockUserRepository.getWatchProgress(contentId);
    const similarContents = await this.getSimilar(contentId, 8);
    
    // Get seasons for series
    let seasons: Season[] | undefined;
    if (content.type === "series") {
      seasons = mockSeasons[contentId] || [];
    }

    return {
      content,
      seasons,
      similarContents,
      isInWatchlist,
      watchProgress: watchProgress || undefined,
    };
  }

  /**
   * Get content by ID
   */
  async getById(id: string): Promise<Content | null> {
    await this.delay(50);
    return mockContents.find(c => c.id === id) || null;
  }

  /**
   * Get seasons for a series
   */
  async getSeasons(seriesId: string): Promise<Season[]> {
    await this.delay(50);
    return mockSeasons[seriesId] || [];
  }

  /**
   * Get similar content based on genres
   */
  async getSimilar(contentId: string, limit: number = 6): Promise<Content[]> {
    await this.delay(50);
    const content = mockContents.find(c => c.id === contentId);
    if (!content) return [];

    const genreSlugs = content.genres.map(g => g.slug);
    return mockContents
      .filter(c => 
        c.id !== contentId &&
        c.genres.some(g => genreSlugs.includes(g.slug))
      )
      .sort((a, b) => {
        // Score by genre overlap
        const aScore = a.genres.filter(g => genreSlugs.includes(g.slug)).length;
        const bScore = b.genres.filter(g => genreSlugs.includes(g.slug)).length;
        return bScore - aScore;
      })
      .slice(0, limit);
  }

  // ============================================
  // UTILITIES
  // ============================================

  /**
   * Get trending content
   */
  async getTrending(): Promise<Content[]> {
    await this.delay(50);
    return mockContents.filter(c => c.isTrending);
  }

  /**
   * Get new releases
   */
  async getNewReleases(): Promise<Content[]> {
    await this.delay(50);
    return mockContents.filter(c => c.isNew);
  }

  /**
   * Get Top 10
   */
  async getTop10(): Promise<Content[]> {
    await this.delay(50);
    return mockContents
      .filter(c => c.isTop10)
      .sort((a, b) => (a.top10Rank || 99) - (b.top10Rank || 99));
  }

  /**
   * Get all genres
   */
  async getGenres(): Promise<Genre[]> {
    await this.delay(50);
    return genres;
  }

  /**
   * Get content rows for home page
   */
  async getContentRows(): Promise<ContentRow[]> {
    await this.delay(100);
    return contentRows;
  }

  /**
   * Get all content (for browse all)
   */
  async getAllContent(
    page: number = 1,
    perPage: number = 20
  ): Promise<PaginatedResult<Content>> {
    await this.delay(50);
    return this.paginate(mockContents, page, perPage);
  }

  // ============================================
  // HELPERS
  // ============================================

  private sortContents(contents: Content[], sortBy: SortOption): Content[] {
    const sorted = [...contents];
    
    switch (sortBy) {
      case "newest":
        return sorted.sort((a, b) => b.releaseYear - a.releaseYear);
      case "oldest":
        return sorted.sort((a, b) => a.releaseYear - b.releaseYear);
      case "popular":
        return sorted.sort((a, b) => b.totalRatings - a.totalRatings);
      case "rating":
        return sorted.sort((a, b) => b.averageRating - a.averageRating);
      case "a-z":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "z-a":
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return sorted;
    }
  }

  private paginate<T>(items: T[], page: number, perPage: number): PaginatedResult<T> {
    const totalCount = items.length;
    const totalPages = Math.ceil(totalCount / perPage);
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    return {
      items: items.slice(startIndex, endIndex),
      totalCount,
      page,
      perPage,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  }

  /**
   * Helper to simulate network delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Singleton instance
export const mockContentRepository = new MockContentRepository();
