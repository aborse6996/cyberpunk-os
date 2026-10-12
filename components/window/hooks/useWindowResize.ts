"use client";

import { useRef } from "react";

import type {
  WindowPosition,
  WindowSize,
} from "@/core/windowManager/windowTypes";

import {
  calculateResizedSize,
} from "@/core/windowManager/actions/windowGeometry";

type BoundsRef = {
  readonly current: HTMLElement | null;
};

type ResizeSession = {
  pointerId: number;
  startPointerX: number;
  startPointerY: number;
  startSize: WindowSize;
};

type UseWindowResizeProps = {
  position: WindowPosition;
  size: WindowSize;
  boundsRef: BoundsRef;
  onSizeChange: (size: WindowSize) => void;
};

export const useWindowResize = ({
  position,
  size,
  boundsRef,
  onSizeChange,
}: UseWindowResizeProps) => {
  const resizeRef = useRef<ResizeSession | null>(null);

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (event.button !== 0) return;

    event.preventDefault();

    resizeRef.current = {
      pointerId: event.pointerId,
      startPointerX: event.clientX,
      startPointerY: event.clientY,
      startSize: { ...size },
    };

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    const session = resizeRef.current;

    if (!session) return;

    if (session.pointerId !== event.pointerId) {
      return;
    }

    const workspace = boundsRef.current;

    if (!workspace) return;

    const bounds = workspace.getBoundingClientRect();

    const deltaX =
      event.clientX - session.startPointerX;

    const deltaY =
      event.clientY - session.startPointerY;

    const availableSize: WindowSize = {
      width: Math.max(0, bounds.width - position.x),
      height: Math.max(0, bounds.height - position.y),
    };

    const nextSize = calculateResizedSize({
      startSize: session.startSize,
      deltaX,
      deltaY,
      availableSize,
    });

    onSizeChange(nextSize);
  };

  const handlePointerUp = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    const session = resizeRef.current;

    if (!session) return;

    if (session.pointerId !== event.pointerId) {
      return;
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

    resizeRef.current = null;
  };

  return {
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
};