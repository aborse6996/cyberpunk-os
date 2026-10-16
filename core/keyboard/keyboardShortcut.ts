import type { KeyboardShorcut } from "./shortcutTypes";

export const KeyboardShorcuts: KeyboardShorcut[] = [
  {
    key: "s",
    ctrl: true,
    alt: true,
    action: "TOGGLE_START_MENU",
  },
  {
    key: "w",
    ctrl: true,
    alt: true,
    action: "SWITCH_WINDOW",
  },
  {
    key: "t",
    ctrl: true,
    alt: true,
    action: "LAUNCH_TERMINAL",
  },
];
