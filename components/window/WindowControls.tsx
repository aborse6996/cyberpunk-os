type WindowControlsProps = {
  onMinimize: () => void;
  onClose: () => void;
};

const WindowControls = ({ onMinimize, onClose }: WindowControlsProps) => {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <button
        type="button"
        data-window-control
        aria-label="Minimize window"
        title="Minimize"
        onClick={(event) => {
          event.stopPropagation();
          onMinimize();
        }}
        className="h-3 w-3 rounded-full bg-amber-300/90 transition hover:scale-125 hover:bg-amber-200
        "
      />

      <span
        aria-hidden="true"
        title="Maximize (coming next)"
        className="h-3 w-3 rounded-full bg-cyan-300/90"
      />

      <button
        type="button"
        data-window-control
        aria-label="Close window"
        title="Close"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        className="h-3 w-3 rounded-full bg-rose-400/90 transition hover:scale-125 hover:bg-rose-300
        "
      />
    </div>
  );
};

export default WindowControls;
