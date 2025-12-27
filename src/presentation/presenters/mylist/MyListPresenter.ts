/**
 * My List page presenter
 */

import type { MyListViewModel } from "@/src/domain/entities/types";
import { mockUserRepository } from "@/src/infrastructure/repositories/mockUserRepository";
import type { Metadata } from "next";

export class MyListPresenter {
  async getViewModel(): Promise<MyListViewModel> {
    return await mockUserRepository.getMyListViewModel();
  }

  generateMetadata(): Metadata {
    return {
      title: "My List - Nextflix",
      description: "Your saved movies and TV shows on Nextflix.",
    };
  }
}

export class MyListPresenterFactory {
  static createServer(): MyListPresenter {
    return new MyListPresenter();
  }

  static createClient(): MyListPresenter {
    return new MyListPresenter();
  }
}
