import { ProfileSelectView } from "@/src/presentation/components/profile/ProfileSelectView";
import { ProfilePresenterFactory } from "@/src/presentation/presenters/profile/ProfilePresenter";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const presenter = ProfilePresenterFactory.createServer();
  return presenter.generateMetadata();
}

export default async function ProfilesPage() {
  const presenter = ProfilePresenterFactory.createServer();
  const viewModel = await presenter.getViewModel();
  return <ProfileSelectView initialViewModel={viewModel} />;
}
