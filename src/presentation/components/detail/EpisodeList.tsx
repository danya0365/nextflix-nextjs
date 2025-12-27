"use client";

import type { Episode, Season } from "@/src/domain/entities/types";
import { useState } from "react";

interface EpisodeListProps {
  seasons: Season[];
  currentEpisodeId?: string;
}

/**
 * Episode list for series with season selector
 */
export function EpisodeList({ seasons, currentEpisodeId }: EpisodeListProps) {
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);
  const currentSeason = seasons[selectedSeasonIndex];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Episodes</h2>
        
        {/* Season Selector */}
        {seasons.length > 1 && (
          <select
            value={selectedSeasonIndex}
            onChange={(e) => setSelectedSeasonIndex(parseInt(e.target.value))}
            className="
              bg-gray-800 text-white
              px-4 py-2
              rounded-md
              border border-gray-700
              focus:outline-none
              focus:ring-2
              focus:ring-netflix-red
            "
          >
            {seasons.map((season, index) => (
              <option key={season.id} value={index}>
                {season.title}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Season Description */}
      {currentSeason.description && (
        <p className="text-gray-400 mb-6">{currentSeason.description}</p>
      )}

      {/* Episode List */}
      <div className="space-y-4">
        {currentSeason.episodes.map((episode) => (
          <EpisodeRow 
            key={episode.id}
            episode={episode}
            isCurrentEpisode={episode.id === currentEpisodeId}
          />
        ))}
      </div>
    </div>
  );
}

interface EpisodeRowProps {
  episode: Episode;
  isCurrentEpisode: boolean;
}

function EpisodeRow({ episode, isCurrentEpisode }: EpisodeRowProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        flex gap-4 p-4 rounded-lg cursor-pointer transition-colors
        ${isCurrentEpisode ? "bg-gray-800" : "hover:bg-gray-800/50"}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Episode Number */}
      <div className="flex-shrink-0 w-8 text-2xl text-gray-500 font-medium">
        {episode.episodeNumber}
      </div>

      {/* Thumbnail */}
      <div className="relative flex-shrink-0 w-32 sm:w-48 aspect-video rounded overflow-hidden">
        <img
          src={episode.thumbnailUrl}
          alt={episode.title}
          className="w-full h-full object-cover"
        />
        
        {/* Play overlay on hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        {/* Current indicator */}
        {isCurrentEpisode && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-netflix-red" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium text-white truncate">
            {episode.title}
          </h3>
          <span className="text-gray-500 text-sm flex-shrink-0">
            {episode.duration}m
          </span>
        </div>
        
        <p className="text-gray-400 text-sm line-clamp-2">
          {episode.description}
        </p>

        {isCurrentEpisode && (
          <span className="inline-block mt-2 text-xs text-netflix-red font-medium">
            Currently watching
          </span>
        )}
      </div>
    </div>
  );
}
