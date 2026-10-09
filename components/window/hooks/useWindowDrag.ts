"use client";

import React, { useRef } from "react";

import type {
  WindowPosition,
  WindowSize,
} from "@/core/windowManager/windowTypes";

import { calculateDraggedPosition } from "@/core/windowManager/actions/windowGeometry";

type BoundsRef = {
  readonly current: HTMLElement | null;
};

type DragSession = {
  pointerId: number;
  startPointerX: number;
  startPointerY: number;
  startPosition: WindowPosition;
  moved: boolean;
};

type UseWindowDragProps = {
  position: WindowPosition;
  size: WindowSize;
  boundsRef: BoundsRef;
  onPositionChange: (position: WindowPosition) => void;
};

export const useWindowDrag = ({
  position,
  size,
  boundsRef,
  onPositionChange,
}: UseWindowDragProps) => {
  const dragRef = useRef<DragSession | null>(null);

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (event.button !== 0) return;

    const target = event.target;

    if (target instanceof Element && target.closest("[data-window-control]")) {
      return;
    }

    event.preventDefault();

    dragRef.current = {
      pointerId: event.pointerId,
      startPointerX: event.clientX,
      startPointerY: event.clientY,
      startPosition: { ...position },
      moved: false,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - drag.startPointerX;
    const deltaY = event.clientY - drag.startPointerY;

    if (!drag.moved) {
      if (Math.hypot(deltaX, deltaY) < 3) {
        return;
      }
      drag.moved = true;
    }

    const workspace = boundsRef.current;

    if (!workspace) return;

    const bounds = workspace.getBoundingClientRect();

    const nextPosition = calculateDraggedPosition({
      startPosition: drag.startPosition,
      deltaX,
      deltaY,
      windowSize: size,
      workspaceSize: {
        width: bounds.width,
        height: bounds.height,
      },
    });

    onPositionChange(nextPosition);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLElement>) => {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragRef.current = null;
  };

  return { handlePointerDown, handlePointerMove, handlePointerUp };
};
