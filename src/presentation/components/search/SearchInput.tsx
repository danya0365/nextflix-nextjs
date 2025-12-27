"use client";

import { useEffect, useRef } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  loading?: boolean;
  autoFocus?: boolean;
}

/**
 * Search input with icon and loading state
 */
export function SearchInput({ 
  value, 
  onChange, 
  loading,
  autoFocus = true 
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className="relative max-w-2xl">
      {/* Search Icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-white" />
        ) : (
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )}
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search movies, TV shows, actors..."
        className="
          w-full
          bg-gray-900
          text-white
          text-lg
          pl-12 pr-12 py-4
          rounded-lg
          border border-gray-700
          focus:outline-none
          focus:ring-2
          focus:ring-netflix-red
          focus:border-transparent
          placeholder:text-gray-500
        "
      />

      {/* Clear Button */}
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          aria-label="Clear search"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
