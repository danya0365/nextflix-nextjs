"use client";

import { ReactNode, useEffect, useState } from "react";
import { MainFooter } from "./MainFooter";
import { MainHeader } from "./MainHeader";

interface MainLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

/**
 * Modern Netflix-style main layout
 * Full-screen design with glassmorphism header
 */
export function MainLayout({ children, showFooter = false }: MainLayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  // Note: Since we're full-screen no-scroll, this is more for future use
  // if content areas need to track their own scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="main-layout">
      <MainHeader isScrolled={isScrolled} />
      
      <main className="main-layout-content pt-16">
        {children}
      </main>
      
      {showFooter && <MainFooter />}
    </div>
  );
}
