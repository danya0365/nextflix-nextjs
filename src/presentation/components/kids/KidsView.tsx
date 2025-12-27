"use client";

import type { Content, ContentRow } from "@/src/domain/entities/types";
import { mockContentRepository } from "@/src/infrastructure/repositories/mockContentRepository";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./KidsView.module.css";

export function KidsView() {
  const [rows, setRows] = useState<ContentRow[]>([]);
  const [featured, setFeatured] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadKidsContent();
  }, []);

  const loadKidsContent = async () => {
    setLoading(true);
    
    // Get all content and filter for kids-appropriate ratings
    const allContent = await mockContentRepository.getAllContent(1, 100);
    const kidsRatings = ["TV-Y", "TV-Y7", "TV-G", "G", "PG"];
    
    const kidsContent = allContent.items.filter(
      (c) => kidsRatings.includes(c.rating) || c.genres.some((g) => g.slug === "animation" || g.slug === "family")
    );

    // If no strictly kids content, show animation and family genres
    const displayContent = kidsContent.length > 0 ? kidsContent : allContent.items.filter(
      (c) => c.genres.some((g) => g.slug === "animation" || g.slug === "family")
    );

    // Create rows for kids content
    const animationContent = displayContent.filter((c) => c.genres.some((g) => g.slug === "animation"));
    const familyContent = displayContent.filter((c) => c.genres.some((g) => g.slug === "family"));
    const adventureContent = displayContent.filter((c) => c.genres.some((g) => g.slug === "adventure"));

    const kidsRows: ContentRow[] = [
      {
        id: "kids-popular",
        title: "Popular with Kids",
        slug: "kids-popular",
        contents: displayContent.slice(0, 10),
      },
      {
        id: "kids-animation",
        title: "Animation",
        slug: "animation",
        contents: animationContent.length > 0 ? animationContent : displayContent.slice(0, 6),
      },
      {
        id: "kids-family",
        title: "Family Movies",
        slug: "family",
        contents: familyContent.length > 0 ? familyContent : displayContent.slice(0, 6),
      },
      {
        id: "kids-adventure",
        title: "Adventure Time",
        slug: "adventure",
        contents: adventureContent.length > 0 ? adventureContent : displayContent.slice(0, 6),
      },
    ];

    setRows(kidsRows.filter((row) => row.contents.length > 0));
    setFeatured(displayContent[0] || null);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.kidsLogo}>
          <span>NETFLIX</span>
          <span className={styles.kidsLabel}>KIDS</span>
        </div>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Kids Header */}
      <header className={styles.header}>
        <Link href="/" className={styles.exitButton}>
          Exit Kids
        </Link>
        <div className={styles.kidsLogo}>
          <span>NETFLIX</span>
          <span className={styles.kidsLabel}>KIDS</span>
        </div>
        <Link href="/search" className={styles.searchButton}>
          🔍
        </Link>
      </header>

      {/* Featured Content */}
      {featured && (
        <section className={styles.featured}>
          <div 
            className={styles.featuredBg}
            style={{ backgroundImage: `url(${featured.backdropUrl})` }}
          />
          <div className={styles.featuredContent}>
            <div className={styles.featuredInfo}>
              <h1>{featured.title}</h1>
              <p>{featured.shortDescription || featured.description}</p>
              <div className={styles.featuredButtons}>
                <Link href={`/watch/${featured.id}`} className={styles.playButton}>
                  ▶ Play
                </Link>
                <Link href={`/watch/${featured.id}`} className={styles.moreButton}>
                  More Info
                </Link>
              </div>
            </div>
            <div className={styles.characters}>
              {/* Decorative kid-friendly elements */}
              <div className={styles.bubble} style={{ top: "20%", left: "10%", animationDelay: "0s" }}></div>
              <div className={styles.bubble} style={{ top: "60%", left: "5%", animationDelay: "0.5s" }}></div>
              <div className={styles.star} style={{ top: "15%", right: "15%", animationDelay: "0.2s" }}>★</div>
              <div className={styles.star} style={{ top: "45%", right: "8%", animationDelay: "0.7s" }}>★</div>
            </div>
          </div>
        </section>
      )}

      {/* Content Rows */}
      <div className={styles.rowsContainer}>
        {rows.map((row) => (
          <section key={row.id} className={styles.row}>
            <h2 className={styles.rowTitle}>{row.title}</h2>
            <div className={styles.rowContent}>
              {row.contents.map((content) => (
                <Link 
                  key={content.id} 
                  href={`/watch/${content.id}`}
                  className={styles.card}
                >
                  <img 
                    src={content.posterUrl} 
                    alt={content.title}
                    className={styles.cardImage}
                  />
                  <div className={styles.cardOverlay}>
                    <span className={styles.cardTitle}>{content.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Friendly Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <span className={styles.footerEmoji}>🎈</span>
          <span>Safe & Fun Content for Kids</span>
          <span className={styles.footerEmoji}>🎈</span>
        </div>
      </footer>
    </div>
  );
}

export default KidsView;
