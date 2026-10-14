export type SystemLifecycleState =
  | "booting"
  | "login"
  | "desktop"
  | "locked"
  | "sleeping"
  | "restarting"
  | "shutting-down"
  | "off";

export type SystemLifecycleAction =
  | "BOOT_COMPLETE"
  | "LOGIN_SUCCESS"
  | "LOGOUT"
  | "LOCK"
  | "UNLOCK"
  | "SLEEP"
  | "WAKE"
  | "RESTART"
  | "RESTART_COMPLETE"
  | "SHUTDOWN"
  | "SHUTDOWN_COMPLETE"
  | "POWER_ON";
