"use client";

import type { ProfileSelectViewModel } from "@/src/domain/entities/types";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { ProfilePresenterFactory } from "./ProfilePresenter";

const presenter = ProfilePresenterFactory.createClient();

export interface ProfileState {
  viewModel: ProfileSelectViewModel;
  loading: boolean;
  selectedId: string | null;
}

export interface ProfileActions {
  selectProfile: (profileId: string) => Promise<void>;
}

export function useProfilePresenter(
  initialViewModel: ProfileSelectViewModel
): [ProfileState, ProfileActions] {
  const router = useRouter();
  const [viewModel] = useState(initialViewModel);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectProfile = useCallback(async (profileId: string) => {
    setLoading(true);
    setSelectedId(profileId);
    
    try {
      await presenter.selectProfile(profileId);
      router.push("/");
    } catch (error) {
      console.error("Error selecting profile:", error);
      setLoading(false);
      setSelectedId(null);
    }
  }, [router]);

  return [
    { viewModel, loading, selectedId },
    { selectProfile },
  ];
}
