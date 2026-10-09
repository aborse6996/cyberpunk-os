import type { WindowState } from "../windowTypes";

type StatefulWindow = {
  windowId: string;
  state: WindowState;
  zIndex: number;
};

export const minimizeWindow = <T extends StatefulWindow>(
  windows: readonly T[],
  windowId: string,
): T[] => {
  return windows.map((window) =>
    window.windowId === windowId ? { ...window, state: "minimized" } : window,
  );
};

export const restoreWindow = <T extends StatefulWindow>(
  windows: readonly T[],
  windowId: string,
): T[] => {
  const target = windows.find((window) => window.windowId === windowId);

  if (!target) return [...windows];

  const highestZIndex = windows.reduce(
    (highest, window) => Math.max(highest, window.zIndex),
    0,
  );

  return windows.map((window) =>
    window.windowId === windowId
      ? {
          ...window,
          state: "normal",
          zIndex: highestZIndex + 1,
        }
      : window,
  );
};
