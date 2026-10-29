"use client";

type BrowserViewportProps = {
  currentUrl: string;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  reloadKey: number;
  loadMessage: string | null;
  setLoadMessage: (message: string | null) => void;
};

const BrowserViewport = ({
  currentUrl,
  isLoading,
  setIsLoading,
  reloadKey,
  loadMessage,
  setLoadMessage,
}: BrowserViewportProps) => {
  let hostname = currentUrl;

  try {
    hostname = new URL(currentUrl).hostname;
  } catch {
    // Keep the original URL if hostname parsing fails.
  }

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden">
      {/* Website status bar */}
      <div className="flex h-8 shrink-0 items-center border-b border-white/10 bg-[#0a111c] px-3">
        <span className="truncate text-xs text-slate-400">
          {isLoading ? "Loading website..." : hostname}
        </span>
      </div>

      {/* Loading warning */}
      {loadMessage && (
        <div
          role="status"
          className="shrink-0 border-b border-amber-300/20 bg-amber-300/5 px-3 py-2 text-xs text-amber-200"
        >
          {loadMessage}
        </div>
      )}

      {/* Website viewport */}
      <div className="relative min-h-0 flex-1 overflow-hidden bg-white">
        {isLoading && (
          <div
            aria-label="Loading website"
            className="absolute inset-x-0 top-0 z-10 h-0.5 overflow-hidden bg-cyan-300/10"
          >
            <div className="h-full w-1/3 animate-pulse bg-cyan-300" />
          </div>
        )}

        <iframe
          key={`${currentUrl}-${reloadKey}`}
          src={currentUrl}
          title={`Website: ${hostname}`}
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => {
            setIsLoading(false);
            setLoadMessage(null);
          }}
          onError={() => {
            setIsLoading(false);
            setLoadMessage(
              "The website could not be loaded inside the browser window.",
            );
          }}
          className="h-full w-full border-0 bg-white"
        />
      </div>

      {/* Embedding information */}
      <div className="flex min-h-7 shrink-0 items-center border-t border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] text-slate-500">
        If this page appears blank, the website may not allow embedded viewing.
      </div>
    </div>
  );
};

export default BrowserViewport;
