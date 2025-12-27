import { SearchView } from "@/src/presentation/components/search/SearchView";
import { SearchPresenterFactory } from "@/src/presentation/presenters/search/SearchPresenter";
import type { Metadata } from "next";

// Dynamic page
export const dynamic = "force-dynamic";

interface SearchPageProps {
  searchParams: Promise<{ 
    q?: string;
    type?: string;
    genre?: string;
  }>;
}

/**
 * Generate metadata for search page
 */
export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const presenter = SearchPresenterFactory.createServer();
  return presenter.generateMetadata(params.q);
}

/**
 * Search page - Server Component with query support
 */
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const presenter = SearchPresenterFactory.createServer();
  const query = params.q || "";

  try {
    if (query) {
      const viewModel = await presenter.getViewModel({ query });
      return <SearchView initialQuery={query} initialViewModel={viewModel} />;
    }
    return <SearchView />;
  } catch (error) {
    console.error("Error loading search page:", error);
    return <SearchView initialQuery={query} />;
  }
}
