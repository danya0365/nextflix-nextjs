import type { SortOption } from "@/src/domain/entities/types";
import { BrowseView } from "@/src/presentation/components/browse/BrowseView";
import { BrowsePresenterFactory } from "@/src/presentation/presenters/browse/BrowsePresenter";
import type { Metadata } from "next";

// Dynamic page
export const dynamic = "force-dynamic";

interface BrowsePageProps {
  searchParams: Promise<{ 
    genre?: string;
    sort?: SortOption;
    page?: string;
  }>;
}

/**
 * Generate metadata for browse page
 */
export async function generateMetadata({ searchParams }: BrowsePageProps): Promise<Metadata> {
  const params = await searchParams;
  const presenter = BrowsePresenterFactory.createServer();
  
  // Get genre name for metadata
  const viewModel = await presenter.getViewModel(params.genre);
  return presenter.generateMetadata(viewModel.selectedGenre?.name);
}

/**
 * Browse page - Server Component with filtering support
 */
export default async function BrowsePage({ searchParams }: BrowsePageProps) {
  const params = await searchParams;
  const presenter = BrowsePresenterFactory.createServer();

  const genre = params.genre;
  const sort = (params.sort as SortOption) || "popular";
  const page = parseInt(params.page || "1", 10);

  try {
    const viewModel = await presenter.getViewModel(genre, sort, page);
    return (
      <BrowseView 
        initialGenre={genre} 
        initialSortBy={sort}
        initialViewModel={viewModel} 
      />
    );
  } catch (error) {
    console.error("Error loading browse page:", error);
    return <BrowseView initialGenre={genre} initialSortBy={sort} />;
  }
}
