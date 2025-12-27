/**
 * Mock account repository
 * Handles account settings and profile management
 */

import type {
    AccountSettingsViewModel,
    Language,
    MaturityLevel,
    NotificationSettings,
    PlaybackSettings,
    ProfileEditViewModel,
    SubscriptionDetails,
} from "@/src/domain/entities/accountTypes";
import type { SubscriptionPlan, UserProfile } from "@/src/domain/entities/types";
import { mockProfiles, mockUsers } from "../data/mockData";

// Mock notification settings per profile
const mockNotificationSettings: Record<string, NotificationSettings> = {
  "profile-1": {
    emailNotifications: true,
    pushNotifications: true,
    newReleases: true,
    recommendations: true,
    accountUpdates: true,
  },
  "profile-2": {
    emailNotifications: true,
    pushNotifications: false,
    newReleases: true,
    recommendations: false,
    accountUpdates: true,
  },
};

// Mock playback settings per profile
const mockPlaybackSettings: Record<string, PlaybackSettings> = {
  "profile-1": {
    autoPlayNext: true,
    autoPlayPreviews: true,
    dataUsage: "auto",
    downloadQuality: "high",
  },
  "profile-2": {
    autoPlayNext: true,
    autoPlayPreviews: false,
    dataUsage: "medium",
    downloadQuality: "standard",
  },
};

// Available languages
const availableLanguages: Language[] = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
  { code: "zh", name: "中文" },
  { code: "th", name: "ไทย" },
  { code: "pt", name: "Português" },
  { code: "it", name: "Italiano" },
];

// Maturity levels
const maturityLevels: MaturityLevel[] = [
  { rating: "TV-Y", description: "All Children" },
  { rating: "TV-Y7", description: "Older Children" },
  { rating: "TV-G", description: "General Audience" },
  { rating: "TV-PG", description: "Parental Guidance" },
  { rating: "TV-14", description: "Parents Strongly Cautioned" },
  { rating: "TV-MA", description: "Mature Audiences Only" },
];

// Subscription plan details
const subscriptionPlans: Record<SubscriptionPlan, SubscriptionDetails> = {
  basic: {
    plan: "basic",
    planName: "Basic",
    price: "$9.99/month",
    features: ["Watch on 1 device at a time", "720p resolution", "Download on 1 device"],
    maxScreens: 1,
    videoQuality: "720p",
  },
  standard: {
    plan: "standard",
    planName: "Standard",
    price: "$15.49/month",
    features: ["Watch on 2 devices at a time", "1080p resolution", "Download on 2 devices"],
    maxScreens: 2,
    videoQuality: "1080p",
  },
  premium: {
    plan: "premium",
    planName: "Premium",
    price: "$22.99/month",
    features: ["Watch on 4 devices at a time", "4K + HDR", "Download on 6 devices", "Spatial Audio"],
    maxScreens: 4,
    videoQuality: "4K + HDR",
  },
};

// Current profile ID (should be managed by context/session in real app)
let currentProfileId = "profile-1";

export class MockAccountRepository {
  /**
   * Get account settings view model
   */
  async getAccountSettingsViewModel(): Promise<AccountSettingsViewModel> {
    await this.delay(100);

    const user = mockUsers[0];
    const currentProfile = mockProfiles.find((p) => p.id === currentProfileId) || mockProfiles[0];
    const subscriptionDetails = subscriptionPlans[user.subscription];

    return {
      user,
      currentProfile,
      memberSince: new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
      nextBillingDate: this.getNextBillingDate(),
      subscriptionDetails,
    };
  }

  /**
   * Get profile edit view model
   */
  async getProfileEditViewModel(profileId: string): Promise<ProfileEditViewModel | null> {
    await this.delay(50);

    const profile = mockProfiles.find((p) => p.id === profileId);
    if (!profile) return null;

    return {
      profile,
      isEditing: false,
      availableLanguages,
      maturityLevels,
    };
  }

