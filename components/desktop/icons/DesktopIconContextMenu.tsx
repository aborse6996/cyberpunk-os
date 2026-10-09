type DesktopIconContextMenuProps = {
  x: number;
  y: number;
  onOpen: () => void;
};

const DesktopIconContextMenu = ({
  x,
  y,
  onOpen,
}: DesktopIconContextMenuProps) => {
  return (
    <div
      className="
        fixed
        z-50
        min-w-40
        overflow-hidden
        rounded-xl
        border
        border-cyan-400/20
        bg-black/80
        p-1
        shadow-[0_0_30px_rgba(34,211,238,0.15)]
        backdrop-blur-xl
      "
      style={{
        left: x,
        top: y,
      }}
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        onClick={onOpen}
        className="
          w-full
          rounded-lg
          px-3
          py-2
          text-left
          text-sm
          text-white
          transition
          hover:bg-cyan-400/10
          hover:text-cyan-200
        "
      >
        Open
      </button>
    </div>
  );
};

export default DesktopIconContextMenu;
