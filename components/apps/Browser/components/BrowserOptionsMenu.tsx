
"use client";

import { useEffect, useRef, useState } from "react";
import type { Bookmark } from "../browserTypes";

type BrowserOptionsMenuProps = {
  currentUrl: string | null;
  bookmarks: Bookmark[];
  onToggleBookmark: () => void;
  onReload: () => void;
  onOpenBookmark: (url: string) => void;
  onOpenBookmarksPage: () => void;
};

const BrowserOptionsMenu = ({
  currentUrl,
  bookmarks,
  onToggleBookmark,
  onReload,
  onOpenBookmark,
  onOpenBookmarksPage,
}: BrowserOptionsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isBookmarked = bookmarks.some(
    (bookmark) => bookmark.url === currentUrl,
  );

  // Close when clicking outside or pressing Escape.
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !menuRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleOpenBookmark = (url: string) => {
    setIsOpen(false);
    onOpenBookmark(url);
  };

  return (
    <div ref={menuRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        title="Browser options"
        aria-label="Browser options"
        aria-expanded={isOpen}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-lg text-slate-400 transition hover:bg-white/5 hover:text-cyan-300"
      >
        ⋮
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-cyan-300/15 bg-[#0a111c] p-2 shadow-2xl shadow-black/50">
          <p className="px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
            Browser options
          </p>

          <button
            type="button"
            disabled={!currentUrl}
            onClick={() => {
              onToggleBookmark();
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-300 transition hover:bg-cyan-300/5 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="w-5 text-center">
              {isBookmarked ? "★" : "☆"}
            </span>
            {isBookmarked ? "Remove bookmark" : "Bookmark this page"}
          </button>

          <button
            type="button"
            disabled={!currentUrl}
            onClick={() => {
              onReload();
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-300 transition hover:bg-cyan-300/5 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="w-5 text-center">↻</span>
            Reload page
          </button>

          <div className="my-2 border-t border-white/10" />

          <p className="px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
            Bookmarks
          </p>

          {bookmarks.length === 0 ? (
            <p className="px-3 py-3 text-xs text-slate-500">
              No bookmarks saved yet.
            </p>
          ) : (
            <div className="max-h-48 overflow-y-auto scrollbar-hide">
              {bookmarks.slice(0, 5).map((bookmark) => (
                <button
                  key={bookmark.url}
                  type="button"
                  onClick={() => handleOpenBookmark(bookmark.url)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-cyan-300/5"
                >
                  <span className="text-cyan-300">◇</span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-slate-200">
                      {bookmark.title}
                    </span>
                    <span className="block truncate text-[10px] text-slate-500">
                      {bookmark.url}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}

          <div className="my-2 border-t border-white/10" />

          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onOpenBookmarksPage();
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-cyan-300 transition hover:bg-cyan-300/10"
          >
            <span className="w-5 text-center">▤</span>
            View all bookmarks
            <span className="ml-auto text-xs">→</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default BrowserOptionsMenu;
