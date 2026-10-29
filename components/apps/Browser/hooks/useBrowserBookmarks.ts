"use client";

import { useState } from "react";
import type { Bookmark } from "../browserTypes";

export const useBrowserBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // Add a bookmark if it doesn't exist, or remove it if it does.
  const toggleBookmark = (url: string | null) => {
    if (!url) return;

    setBookmarks((previous) => {
      const alreadyBookmarked = previous.some(
        (bookmark) => bookmark.url === url,
      );

      if (alreadyBookmarked) {
        return previous.filter((bookmark) => bookmark.url !== url);
      }

      const title = new URL(url).hostname;

      return [...previous, { title, url }];
    });
  };

  // Remove a bookmark by its URL.
  const removeBookmark = (url: string) => {
    setBookmarks((previous) =>
      previous.filter((bookmark) => bookmark.url !== url),
    );
  };

  return {
    bookmarks,
    toggleBookmark,
    removeBookmark,
  };
};
