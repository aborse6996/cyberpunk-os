"use client";

import { useEffect } from "react";

import { KeyboardShorcuts } from "@/core/keyboard/keyboardShortcut";

type UseKeyboardShortcutsProps = {
  onToggleStartMenu: () => void;
  onSwitchWindow: () => void;
  onLaunchTerminal: () => void;
  enabled?: boolean;
};

export const UseKeyboardShortcuts = ({
  onToggleStartMenu,
  onSwitchWindow,
  onLaunchTerminal,
  enabled = true,
}: UseKeyboardShortcutsProps) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;

      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return;
      }

      const shortcut = KeyboardShorcuts.find((item) => {
        const keyMatches =
          item.key === "Meta"
            ? event.metaKey
            : item.key.toLowerCase() === event.key.toLowerCase();

        return (
          keyMatches &&
          Boolean(item.ctrl) === event.ctrlKey &&
          Boolean(item.alt) === event.altKey &&
          Boolean(item.shift) === event.shiftKey &&
          (item.key === "Meta" ? true : Boolean(item.meta) === event.metaKey)
        );
      });

      if (!shortcut) return;

      switch (shortcut.action) {
        case "TOGGLE_START_MENU":
          event.preventDefault();
          onToggleStartMenu();
          break;

        case "SWITCH_WINDOW":
          event.preventDefault();
          onSwitchWindow();
          break;

        case "LAUNCH_TERMINAL":
          event.preventDefault();
          onLaunchTerminal();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled, onToggleStartMenu, onSwitchWindow, onLaunchTerminal]);
};
