"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

import { useWindowManager } from "@/hooks/useWindowManager";
import RunningApps from "./RunningApps";
import SystemTray from "./SystemTray";
import StartButton from "./StartButton";
import StartMenu from "./StartMenu";
import { launchApp } from "@/core/apps/appLauncher";
import { useSystemManager } from "@/hooks/useSystemManager";
import type { SystemMenuAction } from "./StartMenu";
import { UseKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import WindowSwitcher from "../desktop/WindowSwitcher";

const Taskbar = () => {
  const {
    windows,
    activeWindowId,
    focusWindow,
    minimizeWindow,
    restoreWindow,
  } = useWindowManager();

  const {
    state: systemState,
    lock,
    sleep,
    logout,
    restart,
    shutdown,
  } = useSystemManager();

  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const [isWindowSwitcherOpen, setIsWindowSwitcherOpen] = useState(false);

  const startAreaRef = useRef<HTMLDivElement>(null);

  const toggleStartMenu = useCallback(() => {
    setIsWindowSwitcherOpen(false);
    setIsStartMenuOpen((previous) => !previous);
  }, []);

  const handleOpenWindowSwitcher = useCallback(() => {
    setIsStartMenuOpen(false);
    setIsWindowSwitcherOpen(true);
  }, []);

  const handleCloseWindowSwitcher = useCallback(() => {
    setIsWindowSwitcherOpen(false);
  }, []);

  const handleSelectWindow = useCallback(
    (windowId: string) => {
      const selectedWindow = windows.find(
        (window) => window.windowId === windowId,
      );

      if (!selectedWindow) return;

      if (selectedWindow.state === "minimized") {
        restoreWindow(windowId);
      } else {
        focusWindow(windowId);
      }
    },
    [windows, restoreWindow, focusWindow],
  );

  useEffect(() => {
    if (systemState !== "desktop") {
      setIsStartMenuOpen(false);
      setIsWindowSwitcherOpen(false);
    }
  }, [systemState]);

  const handleSwitchWindow = useCallback(() => {
    if (windows.length === 0) return;

    const currentIndex = windows.findIndex(
      (window) => window.windowId === activeWindowId,
    );

    const nextIndex =
      currentIndex === -1 ? 0 : (currentIndex + 1) % windows.length;

    const nextWindow = windows[nextIndex];

    if (!nextWindow) return;

    if (nextWindow.state === "minimized") {
      restoreWindow(nextWindow.windowId);
    } else {
      focusWindow(nextWindow.windowId);
    }
  }, [windows, activeWindowId, restoreWindow, focusWindow]);

  const handleLaunchTerminal = useCallback(() => {
    launchApp("terminal");
    setIsStartMenuOpen(false);
  }, []);

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
    setIsWindowSwitcherOpen(false);
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
    setIsWindowSwitcherOpen(false);

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

  UseKeyboardShortcuts({
    onToggleStartMenu: toggleStartMenu,
    onSwitchWindow: handleOpenWindowSwitcher,
    onLaunchTerminal: handleLaunchTerminal,
    enabled: systemState === "desktop",
  });

  return (
    <>
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
          <StartButton isOpen={isStartMenuOpen} onClick={toggleStartMenu} />

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
      {isWindowSwitcherOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <WindowSwitcher
            windows={windows}
            activeWindowId={activeWindowId}
            onSelectWindow={handleSelectWindow}
            onClose={handleCloseWindowSwitcher}
          />,
          document.body,
        )}
    </>
  );
};

export default Taskbar;
