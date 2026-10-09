import {
  ICON_GAP,
  ICON_HEIGHT,
  ICON_WIDTH,
  GRID_SIZE,
} from "../constants";

import { snapPositionToGrid } from "./grid";

import type { Position } from "../types";

export const isColliding = (
  first: Position,
  second: Position
) => {
  return (
    first.x < second.x + ICON_WIDTH + ICON_GAP &&
    first.x + ICON_WIDTH + ICON_GAP > second.x &&
    first.y < second.y + ICON_HEIGHT + ICON_GAP &&
    first.y + ICON_HEIGHT + ICON_GAP > second.y
  );
};

export const findFreePosition = ({
  position,
  currentIconId,
  positions,
  workspaceWidth,
  workspaceHeight,
}: {
  position: Position;
  currentIconId: string;
  positions: Record<string, Position>;
  workspaceWidth: number;
  workspaceHeight: number;
}) => {
  const maxX = Math.max(
    0,
    workspaceWidth - ICON_WIDTH
  );

  const maxY = Math.max(
    0,
    workspaceHeight - ICON_HEIGHT
  );

  const snapped = snapPositionToGrid(position);

  const startX = Math.min(
    Math.max(0, snapped.x),
    maxX
  );

  const startY = Math.min(
    Math.max(0, snapped.y),
    maxY
  );

  const isPositionFree = (
    candidate: Position
  ) => {
    return Object.entries(positions).every(
      ([iconId, otherPosition]) => {
        if (iconId === currentIconId) {
          return true;
        }

        return !isColliding(
          candidate,
          otherPosition
        );
      }
    );
  };

  if (
    isPositionFree({
      x: startX,
      y: startY,
    })
  ) {
    return {
      x: startX,
      y: startY,
    };
  }

  const maxSearchRadius = 10;

  for (
    let radius = 1;
    radius <= maxSearchRadius;
    radius++
  ) {
    const candidates: Position[] = [];

    for (
      let dx = -radius;
      dx <= radius;
      dx++
    ) {
      for (
        let dy = -radius;
        dy <= radius;
        dy++
      ) {
        if (
          Math.abs(dx) !== radius &&
          Math.abs(dy) !== radius
        ) {
          continue;
        }

        candidates.push({
          x: startX + dx * GRID_SIZE,
          y: startY + dy * GRID_SIZE,
        });
      }
    }

    for (const candidate of candidates) {
      if (
        candidate.x < 0 ||
        candidate.y < 0 ||
        candidate.x > maxX ||
        candidate.y > maxY
      ) {
        continue;
      }

      if (isPositionFree(candidate)) {
        return candidate;
      }
    }
  }

  return {
    x: startX,
    y: startY,
  };
};