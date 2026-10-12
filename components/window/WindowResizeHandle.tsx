"use client";

import type {
  PointerEventHandler,
} from "react";

type WindowResizeHandleProps = {
  onPointerDown: PointerEventHandler<HTMLDivElement>;
  onPointerMove: PointerEventHandler<HTMLDivElement>;
  onPointerUp: PointerEventHandler<HTMLDivElement>;
};

const WindowResizeHandle = ({
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: WindowResizeHandleProps) => {
  return (
    <div
      role="separator"
      aria-label="Resize window"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className="
        absolute bottom-0 right-0 z-10
        flex h-5 w-5 touch-none
        cursor-nwse-resize items-end justify-end
        p-1
      "
    >
      <span
        className="
          h-2.5 w-2.5
          border-b-2 border-r-2
          border-cyan-300/50
          transition-colors
          hover:border-cyan-200
        "
      />
    </div>
  );
};

export default WindowResizeHandle;