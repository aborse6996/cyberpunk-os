"use client";

import { useEffect, useState } from "react";
import type { Bookmark } from "../browserTypes";

const STORAGE_KEY = "cyberpunkos:browser:bookmarks";

// Validate data loaded from browser storage
const isBookmark = (value: unknown): value is Bookmark => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const item = value as Record<string, unknown>;

  if (typeof item.title !== "string" || typeof item.url !== "string") {
    return false;
  }

  try {
    const url = new URL(item.url);

    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

export const useBrowserBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved bookmarks when the component mounts
  useEffect(() => {
    try {
      const savedBookmarks = window.localStorage.getItem(STORAGE_KEY);

      if (savedBookmarks) {
        const parsed: unknown = JSON.parse(savedBookmarks);

        if (Array.isArray(parsed)) {
          setBookmarks(parsed.filter(isBookmark));
        }
      }
    } catch {
      // Continue with an empty list if storage is unavailable or invalid.
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Persist bookmarks whenever the list changes
  useEffect(() => {
    if (!isInitialized) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch {
      // Storage may be unavailable or full.
    }
  }, [bookmarks, isInitialized]);

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
