/**
 * IE5 style status bar at bottom of browser window
 */
export function RetroStatusBar() {
  return (
    <div className="retro-statusbar">
      <div className="retro-status-left">
        <svg className="retro-status-icon w-3 h-3" viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="6" fill="#4A9BD9"/>
        </svg>
        <span>Done</span>
      </div>
      
      <div className="retro-status-right">
        <div className="retro-status-zone">
          <svg className="w-3 h-3 mr-1" viewBox="0 0 16 16">
            <rect x="2" y="2" width="12" height="12" fill="none" stroke="#808080" strokeWidth="1"/>
            <circle cx="8" cy="8" r="3" fill="#4A9BD9"/>
          </svg>
          <span>Internet</span>
        </div>
      </div>
    </div>
  );
}
