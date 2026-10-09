import {
  useRef,
  useState,
} from "react";

import type {
  Dispatch,
  PointerEvent as ReactPointerEvent,
  SetStateAction,
} from "react";

import {
  DRAG_THRESHOLD,
  ICON_HEIGHT,
  ICON_WIDTH,
} from "../constants";

import {
  findFreePosition,
} from "../utils/collision";

import type {
  DragState,
  Position,
} from "../types";

type UseDesktopIconDragProps = {
  positions: Record<string, Position>;
  setPositions: Dispatch<
    SetStateAction<Record<string, Position>>
  >;
  setSelectedIcon: Dispatch<
    SetStateAction<string | null>
  >;
};

export const useDesktopIconDrag = ({
  positions,
  setPositions,
  setSelectedIcon,
}: UseDesktopIconDragProps) => {
  const workspaceRef =
    useRef<HTMLDivElement>(null);

  const dragRef =
    useRef<DragState | null>(null);

  const handlePointerDown = (
    event: ReactPointerEvent<HTMLButtonElement>,
    iconId: string
  ) => {
    if (event.button !== 0) {
      return;
    }

    const position = positions[iconId];

    if (!position) {
      return;
    }

    event.preventDefault();

    dragRef.current = {
      iconId,
      pointerId: event.pointerId,

      startPointerX: event.clientX,
      startPointerY: event.clientY,

      startX: position.x,
      startY: position.y,

      moved: false,
    };

    event.currentTarget.setPointerCapture(
      event.pointerId
    );

    setSelectedIcon(iconId);
  };

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLButtonElement>
  ) => {
    const drag = dragRef.current;

    if (!drag) {
      return;
    }

    if (
      drag.pointerId !== event.pointerId
    ) {
      return;
    }

    const deltaX =
      event.clientX - drag.startPointerX;

    const deltaY =
      event.clientY - drag.startPointerY;

    if (!drag.moved) {
      const distance = Math.sqrt(
        deltaX * deltaX +
          deltaY * deltaY
      );

      if (distance < DRAG_THRESHOLD) {
        return;
      }

      drag.moved = true;
    }

    const workspace =
      workspaceRef.current;

    if (!workspace) {
      return;
    }

    const workspaceRect =
      workspace.getBoundingClientRect();

    const maxX = Math.max(
      0,
      workspaceRect.width - ICON_WIDTH
    );

    const maxY = Math.max(
      0,
      workspaceRect.height - ICON_HEIGHT
    );

    const newX = Math.min(
      Math.max(
        0,
        drag.startX + deltaX
      ),
      maxX
    );

    const newY = Math.min(
      Math.max(
        0,
        drag.startY + deltaY
      ),
      maxY
    );

    setPositions((previous) => ({
      ...previous,
      [drag.iconId]: {
        x: newX,
        y: newY,
      },
    }));
  };

  const handlePointerUp = (
    event: ReactPointerEvent<HTMLButtonElement>
  ) => {
    const drag = dragRef.current;

    if (!drag) {
      return;
    }

    if (
      drag.pointerId !== event.pointerId
    ) {
      return;
    }

    const workspace =
      workspaceRef.current;

    const currentPosition =
      positions[drag.iconId];

    if (
      workspace &&
      currentPosition &&
      drag.moved
    ) {
      const workspaceRect =
        workspace.getBoundingClientRect();

      const finalPosition =
        findFreePosition({
          position: currentPosition,
          currentIconId: drag.iconId,
          positions,
          workspaceWidth:
            workspaceRect.width,
          workspaceHeight:
            workspaceRect.height,
        });

      setPositions((previous) => ({
        ...previous,
        [drag.iconId]: finalPosition,
      }));
    }

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    }

    dragRef.current = null;
  };

  return {
    workspaceRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
};