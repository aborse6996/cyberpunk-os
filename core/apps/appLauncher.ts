import { appRegistry } from "./appRegistry";
import { windowManager } from "@/core/windowManager/windowManager";

let nextWindowId = 1;

export const launchApp = (appId: string): string | null => {
  const app = appRegistry.getById(appId);

  if (!app) {
    console.warn(`CyberpunkOS: app "${appId}" is not registered.`);
    return null;
  }

  const { windows } = windowManager.getSnapshot();

  // For now, each application has only one window.
  const existingWindow = windows.find((window) => window.appId === appId);

  if (existingWindow) {
    if (existingWindow.state === "minimized") {
      windowManager.restoreWindow(existingWindow.windowId);
    } else {
      windowManager.focusWindow(existingWindow.windowId);
    }
    return existingWindow.windowId;
  }

  // Offset new windows slightly so they don't all overlap exactly.
  const offset = (windows.length % 6) * 32;

  const window = windowManager.createWindow({
    windowId: `window-${appId}-${nextWindowId++}`,
    appId: app.id,
    title: app.name,
    position: {
      x: 100 + offset,
      y: 80 + offset,
    },
    size: {
      width: 700,
      height: 450,
    },
  });

  return window.windowId;
};
