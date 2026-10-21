type WindowPreviewProps = {
  appId: string;
};

const WindowPreview = ({ appId }: WindowPreviewProps) => {
  const renderPreviewContent = () => {
    switch (appId) {
      case "terminal":
        return (
          <div className="flex h-full flex-col gap-1.5 overflow-hidden p-3 font-mono text-[9px] leading-tight sm:text-[10px]">
            <p className="truncate text-cyan-300">
              CYBERPUNK OS [Version 0.1.0]
            </p>
            <p className="truncate text-slate-500">
              System interface initialized.
            </p>

            <div className="mt-2 flex min-w-0 items-center gap-1">
              <span className="shrink-0 text-emerald-400">guest@nexus:~$</span>
              <span className="truncate text-slate-300">system status</span>
            </div>

            <p className="truncate text-emerald-400">SYSTEM ONLINE</p>
            <p className="truncate text-slate-500">
              All services operational...
            </p>
          </div>
        );

      case "browser":
        return (
          <div className="flex h-full min-w-0 flex-col overflow-hidden">
            <div className="flex h-7 shrink-0 items-center gap-1.5 border-b border-white/10 bg-[#101a26] px-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

              <div className="ml-2 h-3 min-w-0 flex-1 rounded-sm border border-white/5 bg-black/30" />
            </div>

            <div className="flex-1 overflow-hidden p-3">
              <div className="mb-2 h-2 w-2/5 rounded bg-cyan-300/60" />
              <div className="mb-1.5 h-1.5 w-full rounded bg-white/10" />
              <div className="mb-1.5 h-1.5 w-4/5 rounded bg-white/10" />

              <div className="mt-3 flex h-8 items-center rounded border border-cyan-300/15 bg-cyan-300/5 px-2">
                <div className="h-1.5 w-1/2 rounded bg-cyan-300/30" />
              </div>

              <div className="mt-2 h-1.5 w-3/4 rounded bg-white/10" />
            </div>
          </div>
        );

      case "file-manager":
        return (
          <div className="flex h-full min-w-0 flex-col overflow-hidden">
            <div className="flex h-7 shrink-0 items-center border-b border-white/10 bg-[#101a26] px-3">
              <div className="h-2 w-2/5 rounded bg-white/15" />
            </div>

            <div className="grid flex-1 grid-cols-3 content-start gap-x-2 gap-y-3 overflow-hidden p-3">
              {["SYSTEM", "APPS", "FILES", "MEDIA", "DATA", "USER"].map(
                (folder) => (
                  <div
                    key={folder}
                    className="flex min-w-0 flex-col items-center gap-1"
                  >
                    <svg
                      viewBox="0 0 32 26"
                      className="h-5 w-6 shrink-0"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 5.5A2.5 2.5 0 0 1 4.5 3H13L16 6H27.5A2.5 2.5 0 0 1 30 8.5V21a2.5 2.5 0 0 1-2.5 2.5h-23A2.5 2.5 0 0 1 2 21V5.5Z"
                        fill="#22d3ee"
                        fillOpacity=".17"
                        stroke="#22d3ee"
                        strokeOpacity=".65"
                      />
                    </svg>
                    <span className="max-w-full truncate text-[7px] text-slate-400">
                      {folder}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="flex h-full items-center justify-center">
            <span className="text-3xl font-semibold text-cyan-300/60">
              {appId.charAt(0).toUpperCase() || "?"}
            </span>
          </div>
        );
    }
  };

  return (
    <div
      aria-hidden="true"
      className="
        relative isolate aspect-16/10 w-full min-w-0
        overflow-hidden rounded-lg
        border border-cyan-300/15
        bg-[#050b14]
      "
    >
      {/* Miniature application title bar */}
      <div className="absolute inset-0 flex flex-col overflow-hidden">
        {renderPreviewContent()}
      </div>
    </div>
  );
};

export default WindowPreview;
