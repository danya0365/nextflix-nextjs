/**
 * Content detail page presenter
 * Handles business logic for the content detail/watch page
 */

import type { ContentDetailViewModel } from "@/src/domain/entities/types";
import { mockContentRepository } from "@/src/infrastructure/repositories/mockContentRepository";
import type { Metadata } from "next";

export class ContentDetailPresenter {
  /**
   * Get view model for content detail page
   */
  async getViewModel(contentId: string): Promise<ContentDetailViewModel | null> {
    return await mockContentRepository.getContentDetailViewModel(contentId);
  }

  /**
   * Generate metadata for content detail page
   */
  generateMetadata(viewModel: ContentDetailViewModel | null): Metadata {
    if (!viewModel) {
      return {
        title: "Content Not Found - Nextflix",
        description: "The requested content could not be found.",
      };
    }

    const { content } = viewModel;
    const year = content.releaseYear;
    const genreNames = content.genres.map(g => g.name).join(", ");

    return {
      title: `${content.title} (${year}) - Nextflix`,
      description: content.description,
      keywords: [
        content.title,
        content.type,
        ...content.genres.map(g => g.name),
        ...content.cast.map(c => c.name),
      ],
      openGraph: {
        title: content.title,
        description: content.shortDescription || content.description,
        images: [content.backdropUrl],
      },
    };
  }
}

/**
 * Factory for creating ContentDetailPresenter instances
 */
export class ContentDetailPresenterFactory {
  static createServer(): ContentDetailPresenter {
    return new ContentDetailPresenter();
  }

  static createClient(): ContentDetailPresenter {
    return new ContentDetailPresenter();
  }
}
