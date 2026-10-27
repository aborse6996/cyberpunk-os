"use client";

import { useState } from "react";

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

const BrowserApp = () => {
  const [address, setAddress] = useState("");
  const [feedback, setFeedback] = useState("");

  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [history, setHistory] = useState<(string | null)[]>([null]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleSubmit = () => {
    const destination = resolveAddress(address);

    if (!destination) {
      setFeedback("Invalid address. Enter a valid website or search phrase");
      return;
    }

    navigateTo(destination);
  };

  const handleGoHome = () => {
    navigateTo(null);
  };

  const navigateTo = (destination: string | null) => {
    const nextHistory = [...history.slice(0, historyIndex + 1), destination];

    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);

    setCurrentUrl(destination);
    setAddress(destination ?? "");
    setFeedback("");
    setIsLoading(Boolean(destination));
  };

  const goBack = () => {
    if (historyIndex <= 0) return;

    const nextIndex = historyIndex - 1;
    const destination = history[nextIndex];

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

    setHistoryIndex(nextIndex);
    setCurrentUrl(destination);
    setAddress(destination ?? "");
    setFeedback("");
    setIsLoading(Boolean(destination));
  };

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
      </div>

      {/* Browser Home Screen */}
      <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-[#070c14] justify-center items-center">
        {currentUrl ? (
          <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden">
            {/* Website status bar */}
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <span className="truncate text-xs text-slate-400">
                {isLoading ? "Loading Website..." : currentUrl}
              </span>

              {/* Website viewport */}
              <iframe
                key={currentUrl}
                src={currentUrl}
                title={`Website: ${currentUrl}`}
                referrerPolicy="strict-origin-when-cross-origin"
                onLoad={() => setIsLoading(false)}
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
                { name: "Example", description: "Test website" },
                { name: "Wikipedia", description: "Knowledge base" },
                { name: "MDN", description: "Developer resources" },
              ].map((site) => (
                <div
                  key={site.name}
                  className="rounded-xl border border-white/10 bg-white/2.5 p-4 text-left"
                >
                  <p className="text-sm font-medium text-slate-200">
                    {site.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {site.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BrowserApp;
