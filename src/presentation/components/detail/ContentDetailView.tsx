"use client";

import type { ContentDetailViewModel } from "@/src/domain/entities/types";
import { useContentDetailPresenter } from "@/src/presentation/presenters/detail/useContentDetailPresenter";
import { MainLayout } from "../layouts/MainLayout";
import { DetailHero } from "./DetailHero";
import { EpisodeList } from "./EpisodeList";
import { SimilarContent } from "./SimilarContent";

interface ContentDetailViewProps {
  initialViewModel: ContentDetailViewModel;
}

/**
 * Content detail page view component
 */
export function ContentDetailView({ initialViewModel }: ContentDetailViewProps) {
  const [state, actions] = useContentDetailPresenter(initialViewModel);
  const { viewModel, loading } = state;
  const { content, seasons, similarContents, isInWatchlist, watchProgress } = viewModel;

  return (
    <MainLayout>
      <div className="h-full overflow-y-auto scrollbar-hide">
        {/* Hero Section */}
        <DetailHero 
          content={content}
          isInWatchlist={isInWatchlist}
          watchProgress={watchProgress}
          loading={loading}
          onPlay={actions.playContent}
          onToggleWatchlist={actions.toggleWatchlist}
        />

        {/* Episodes for Series */}
        {content.type === "series" && seasons && seasons.length > 0 && (
          <div className="px-4 md:px-12 py-8">
            <EpisodeList 
              seasons={seasons}
              currentEpisodeId={watchProgress?.currentEpisodeId}
            />
          </div>
        )}

        {/* Similar Content */}
        {similarContents.length > 0 && (
          <div className="px-4 md:px-12 py-8 border-t border-gray-800">
            <SimilarContent contents={similarContents} />
          </div>
        )}

        {/* Content Info */}
        <div className="px-4 md:px-12 py-8 border-t border-gray-800">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            {/* About */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">About {content.title}</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                {content.description}
              </p>
              
              {content.cast.length > 0 && (
                <div className="mb-3">
                  <span className="text-gray-500">Cast: </span>
                  <span className="text-gray-300">
                    {content.cast.map(c => c.name).join(", ")}
                  </span>
                </div>
              )}
              
              {content.director && (
                <div className="mb-3">
                  <span className="text-gray-500">Director: </span>
                  <span className="text-gray-300">{content.director}</span>
                </div>
              )}

              <div className="mb-3">
                <span className="text-gray-500">Genres: </span>
                <span className="text-gray-300">
                  {content.genres.map(g => g.name).join(", ")}
                </span>
              </div>
            </div>

            {/* Additional Info */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Details</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Release Year</span>
                  <span className="text-gray-300">{content.releaseYear}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Rating</span>
                  <span className="text-gray-300">{content.rating}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Type</span>
                  <span className="text-gray-300 capitalize">{content.type}</span>
                </div>
                {content.type === "movie" && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration</span>
                    <span className="text-gray-300">{content.duration} min</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">User Rating</span>
                  <span className="text-gray-300">⭐ {content.averageRating.toFixed(1)}/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
