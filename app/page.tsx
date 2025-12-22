import { HomeView } from "@/src/presentation/components/home/HomeView";
import { HomePresenterFactory } from "@/src/presentation/presenters/home/HomePresenter";
import type { Metadata } from "next";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/**
 * Generate metadata for home page
 */
export function generateMetadata(): Metadata {
  const presenter = HomePresenterFactory.createServer();
  return presenter.generateMetadata();
}

/**
 * Home page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function HomePage() {
  const presenter = HomePresenterFactory.createServer();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return <HomeView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching home page data:", error);

    // Fallback UI
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">
            Something went wrong
          </h1>
          <p className="text-gray-400 mb-4">
            Unable to load content. Please try again later.
          </p>
          <a
            href="/"
            className="bg-netflix-red text-white px-4 py-2 rounded-lg hover:bg-netflix-red-hover transition-colors"
          >
            Reload Page
          </a>
        </div>
      </div>
    );
  }
}
