"use client";

import { WindowPosition, WindowSize } from "@/core/windowManager/windowTypes";
import WindowContent from "./WindowContent";
import WindowHeader from "./WindowHeader";
import { useWindowDrag } from "./hooks/useWindowDrag";

type BoundsRef = {
  readonly current: HTMLElement | null;
};

type WindowProps = {
  windowId: string;
  title: string;
  children: React.ReactNode;

  position?: WindowPosition;
  size?: WindowSize;

  zIndex?: number;
  isActive?: boolean;

  boundsRef: BoundsRef;
  onPositionChange: (position: WindowPosition) => void;

  onFocusRequest: (windowId: string) => void;

  onMinimize: (windowId: string) => void;
  onClose: (windowId: string) => void;
};

const Window = ({
  windowId,
  title,
  children,
  position = { x: 128, y: 96 },
  size = { width: 700, height: 450 },
  zIndex = 20,
  isActive = true,
  boundsRef,
  onPositionChange,
  onFocusRequest,
  onMinimize,
  onClose,
}: WindowProps) => {
  const { handlePointerDown, handlePointerMove, handlePointerUp } =
    useWindowDrag({
      position,
      size,
      boundsRef,
      onPositionChange,
    });
  return (
    <section
      className={`pointer-events-auto absolute flex flex-col overflow-hidden rounded-xl border bg-[#070B14]/95 backdrop-blur-xl transition-[border-color,box-shadow] duration-200 
      ${isActive ? "border-cyan-300/40 shadow-[0_0_35px_rgba(34,211,238,0.12)]" : "border-white/10 shadow-[0_15px_50px_rgba(0,0,0,0.35)]"}
      `}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex,
      }}
      onPointerDown={() => onFocusRequest(windowId)}
    >
      <WindowHeader
        title={title}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onMinimize={() => onMinimize(windowId)}
        onClose={() => onClose(windowId)}
      />

      <WindowContent>{children}</WindowContent>
    </section>
  );
};

export default Window;
