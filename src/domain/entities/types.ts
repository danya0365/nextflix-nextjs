/**
 * Domain entities and types for Nextflix streaming service
 */

// Content Types
export type ContentType = "movie" | "series" | "documentary";
export type ContentRating = "G" | "PG" | "PG-13" | "R" | "NC-17" | "TV-Y" | "TV-G" | "TV-PG" | "TV-14" | "TV-MA";
export type SortOption = "newest" | "oldest" | "popular" | "rating" | "a-z" | "z-a";

export interface Genre {
  id: string;
  name: string;
  slug: string;
}

export interface Content {
  id: string;
  title: string;
  originalTitle?: string;
  type: ContentType;
  description: string;
  shortDescription?: string;
  releaseYear: number;
  rating: ContentRating;
  duration: number; // minutes for movies, average episode length for series
  posterUrl: string;
  backdropUrl: string;
  trailerUrl?: string;
  genres: Genre[];
  cast: CastMember[];
  director?: string;
  averageRating: number; // 1-5
  totalRatings: number;
  matchPercentage?: number; // Netflix-style match percentage
  isNew?: boolean;
  isTrending?: boolean;
  isNetflixOriginal?: boolean;
  isTop10?: boolean;
  top10Rank?: number;
  addedAt: string;
}

export interface Movie extends Content {
  type: "movie";
}

export interface Series extends Content {
  type: "series";
  seasons: Season[];
  totalSeasons: number;
  totalEpisodes: number;
}

export interface Season {
  id: string;
  seriesId: string;
  seasonNumber: number;
  title: string;
  description?: string;
  episodes: Episode[];
  releaseYear: number;
  posterUrl?: string;
}

export interface Episode {
  id: string;
  seasonId: string;
  episodeNumber: number;
  title: string;
  description: string;
  duration: number;
  thumbnailUrl: string;
  videoUrl?: string;
  releaseDate?: string;
}

export interface CastMember {
  id: string;
  name: string;
  character: string;
  photoUrl?: string;
}

// User-related types
export interface User {
  id: string;
  email: string;
  createdAt: string;
  subscription: SubscriptionPlan;
  profiles: UserProfile[];
}

export type SubscriptionPlan = "basic" | "standard" | "premium";

export interface UserProfile {
  id: string;
  userId: string;
  name: string;
  avatarUrl: string;
  avatarColor: string;
  isKidsProfile: boolean;
  language: string;
  maturityLevel: ContentRating;
  autoPlayNext: boolean;
  autoPlayPreviews: boolean;
}

export const AVATAR_OPTIONS = [
  { id: "1", url: "/avatars/red.png", color: "#E50914" },
  { id: "2", url: "/avatars/blue.png", color: "#0080FF" },
  { id: "3", url: "/avatars/green.png", color: "#46D369" },
  { id: "4", url: "/avatars/yellow.png", color: "#F5B700" },
  { id: "5", url: "/avatars/purple.png", color: "#8B5CF6" },
  { id: "6", url: "/avatars/orange.png", color: "#FF6B00" },
  { id: "7", url: "/avatars/pink.png", color: "#EC4899" },
  { id: "8", url: "/avatars/teal.png", color: "#14B8A6" },
];

export interface WatchlistItem {
  id: string;
  profileId: string;
  contentId: string;
  content: Content;
  addedAt: string;
}

export interface WatchHistory {
  id: string;
  profileId: string;
  contentId: string;
  content: Content;
  watchedAt: string;
  progress: number; // percentage 0-100
  currentEpisodeId?: string; // for series
  currentSeasonNumber?: number;
  currentEpisodeNumber?: number;
  lastWatchedDuration?: number; // seconds
}

// Category/Row types for home page
export interface ContentRow {
  id: string;
  title: string;
  slug: string;
  contents: Content[];
  isTop10?: boolean;
}

export interface FeaturedContent {
  content: Content;
  headline?: string;
  ctaText?: string;
}

// Search & Filter types
export interface SearchFilters {
  query?: string;
  type?: ContentType | "all";
  genreId?: string;
  year?: number;
  rating?: ContentRating;
  sortBy?: SortOption;
}

export interface PaginationParams {
  page: number;
  perPage: number;
}

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  perPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// View Model types
export interface HomeViewModel {
  featured: FeaturedContent;
  rows: ContentRow[];
  continueWatching?: WatchHistory[];
}

export interface BrowseViewModel {
  genres: Genre[];
  contents: PaginatedResult<Content>;
  selectedGenre?: Genre;
  sortBy: SortOption;
}

export interface SearchViewModel {
  query: string;
  results: PaginatedResult<Content>;
  filters: SearchFilters;
  recentSearches: string[];
}

export interface ContentDetailViewModel {
  content: Content;
  seasons?: Season[]; // for series
  similarContents: Content[];
  isInWatchlist: boolean;
  watchProgress?: WatchHistory;
}

export interface MyListViewModel {
  items: WatchlistItem[];
  totalCount: number;
}

export interface ProfileSelectViewModel {
  profiles: UserProfile[];
  currentProfileId?: string;
  canAddProfile: boolean;
  maxProfiles: number;
}

export interface AccountViewModel {
  user: User;
  currentProfile: UserProfile;
}

