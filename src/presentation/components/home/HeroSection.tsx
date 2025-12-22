"use client";

import type { FeaturedContent } from "@/src/domain/entities/types";
import { Button } from "../ui/Button";

interface HeroSectionProps {
  featured: FeaturedContent;
}

/**
 * Netflix-style hero section with featured content
 */
export function HeroSection({ featured }: HeroSectionProps) {
  const { content, headline, ctaText } = featured;

  return (
    <section className="hero-section">
      {/* Background Image */}
      <div className="hero-background">
        <img
          src={content.backdropUrl}
          alt={content.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="hero-gradient" />

      {/* Content */}
      <div className="hero-content animate-fade-in-up">
        {/* Netflix Original Badge */}
        {content.isNetflixOriginal && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-netflix-red font-bold tracking-widest text-sm">
              N
            </span>
            <span className="text-gray-300 text-sm tracking-wider uppercase">
              Original Series
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="hero-title">{content.title}</h1>

        {/* Headline (e.g., "Season 5 Coming Soon") */}
        {headline && (
          <p className="text-xl text-white mb-2 font-medium">{headline}</p>
        )}

        {/* Description */}
        <p className="hero-description">{content.description}</p>

        {/* Metadata */}
        <div className="flex items-center gap-4 mb-6 text-sm">
          {content.matchPercentage && (
            <span className="text-green-500 font-semibold">
              {content.matchPercentage}% Match
            </span>
          )}
          <span className="text-gray-400">{content.releaseYear}</span>
          <span className="px-1 border border-gray-500 text-gray-400 text-xs">
            {content.rating}
          </span>
          {content.type === "series" ? (
            <span className="text-gray-400">Series</span>
          ) : (
            <span className="text-gray-400">{content.duration} min</span>
          )}
        </div>

        {/* Buttons */}
        <div className="hero-buttons">
          <Button
            variant="primary"
            size="lg"
            leftIcon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            }
          >
            {ctaText || "Play"}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            leftIcon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          >
            More Info
          </Button>
        </div>
      </div>

      {/* Age Rating Badge (bottom right) */}
      <div className="absolute bottom-[20%] right-0 flex items-center">
        <div className="bg-gray-800/80 border-l-4 border-white px-4 py-2">
          <span className="text-white text-sm">{content.rating}</span>
        </div>
      </div>
    </section>
  );
}
