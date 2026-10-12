import WindowControls from "./WindowControls";

type WindowHeaderProps = {
  title: string;
  onPointerDown: React.PointerEventHandler<HTMLElement>;
  onPointerMove: React.PointerEventHandler<HTMLElement>;
  onPointerUp: React.PointerEventHandler<HTMLElement>;
  onMinimize: () => void;
  onClose: () => void;
  onToggleMaximize: () => void;
  isMaximized: boolean;
};

const WindowHeader = ({
  title,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onMinimize,
  onClose,
  onToggleMaximize,
  isMaximized,
}: WindowHeaderProps) => {
  return (
    <header
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className="flex h-12 shrink-0 touch-none select-none cursor-grab active:cursor-grabbing items-center justify-between border-b bg-[#0B1220]/95 border-cyan-400/15 px-4"
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-cyan-300/10 text-xs font-bold text-cyan-200">
          C
        </div>
        <div className="min-w-0">
          <h2 className="truncate text-sm font-medium text-cyan-50">{title}</h2>
          <p className="text-[9px] uppercase tracking-[0.18em] text-cyan-100/40">
            CyberpunkOS . Process
          </p>
        </div>
      </div>
      <WindowControls
        onMinimize={onMinimize}
        onToggleMaximize={onToggleMaximize}
        onClose={onClose}
        isMaximized={isMaximized}
      />
    </header>
  );
};

export default WindowHeader;
