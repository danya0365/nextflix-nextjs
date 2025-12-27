"use client";

import type { ProfileSelectViewModel, UserProfile } from "@/src/domain/entities/types";
import { useProfilePresenter } from "@/src/presentation/presenters/profile/useProfilePresenter";
import { animated, useSpring } from "@react-spring/web";

interface ProfileSelectViewProps {
  initialViewModel: ProfileSelectViewModel;
}

export function ProfileSelectView({ initialViewModel }: ProfileSelectViewProps) {
  const [state, actions] = useProfilePresenter(initialViewModel);
  const { viewModel, loading, selectedId } = state;

  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    delay: 100,
  });

  return (
    <div className="min-h-screen bg-netflix-black flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="mb-8">
        <span className="text-netflix-red text-4xl font-bold tracking-tighter">
          NEXTFLIX
        </span>
      </div>

      {/* Title */}
      <animated.div style={fadeIn} className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-medium text-white">
          Who&apos;s watching?
        </h1>
      </animated.div>

      {/* Profile Grid */}
      <animated.div 
        style={fadeIn}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
      >
        {viewModel.profiles.map((profile, index) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            index={index}
            isSelected={selectedId === profile.id}
            isLoading={loading && selectedId === profile.id}
            onSelect={() => actions.selectProfile(profile.id)}
          />
        ))}

        {/* Add Profile Button */}
        {viewModel.canAddProfile && (
          <AddProfileCard index={viewModel.profiles.length} />
        )}
      </animated.div>

      {/* Manage Profiles Link */}
      <animated.div style={fadeIn} className="mt-12">
        <button className="text-gray-400 border border-gray-400 px-6 py-2 hover:text-white hover:border-white transition-colors">
          Manage Profiles
        </button>
      </animated.div>
    </div>
  );
}

interface ProfileCardProps {
  profile: UserProfile;
  index: number;
  isSelected: boolean;
  isLoading: boolean;
  onSelect: () => void;
}

function ProfileCard({ profile, index, isSelected, isLoading, onSelect }: ProfileCardProps) {
  const cardSpring = useSpring({
    from: { opacity: 0, transform: "scale(0.9)" },
    to: { opacity: 1, transform: "scale(1)" },
    delay: 150 + index * 100,
  });

  return (
    <animated.button
      style={cardSpring}
      onClick={onSelect}
      disabled={isLoading}
      className="group flex flex-col items-center gap-3 focus:outline-none"
    >
      {/* Avatar */}
      <div className={`
        relative w-24 h-24 md:w-32 md:h-32 rounded-md overflow-hidden
        ${isSelected ? "ring-4 ring-white" : "group-hover:ring-4 group-hover:ring-gray-500"}
        transition-all
      `}>
        {/* Avatar with color background */}
        <div 
          className="w-full h-full flex items-center justify-center text-4xl md:text-5xl text-white font-bold"
          style={{ backgroundColor: profile.avatarColor }}
        >
          {profile.name.charAt(0).toUpperCase()}
        </div>

        {/* Kids badge */}
        {profile.isKidsProfile && (
          <div className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white text-xs text-center py-0.5">
            KIDS
          </div>
        )}

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent" />
          </div>
        )}
      </div>

      {/* Name */}
      <span className={`
        text-sm md:text-base
        ${isSelected ? "text-white" : "text-gray-400 group-hover:text-white"}
        transition-colors
      `}>
        {profile.name}
      </span>
    </animated.button>
  );
}

interface AddProfileCardProps {
  index: number;
}

function AddProfileCard({ index }: AddProfileCardProps) {
  const cardSpring = useSpring({
    from: { opacity: 0, transform: "scale(0.9)" },
    to: { opacity: 1, transform: "scale(1)" },
    delay: 150 + index * 100,
  });

  return (
    <animated.button
      style={cardSpring}
      className="group flex flex-col items-center gap-3 focus:outline-none"
    >
      <div className="
        w-24 h-24 md:w-32 md:h-32 rounded-md
        bg-gray-800 
        flex items-center justify-center
        group-hover:bg-gray-700
        transition-colors
      ">
        <svg className="w-12 h-12 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </div>
      <span className="text-sm md:text-base text-gray-400 group-hover:text-white transition-colors">
        Add Profile
      </span>
    </animated.button>
  );
}
