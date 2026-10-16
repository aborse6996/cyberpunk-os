import {
  bringWindowToFront,
  getTopVisibleWindowId,
} from "./actions/windowFocus";

import type {
  CreateWindowOptions,
  WindowDefinition,
  WindowPosition,
  WindowSize,
  WindowGeometry,
} from "./windowTypes";

import { closeWindow as removeWindow } from "./actions/windowLifecycle";

import {
  maximizeWindow as maximizeWindowState,
  minimizeWindow as minimizeWindowState,
  restoreMaximizedWindow as restoreMaximizedWindowState,
  restoreWindow as restoreWindowState,
} from "./actions/windowStateActions";

export type WindowManagerSnapshot = {
  windows: WindowDefinition[];
  activeWindowId: string | null;
};

const DEFAULT_POSITION: WindowPosition = {
  x: 100,
  y: 100,
};

const DEFAULT_SIZE: WindowSize = {
  width: 700,
  height: 450,
};

class WindowManager {
  private snapshot: WindowManagerSnapshot = {
    windows: [],
    activeWindowId: null,
  };

  private listeners = new Set<() => void>();

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  };

  getSnapshot = () => this.snapshot;

  private commit(windows: WindowDefinition[], activeWindowId: string | null) {
    this.snapshot = {
      windows,
      activeWindowId,
    };

    this.listeners.forEach((listener) => listener());
  }

  // Create a window. Repeated IDs won't create duplicates.
  createWindow = (options: CreateWindowOptions): WindowDefinition => {
    const existing = this.snapshot.windows.find(
      (window) => window.windowId === options.windowId,
    );

    if (existing) {
      return existing;
    }

    const highestZindex = this.snapshot.windows.reduce(
      (highest, window) => Math.max(highest, window.zIndex),
      0,
    );

    const window: WindowDefinition = {
      windowId: options.windowId,
      appId: options.appId,
      title: options.title,

      position: {
        ...(options.position ?? DEFAULT_POSITION),
      },

      size: {
        ...(options.size ?? DEFAULT_SIZE),
      },

      previousGeometry: null,
      state: "normal",
      zIndex: highestZindex + 1,
    };

    this.commit([...this.snapshot.windows, window], window.windowId);

    return window;
  };

  //  Focus on an already existing window
  focusWindow = (windowId: string) => {
    const target = this.snapshot.windows.find(
      (window) => window.windowId === windowId,
    );

    if (!target || target.state === "minimized") {
      return;
    }

    const windows = bringWindowToFront(this.snapshot.windows, windowId);

    this.commit(windows, windowId);
  };

  // Close the window and bring other window as active
  closeWindow = (windowId: string) => {
    const exists = this.snapshot.windows.some(
      (window) => window.windowId === windowId,
    );

    if (!exists) return;

    const windows = removeWindow(this.snapshot.windows, windowId);

    const activeWindowId =
      this.snapshot.activeWindowId === windowId
        ? getTopVisibleWindowId(windows)
        : this.snapshot.activeWindowId;

    this.commit(windows, activeWindowId);
  };

  // This minimized the window
  minimizeWindow = (windowId: string) => {
    const target = this.snapshot.windows.find(
      (window) => window.windowId === windowId,
    );

    if (!target || target.state === "minimized") {
      return;
    }

    const windows = minimizeWindowState(this.snapshot.windows, windowId);

    const activeWindowId =
      this.snapshot.activeWindowId === windowId
        ? getTopVisibleWindowId(windows)
        : this.snapshot.activeWindowId;

    this.commit(windows, activeWindowId);
  };

  // This restore the window  to previous geometry
  restoreWindow = (windowId: string) => {
    const target = this.snapshot.windows.find(
      (window) => window.windowId === windowId,
    );

    if (!target) return;

    const restored = restoreWindowState(this.snapshot.windows, windowId);

    const windows = bringWindowToFront(restored, windowId);

    this.commit(windows, windowId);
  };

  // Maximize the window
  toggleMaximizeWindow = (windowId: string, workspaceSize: WindowSize) => {
    const target = this.snapshot.windows.find(
      (window) => window.windowId === windowId,
    );

    if (!target || target.state === "minimized") {
      return;
    }

    const updated =
      target.state === "maximized"
        ? restoreMaximizedWindowState(this.snapshot.windows, windowId)
        : maximizeWindowState(this.snapshot.windows, windowId, workspaceSize);

    const windows = bringWindowToFront(updated, windowId);

    this.commit(windows, windowId);
  };

  // Changes the window position
  moveWindow = (windowId: string, position: WindowPosition) => {
    const target = this.snapshot.windows.find(
      (window) => window.windowId === windowId,
    );

    if (!target || target.state !== "normal") {
      return;
    }

    const windows = this.snapshot.windows.map((window) =>
      window.windowId === windowId
        ? { ...window, position: { ...position } }
        : window,
    );

    this.commit(windows, this.snapshot.activeWindowId);
  };

  // Change the size of the window
  resizeWindow = (windowId: string, size: WindowSize) => {
    const target = this.snapshot.windows.find(
      (window) => window.windowId === windowId,
    );

    if (!target || target.state !== "normal") {
      return;
    }

    const windows = this.snapshot.windows.map((window) =>
      window.windowId === windowId ? { ...window, size: { ...size } } : window,
    );

    this.commit(windows, this.snapshot.activeWindowId);
  };

  // Reset after shutdown or restart
  resetSession = () => {
    if (
      this.snapshot.windows.length === 0 &&
      this.snapshot.activeWindowId === null
    ) {
      return;
    }

    this.commit([], null);
  };
}

export const windowManager = new WindowManager();
