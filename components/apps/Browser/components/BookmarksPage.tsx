import { Bookmark } from "../browserTypes";

type BookmarksPageProps = {
  bookmarks: Bookmark[];
  onBack: () => void;
  onOpenBookmark: (url: string) => void;
  onRemoveBookmark: (url: string) => void;
};

const BookmarksPage = ({
  bookmarks,
  onBack,
  onOpenBookmark,
  onRemoveBookmark,
}: BookmarksPageProps) => {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-[#070c14] p-6 scrollbar-hide w-full">
      <div className="mx-auto w-full max-w-3xl">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-cyan-300"
        >
          ← Back to browser
        </button>

        <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-400">
          CYBERPUNKOS / LIBRARY
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-white">Bookmarks</h1>

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
                  onClick={() => onOpenBookmark(bookmark.url)}
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
                  onClick={() => onRemoveBookmark(bookmark.url)}
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
  );
};

export default BookmarksPage;
