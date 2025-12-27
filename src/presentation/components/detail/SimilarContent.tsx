"use client";

import type { Content } from "@/src/domain/entities/types";
import { animated, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useState } from "react";

interface SimilarContentProps {
  contents: Content[];
}

/**
 * Similar content section
 */
export function SimilarContent({ contents }: SimilarContentProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">More Like This</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {contents.map((content) => (
          <SimilarCard key={content.id} content={content} />
        ))}
      </div>
    </div>
  );
}

interface SimilarCardProps {
  content: Content;
}

function SimilarCard({ content }: SimilarCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const cardSpring = useSpring({
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    config: { tension: 300, friction: 20 },
  });

  return (
    <Link href={`/watch/${content.id}`}>
      <animated.div
        style={cardSpring}
        className="relative rounded-md overflow-hidden cursor-pointer bg-gray-900"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-[2/3]">
          <img
            src={content.posterUrl}
            alt={content.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        
        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
          <h3 className="text-white text-sm font-medium line-clamp-2">
            {content.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
            <span>{content.releaseYear}</span>
            {content.matchPercentage && (
              <span className="text-green-500">{content.matchPercentage}%</span>
            )}
          </div>
        </div>
      </animated.div>
    </Link>
  );
}
