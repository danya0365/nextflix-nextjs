import { MyListView } from "@/src/presentation/components/mylist/MyListView";
import { MyListPresenterFactory } from "@/src/presentation/presenters/mylist/MyListPresenter";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const presenter = MyListPresenterFactory.createServer();
  return presenter.generateMetadata();
}

export default async function MyListPage() {
  const presenter = MyListPresenterFactory.createServer();
  const viewModel = await presenter.getViewModel();
  return <MyListView initialViewModel={viewModel} />;
}
