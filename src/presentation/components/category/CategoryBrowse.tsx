"use client";

import type { Content, Genre, SortOption } from "@/src/domain/entities/types";
import { mockContentRepository } from "@/src/infrastructure/repositories/mockContentRepository";
import { MainLayout } from "@/src/presentation/components/layouts/MainLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./CategoryBrowse.module.css";

interface CategoryBrowseViewProps {
  categoryType: "movie" | "series";
  title: string;
}

export function CategoryBrowseView({ categoryType, title }: CategoryBrowseViewProps) {
  const [contents, setContents] = useState<Content[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGenres();
    loadContent();
  }, []);

  useEffect(() => {
    loadContent();
  }, [selectedGenre, sortBy]);

  const loadGenres = async () => {
    const allGenres = await mockContentRepository.getGenres();
    setGenres(allGenres);
  };

  const loadContent = async () => {
    setLoading(true);
    
    const all = await mockContentRepository.getAllContent(1, 100);
    let filtered = all.items.filter((c) => c.type === categoryType);

    // Filter by genre
    if (selectedGenre !== "all") {
      filtered = filtered.filter((c) =>
        c.genres.some((g) => g.slug === selectedGenre)
      );
    }

    // Sort
    filtered = sortContents(filtered, sortBy);

    setContents(filtered);
    setLoading(false);
  };

  const sortContents = (items: Content[], sort: SortOption): Content[] => {
    const sorted = [...items];
    switch (sort) {
      case "newest":
        return sorted.sort((a, b) => b.releaseYear - a.releaseYear);
      case "oldest":
        return sorted.sort((a, b) => a.releaseYear - b.releaseYear);
      case "popular":
        return sorted.sort((a, b) => b.totalRatings - a.totalRatings);
      case "rating":
        return sorted.sort((a, b) => b.averageRating - a.averageRating);
      case "a-z":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "z-a":
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return sorted;
    }
  };

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "popular", label: "Most Popular" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "a-z", label: "A-Z" },
    { value: "z-a", label: "Z-A" },
  ];

  return (
    <MainLayout>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>{title}</h1>
          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <label>Genre</label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className={styles.select}
              >
                <option value="all">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.slug}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label>Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className={styles.select}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>

        {/* Genre Pills */}
        <div className={styles.genrePills}>
          <button
            className={`${styles.pill} ${selectedGenre === "all" ? styles.active : ""}`}
            onClick={() => setSelectedGenre("all")}
          >
            All
          </button>
          {genres.slice(0, 8).map((genre) => (
            <button
              key={genre.id}
              className={`${styles.pill} ${selectedGenre === genre.slug ? styles.active : ""}`}
              onClick={() => setSelectedGenre(genre.slug)}
            >
              {genre.name}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className={styles.resultsInfo}>
          <span>{contents.length} {categoryType === "movie" ? "movies" : "shows"} found</span>
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
          </div>
        ) : (
          <div className={styles.grid}>
            {contents.map((content) => (
              <ContentItem key={content.id} content={content} />
            ))}
            {contents.length === 0 && (
              <div className={styles.empty}>
                <p>No {categoryType === "movie" ? "movies" : "shows"} found</p>
                <button 
                  onClick={() => {
                    setSelectedGenre("all");
                    setSortBy("popular");
                  }}
                  className={styles.resetButton}
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

interface ContentItemProps {
  content: Content;
}

function ContentItem({ content }: ContentItemProps) {
  return (
    <Link href={`/watch/${content.id}`} className={styles.card}>
      <div className={styles.cardPoster}>
        <img 
          src={content.posterUrl} 
          alt={content.title}
          className={styles.posterImage}
        />
        <div className={styles.cardOverlay}>
          <div className={styles.playIcon}>▶</div>
          <div className={styles.overlayInfo}>
            <span className={styles.matchScore}>{content.matchPercentage || 90}% Match</span>
            <span className={styles.rating}>{content.rating}</span>
          </div>
        </div>
        {content.isNew && <span className={styles.newBadge}>NEW</span>}
        {content.isTop10 && (
          <span className={styles.top10Badge}>TOP 10</span>
        )}
        {content.isNetflixOriginal && (
          <span className={styles.originalBadge}>N</span>
        )}
      </div>
      <div className={styles.cardInfo}>
        <h3 className={styles.cardTitle}>{content.title}</h3>
        <div className={styles.cardMeta}>
          <span>{content.releaseYear}</span>
          <span>★ {content.averageRating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}

export default CategoryBrowseView;
