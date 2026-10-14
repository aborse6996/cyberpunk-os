"use client";

import { useWindowManager } from "@/hooks/useWindowManager";

import RunningApps from "./RunningApps";
import SystemTray from "./SystemTray";
import StartButton from "./StartButton";
import StartMenu from "./StartMenu";
import { useEffect, useRef, useState } from "react";
import { launchApp } from "@/core/apps/appLauncher";
import { useSystemManager } from "@/hooks/useSystemManager";
import type { SystemMenuAction } from "./StartMenu";

const Taskbar = () => {
  const {
    windows,
    activeWindowId,
    focusWindow,
    minimizeWindow,
    restoreWindow,
  } = useWindowManager();

  const { lock, sleep, logout, restart, shutdown } = useSystemManager();

  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const startAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isStartMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (target instanceof Node && !startAreaRef.current?.contains(target)) {
        setIsStartMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsStartMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isStartMenuOpen]);

  const handleLaunchApp = (appId: string) => {
    launchApp(appId);
    setIsStartMenuOpen(false);
  };

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

  const handleSystemAction = (action: SystemMenuAction) => {
    setIsStartMenuOpen(false);

    switch (action) {
      case "lock":
        lock();
        break;

      case "sleep":
        sleep();
        break;

      case "logout":
        logout();
        break;

      case "restart":
        restart();
        break;

      case "shutdown":
        shutdown();
        break;
    }
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
      {/* Start Button + Start Menu */}
      <div ref={startAreaRef} className="relative flex shrink-0 items-center">
        <StartButton
          isOpen={isStartMenuOpen}
          onClick={() => setIsStartMenuOpen((previous) => !previous)}
        />

        {isStartMenuOpen && (
          <StartMenu
            onLaunchApp={handleLaunchApp}
            onSystemAction={handleSystemAction}
          />
        )}
      </div>

      {/* Running Applications */}
      <RunningApps
        windows={windows}
        activeWindowId={activeWindowId}
        onWindowClick={handleWindowClick}
      />

      {/* System Tray */}
      <SystemTray />
    </footer>
  );
};

export default Taskbar;
