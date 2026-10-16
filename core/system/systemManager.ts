import type {
  SystemLifecycleAction,
  SystemLifecycleState,
} from "./systemTypes";

import { transitionSystemState } from "./systemLifecycle";

import { windowManager } from "../windowManager/windowManager";

type SystemListener = () => void;

class SystemManager {
  private state: SystemLifecycleState = "booting";

  private listeners = new Set<SystemListener>();

  subscirbe = (listener: SystemListener) => {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  };

  getSnapshot = (): SystemLifecycleState => {
    return this.state;
  };

  getServerSnapshot = (): SystemLifecycleState => {
    return "booting";
  };

  dispatch = (action: SystemLifecycleAction) => {
    const nextState = transitionSystemState(this.state, action);

    if (nextState === this.state) {
      return;
    }

    this.state = nextState;

    this.listeners.forEach((listener) => listener());

    const shouldResetSession =
      action === "LOGOUT" || action === "RESTART" || action === "SHUTDOWN";

    if (shouldResetSession) {
      windowManager.resetSession();
    }
  };

  bootComplete = () => this.dispatch("BOOT_COMPLETE");

  loginSuccess = () => this.dispatch("LOGIN_SUCCESS");

  logout = () => this.dispatch("LOGOUT");

  lock = () => this.dispatch("LOCK");

  unlock = () => this.dispatch("UNLOCK");

  sleep = () => this.dispatch("SLEEP");

  wake = () => this.dispatch("WAKE");

  restart = () => this.dispatch("RESTART");

  restartComplete = () => this.dispatch("RESTART_COMPLETE");

  shutdown = () => this.dispatch("SHUTDOWN");

  shutdownComplete = () => this.dispatch("SHUTDOWN_COMPLETE");

  powerOn = () => this.dispatch("POWER_ON");
}

export const systemManager = new SystemManager();
