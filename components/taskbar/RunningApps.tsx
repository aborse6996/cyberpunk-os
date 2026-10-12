"use client";

import { appRegistry } from "@/core/apps/appRegistry";

import { WindowDefinition } from "@/core/windowManager/windowTypes";

type RunningAppsProps = {
  windows: WindowDefinition[];
  activeWindowId: string | null;
  onWindowClick: (windowId: string) => void;
};

const RunningApps = ({
  windows,
  activeWindowId,
  onWindowClick,
}: RunningAppsProps) => {
  return (
    <div className="flex min-w-0 items-center justify-center gap-2 overflow-x-auto px-2">
      {windows.map((window) => {
        const app = appRegistry.getById(window.appId);

        if (!app) return null;

        const isActive = activeWindowId === window.windowId;

        const isMinimized = window.state === "minimized";

        return (
          <button
            key={window.windowId}
            type="button"
            title={window.title}
            aria-label={
              isMinimized
                ? `Restore ${window.title}`
                : isActive
                  ? `Minimize ${window.title}`
                  : `Focus ${window.title}`
            }
            aria-pressed={isActive}
            onClick={() => onWindowClick(window.windowId)}
            className={`relative flex h-12 max-w-48 shrink-0 items-center gap-3 rounded-lg border px-3 transition-colors duration-200
                ${
                  isActive
                    ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-100"
                    : "border-transparent bg-white/3 text-slate-300 hover:border-white/10 hover:bg-white/[0.07]"
                }
                  ${isMinimized ? "opacity-60" : ""}
                `}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center text-xl">
              {app.icon}
            </span>

            <span className="truncate text-sm">{window.title}</span>
            <span
              className={`
                absolute bottom-0 left-1/2 h-0.5
                w-5 -translate-x-1/2 rounded-full
                ${
                  isActive
                    ? "bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.7)]"
                    : isMinimized
                      ? "bg-slate-500"
                      : "bg-cyan-300/40"
                }
              `}
            />
          </button>
        );
      })}
    </div>
  );
};

export default RunningApps;
