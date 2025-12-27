"use client";

import type { Content } from "@/src/domain/entities/types";
import { mockContentRepository } from "@/src/infrastructure/repositories/mockContentRepository";
import { MainLayout } from "@/src/presentation/components/layouts/MainLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./LatestView.module.css";

type TabType = "coming-soon" | "new" | "top-10" | "trending";

export function LatestView() {
  const [activeTab, setActiveTab] = useState<TabType>("new");
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent(activeTab);
  }, [activeTab]);

  const loadContent = async (tab: TabType) => {
    setLoading(true);
    let data: Content[] = [];

    switch (tab) {
      case "new":
        data = await mockContentRepository.getNewReleases();
        // If no new releases, get all and sort by date
        if (data.length === 0) {
          const all = await mockContentRepository.getAllContent(1, 20);
          data = all.items.sort((a, b) => 
            new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
          );
        }
        break;
      case "top-10":
        data = await mockContentRepository.getTop10();
        break;
      case "trending":
        data = await mockContentRepository.getTrending();
        break;
      case "coming-soon":
        // Simulate coming soon with future dates
        const all = await mockContentRepository.getAllContent(1, 10);
        data = all.items.slice(0, 6).map((c) => ({
          ...c,
          isNew: false,
          releaseYear: 2025,
        }));
        break;
    }

    setContents(data);
    setLoading(false);
  };

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: "new", label: "New on Netflix", icon: "🆕" },
    { id: "coming-soon", label: "Coming Soon", icon: "📅" },
    { id: "trending", label: "Trending Now", icon: "🔥" },
    { id: "top-10", label: "Top 10", icon: "🏆" },
  ];

  return (
    <MainLayout>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>New & Popular</h1>
          <p className={styles.subtitle}>
            Discover what's new and trending on Netflix
          </p>
        </header>

        {/* Tab Navigation */}
        <nav className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Content */}
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
          </div>
        ) : (
          <div className={styles.contentList}>
            {contents.map((content, index) => (
              <ContentCard 
                key={content.id} 
                content={content} 
                index={index}
                showRank={activeTab === "top-10"}
              />
            ))}
            {contents.length === 0 && (
              <div className={styles.empty}>
                <p>No content available in this category</p>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

interface ContentCardProps {
  content: Content;
  index: number;
  showRank?: boolean;
}

function ContentCard({ content, index, showRank }: ContentCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article 
      className={`${styles.contentCard} ${expanded ? styles.expanded : ""}`}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Left Section - Poster/Rank */}
      <div className={styles.cardLeft}>
        {showRank && (
          <div className={styles.rank}>
            <span className={styles.rankNumber}>{index + 1}</span>
          </div>
        )}
        <div className={styles.posterWrapper}>
          <img 
            src={content.posterUrl} 
            alt={content.title}
            className={styles.poster}
          />
          {content.isNew && (
            <span className={styles.newBadge}>NEW</span>
          )}
        </div>
      </div>

      {/* Right Section - Info */}
      <div className={styles.cardInfo}>
        <div className={styles.cardHeader}>
          <div className={styles.dateInfo}>
            {content.isNew ? (
              <span className={styles.newTag}>Just Added</span>
            ) : (
              <span className={styles.releaseDate}>{content.releaseYear}</span>
            )}
          </div>
          <h2 className={styles.contentTitle}>{content.title}</h2>
        </div>

        <p className={styles.description}>
          {content.shortDescription || content.description}
        </p>

        <div className={styles.meta}>
          <span className={styles.rating}>{content.rating}</span>
          <span className={styles.type}>{content.type}</span>
          <span className={styles.duration}>
            {content.type === "movie" 
              ? `${content.duration} min` 
              : `${content.duration} min/ep`}
          </span>
        </div>

        <div className={styles.genres}>
          {content.genres.slice(0, 3).map((genre) => (
            <span key={genre.id} className={styles.genre}>
              {genre.name}
            </span>
          ))}
        </div>

        {/* Expanded Content */}
        {expanded && (
          <div className={styles.expandedContent}>
            <div className={styles.matchScore}>
              <span className={styles.matchBadge}>
                {content.matchPercentage || 90}% Match
              </span>
              <span className={styles.ratingStars}>
                ★ {content.averageRating.toFixed(1)}
              </span>
            </div>
            <div className={styles.actions}>
              <Link 
                href={`/watch/${content.id}`}
                className={styles.playButton}
                onClick={(e) => e.stopPropagation()}
              >
                ▶ Play
              </Link>
              <Link 
                href={`/watch/${content.id}`}
                className={styles.moreButton}
                onClick={(e) => e.stopPropagation()}
              >
                More Info
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className={styles.expandIcon}>
        {expanded ? "▲" : "▼"}
      </div>
    </article>
  );
}

export default LatestView;
