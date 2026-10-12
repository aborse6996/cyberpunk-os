"use client";

import { useRef } from "react";

import type { WindowSize } from "@/core/windowManager/windowTypes";

import { useWindowManager } from "@/hooks/useWindowManager";

import AppContent from "@/components/apps/AppContent";
import Window from "./Window";

const WindowLayer = () => {
  const layerRef = useRef<HTMLDivElement>(null);

  const {
    windows,
    activeWindowId,
    focusWindow,
    closeWindow,
    minimizeWindow,
    restoreWindow,
    toggleMaximizeWindow,
    moveWindow,
    resizeWindow,
  } = useWindowManager();

  const handleToggleMaximize = (windowId: string) => {
    const workspace = layerRef.current;

    if (!workspace) return;

    const bounds = workspace.getBoundingClientRect();

    const workspaceSize: WindowSize = {
      width: bounds.width,
      height: bounds.height,
    };

    toggleMaximizeWindow(windowId, workspaceSize);
  };

  return (
    <div ref={layerRef} className="pointer-events-none absolute inset-0 z-20">
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
            isMaximized={window.state === "maximized"}
            boundsRef={layerRef}
            onFocusRequest={focusWindow}
            onPositionChange={(position) =>
              moveWindow(window.windowId, position)
            }
            onSizeChange={(size) => resizeWindow(window.windowId, size)}
            onMinimize={minimizeWindow}
            onToggleMaximize={handleToggleMaximize}
            onClose={closeWindow}
          >
            <AppContent appId={window.appId} />
          </Window>
        ))}
    </div>
  );
};

export default WindowLayer;
