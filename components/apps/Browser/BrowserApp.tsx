"use client";

import { useState } from "react";

import resolveAddress from "./utils/resolveAddress";
import { useBrowserNavigation } from "./hooks/useBrowserNavigation";
import BookmarksPage from "./components/BookmarksPage";
import { useBrowserBookmarks } from "./hooks/useBrowserBookmarks";
import BrowserHome from "./components/BrowserHome";
import BrowserViewport from "./components/BrowserViewport";
import BrowserToolbar from "./components/BrowserToolbar";

const BrowserApp = () => {
  const {
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
  } = useBrowserNavigation();

  const [feedback, setFeedback] = useState("");

  const { bookmarks, toggleBookmark, removeBookmark } = useBrowserBookmarks();

  const [isBookMarkPageOpen, setIsBookMarkPageOpen] = useState(false);

  // This function handle submition
  const handleSubmit = () => {
    const destination = resolveAddress(address);

    if (!destination) {
      setFeedback("Invalid address. Enter a valid website or search phrase");
      return;
    }

    navigateTo(destination);

    if (isBookMarkPageOpen) {
      setIsBookMarkPageOpen(false);
      return;
    }
  };

  // Function to go back to home
  const handleGoHome = () => {
    setIsBookMarkPageOpen(false);
    navigateTo(null);
  };

  // Function handle goBack function
  const handleBack = () => {
    if (isBookMarkPageOpen) {
      setIsBookMarkPageOpen(false);
      setAddress(currentUrl ?? "");
      return;
    }

    goBack();
  };

  const handleOpenBookmarksPage = () => {
    setIsBookMarkPageOpen(true);
    setAddress("");
    setFeedback("");
    setIsLoading(false);
    setLoadMessage(null);
  };

  const handleOpenSavedBookmark = (url: string) => {
    setIsBookMarkPageOpen(false);
    navigateTo(url);
  };

  const handleCloseBookmarksPage = () => {
    setIsBookMarkPageOpen(false);
    setAddress(currentUrl ?? "");
  };

  const handleOpenBookmark = (url: string) => {
    setIsBookMarkPageOpen(false);
    navigateTo(url);
  };

  // Function to handle bookmarks
  const handleBookmark = () => {
    toggleBookmark(currentUrl);
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#070c14] text-slate-200">
      {/* Address Bar Placeholder */}
      <BrowserToolbar
        address={address}
        onAddressChange={(value) => {
          setAddress(value);
          setFeedback("");
        }}
        currentUrl={currentUrl}
        canGoBack={historyIndex > 0}
        canGoForward={historyIndex < history.length - 1}
        onGoHome={handleGoHome}
        onBack={handleBack}
        onForward={goForward}
        onReload={handleReload}
        onSubmitAddress={handleSubmit}
        bookmarks={bookmarks}
        onToggleBookmark={handleBookmark}
        onOpenBookmark={handleOpenSavedBookmark}
        onOpenBookmarksPage={handleOpenBookmarksPage}
      />

      {/* Browser Home Screen */}
      <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-[#070c14] justify-center items-center">
        {isBookMarkPageOpen ? (
          <BookmarksPage
            bookmarks={bookmarks}
            onBack={handleCloseBookmarksPage}
            onOpenBookmark={handleOpenBookmark}
            onRemoveBookmark={removeBookmark}
          />
        ) : currentUrl ? (
          <BrowserViewport
            currentUrl={currentUrl}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            reloadKey={reloadKey}
            loadMessage={loadMessage}
            setLoadMessage={setLoadMessage}
          />
        ) : (
          <BrowserHome onNavigate={navigateTo} />
        )}
      </main>
    </div>
  );
};

export default BrowserApp;
