"use client";

interface RetroTitleBarProps {
  title: string;
}

/**
 * Windows 98 style title bar with window controls
 */
export function RetroTitleBar({ title }: RetroTitleBarProps) {
  return (
    <div className="retro-titlebar">
      <div className="retro-titlebar-left">
        {/* IE Icon */}
        <div className="retro-titlebar-icon flex items-center justify-center">
          <svg viewBox="0 0 16 16" className="w-4 h-4">
            <circle cx="8" cy="8" r="7" fill="#4A9BD9" stroke="#1B5FA4" strokeWidth="1"/>
            <path d="M4 8h8M8 4v8" stroke="white" strokeWidth="1.5"/>
            <circle cx="8" cy="8" r="3" fill="none" stroke="white" strokeWidth="1"/>
          </svg>
        </div>
        <span className="retro-titlebar-text">{title}</span>
      </div>
      
      <div className="retro-titlebar-buttons">
        {/* Minimize */}
        <button className="retro-window-btn" aria-label="Minimize">
          <span className="text-[10px]">_</span>
        </button>
        
        {/* Maximize */}
        <button className="retro-window-btn" aria-label="Maximize">
          <span className="text-[10px]">□</span>
        </button>
        
        {/* Close */}
        <button className="retro-window-btn retro-close-btn" aria-label="Close">
          <span className="text-[10px]">×</span>
        </button>
      </div>
    </div>
  );
}
