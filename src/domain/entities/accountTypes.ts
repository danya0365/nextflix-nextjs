/**
 * Account Settings View Model types
 */

import type { SubscriptionPlan, User, UserProfile } from "@/src/domain/entities/types";

export interface AccountSettingsViewModel {
  user: User;
  currentProfile: UserProfile;
  memberSince: string;
  nextBillingDate: string;
  subscriptionDetails: SubscriptionDetails;
}

export interface SubscriptionDetails {
  plan: SubscriptionPlan;
  planName: string;
  price: string;
  features: string[];
  maxScreens: number;
  videoQuality: string;
}

export interface ProfileEditViewModel {
  profile: UserProfile;
  isEditing: boolean;
  availableLanguages: Language[];
  maturityLevels: MaturityLevel[];
}

export interface Language {
  code: string;
  name: string;
}

export interface MaturityLevel {
  rating: string;
  description: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  newReleases: boolean;
  recommendations: boolean;
  accountUpdates: boolean;
}

export interface PlaybackSettings {
  autoPlayNext: boolean;
  autoPlayPreviews: boolean;
  dataUsage: "auto" | "low" | "medium" | "high";
  downloadQuality: "standard" | "high";
}
