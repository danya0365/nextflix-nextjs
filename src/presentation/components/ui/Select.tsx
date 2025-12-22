"use client";

import { animated, useSpring } from "@react-spring/web";
import { clsx } from "clsx";
import { ReactNode, useEffect, useId, useRef, useState } from "react";

interface SelectOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  searchable?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

/**
 * Custom animated select dropdown
 */
export function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  error,
  searchable = false,
  disabled = false,
  fullWidth = false,
}: SelectProps) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Filter options based on search
  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  // Animation for dropdown
  const dropdownSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translateY(0)" : "translateY(-10px)",
    config: { tension: 300, friction: 25 },
  });

  // Animation for arrow rotation
  const arrowSpring = useSpring({
    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
    config: { tension: 300, friction: 20 },
  });

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when opening
  useEffect(() => {
    if (isOpen && searchable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div
      ref={containerRef}
      className={clsx("relative", fullWidth && "w-full")}
    >
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          {label}
        </label>
      )}

      {/* Trigger button */}
      <button
        id={id}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={clsx(
          "w-full flex items-center justify-between px-3 py-2.5 rounded-md",
          "bg-gray-800/50 border transition-colors text-left",
          error
            ? "border-red-500"
            : isOpen
            ? "border-netflix-red"
            : "border-white/20 hover:border-white/40",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <span className={clsx(!selectedOption && "text-gray-500")}>
          {selectedOption?.icon && (
            <span className="mr-2">{selectedOption.icon}</span>
          )}
          {selectedOption?.label || placeholder}
        </span>
        <animated.svg
          style={arrowSpring}
          className="w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </animated.svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <animated.div
          style={dropdownSpring}
          className="absolute z-50 w-full mt-1 py-1 bg-gray-800 border border-white/10 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {/* Search input */}
          {searchable && (
            <div className="px-2 py-1.5 border-b border-white/10">
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full px-2 py-1.5 bg-gray-700/50 rounded text-sm text-white placeholder-gray-400 outline-none focus:ring-1 focus:ring-netflix-red"
              />
            </div>
          )}

          {/* Options */}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={clsx(
                  "w-full flex items-center px-3 py-2 text-left transition-colors",
                  option.value === value
                    ? "bg-netflix-red text-white"
                    : "text-gray-300 hover:bg-white/10"
                )}
              >
                {option.icon && <span className="mr-2">{option.icon}</span>}
                {option.label}
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-500 text-sm">No options found</div>
          )}
        </animated.div>
      )}

      {/* Error message */}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
