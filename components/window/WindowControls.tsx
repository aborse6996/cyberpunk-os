type WindowControlsProps = {
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onClose: () => void;
  isMaximized: boolean;
};

const WindowControls = ({
  onMinimize,
  onToggleMaximize,
  onClose,
  isMaximized,
}: WindowControlsProps) => {
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
        className="h-3 w-3 rounded-full bg-amber-300/90 transition hover:scale-125 hover:bg-amber-200"
      />

      <button
        type="button"
        data-window-control
        aria-label={
          isMaximized ? "Restore window" : "Maximize window"
        }
        title={isMaximized ? "Restore" : "Maximize"}
        onClick={(event) => {
          event.stopPropagation();
          onToggleMaximize();
        }}
        className="h-3 w-3 rounded-full bg-cyan-300/90 transition hover:scale-125 hover:bg-cyan-200"
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
        className="h-3 w-3 rounded-full bg-rose-400/90 transition hover:scale-125 hover:bg-rose-300"
      />
    </div>
  );
};

export default WindowControls;