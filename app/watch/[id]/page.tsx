import { ContentDetailView } from "@/src/presentation/components/detail/ContentDetailView";
import { ContentDetailPresenterFactory } from "@/src/presentation/presenters/detail/ContentDetailPresenter";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Dynamic page
export const dynamic = "force-dynamic";

interface WatchPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Generate metadata for watch page
 */
export async function generateMetadata({ params }: WatchPageProps): Promise<Metadata> {
  const { id } = await params;
  const presenter = ContentDetailPresenterFactory.createServer();
  const viewModel = await presenter.getViewModel(id);
  return presenter.generateMetadata(viewModel);
}

/**
 * Watch/Detail page - Server Component with dynamic content
 */
export default async function WatchPage({ params }: WatchPageProps) {
  const { id } = await params;
  const presenter = ContentDetailPresenterFactory.createServer();

  const viewModel = await presenter.getViewModel(id);

  if (!viewModel) {
    notFound();
  }

  return <ContentDetailView initialViewModel={viewModel} />;
}
