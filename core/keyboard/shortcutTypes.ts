export type KeyboardShorcutAction =
  | "TOGGLE_START_MENU"
  | "SWITCH_WINDOW"
  | "LAUNCH_TERMINAL";

export type KeyboardShorcut = {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  meta?: boolean;
  action: KeyboardShorcutAction;
};
