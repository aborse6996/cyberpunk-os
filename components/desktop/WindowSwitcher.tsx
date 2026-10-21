"use client";

import { useEffect, useState } from "react";
import type { WindowDefinition } from "@/core/windowManager/windowTypes";
import WindowPreview from "./WindowPreview";

type WindowSwitcherProps = {
  windows: WindowDefinition[];
  activeWindowId: string | null;
  onSelectWindow: (windowId: string) => void;
  onClose: () => void;
};

const WindowSwitcher = ({
  windows,
  activeWindowId,
  onSelectWindow,
  onClose,
}: WindowSwitcherProps) => {
  const [selectedWindowId, setSelectedWindowId] = useState<string | null>(
    activeWindowId ?? windows[0]?.windowId ?? null,
  );

  useEffect(() => {
    const selectionStillExists = windows.some(
      (window) => window.windowId === selectedWindowId,
    );

    if (!selectionStillExists) {
      setSelectedWindowId(activeWindowId ?? windows[0]?.windowId ?? null);
    }
  }, [windows, activeWindowId, selectedWindowId]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (windows.length === 0) return;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();

        const currentIndex = windows.findIndex(
          (window) => window.windowId === selectedWindowId,
        );

        const nextIndex =
          currentIndex === -1 ? 0 : (currentIndex + 1) % windows.length;

        setSelectedWindowId(windows[nextIndex].windowId);
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();

        const currentIndex = windows.findIndex(
          (window) => window.windowId === selectedWindowId,
        );

        const previousIndex =
          currentIndex === -1
            ? windows.length - 1
            : (currentIndex - 1 + windows.length) % windows.length;

        setSelectedWindowId(windows[previousIndex].windowId);
      }

      if (event.key === "Enter" && selectedWindowId) {
        event.preventDefault();
        onSelectWindow(selectedWindowId);
        onClose;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [windows, selectedWindowId, onSelectWindow, onClose]);

  return (
    <div
      className="fixed inset-0 z-90 flex items-center justify-center bg-black/55 backdrop-blur-mg"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Window switcher"
        className="w-[min(850px,90vw)] rounded-2xl border border-cyan-300/25 bg-[#07111f]/95 p-6 shadow-[0_0_60px_rgba(0,220,255,0.12)]"
      >
        <header className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
              CyberpunkOS
            </p>
            <h1 className="mt-1 text-xl font-semibold text-white">
              Window Switcher
            </h1>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-400 transition hover:border-cyan-300/40 hover:text-cyan-300"
          >
            Esc
          </button>
        </header>

        {windows.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/15 px-4 py-12 text-center">
            <p className="text-gray-300">No Open Windows</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {windows.map((item) => {
              const isSelected = item.windowId === selectedWindowId;
              const isActive = item.windowId === activeWindowId;

              return (
                <button
                  key={item.windowId}
                  type="button"
                  onClick={() => setSelectedWindowId(item.windowId)}
                  onDoubleClick={() => {
                    onSelectWindow(item.windowId);
                    onClose();
                  }}
                  aria-pressed={isSelected}
                  className={`group rounded-xl border p-4 text-left transition 
                    ${
                      isSelected
                        ? "border-cyan-300 bg-cyan-300/10 shadow-[0_0_24px_rgba(34,211,238,0.12)]"
                        : "border-white/10 bg-white/3 hover:border-cyan-300/40 hover:bg-white/6"
                    }`}
                >
                  {/* Preview must occupy its own full-width row */}
                  <WindowPreview appId={item.appId} />

                  {/* Window state badges belong in a separate row */}
                  <div className="mt-2 flex min-h-5 items-center justify-end gap-2">
                    {item.state === "minimized" && (
                      <span className="rounded-md bg-white/5 px-2 py-1 text-[10px] uppercase tracking-wider text-gray-400">
                        Minimized
                      </span>
                    )}

                    {item.state === "maximized" && (
                      <span className="rounded-md bg-cyan-300/10 px-2 py-1 text-[10px] uppercase tracking-wider text-cyan-300">
                        Maximized
                      </span>
                    )}
                  </div>

                  <p className="truncate font-medium text-white">
                    {item.title}
                  </p>

                  <p className="mt-1 truncate text-xs text-gray-500">
                    {item.appId}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isActive ? "bg-cyan-300" : "bg-gray-600"
                      }`}
                    />
                    <span className="text-gray-400">
                      {isActive ? "Currently active" : "Open window"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <footer className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-4 text-xs text-gray-500">
          <span>
            <kbd className="text-gray-300">↑</kbd>{" "}
            <kbd className="text-gray-300">↓</kbd> Navigate
          </span>
          <span>
            <kbd className="text-gray-300">Enter</kbd> Select
          </span>
          <span>
            <kbd className="text-gray-300">Esc</kbd> Cancel
          </span>
          <span className="ml-auto">Double-click a card to switch</span>
        </footer>
      </section>
    </div>
  );
};

export default WindowSwitcher;
