"use client";

import type { Genre } from "@/src/domain/entities/types";
import { useRef, useState } from "react";

interface GenreFilterProps {
  genres: Genre[];
  selectedGenre?: string;
  onSelectGenre: (genreSlug?: string) => void;
}

/**
 * Horizontal scrollable genre filter
 */
export function GenreFilter({ genres, selectedGenre, onSelectGenre }: GenreFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 200;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative group">
      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-0 z-10 px-2 bg-gradient-to-r from-netflix-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Scroll left"
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Genre Pills */}
      <div
        ref={scrollRef}
        className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-2"
        onScroll={handleScroll}
      >
        {/* All button */}
        <button
          onClick={() => onSelectGenre(undefined)}
          className={`
            flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all
            ${!selectedGenre 
              ? "bg-white text-black" 
              : "bg-gray-800 text-white hover:bg-gray-700"
            }
          `}
        >
          All
        </button>

        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onSelectGenre(genre.slug)}
            className={`
              flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all
              ${selectedGenre === genre.slug 
                ? "bg-white text-black" 
                : "bg-gray-800 text-white hover:bg-gray-700"
              }
            `}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-0 z-10 px-2 bg-gradient-to-l from-netflix-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Scroll right"
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
