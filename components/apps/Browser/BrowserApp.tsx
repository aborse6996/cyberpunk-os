"use client";

import { useState, useEffect, useRef } from "react";

const resolveAddress = (input: string): string | null => {
  const value = input.trim();

  if (!value) return null;

  // If a protocol is present, only accept HTTP or HTTPS.
  const hasProtocol = /^[a-z][a-z\d+.-]*:/i.test(value);

  if (hasProtocol && !/^https?:\/\//i.test(value)) {
    return null;
  }

  // Recognize URLs, domains, localhost, and IP addresses.
  const isWebsite =
    /^https?:\/\//i.test(value) ||
    /^(localhost|(?:\d{1,3}\.){3}\d{1,3}|(?:[\w-]+\.)+[\w-]+)(:\d+)?(?:[/?#].*)?$/i.test(
      value,
    );

  const destination = isWebsite
    ? /^https?:\/\//i.test(value)
      ? value
      : `https://${value}`
    : `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(value)}`;

  try {
    const url = new URL(destination);

    if (!["http:", "https:"].includes(url.protocol) || !url.hostname) {
      return null;
    }

    return url.href;
  } catch {
    return null;
  }
};

type Bookmark = {
  title: string;
  url: string;
};

const BrowserApp = () => {
  const [address, setAddress] = useState("");
  const [feedback, setFeedback] = useState("");

  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [history, setHistory] = useState<(string | null)[]>([null]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const [reloadKey, setReloadKey] = useState(0);

  const [loadMessage, setLoadMessage] = useState<string | null>(null);

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const [isBookMarkPageOpen, setIsBookMarkPageOpen] = useState(false);

  const optionsMenuRef = useRef<HTMLDivElement>(null);

  // This function handle submition
  const handleSubmit = () => {
    const destination = resolveAddress(address);

    if (!destination) {
      setFeedback("Invalid address. Enter a valid website or search phrase");
      return;
    }

    navigateTo(destination);
  };

  // Function to go back to home
  const handleGoHome = () => {
    navigateTo(null);
  };

  // Navigation function
  const navigateTo = (destination: string | null) => {
    setIsBookMarkPageOpen(false);

    const nextHistory = [...history.slice(0, historyIndex + 1), destination];

    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);

    setLoadMessage(null);

    setCurrentUrl(destination);
    setAddress(destination ?? "");
    setFeedback("");
    setIsLoading(Boolean(destination));
  };

  const goBack = () => {
    if (isBookMarkPageOpen) {
      setIsBookMarkPageOpen(false);
      setAddress(currentUrl ?? "");
      return;
    }
    if (historyIndex <= 0) return;

    const nextIndex = historyIndex - 1;
    const destination = history[nextIndex];

    setLoadMessage(null);

    setHistoryIndex(nextIndex);
    setCurrentUrl(destination);
    setAddress(destination ?? "");
    setFeedback("");
    setIsLoading(Boolean(destination));
  };

  const goForward = () => {
    if (historyIndex >= history.length - 1) return;

    const nextIndex = historyIndex + 1;
    const destination = history[nextIndex];

    setLoadMessage(null);

    setHistoryIndex(nextIndex);
    setCurrentUrl(destination);
    setAddress(destination ?? "");
    setFeedback("");
    setIsLoading(Boolean(destination));
  };

  const handleReload = () => {
    if (!currentUrl) return;

    setLoadMessage(null);

    setIsLoading(true);
    setReloadKey((previous) => previous + 1);
  };

  // Function to handle bookmarks
  const handleBookmark = () => {
    if (!currentUrl) return;

    const existingBookmark = bookmarks.some(
      (bookmark) => bookmark.url === currentUrl,
    );

    if (existingBookmark) {
      setBookmarks((previous) =>
        previous.filter((bookmark) => bookmark.url !== currentUrl),
      );
      return;
    }

    const hostname = new URL(currentUrl).hostname;

    setBookmarks((previous) => [
      ...previous,
      { title: hostname, url: currentUrl },
    ]);
  };

  // Slow website timeout useEffect
  useEffect(() => {
    if (!currentUrl || !isLoading) return;

    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
      setLoadMessage(
        "This page is taking longer than expected. It may be slow or block embedded viewing.",
      );
    }, 10000);

    return () => window.clearTimeout(timeoutId);
  }, [currentUrl, isLoading, reloadKey]);

  // Option menu useEffect
  useEffect(() => {
    if (!isOptionsMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !optionsMenuRef.current?.contains(event.target)
      ) {
        setIsOptionsMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOptionsMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOptionsMenuOpen]);

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#070c14] text-slate-200">
      {/* Address Bar Placeholder */}
      <div className="shrink-0 border-b border-white/5 bg-[#0a111c] p-3 flex gap-2">
        <button
          type="button"
          onClick={handleGoHome}
          title="Home"
          aria-label="Go to homepage"
          className="rounded-lg px-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-cyan-300"
        >
          H
        </button>
        <button
          type="button"
          onClick={goBack}
          disabled={historyIndex === 0}
          title="Go Back"
          aria-label="Go Back"
          className="rounded-lg px-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-25"
        >
          ←
        </button>
        <button
          type="button"
          onClick={goForward}
          disabled={historyIndex >= history.length - 1}
          title="Go forward"
          aria-label="Go forward"
          className="rounded-lg px-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-25"
        >
          →
        </button>
        <button
          type="button"
          onClick={handleReload}
          disabled={!currentUrl}
          title="Reload Page"
          aria-label="Reload Page"
          className="rounded-lg px-3 text-sm text-slate-400 transition hover:bg-whtie/5 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-25"
        >
          ↻
        </button>
        <div className="flex w-full h-9 items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 transition focus-within:border-cyan-300/40">
          <span className="text-cyan-400">⌕</span>

          <input
            type="text"
            value={address}
            onChange={(event) => {
              setAddress(event.target.value);
              setFeedback("");
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="Search or enter a website address"
            autoComplete="url"
            spellCheck={false}
            className="h-full min-w-0 flex-1 bg-transparent text-xs text-slate-200 outline-none placeholder:text-slate-500"
          />

          <button
            type="button"
            onClick={handleSubmit}
            className="text-xs text-cyan-300 transition hover:text-whtie"
          >
            Go
          </button>
        </div>
        <button
          type="button"
          onClick={handleBookmark}
          disabled={!currentUrl}
          title={
            bookmarks.some((bookmark) => bookmark.url === currentUrl)
              ? "Remove bookmark"
              : "Add bookmark"
          }
          aria-label="Toggle bookmark"
          className="rounded-lg px-3 text-lg text-slate-400 transition hover:bg-white/5 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-25"
        >
          {bookmarks.some((bookmark) => bookmark.url === currentUrl)
            ? "★"
            : "☆"}
        </button>
        {/* Browser options menu */}
        <div ref={optionsMenuRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => setIsOptionsMenuOpen((previous) => !previous)}
            title="Browser options"
            aria-label="Browser options"
            aria-expanded={isOptionsMenuOpen}
            className="h-9 w-9 rounded-lg text-lg text-slate-400 transition hover:bg-white/5 hover:text-cyan-300"
          >
            ⋮
          </button>
          {isOptionsMenuOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-cyan-300/15 bg-[#0a111c] p-2 shadow-2xl shadow-black/50">
              <p className="px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                Browser options
              </p>
              <button
                type="button"
                disabled={!currentUrl}
                onClick={() => {
                  handleBookmark();
                  setIsOptionsMenuOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-slate-300 transition hover:bg-cyan-300/5 hover:bg-text-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span className="w-5 text-center">☆</span>
                {bookmarks.some((bookmark) => bookmark.url === currentUrl)
                  ? "Remove bookmark"
                  : "Bookmark this page"}
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
                      onClick={() => {
                        navigateTo(bookmark.url);
                        setIsOptionsMenuOpen(false);
                      }}
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
                  setIsBookMarkPageOpen(true);
                  setIsOptionsMenuOpen(false);
                  setAddress("");
                  setFeedback("");
                  setIsLoading(false);
                  setLoadMessage(null);
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
      </div>

      {/* Browser Home Screen */}
      <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-[#070c14] justify-center items-center">
        {isBookMarkPageOpen ? (
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-[#070c14] p-6 scrollbar-hide">
            <div className="mx-auto w-full max-w-3xl">
              <button
                type="button"
                onClick={() => {
                  setIsBookMarkPageOpen(false);
                  setAddress(currentUrl ?? "");
                }}
                className="mb-6 rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-cyan-300"
              >
                ← Back to browser
              </button>
              <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-400">
                CYBERPUNKOS / LIBRARY
              </p>

              <h1 className="mt-2 text-3xl font-semibold text-white">
                Bookmarks
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Your saved destinations across the net.
              </p>

              {bookmarks.length === 0 ? (
                <div className="mt-8 rounded-xl border border-dashed border-white/10 p-10 text-center">
                  <p className="text-slate-300">No bookmarks yet</p>
                  <p className="mt-2 text-sm text-slate-500">
                    Open a website and save it using the three-dot menu.
                  </p>
                </div>
              ) : (
                <div className="mt-8 space-y-3">
                  {bookmarks.map((bookmark) => (
                    <div
                      key={bookmark.url}
                      className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/2.5 p-4 transition hover:border-cyan-300/20"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-300/15 bg-cyan-300/5 text-xl text-cyan-300">
                        ◇
                      </div>

                      <button
                        type="button"
                        onClick={() => navigateTo(bookmark.url)}
                        className="min-w-0 flex-1 text-left"
                      >
                        <span className="block truncate text-sm font-medium text-slate-200">
                          {bookmark.title}
                        </span>
                        <span className="mt-1 block truncate text-xs text-slate-500">
                          {bookmark.url}
                        </span>
                      </button>

                      <button
                        type="button"
                        title="Remove bookmark"
                        aria-label={`Remove ${bookmark.title} bookmark`}
                        onClick={() =>
                          setBookmarks((previous) =>
                            previous.filter(
                              (item) => item.url !== bookmark.url,
                            ),
                          )
                        }
                        className="shrink-0 rounded-lg px-3 py-2 text-slate-500 transition hover:bg-red-400/10 hover:text-red-300"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <p className="mt-6 text-xs text-slate-600">
                {bookmarks.length} saved{" "}
                {bookmarks.length === 1 ? "bookmark" : "bookmarks"}
              </p>
            </div>
          </div>
        ) : currentUrl ? (
          <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden">
            {/* Website status bar */}
            <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
              <span className="truncate text-xs text-slate-400">
                {isLoading ? "Loading Website..." : currentUrl}
              </span>

              {isLoading && (
                <div
                  aria-label="Loading Website"
                  className="absolute inset-x-0 top-0 z-10 h-0.5 overflow bg-cyan-300/10"
                >
                  <div className="h-full w-1/3 animate-pulse bg-cyan-300" />
                </div>
              )}

              {loadMessage && (
                <div
                  role="status"
                  className="shrink-0 border-b border-amber-300/20 bg-amber-300/5 px-3 py-2 text-sx text-amber-200"
                >
                  {loadMessage}
                </div>
              )}

              {/* Website viewport */}
              <iframe
                key={`${currentUrl}-${reloadKey}`}
                src={currentUrl}
                title={`Website: ${currentUrl}`}
                referrerPolicy="strict-origin-when-cross-origin"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false);
                  setLoadMessage(
                    "The website could not be loaded inside the browser window.",
                  );
                }}
                className="min-h-0 w-full flex-1 border-0 bg-white"
              ></iframe>
            </div>
          </div>
        ) : (
          <div className="max-w-xl text-center ">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/5 text-3xl text-cyan-300">
              ◉
            </div>

            <p className="text-[10px] uppercase tracking-[0.4em] text-cyan-400">
              CYBERPUNKOS NETWORK
            </p>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">
              Explore the net.
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
              Your gateway to the digital world. Search for information or enter
              a website address to get started.
            </p>

            {/* Quick Links */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                {
                  name: "Example",
                  description: "Test website",
                  url: "https://example.com",
                },
                {
                  name: "Wikipedia",
                  description: "Knowledge base",
                  url: "https://www.wikipedia.org/",
                },
                {
                  name: "MDN",
                  description: "Developer resources",
                  url: "https://developer.mozilla.org/",
                },
              ].map((site) => (
                <button
                  key={site.name}
                  type="button"
                  onClick={() => navigateTo(site.url)}
                  className="rounded-xl border border-white/10 bg-white/2.5 p-4 text-left transition hover:border-cyan-300/30 hover:bg-cyan-300/5"
                >
                  <p className="text-sm font-medium text-slate-200">
                    {site.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {site.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BrowserApp;
