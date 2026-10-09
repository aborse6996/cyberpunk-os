type IdentifiedWindow = {
    windowId: string;
}

export const closeWindow = <T extends IdentifiedWindow>(
  windows: readonly T[],
  windowId: string
): T[] => {
  return windows.filter(
    (window) => window.windowId !== windowId
  );
};