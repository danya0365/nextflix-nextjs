"use client";

import { animated, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "../common/ThemeToggle";

interface MainHeaderProps {
  isScrolled?: boolean;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "Browse" },
  { href: "/browse/movies", label: "Movies" },
  { href: "/browse/tv", label: "TV Shows" },
  { href: "/latest", label: "New & Popular" },
  { href: "/my-list", label: "My List" },
  { href: "/kids", label: "Kids" },
];


/**
 * Modern Netflix-style header with glassmorphism
 */
export function MainHeader({ isScrolled = false }: MainHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("/");

  // Animation for mobile menu
  const mobileMenuSpring = useSpring({
    opacity: isMobileMenuOpen ? 1 : 0,
    transform: isMobileMenuOpen ? "translateY(0%)" : "translateY(-100%)",
    config: { tension: 280, friction: 25 },
  });

  return (
    <>
      <header className={`main-header ${isScrolled ? "scrolled" : ""}`}>
        <div className="main-header-inner">
          {/* Left side: Logo + Navigation */}
          <div className="main-header-left">
            {/* Logo */}
            <Link href="/" className="main-logo">
              NEXTFLIX
            </Link>

            {/* Desktop Navigation */}
            <nav className="main-nav">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  isActive={activeNav === link.href}
                  onClick={() => setActiveNav(link.href)}
                />
              ))}
            </nav>
          </div>

          {/* Right side: Search, Notifications, Profile */}
          <div className="main-header-right">
            {/* Search Button */}
            <Link href="/search" className="main-search-btn" aria-label="Search">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>

            {/* Notifications */}
            <button className="main-search-btn" aria-label="Notifications">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Profile */}
            <Link href="/profiles" className="main-profile-btn" aria-label="Profile menu">
              <div className="main-profile-avatar flex items-center justify-center">
                <span className="text-white text-sm font-bold">N</span>
              </div>
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <animated.nav style={mobileMenuSpring} className="mobile-nav">
          <button
            className="absolute top-4 right-4 text-white p-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="mobile-nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </animated.nav>
      )}
    </>
  );
}

/**
 * Animated navigation link with hover effect
 */
function NavLink({
  href,
  label,
  isActive,
  onClick,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const underlineSpring = useSpring({
    width: isHovered || isActive ? "100%" : "0%",
    opacity: isHovered || isActive ? 1 : 0,
    config: { tension: 300, friction: 20 },
  });

  return (
    <Link
      href={href}
      className={`main-nav-link ${isActive ? "active" : ""} relative`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {label}
      <animated.span
        style={underlineSpring}
        className="absolute -bottom-1 left-0 h-0.5 bg-netflix-red"
      />
    </Link>
  );
}
