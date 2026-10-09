import { GRID_SIZE } from "../constants";
import type { Position } from "../types";

export const snapToGrid = (value: number) => {
  return Math.round(value / GRID_SIZE) * GRID_SIZE;
};

export const snapPositionToGrid = (
  position: Position
): Position => {
  return {
    x: snapToGrid(position.x),
    y: snapToGrid(position.y),
  };
};