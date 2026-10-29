"use client";

import type { Bookmark } from "../browserTypes";
import BrowserOptionsMenu from "./BrowserOptionsMenu";

type BrowserToolbarProps = {
  address: string;
  onAddressChange: (value: string) => void;

  currentUrl: string | null;
  canGoBack: boolean;
  canGoForward: boolean;

  onGoHome: () => void;
  onBack: () => void;
  onForward: () => void;
  onReload: () => void;
  onSubmitAddress: () => void;

  bookmarks: Bookmark[];
  onToggleBookmark: () => void;
  onOpenBookmark: (url: string) => void;
  onOpenBookmarksPage: () => void;
};

const BrowserToolbar = ({
  address,
  onAddressChange,
  currentUrl,
  canGoBack,
  canGoForward,
  onGoHome,
  onBack,
  onForward,
  onReload,
  onSubmitAddress,
  bookmarks,
  onToggleBookmark,
  onOpenBookmark,
  onOpenBookmarksPage,
}: BrowserToolbarProps) => {
  return (
    <div className="flex shrink-0 gap-2 border-b border-white/5 bg-[#0a111c] p-3">
      {/* Home */}
      <button
        type="button"
        onClick={onGoHome}
        title="Home"
        aria-label="Go to homepage"
        className="rounded-lg px-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-cyan-300"
      >
        H
      </button>

      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        disabled={!canGoBack}
        title="Go back"
        aria-label="Go back"
        className="rounded-lg px-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-25"
      >
        ←
      </button>

      {/* Forward */}
      <button
        type="button"
        onClick={onForward}
        disabled={!canGoForward}
        title="Go forward"
        aria-label="Go forward"
        className="rounded-lg px-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-25"
      >
        →
      </button>

      {/* Reload */}
      <button
        type="button"
        onClick={onReload}
        disabled={!currentUrl}
        title="Reload page"
        aria-label="Reload page"
        className="rounded-lg px-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-25"
      >
        ↻
      </button>

      {/* Address bar */}
      <div className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 transition focus-within:border-cyan-300/40">
        <span className="text-cyan-400">⌕</span>

        <input
          type="text"
          value={address}
          onChange={(event) => onAddressChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              onSubmitAddress();
            }
          }}
          placeholder="Search or enter a website address"
          aria-label="Search or enter a website address"
          autoComplete="url"
          spellCheck={false}
          className="h-full min-w-0 flex-1 bg-transparent text-xs text-slate-200 outline-none placeholder:text-slate-500"
        />

        <button
          type="button"
          onClick={onSubmitAddress}
          className="text-xs text-cyan-300 transition hover:text-white"
        >
          Go
        </button>
      </div>

      {/* Three-dot options menu */}
      <BrowserOptionsMenu
        currentUrl={currentUrl}
        bookmarks={bookmarks}
        onToggleBookmark={onToggleBookmark}
        onReload={onReload}
        onOpenBookmark={onOpenBookmark}
        onOpenBookmarksPage={onOpenBookmarksPage}
      />
    </div>
  );
};

export default BrowserToolbar;
