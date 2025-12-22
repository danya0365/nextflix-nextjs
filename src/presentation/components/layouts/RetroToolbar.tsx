"use client";

import { useState } from "react";
import { ThemeToggle } from "../common/ThemeToggle";

interface RetroToolbarProps {
  url: string;
}

/**
 * IE5 style toolbar with navigation buttons and address bar
 */
export function RetroToolbar({ url }: RetroToolbarProps) {
  const [currentUrl, setCurrentUrl] = useState(url);

  const toolbarButtons = [
    { icon: "←", label: "Back", action: () => {} },
    { icon: "→", label: "Forward", action: () => {} },
    { icon: "×", label: "Stop", action: () => {} },
    { icon: "↻", label: "Refresh", action: () => window.location.reload() },
    { icon: "🏠", label: "Home", action: () => setCurrentUrl("https://www.nextflix.com/") },
  ];

  const secondaryButtons = [
    { icon: "🔍", label: "Search" },
    { icon: "⭐", label: "Favorites" },
    { icon: "📜", label: "History" },
    { icon: "✉", label: "Mail" },
    { icon: "🖨", label: "Print" },
  ];

  return (
    <>
      {/* Main Toolbar */}
      <div className="retro-toolbar">
        {toolbarButtons.map((btn, index) => (
          <button
            key={index}
            className="retro-toolbar-btn"
            onClick={btn.action}
            title={btn.label}
          >
            <span className="retro-toolbar-btn-icon text-base">{btn.icon}</span>
            <span className="text-[10px]">{btn.label}</span>
          </button>
        ))}

        <div className="retro-toolbar-separator" />

        {secondaryButtons.map((btn, index) => (
          <button
            key={index}
            className="retro-toolbar-btn"
            title={btn.label}
          >
            <span className="retro-toolbar-btn-icon text-base">{btn.icon}</span>
            <span className="text-[10px]">{btn.label}</span>
          </button>
        ))}

        <div className="retro-toolbar-separator" />

        {/* Theme Toggle styled as retro button */}
        <div className="retro-toolbar-btn flex items-center justify-center">
          <ThemeToggle />
        </div>
      </div>

      {/* Address Bar */}
      <div className="retro-addressbar">
        <span className="retro-addressbar-label">Address</span>
        <input
          type="text"
          className="retro-addressbar-input"
          value={currentUrl}
          onChange={(e) => setCurrentUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // Handle navigation (for demo purposes)
              console.log("Navigate to:", currentUrl);
            }
          }}
        />
        <button className="retro-go-btn">Go</button>
        <span className="retro-addressbar-label ml-2">Links</span>
      </div>
    </>
  );
}
