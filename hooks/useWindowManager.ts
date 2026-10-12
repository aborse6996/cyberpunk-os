"use client";

import { windowManager } from "@/core/windowManager/windowManager";
import { useSyncExternalStore } from "react";

export const useWindowManager = () => {
  const snapshot = useSyncExternalStore(
    windowManager.subscribe,
    windowManager.getSnapshot,
    windowManager.getSnapshot,
  );

  return {
    windows: snapshot.windows,
    activeWindowId: snapshot.activeWindowId,

    createWindow: windowManager.createWindow,
    focusWindow: windowManager.focusWindow,
    closeWindow: windowManager.closeWindow,
    minimizeWindow: windowManager.minimizeWindow,
    restoreWindow: windowManager.restoreWindow,
    toggleMaximizeWindow: windowManager.toggleMaximizeWindow,
    moveWindow: windowManager.moveWindow,
    resizeWindow: windowManager.resizeWindow,
  };
};
