"use client";

import type { Content } from "@/src/domain/entities/types";
import { animated, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useState } from "react";

interface ContentGridProps {
  contents: Content[];
  loading?: boolean;
}

/**
 * Responsive grid of content cards
 */
export function ContentGrid({ contents, loading }: ContentGridProps) {
  if (contents.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
        <h3 className="text-xl font-semibold text-white mb-2">No content found</h3>
        <p className="text-gray-400">Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div className={`
      grid gap-4 
      grid-cols-2 
      sm:grid-cols-3 
      md:grid-cols-4 
      lg:grid-cols-5 
      xl:grid-cols-6
      ${loading ? "opacity-50" : ""}
    `}>
      {contents.map((content) => (
        <GridCard key={content.id} content={content} />
      ))}
    </div>
  );
}

interface GridCardProps {
  content: Content;
}

function GridCard({ content }: GridCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const cardSpring = useSpring({
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    boxShadow: isHovered 
      ? "0 10px 40px rgba(0, 0, 0, 0.5)" 
      : "0 2px 10px rgba(0, 0, 0, 0.2)",
    config: { tension: 300, friction: 20 },
  });

  const infoSpring = useSpring({
    opacity: isHovered ? 1 : 0,
    transform: isHovered ? "translateY(0)" : "translateY(10px)",
    config: { tension: 300, friction: 25 },
  });

  return (
    <Link href={`/watch/${content.id}`}>
      <animated.div
        style={cardSpring}
        className="relative rounded-md overflow-hidden cursor-pointer bg-gray-900"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Poster Image */}
        <div className="aspect-[2/3] relative">
          <img
            src={content.posterUrl}
            alt={content.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />

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
            {content.isTop10 && (
              <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                TOP {content.top10Rank}
              </span>
            )}
          </div>

          {/* Hover Overlay */}
          <animated.div
            style={infoSpring}
            className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-3"
          >
            <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">
              {content.title}
            </h3>
            
            <div className="flex items-center gap-2 text-xs mb-1">
              {content.matchPercentage && (
                <span className="text-green-500 font-semibold">
                  {content.matchPercentage}%
                </span>
              )}
              <span className="text-gray-400">{content.releaseYear}</span>
            </div>

            <div className="flex items-center gap-1 text-xs text-gray-400">
              <span className="px-1 border border-gray-500">
                {content.rating}
              </span>
              <span>•</span>
              <span>{content.type === "series" ? "Series" : `${content.duration}m`}</span>
            </div>
          </animated.div>
        </div>
      </animated.div>
    </Link>
  );
}
