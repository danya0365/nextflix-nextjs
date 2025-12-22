"use client";

import { ReactNode } from "react";
import { RetroStatusBar } from "./RetroStatusBar";
import { RetroTitleBar } from "./RetroTitleBar";
import { RetroToolbar } from "./RetroToolbar";

interface RetroLayoutProps {
  children: ReactNode;
  title?: string;
  url?: string;
}

/**
 * Retro Internet Explorer 5 browser simulation layout
 * Mimics the classic Windows 98/IE5 look and feel
 */
export function RetroLayout({ 
  children, 
  title = "Nextflix - Microsoft Internet Explorer",
  url = "https://www.nextflix.com/"
}: RetroLayoutProps) {
  return (
    <div className="retro-layout retro-font">
      {/* Title Bar */}
      <RetroTitleBar title={title} />
      
      {/* Menu Bar */}
      <div className="retro-menubar">
        <span className="retro-menu-item">
          <span className="retro-menu-item-underline">F</span>ile
        </span>
        <span className="retro-menu-item">
          <span className="retro-menu-item-underline">E</span>dit
        </span>
        <span className="retro-menu-item">
          <span className="retro-menu-item-underline">V</span>iew
        </span>
        <span className="retro-menu-item">
          F<span className="retro-menu-item-underline">a</span>vorites
        </span>
        <span className="retro-menu-item">
          <span className="retro-menu-item-underline">T</span>ools
        </span>
        <span className="retro-menu-item">
          <span className="retro-menu-item-underline">H</span>elp
        </span>
      </div>
      
      {/* Toolbar */}
      <RetroToolbar url={url} />
      
      {/* Content Area (Browser Window) */}
      <div className="retro-content">
        <div className="retro-content-inner">
          {children}
        </div>
      </div>
      
      {/* Status Bar */}
      <RetroStatusBar />
    </div>
  );
}
