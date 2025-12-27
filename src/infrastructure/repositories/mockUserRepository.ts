/**
 * Mock user repository
 * Handles user, profile, watchlist, and watch history operations
 */

import type {
    MyListViewModel,
    ProfileSelectViewModel,
    User,
    UserProfile,
    WatchHistory,
    WatchlistItem
} from "@/src/domain/entities/types";
import {
    mockContents,
    mockProfiles,
    mockUsers,
    mockWatchHistory,
    mockWatchlist
} from "../data/mockData";

// Simulated current profile (in real app, this would be in session/context)
let currentProfileId: string = "profile-1";

export class MockUserRepository {
  /**
   * Get current user
   */
  async getCurrentUser(): Promise<User | null> {
    await this.delay(50);
    const user = mockUsers[0];
    if (user) {
      user.profiles = mockProfiles.filter(p => p.userId === user.id);
    }
    return user || null;
  }

  /**
   * Get all profiles for current user
   */
  async getProfiles(): Promise<UserProfile[]> {
    await this.delay(50);
    return mockProfiles;
  }

  /**
   * Get profile by ID
   */
  async getProfileById(profileId: string): Promise<UserProfile | null> {
    await this.delay(50);
    return mockProfiles.find(p => p.id === profileId) || null;
  }

  /**
   * Get current active profile
   */
  async getCurrentProfile(): Promise<UserProfile | null> {
    await this.delay(50);
    return mockProfiles.find(p => p.id === currentProfileId) || null;
  }

  /**
   * Set current active profile
   */
  async setCurrentProfile(profileId: string): Promise<void> {
    await this.delay(50);
    currentProfileId = profileId;
  }

  /**
   * Get profile select view model
   */
  async getProfileSelectViewModel(): Promise<ProfileSelectViewModel> {
    await this.delay(50);
    return {
      profiles: mockProfiles,
      currentProfileId,
      canAddProfile: mockProfiles.length < 5,
      maxProfiles: 5,
    };
  }

  // ============================================
  // WATCH HISTORY
  // ============================================

  /**
   * Get watch history for current profile
   */
  async getWatchHistory(profileId?: string): Promise<WatchHistory[]> {
    await this.delay(50);
    const pid = profileId || currentProfileId;
    return mockWatchHistory
      .filter(wh => wh.profileId === pid)
      .sort((a, b) => new Date(b.watchedAt).getTime() - new Date(a.watchedAt).getTime());
  }

  /**
   * Get continue watching (in progress items)
   */
  async getContinueWatching(profileId?: string): Promise<WatchHistory[]> {
    await this.delay(50);
    const pid = profileId || currentProfileId;
    return mockWatchHistory
      .filter(wh => wh.profileId === pid && wh.progress < 100 && wh.progress > 0)
      .sort((a, b) => new Date(b.watchedAt).getTime() - new Date(a.watchedAt).getTime());
  }

  /**
   * Get watch progress for specific content
   */
  async getWatchProgress(contentId: string, profileId?: string): Promise<WatchHistory | null> {
    await this.delay(50);
    const pid = profileId || currentProfileId;
    return mockWatchHistory.find(wh => wh.profileId === pid && wh.contentId === contentId) || null;
  }

  /**
   * Add or update watch history
   */
  async updateWatchHistory(contentId: string, progress: number, episodeInfo?: {
    episodeId?: string;
    seasonNumber?: number;
    episodeNumber?: number;
  }): Promise<WatchHistory> {
    await this.delay(50);
    
    const existing = mockWatchHistory.find(
      wh => wh.profileId === currentProfileId && wh.contentId === contentId
    );

    if (existing) {
      existing.progress = progress;
      existing.watchedAt = new Date().toISOString();
      if (episodeInfo) {
        existing.currentEpisodeId = episodeInfo.episodeId;
        existing.currentSeasonNumber = episodeInfo.seasonNumber;
        existing.currentEpisodeNumber = episodeInfo.episodeNumber;
      }
      return existing;
    }

    const content = mockContents.find(c => c.id === contentId);
    if (!content) throw new Error("Content not found");

    const newHistory: WatchHistory = {
      id: `wh-${Date.now()}`,
      profileId: currentProfileId,
      contentId,
      content,
      watchedAt: new Date().toISOString(),
      progress,
      ...episodeInfo,
    };

    mockWatchHistory.push(newHistory);
    return newHistory;
  }

  // ============================================
  // WATCHLIST (My List)
  // ============================================

  /**
   * Get watchlist for current profile
   */
  async getWatchlist(profileId?: string): Promise<WatchlistItem[]> {
    await this.delay(50);
    const pid = profileId || currentProfileId;
    return mockWatchlist
      .filter(wl => wl.profileId === pid)
      .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
  }

  /**
   * Get My List view model
   */
  async getMyListViewModel(profileId?: string): Promise<MyListViewModel> {
    await this.delay(50);
    const items = await this.getWatchlist(profileId);
    return {
      items,
      totalCount: items.length,
    };
  }

  /**
   * Check if content is in watchlist
   */
  async isInWatchlist(contentId: string, profileId?: string): Promise<boolean> {
    await this.delay(50);
    const pid = profileId || currentProfileId;
    return mockWatchlist.some(wl => wl.profileId === pid && wl.contentId === contentId);
  }

  /**
   * Add content to watchlist
   */
  async addToWatchlist(contentId: string): Promise<WatchlistItem> {
    await this.delay(50);
    
    const existing = mockWatchlist.find(
      wl => wl.profileId === currentProfileId && wl.contentId === contentId
    );
    if (existing) return existing;

    const content = mockContents.find(c => c.id === contentId);
    if (!content) throw new Error("Content not found");

    const newItem: WatchlistItem = {
      id: `wl-${Date.now()}`,
      profileId: currentProfileId,
      contentId,
      content,
      addedAt: new Date().toISOString(),
    };

    mockWatchlist.push(newItem);
    return newItem;
  }

  /**
   * Remove content from watchlist
   */
  async removeFromWatchlist(contentId: string): Promise<void> {
    await this.delay(50);
    const index = mockWatchlist.findIndex(
      wl => wl.profileId === currentProfileId && wl.contentId === contentId
    );
    if (index > -1) {
      mockWatchlist.splice(index, 1);
    }
  }

  /**
   * Toggle watchlist status
   */
  async toggleWatchlist(contentId: string): Promise<boolean> {
    const isIn = await this.isInWatchlist(contentId);
    if (isIn) {
      await this.removeFromWatchlist(contentId);
      return false;
    } else {
      await this.addToWatchlist(contentId);
      return true;
    }
  }

  /**
   * Helper to simulate network delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Singleton instance
export const mockUserRepository = new MockUserRepository();
