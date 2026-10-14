import type {
  SystemLifecycleAction,
  SystemLifecycleState,
} from "./systemTypes";

type TransitionTable = Record<
  SystemLifecycleState,
  Partial<Record<SystemLifecycleAction, SystemLifecycleState>>
>;

const transitions: TransitionTable = {
  booting: {
    BOOT_COMPLETE: "login",
    SHUTDOWN: "shutting-down",
  },
  login: {
    LOGIN_SUCCESS: "desktop",
    SHUTDOWN: "shutting-down",
    RESTART: "restarting",
  },

  desktop: {
    LOCK: "locked",
    LOGOUT: "login",
    SLEEP: "sleeping",
    SHUTDOWN: "shutting-down",
    RESTART: "restarting",
  },

  locked: {
    UNLOCK: "desktop",
    SLEEP: "sleeping",
    SHUTDOWN: "shutting-down",
    RESTART: "restarting",
  },

  sleeping: {
    WAKE: "locked",
    SHUTDOWN: "shutting-down",
    RESTART: "restarting",
  },

  restarting: {
    RESTART_COMPLETE: "booting",
    SHUTDOWN: "shutting-down",
  },

  "shutting-down": {
    SHUTDOWN_COMPLETE: "off",
  },

  off: {
    POWER_ON: "booting",
  },
};

export const transitionSystemState = (
  currentState: SystemLifecycleState,
  action: SystemLifecycleAction,
): SystemLifecycleState => {
  return transitions[currentState][action] ?? currentState;
};
