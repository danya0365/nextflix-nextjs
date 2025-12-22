/**
 * Home page presenter
 * Handles business logic for the home page
 */

import type { HomeViewModel } from "@/src/domain/entities/types";
import { mockContentRepository } from "@/src/infrastructure/repositories/mockContentRepository";
import type { Metadata } from "next";

export class HomePresenter {
  /**
   * Get view model for home page
   */
  async getViewModel(): Promise<HomeViewModel> {
    return await mockContentRepository.getHomeViewModel();
  }

  /**
   * Generate metadata for home page
   */
  generateMetadata(): Metadata {
    return {
      title: "Nextflix - Watch Movies & TV Shows Online",
      description: "Stream unlimited movies and TV shows. Watch anywhere, anytime. Start your free trial today.",
      keywords: ["streaming", "movies", "tv shows", "nextflix", "watch online"],
      openGraph: {
        title: "Nextflix - Watch Movies & TV Shows Online",
        description: "Stream unlimited movies and TV shows. Watch anywhere, anytime.",
        type: "website",
      },
    };
  }
}

/**
 * Factory for creating HomePresenter instances
 */
export class HomePresenterFactory {
  static createServer(): HomePresenter {
    return new HomePresenter();
  }

  static createClient(): HomePresenter {
    return new HomePresenter();
  }
}
