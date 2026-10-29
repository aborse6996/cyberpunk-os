
"use client";

import { useEffect, useState } from "react";

export const useBrowserNavigation = () => {
  const [address, setAddress] = useState("");
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [history, setHistory] = useState<(string | null)[]>([null]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const [reloadKey, setReloadKey] = useState(0);
  const [loadMessage, setLoadMessage] = useState<string | null>(null);

  const navigateTo = (destination: string | null) => {
    const nextHistory = [
      ...history.slice(0, historyIndex + 1),
      destination,
    ];

    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);

    setCurrentUrl(destination);
    setAddress(destination ?? "");
    setIsLoading(Boolean(destination));
    setLoadMessage(null);
  };

  const goBack = () => {
    if (historyIndex <= 0) return;

    const nextIndex = historyIndex - 1;
    const destination = history[nextIndex];

    setHistoryIndex(nextIndex);
    setCurrentUrl(destination);
    setAddress(destination ?? "");
    setIsLoading(Boolean(destination));
    setLoadMessage(null);
  };

  const goForward = () => {
    if (historyIndex >= history.length - 1) return;

    const nextIndex = historyIndex + 1;
    const destination = history[nextIndex];

    setHistoryIndex(nextIndex);
    setCurrentUrl(destination);
    setAddress(destination ?? "");
    setIsLoading(Boolean(destination));
    setLoadMessage(null);
  };

  const handleReload = () => {
    if (!currentUrl) return;

    setLoadMessage(null);
    setIsLoading(true);
    setReloadKey((previous) => previous + 1);
  };

  // Show a warning if loading takes too long.
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

  return {
    address,
    setAddress,

    currentUrl,
    setCurrentUrl,

    isLoading,
    setIsLoading,

    history,
    historyIndex,

    reloadKey,
    loadMessage,
    setLoadMessage,

    navigateTo,
    goBack,
    goForward,
    handleReload,
  };
};
