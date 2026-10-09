"use client";

import { DesktopIconProps } from "./types";

const DesktopIcon = ({
  label,
  icon,
  selected,
  x,
  y,
  onSelect,
  onOpen,
  onContextMenu,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: DesktopIconProps) => {
  return (
    <button
      type="button"
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
      onDoubleClick={(event) => {
        event.stopPropagation();
        onOpen();
      }}
      onContextMenu={onContextMenu}
      onPointerDown={(event) => {
        event.stopPropagation();
        onPointerDown(event);
      }}
      onPointerMove={(event) => {
        event.stopPropagation();
        onPointerMove(event);
      }}
      onPointerUp={(event) => {
        event.stopPropagation();
        onPointerUp(event);
      }}
      className={`absolute flex w-24 h-24 touch-none select-none outline-none flex-col items-center gap-2 rounded-xl p-2 text-white transition duration-200
        ${selected ? "bg-cyan-400/15 ring-1 ring-cyan-300/50" : "hover:bg-white/10"}`}
    >
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-xl border border-white/20 bg-black text-2xl shadow-lg backdrop-blur-sm
        ${selected ? "border-cyan-300/70 shadow-[0_0_20px_rgba(34,211,238,0.35)]" : "border-white/20"}`}
      >
        {icon}
      </div>

      <span
        className={`
          text-center text-sm
          ${selected ? "text-cyan-200" : "text-white/90"}
        `}
      >
        {label}
      </span>
    </button>
  );
};

export default DesktopIcon;
