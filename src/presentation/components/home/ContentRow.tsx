"use client";

import type { Content } from "@/src/domain/entities/types";
import { useRef, useState } from "react";
import { ContentCard } from "./ContentCard";

interface ContentRowProps {
  title: string;
  contents: Content[];
}

/**
 * Horizontal scrollable content row
 */
export function ContentRow({ title, contents }: ContentRowProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (!sliderRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    const scrollAmount = sliderRef.current.clientWidth * 0.8;
    const newScrollLeft =
      direction === "left"
        ? sliderRef.current.scrollLeft - scrollAmount
        : sliderRef.current.scrollLeft + scrollAmount;

    sliderRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  if (contents.length === 0) return null;

  return (
    <section className="content-row group">
      {/* Row Title */}
      <h2 className="content-row-title">{title}</h2>

      {/* Slider Container */}
      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 bottom-4 z-20 w-12 flex items-center justify-center bg-gradient-to-r from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll left"
          >
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Content Slider */}
        <div
          ref={sliderRef}
          className="content-row-slider"
          onScroll={handleScroll}
        >
          {contents.map((content, index) => (
            <ContentCard
              key={content.id}
              content={content}
              index={index}
            />
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 bottom-4 z-20 w-12 flex items-center justify-center bg-gradient-to-l from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll right"
          >
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}
