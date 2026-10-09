import type { WindowPosition, WindowSize } from "../windowTypes";

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
