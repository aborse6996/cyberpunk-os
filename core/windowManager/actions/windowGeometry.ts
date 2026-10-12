import type { WindowPosition, WindowSize } from "../windowTypes";
import { clampWindowSize } from "./windowConstraints";

type WorkspaceSize = {
  width: number;
  height: number;
};

type DragPositionOptions = {
  startPosition: WindowPosition;
  deltaX: number;
  deltaY: number;
  windowSize: WindowSize;
  workspaceSize: WorkspaceSize;
};

type ResizeWindowOptions = {
  startSize: WindowSize;
  deltaX: number;
  deltaY: number;
  availableSize: WindowSize;
};

export const calculateDraggedPosition = ({
  startPosition,
  deltaX,
  deltaY,
  windowSize,
  workspaceSize,
}: DragPositionOptions): WindowPosition => {
  const maxX = Math.max(0, workspaceSize.width - windowSize.width);
  const maxY = Math.max(0, workspaceSize.height - windowSize.height);

  return {
    x: Math.min(maxX, Math.max(0, startPosition.x + deltaX)),
    y: Math.min(maxY, Math.max(0, startPosition.y + deltaY)),
  };
};

export const calculateResizedSize = ({
  startSize,
  deltaX,
  deltaY,
  availableSize,
}: ResizeWindowOptions): WindowSize => {
  const requestedSize = {
    width: startSize.width + deltaX,
    height: startSize.height + deltaY,
  };

  return clampWindowSize(
    requestedSize,
    availableSize
  );
};
