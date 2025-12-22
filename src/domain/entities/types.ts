/**
 * Domain entities and types for Nextflix streaming service
 */

// Content Types
export type ContentType = "movie" | "series" | "documentary";
export type ContentRating = "G" | "PG" | "PG-13" | "R" | "NC-17" | "TV-Y" | "TV-G" | "TV-PG" | "TV-14" | "TV-MA";

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
}

export interface CastMember {
  id: string;
  name: string;
  character: string;
  photoUrl?: string;
}

// User-related types
export interface UserProfile {
  id: string;
  userId: string;
  name: string;
  avatarUrl: string;
  isKidsProfile: boolean;
  language: string;
  maturityLevel: ContentRating;
}

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
}

// Category/Row types for home page
export interface ContentRow {
  id: string;
  title: string;
  slug: string;
  contents: Content[];
}

export interface FeaturedContent {
  content: Content;
  headline?: string;
  ctaText?: string;
}

// View Model types
export interface HomeViewModel {
  featured: FeaturedContent;
  rows: ContentRow[];
}

export interface BrowseViewModel {
  genres: Genre[];
  contents: Content[];
  totalCount: number;
  page: number;
  perPage: number;
}

export interface ContentDetailViewModel {
  content: Content;
  similarContents: Content[];
  isInWatchlist: boolean;
}
