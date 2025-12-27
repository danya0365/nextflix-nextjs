"use client";

import type { Content, Genre, SortOption } from "@/src/domain/entities/types";
import { mockContentRepository } from "@/src/infrastructure/repositories/mockContentRepository";
import { MainLayout } from "@/src/presentation/components/layouts/MainLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./GenreBrowse.module.css";

interface GenreBrowseViewProps {
  slug: string;
}

export function GenreBrowseView({ slug }: GenreBrowseViewProps) {
  const [contents, setContents] = useState<Content[]>([]);
  const [genre, setGenre] = useState<Genre | null>(null);
  const [allGenres, setAllGenres] = useState<Genre[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [slug, sortBy]);

  const loadData = async () => {
    setLoading(true);
    
    // Get all genres
    const genres = await mockContentRepository.getGenres();
    setAllGenres(genres);
    
    // Find current genre
    const currentGenre = genres.find((g) => g.slug === slug);
    setGenre(currentGenre || null);

    // Get content for this genre
    if (currentGenre) {
      const result = await mockContentRepository.getByGenre(slug, 1, 100);
      const sorted = sortContents(result.items, sortBy);
      setContents(sorted);
    }

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
    { value: "a-z", label: "A-Z" },
  ];

  if (!genre && !loading) {
    return (
      <MainLayout>
        <div className={styles.container}>
          <div className={styles.notFound}>
            <h1>Genre Not Found</h1>
            <p>The genre "{slug}" doesn't exist.</p>
            <Link href="/browse" className={styles.backLink}>
              ← Back to Browse
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.titleSection}>
            <Link href="/browse" className={styles.backArrow}>←</Link>
            <h1>{genre?.name || "Loading..."}</h1>
          </div>
          <div className={styles.sortDropdown}>
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
        </header>

        {/* Genre Navigation */}
        <nav className={styles.genreNav}>
          {allGenres.map((g) => (
            <Link
              key={g.id}
              href={`/browse/genre/${g.slug}`}
              className={`${styles.genreLink} ${g.slug === slug ? styles.active : ""}`}
            >
              {g.name}
            </Link>
          ))}
        </nav>

        {/* Description */}
        {genre && (
          <p className={styles.description}>
            Explore the best {genre.name.toLowerCase()} movies and shows
          </p>
        )}

        {/* Content Grid */}
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
          </div>
        ) : (
          <>
            <div className={styles.resultsCount}>
              {contents.length} titles in {genre?.name}
            </div>
            <div className={styles.grid}>
              {contents.map((content) => (
                <Link 
                  key={content.id}
                  href={`/watch/${content.id}`}
                  className={styles.card}
                >
                  <div className={styles.posterWrapper}>
                    <img 
                      src={content.posterUrl} 
                      alt={content.title}
                      className={styles.poster}
                    />
                    <div className={styles.overlay}>
                      <span className={styles.playIcon}>▶</span>
                    </div>
                    {content.isNetflixOriginal && (
                      <span className={styles.netflixBadge}>N</span>
                    )}
                    {content.isNew && (
                      <span className={styles.newBadge}>NEW</span>
                    )}
                  </div>
                  <div className={styles.cardContent}>
                    <h3>{content.title}</h3>
                    <div className={styles.cardMeta}>
                      <span className={styles.year}>{content.releaseYear}</span>
                      <span className={styles.type}>
                        {content.type === "movie" ? "Movie" : "Series"}
                      </span>
                    </div>
                    <div className={styles.cardRating}>
                      <span className={styles.match}>
                        {content.matchPercentage || 90}% Match
                      </span>
                      <span className={styles.stars}>
                        ★ {content.averageRating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}

export default GenreBrowseView;
