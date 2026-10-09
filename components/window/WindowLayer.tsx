"use client";

import { useRef, useState } from "react";

import type {
  WindowPosition,
  WindowSize,
  WindowState,
} from "@/core/windowManager/windowTypes";

import {
  bringWindowToFront,
  getTopVisibleWindowId,
} from "@/core/windowManager/actions/windowFocus";

import {
  closeWindow as removeWindow,
} from "@/core/windowManager/actions/windowLifecycle";

import {
  minimizeWindow as minimizeWindowState,
  restoreWindow as restoreWindowState,
} from "@/core/windowManager/actions/windowStateActions";

import Window from "./Window";

type DemoWindow = {
  windowId: string;
  appId: string;
  title: string;
  position: WindowPosition;
  size: WindowSize;
  zIndex: number;
  state: WindowState;
};

const INITIAL_WINDOWS: DemoWindow[] = [
  {
    windowId: "terminal-001",
    appId: "terminal",
    title: "Terminal",
    position: { x: 128, y: 96 },
    size: { width: 700, height: 450 },
    zIndex: 21,
    state: "normal",
  },
  {
    windowId: "browser-001",
    appId: "browser",
    title: "Netrunner Browser",
    position: { x: 380, y: 170 },
    size: { width: 650, height: 410 },
    zIndex: 20,
    state: "normal",
  },
];

const WindowLayer = () => {
  const layerRef = useRef<HTMLDivElement>(null);

  const [windows, setWindows] =
    useState<DemoWindow[]>(INITIAL_WINDOWS);

  const [activeWindowId, setActiveWindowId] =
    useState<string | null>("terminal-001");

  const handleFocusRequest = (windowId: string) => {
    setWindows((current) =>
      bringWindowToFront(current, windowId)
    );

    setActiveWindowId(windowId);
  };

  const handlePositionChange = (
    windowId: string,
    position: WindowPosition
  ) => {
    setWindows((current) =>
      current.map((window) =>
        window.windowId === windowId
          ? { ...window, position }
          : window
      )
    );
  };

  const handleMinimizeWindow = (windowId: string) => {
    const nextWindows = minimizeWindowState(
      windows,
      windowId
    );

    setWindows(nextWindows);

    if (activeWindowId === windowId) {
      setActiveWindowId(
        getTopVisibleWindowId(nextWindows)
      );
    }
  };

  const handleCloseWindow = (windowId: string) => {
    const nextWindows = removeWindow(
      windows,
      windowId
    );

    setWindows(nextWindows);

    if (activeWindowId === windowId) {
      setActiveWindowId(
        getTopVisibleWindowId(nextWindows)
      );
    }
  };

  const handleRestoreWindow = (windowId: string) => {
    const nextWindows = restoreWindowState(
      windows,
      windowId
    );

    setWindows(nextWindows);
    setActiveWindowId(windowId);
  };

  const minimizedWindows = windows.filter(
    (window) => window.state === "minimized"
  );

  return (
    <div
      ref={layerRef}
      className="pointer-events-none absolute inset-0 z-20"
    >
      {windows
        .filter((window) => window.state !== "minimized")
        .map((window) => (
          <Window
            key={window.windowId}
            windowId={window.windowId}
            title={window.title}
            position={window.position}
            size={window.size}
            zIndex={window.zIndex}
            isActive={activeWindowId === window.windowId}
            boundsRef={layerRef}
            onFocusRequest={handleFocusRequest}
            onPositionChange={(position) =>
              handlePositionChange(window.windowId, position)
            }
            onMinimize={handleMinimizeWindow}
            onClose={handleCloseWindow}
          >
            {window.appId === "terminal" ? (
              <div className="min-h-full bg-[#05070D] p-5 font-mono text-sm text-slate-200">
                <p className="text-cyan-100">
                  CYBERPUNK OS [Version 0.1.0]
                </p>

                <p className="mt-1 text-slate-500">
                  System interface initialized.
                </p>

                <div className="mt-6 flex items-center gap-2">
                  <span className="text-emerald-300">
                    guest@nexus:~$
                  </span>

                  <span className="h-4 w-2 animate-pulse bg-cyan-300" />
                </div>
              </div>
            ) : (
              <div className="min-h-full bg-[#080D18] p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/60">
                  Netrunner Network
                </p>

                <h3 className="mt-4 text-xl font-semibold text-cyan-50">
                  Welcome to the Grid
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Browser interface initialized.
                </p>

                <div className="mt-6 rounded-lg border border-cyan-400/20 bg-black/30 p-4">
                  <p className="font-mono text-sm text-cyan-200">
                    net://cyberpunk.local
                  </p>
                </div>
              </div>
            )}
          </Window>
        ))}

      {minimizedWindows.length > 0 && (
        <div
          className="
            pointer-events-auto
            absolute bottom-4 left-1/2 z-100
            flex max-w-[calc(100%-2rem)] -translate-x-1/2
            flex-wrap items-center justify-center gap-2
            rounded-xl border border-cyan-400/20
            bg-black/80 p-2 backdrop-blur-xl
          "
        >
          {minimizedWindows.map((window) => (
            <button
              key={window.windowId}
              type="button"
              onClick={() => handleRestoreWindow(window.windowId)}
              className="
                rounded-lg border border-white/10
                bg-white/5 px-3 py-2
                text-xs text-cyan-100
                transition hover:border-cyan-300/40
                hover:bg-cyan-400/10
              "
            >
              Restore {window.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default WindowLayer;