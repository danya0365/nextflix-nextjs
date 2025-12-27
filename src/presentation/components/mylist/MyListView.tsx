"use client";

import type { MyListViewModel, WatchlistItem } from "@/src/domain/entities/types";
import { useMyListPresenter } from "@/src/presentation/presenters/mylist/useMyListPresenter";
import { animated, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useState } from "react";
import { MainLayout } from "../layouts/MainLayout";

interface MyListViewProps {
  initialViewModel: MyListViewModel;
}

export function MyListView({ initialViewModel }: MyListViewProps) {
  const [state, actions] = useMyListPresenter(initialViewModel);
  const { viewModel, loading } = state;

  return (
    <MainLayout>
      <div className="h-full overflow-y-auto scrollbar-hide">
        <div className="pt-20 px-4 md:px-12 pb-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white">My List</h1>
            <p className="text-gray-400 mt-2">
              {viewModel.totalCount} {viewModel.totalCount === 1 ? "title" : "titles"}
            </p>
          </div>

          {/* Content Grid or Empty State */}
          {viewModel.items.length === 0 ? (
            <EmptyState />
          ) : (
            <div className={`
              grid gap-4 
              grid-cols-2 
              sm:grid-cols-3 
              md:grid-cols-4 
              lg:grid-cols-5 
              xl:grid-cols-6
              ${loading ? "opacity-50" : ""}
            `}>
              {viewModel.items.map((item) => (
                <MyListCard 
                  key={item.id} 
                  item={item} 
                  onRemove={() => actions.removeFromList(item.contentId)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <svg className="w-20 h-20 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
      <h3 className="text-xl font-semibold text-white mb-2">Your list is empty</h3>
      <p className="text-gray-400 mb-6">
        Add movies and TV shows to your list to watch them later
      </p>
      <Link href="/browse" className="btn-play">
        Browse Content
      </Link>
    </div>
  );
}

interface MyListCardProps {
  item: WatchlistItem;
  onRemove: () => void;
}

function MyListCard({ item, onRemove }: MyListCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { content } = item;

  const cardSpring = useSpring({
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    config: { tension: 300, friction: 20 },
  });

  const overlaySpring = useSpring({
    opacity: isHovered ? 1 : 0,
  });

  return (
    <animated.div
      style={cardSpring}
      className="relative rounded-md overflow-hidden cursor-pointer bg-gray-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/watch/${content.id}`}>
        <div className="aspect-[2/3]">
          <img
            src={content.posterUrl}
            alt={content.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Hover Overlay */}
      <animated.div
        style={overlaySpring}
        className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-3"
      >
        <h3 className="text-white font-semibold text-sm line-clamp-2 mb-2">
          {content.title}
        </h3>

        <div className="flex items-center gap-2">
          <Link 
            href={`/watch/${content.id}`}
            className="flex-1 bg-white text-black text-center py-2 rounded text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Play
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              onRemove();
            }}
            className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
            aria-label="Remove from list"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </animated.div>
    </animated.div>
  );
}
