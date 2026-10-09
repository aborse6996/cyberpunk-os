import type { Dispatch, SetStateAction } from "react";

export type Position = {
  x: number;
  y: number;
};

export type DesktopIconData = {
  id: string;
  appId: string;
  position: Position;
};

export type ContextMenuState = {
  x: number;
  y: number;
  iconId: string;
} | null;

export type DragState = {
  iconId: string;
  pointerId: number;

  startPointerX: number;
  startPointerY: number;

  startX: number;
  startY: number;

  moved: boolean;
};

export type DesktopIconsProps = {
  selectedIcon: string | null;
  setSelectedIcon: Dispatch<SetStateAction<string | null>>;
};

export type DesktopIconProps = {
  label: string;
  icon: string;
  selected: boolean;
  x: number;
  y: number;
  onSelect: () => void;
  onOpen: () => void;
  onContextMenu: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => void;
  onPointerMove: (event: React.PointerEvent<HTMLButtonElement>) => void;
  onPointerUp: (event: React.PointerEvent<HTMLButtonElement>) => void;
};