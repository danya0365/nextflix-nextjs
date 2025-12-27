import { GenreBrowseView } from "@/src/presentation/components/genre/GenreBrowse";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function GenrePage({ params }: PageProps) {
  const { slug } = await params;
  
  return <GenreBrowseView slug={slug} />;
}
