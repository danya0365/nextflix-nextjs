"use client";

import type { Content, WatchHistory } from "@/src/domain/entities/types";
import { animated, useSpring } from "@react-spring/web";

interface DetailHeroProps {
  content: Content;
  isInWatchlist: boolean;
  watchProgress?: WatchHistory;
  loading: boolean;
  onPlay: () => void;
  onToggleWatchlist: () => void;
}

/**
 * Detail page hero section with backdrop and actions
 */
export function DetailHero({ 
  content, 
  isInWatchlist, 
  watchProgress,
  loading,
  onPlay, 
  onToggleWatchlist 
}: DetailHeroProps) {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    delay: 200,
  });

  const hasProgress = watchProgress && watchProgress.progress > 0;

  return (
    <div className="relative min-h-[70vh]">
      {/* Backdrop Image */}
      <div className="absolute inset-0">
        <img
          src={content.backdropUrl}
          alt={content.title}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <animated.div 
        style={fadeIn}
        className="relative z-10 flex flex-col justify-end min-h-[70vh] px-4 md:px-12 pb-12"
      >
        <div className="max-w-2xl">
          {/* Badges */}
          <div className="flex items-center gap-2 mb-4">
            {content.isNetflixOriginal && (
              <span className="text-netflix-red font-bold text-sm tracking-wider">
                N ORIGINAL
              </span>
            )}
            {content.isNew && (
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                NEW
              </span>
            )}
            {content.isTop10 && (
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                TOP 10
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {content.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
            {content.matchPercentage && (
              <span className="text-green-500 font-semibold text-lg">
                {content.matchPercentage}% Match
              </span>
            )}
            <span className="text-gray-300">{content.releaseYear}</span>
            <span className="px-1.5 py-0.5 border border-gray-400 text-gray-300 text-xs">
              {content.rating}
            </span>
            {content.type === "movie" ? (
              <span className="text-gray-300">{content.duration} min</span>
            ) : (
              <span className="text-gray-300">
                {content.type === "series" && "Series"}
              </span>
            )}
            <span className="text-yellow-500">⭐ {content.averageRating.toFixed(1)}</span>
          </div>

          {/* Description */}
          <p className="text-gray-200 text-lg mb-6 line-clamp-3">
            {content.description}
          </p>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-6">
            {content.genres.map(genre => (
              <span 
                key={genre.id}
                className="px-3 py-1 bg-gray-800/80 text-gray-300 text-sm rounded-full"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Progress Bar (if watching) */}
          {hasProgress && (
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm text-gray-400 mb-1">
                <span>Continue watching</span>
                <span>{watchProgress.progress}%</span>
              </div>
              <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-netflix-red"
                  style={{ width: `${watchProgress.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Play Button */}
            <button 
              onClick={onPlay}
              className="
                flex items-center gap-2
                bg-white text-black
                px-8 py-3
                rounded-md
                font-semibold text-lg
                hover:bg-gray-200
                transition-colors
              "
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              {hasProgress ? "Resume" : "Play"}
            </button>

            {/* Add to List Button */}
            <button
              onClick={onToggleWatchlist}
              disabled={loading}
              className="
                flex items-center gap-2
                bg-gray-600/80 text-white
                px-6 py-3
                rounded-md
                font-medium
                hover:bg-gray-500/80
                transition-colors
                disabled:opacity-50
              "
            >
              {isInWatchlist ? (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  In My List
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  My List
                </>
              )}
            </button>

            {/* Share Button */}
            <button
              className="
                p-3
                bg-gray-800/60 text-white
                rounded-full
                border border-gray-600
                hover:border-gray-400
                transition-colors
              "
              aria-label="Share"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </animated.div>
    </div>
  );
}
