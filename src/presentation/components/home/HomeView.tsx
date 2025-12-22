"use client";

import type { HomeViewModel } from "@/src/domain/entities/types";
import { useHomePresenter } from "@/src/presentation/presenters/home/useHomePresenter";
import { MainLayout } from "../layouts/MainLayout";
import { ContentRow } from "./ContentRow";
import { HeroSection } from "./HeroSection";

interface HomeViewProps {
  initialViewModel?: HomeViewModel;
}

/**
 * Home page view component
 * Displays hero section and content rows
 */
export function HomeView({ initialViewModel }: HomeViewProps) {
  const [state] = useHomePresenter(initialViewModel);
  const { viewModel, loading, error } = state;

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-netflix-red"></div>
        </div>
      </MainLayout>
    );
  }

  if (error || !viewModel) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-400 mb-4">
            {error || "Unable to load content"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-play"
          >
            Try Again
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="h-full overflow-y-auto scrollbar-hide">
        {/* Hero Section */}
        <HeroSection featured={viewModel.featured} />

        {/* Content Rows */}
        <div className="relative z-10 -mt-32 pb-20">
          {viewModel.rows.map((row) => (
            <ContentRow
              key={row.id}
              title={row.title}
              contents={row.contents}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
