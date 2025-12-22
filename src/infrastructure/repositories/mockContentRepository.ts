/**
 * Mock content repository
 * Provides data access methods using mock data
 */

import type { Content, ContentRow, FeaturedContent, Genre, HomeViewModel } from "@/src/domain/entities/types";
import { contentRows, featuredContent, genres, mockContents } from "../data/mockData";

export class MockContentRepository {
  /**
   * Get home page view model
   */
  async getHomeViewModel(): Promise<HomeViewModel> {
    // Simulate network delay
    await this.delay(100);
    
    return {
      featured: featuredContent,
      rows: contentRows,
    };
  }

  /**
   * Get featured content for hero section
   */
  async getFeatured(): Promise<FeaturedContent> {
    await this.delay(50);
    return featuredContent;
  }

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
   * Get content by genre
   */
  async getByGenre(genreSlug: string): Promise<Content[]> {
    await this.delay(50);
    return mockContents.filter(c => 
      c.genres.some(g => g.slug === genreSlug)
    );
  }

  /**
   * Get content by ID
   */
  async getById(id: string): Promise<Content | null> {
    await this.delay(50);
    return mockContents.find(c => c.id === id) || null;
  }

  /**
   * Search content
   */
  async search(query: string): Promise<Content[]> {
    await this.delay(100);
    const lowerQuery = query.toLowerCase();
    return mockContents.filter(c =>
      c.title.toLowerCase().includes(lowerQuery) ||
      c.description.toLowerCase().includes(lowerQuery) ||
      c.genres.some(g => g.name.toLowerCase().includes(lowerQuery))
    );
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
      .slice(0, limit);
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
