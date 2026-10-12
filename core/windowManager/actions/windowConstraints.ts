import type { WindowSize } from "../windowTypes";

export const MIN_WINDOW_SIZE: WindowSize = {
  width: 360,
  height: 220,
};

type AvailableSize = WindowSize;

export const clampWindowSize = (
  requestedSize: WindowSize,
  availableSize: AvailableSize
): WindowSize => {
  const maxWidth = Math.max(0, availableSize.width);
  const maxHeight = Math.max(0, availableSize.height);

  const minWidth = Math.min(
    MIN_WINDOW_SIZE.width,
    maxWidth
  );

  const minHeight = Math.min(
    MIN_WINDOW_SIZE.height,
    maxHeight
  );

  return {
    width: Math.min(
      maxWidth,
      Math.max(minWidth, requestedSize.width)
    ),
    height: Math.min(
      maxHeight,
      Math.max(minHeight, requestedSize.height)
    ),
  };
};