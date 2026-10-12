"use client";

import { useWindowManager } from "@/hooks/useWindowManager";

import RunningApps from "./RunningApps";
import SystemTray from "./SystemTray";

const Taskbar = () => {
  const {
    windows,
    activeWindowId,
    focusWindow,
    minimizeWindow,
    restoreWindow,
  } = useWindowManager();

  const handleWindowClick = (windowId: string) => {
    const selectedWindow = windows.find(
      (window) => window.windowId === windowId,
    );

    if (!selectedWindow) return;

    if (selectedWindow.state === "minimized") {
      restoreWindow(windowId);
      return;
    }

    if (activeWindowId === windowId) {
      minimizeWindow(windowId);
      return;
    }

    focusWindow(windowId);
  };
  return (
    <footer
      className="
        pointer-events-auto absolute inset-x-0 bottom-0 z-30
        grid h-16 grid-cols-[auto_minmax(0,1fr)_auto]
        items-center gap-4
        border-t border-cyan-300/15
        bg-[#050912]/85 px-4
        shadow-[0_-8px_30px_rgba(0,0,0,0.2)]
        backdrop-blur-2xl
      "
    >
      <div className="flex shrink-0 items-center gap-3">
        <div
          className="
            flex h-9 w-9 items-center justify-center
            rounded-lg border border-cyan-300/30
            bg-cyan-300/10 text-sm font-bold
            text-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.08)]
          "
        >
          C
        </div>

        <div className="hidden flex-col sm:flex">
          <span className="text-[11px] font-semibold tracking-[0.16em] text-cyan-50">
            CYBERPUNK
          </span>

          <span className="text-[9px] uppercase tracking-[0.2em] text-slate-500">
            Operating System
          </span>
        </div>
      </div>

      <RunningApps
        windows={windows}
        activeWindowId={activeWindowId}
        onWindowClick={handleWindowClick}
      />

      <SystemTray />
    </footer>
  );
};

export default Taskbar;
