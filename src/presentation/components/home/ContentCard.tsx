"use client";

import type { Content } from "@/src/domain/entities/types";
import { animated, useSpring } from "@react-spring/web";
import { useState } from "react";

interface ContentCardProps {
  content: Content;
  index?: number;
}

/**
 * Content card with hover preview effect
 */
export function ContentCard({ content, index = 0 }: ContentCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Animation for card scale on hover
  const cardSpring = useSpring({
    transform: isHovered ? "scale(1.3)" : "scale(1)",
    zIndex: isHovered ? 20 : 1,
    config: { tension: 300, friction: 20 },
    delay: isHovered ? 300 : 0,
  });

  // Animation for info panel
  const infoSpring = useSpring({
    opacity: isHovered ? 1 : 0,
    transform: isHovered ? "translateY(0)" : "translateY(10px)",
    config: { tension: 300, friction: 25 },
    delay: isHovered ? 350 : 0,
  });

  return (
    <animated.div
      style={cardSpring}
      className="content-card relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <img
        src={content.posterUrl}
        alt={content.title}
        className="content-card-image"
        loading="lazy"
      />

      {/* Hover Overlay with Info */}
      <animated.div
        style={infoSpring}
        className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none"
      >
        <div className="p-3">
          {/* Title */}
          <h3 className="text-white font-semibold text-sm line-clamp-1 mb-2">
            {content.title}
          </h3>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 mb-2 pointer-events-auto">
            {/* Play Button */}
            <button className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors">
              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>

            {/* Add to List */}
            <button className="w-7 h-7 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>

            {/* Like */}
            <button className="w-7 h-7 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </button>

            {/* More Info - push to right */}
            <button className="w-7 h-7 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors ml-auto">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs">
            {content.matchPercentage && (
              <span className="text-green-500 font-semibold">
                {content.matchPercentage}% Match
              </span>
            )}
            <span className="px-1 border border-gray-500 text-gray-400">
              {content.rating}
            </span>
          </div>

          {/* Genres */}
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
            {content.genres.slice(0, 3).map((genre, i) => (
              <span key={genre.id}>
                {genre.name}
                {i < Math.min(content.genres.length, 3) - 1 && (
                  <span className="mx-1 text-gray-600">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </animated.div>

      {/* Badges */}
      <div className="absolute top-2 left-2 flex flex-col gap-1">
        {content.isNew && (
          <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            NEW
          </span>
        )}
        {content.isNetflixOriginal && (
          <span className="bg-netflix-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            N
          </span>
        )}
      </div>
    </animated.div>
  );
}
