import type {
  WindowGeometry,
  WindowPosition,
  WindowSize,
  WindowState,
} from "../windowTypes";

type StatefulWindow = {
  windowId: string;
  state: WindowState;
  zIndex: number;
  previousGeometry: WindowGeometry | null;
};

type MaximizableWindow = StatefulWindow & {
  position: WindowPosition;
  size: WindowSize;
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

export const maximizeWindow = <T extends MaximizableWindow>(
  windows: readonly T[],
  windowId: string,
  workspaceSize: WindowSize,
): T[] => {
  const target = windows.find((window) => window.windowId === windowId);

  if (!target || target.state === "maximized") {
    return [...windows];
  }

  const previousGeometry = target.previousGeometry ?? {
    position: { ...target.position },
    size: { ...target.size },
  };

  return windows.map((window) =>
    window.windowId === windowId
      ? {
          ...window,
          position: { x: 0, y: 0 },
          size: { ...workspaceSize },
          previousGeometry,
          state: "maximized",
        }
      : window,
  );
};

export const restoreMaximizedWindow = <T extends MaximizableWindow>(
  windows: readonly T[],
  windowId: string,
): T[] => {
  const target = windows.find((window) => window.windowId === windowId);

  if (!target || target.state !== "maximized" || !target.previousGeometry) {
    return [...windows];
  }

  return windows.map((window) =>
    window.windowId === windowId
      ? {
          ...window,
          position: {
            ...window.previousGeometry!.position,
          },
          size: {
            ...window.previousGeometry!.size,
          },
          previousGeometry: null,
          state: "normal",
        }
      : window,
  );
};