  /**
   * Update profile
   */
  async updateProfile(
    profileId: string,
    updates: Partial<Pick<UserProfile, "name" | "avatarUrl" | "avatarColor" | "language" | "maturityLevel" | "isKidsProfile">>
  ): Promise<UserProfile | null> {
    await this.delay(100);

    const profileIndex = mockProfiles.findIndex((p) => p.id === profileId);
    if (profileIndex === -1) return null;

    mockProfiles[profileIndex] = {
      ...mockProfiles[profileIndex],
      ...updates,
    };

    return mockProfiles[profileIndex];
  }

  /**
   * Create new profile
   */
  async createProfile(name: string, avatarUrl: string, avatarColor: string, isKidsProfile: boolean): Promise<UserProfile> {
    await this.delay(100);

    const newProfile: UserProfile = {
      id: `profile-${Date.now()}`,
      userId: mockUsers[0].id,
      name,
      avatarUrl,
      avatarColor,
      isKidsProfile,
      language: "en",
      maturityLevel: isKidsProfile ? "TV-Y" : "TV-MA",
      autoPlayNext: true,
      autoPlayPreviews: !isKidsProfile,
    };

    mockProfiles.push(newProfile);
    return newProfile;
  }

  /**
   * Delete profile
   */
  async deleteProfile(profileId: string): Promise<boolean> {
    await this.delay(100);

    const index = mockProfiles.findIndex((p) => p.id === profileId);
    if (index === -1) return false;

    // Don't delete if it's the last profile
    if (mockProfiles.length <= 1) return false;

    mockProfiles.splice(index, 1);

    // If deleted current profile, switch to first available
    if (currentProfileId === profileId) {
      currentProfileId = mockProfiles[0].id;
    }

    return true;
  }

  /**
   * Get notification settings
   */
  async getNotificationSettings(profileId?: string): Promise<NotificationSettings> {
    await this.delay(50);
    const pid = profileId || currentProfileId;
    return (
      mockNotificationSettings[pid] || {
        emailNotifications: true,
        pushNotifications: true,
        newReleases: true,
        recommendations: true,
        accountUpdates: true,
      }
    );
  }

  /**
   * Update notification settings
   */
  async updateNotificationSettings(settings: Partial<NotificationSettings>, profileId?: string): Promise<NotificationSettings> {
    await this.delay(100);
    const pid = profileId || currentProfileId;

    mockNotificationSettings[pid] = {
      ...mockNotificationSettings[pid],
      ...settings,
    };

    return mockNotificationSettings[pid];
  }

  /**
   * Get playback settings
   */
  async getPlaybackSettings(profileId?: string): Promise<PlaybackSettings> {
    await this.delay(50);
    const pid = profileId || currentProfileId;
    return (
      mockPlaybackSettings[pid] || {
        autoPlayNext: true,
        autoPlayPreviews: true,
        dataUsage: "auto",
        downloadQuality: "high",
      }
    );
  }

  /**
   * Update playback settings
   */
  async updatePlaybackSettings(settings: Partial<PlaybackSettings>, profileId?: string): Promise<PlaybackSettings> {
    await this.delay(100);
    const pid = profileId || currentProfileId;

    mockPlaybackSettings[pid] = {
      ...mockPlaybackSettings[pid],
      ...settings,
    };

    return mockPlaybackSettings[pid];
  }

  /**
   * Get available subscription plans
   */
  async getSubscriptionPlans(): Promise<SubscriptionDetails[]> {
    await this.delay(50);
    return Object.values(subscriptionPlans);
  }

  /**
   * Change subscription plan
   */
  async changeSubscriptionPlan(newPlan: SubscriptionPlan): Promise<boolean> {
    await this.delay(200);
    mockUsers[0].subscription = newPlan;
    return true;
  }

  /**
   * Get available languages
   */
  async getLanguages(): Promise<Language[]> {
    await this.delay(50);
    return availableLanguages;
  }

  /**
   * Get maturity levels
   */
  async getMaturityLevels(): Promise<MaturityLevel[]> {
    await this.delay(50);
    return maturityLevels;
  }

  // ============================================
  // HELPERS
  // ============================================

  private getNextBillingDate(): string {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 15);
    return nextMonth.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Singleton instance
export const mockAccountRepository = new MockAccountRepository();
