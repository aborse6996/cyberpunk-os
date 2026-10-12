type StartButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

const StartButton = ({ isOpen, onClick }: StartButtonProps) => {
  return (
    <button
      type="button"
      aria-label="CyberpunkOS Start Menu"
      aria-expanded={isOpen}
      aria-controls="cyberpunk-start-menu"
      onClick={onClick}
      className="
        flex shrink-0 items-center gap-3
        rounded-lg p-1.5 pr-3
        transition-colors duration-200
        hover:bg-white/6
        focus-visible:outline-none
        focus-visible:ring-1
        focus-visible:ring-cyan-300/60
      "
    >
      <span
        className={`
          flex h-9 w-9 items-center justify-center
          rounded-lg border bg-cyan-300/10
          text-sm font-bold text-cyan-200
          transition-all duration-200
          ${
            isOpen
              ? "border-cyan-300/60 shadow-[0_0_18px_rgba(34,211,238,0.2)]"
              : "border-cyan-300/30"
          }
        `}
      >
        C
      </span>

      <span className="hidden flex-col items-start sm:flex">
        <span className="text-[11px] font-semibold tracking-[0.16em] text-cyan-50">
          CYBERPUNK
        </span>

        <span className="text-[9px] uppercase tracking-[0.2em] text-slate-500">
          Operating System
        </span>
      </span>
    </button>
  );
};

export default StartButton;
