/**
 * Profile selection page presenter
 */

import type { ProfileSelectViewModel } from "@/src/domain/entities/types";
import { mockUserRepository } from "@/src/infrastructure/repositories/mockUserRepository";
import type { Metadata } from "next";

export class ProfilePresenter {
  async getViewModel(): Promise<ProfileSelectViewModel> {
    return await mockUserRepository.getProfileSelectViewModel();
  }

  async selectProfile(profileId: string): Promise<void> {
    await mockUserRepository.setCurrentProfile(profileId);
  }

  generateMetadata(): Metadata {
    return {
      title: "Who's Watching? - Nextflix",
      description: "Select your profile to continue watching on Nextflix.",
    };
  }
}

export class ProfilePresenterFactory {
  static createServer(): ProfilePresenter {
    return new ProfilePresenter();
  }

  static createClient(): ProfilePresenter {
    return new ProfilePresenter();
  }
}
