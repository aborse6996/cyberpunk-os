import type { WindowState } from "../windowTypes";

type FocusableWindow = {
  windowId: string;
  zIndex: number;
  state?: WindowState;
};

export const bringWindowToFront = <
  T extends FocusableWindow,
>(
  windows: readonly T[],
  windowId: string
): T[] => {
  const target = windows.find(
    (window) => window.windowId === windowId
  );

  if (!target) return [...windows];

  const highestZIndex = windows.reduce(
    (highest, window) => Math.max(highest, window.zIndex),
    0
  );

  if (
    target.zIndex === highestZIndex &&
    windows.filter((window) => window.zIndex === highestZIndex)
      .length === 1
  ) {
    return [...windows];
  }

  return windows.map((window) =>
    window.windowId === windowId
      ? { ...window, zIndex: highestZIndex + 1 }
      : window
  );
};

export const getTopVisibleWindowId = <
  T extends FocusableWindow,
>(
  windows: readonly T[]
): string | null => {
  let topWindow: T | undefined;

  for (const window of windows) {
    if (window.state === "minimized") continue;

    if (!topWindow || window.zIndex > topWindow.zIndex) {
      topWindow = window;
    }
  }

  return topWindow?.windowId ?? null;
};